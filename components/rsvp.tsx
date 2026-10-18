"use client";
import { useEffect, useRef, useState } from "react";
import { invitation } from "@/data/invitation";
type Choice = "attending" | "unable_to_attend";
export function RSVP() {
  const [token, setToken] = useState("");
  const [choice, setChoice] = useState<Choice | "">("");
  const [state, setState] = useState("idle");
  const [message, setMessage] = useState("");
  const submitting = useRef(false);
  const identity = useRef("");
  const requestVersion = useRef(0);
  const activeRequest = useRef<AbortController | null>(null);
  const final = state === "success" || state === "final";
  useEffect(() => {
    const read = () => {
      const next = new URLSearchParams(location.hash.slice(1)).get("invite") || "";
      if (next === identity.current) return;
      identity.current = next;
      requestVersion.current += 1;
      activeRequest.current?.abort();
      submitting.current = false;
      setToken(next);
      setChoice("");
      setState("idle");
      setMessage("");
    };
    read();
    addEventListener("hashchange", read);
    return () => {
      removeEventListener("hashchange", read);
      requestVersion.current += 1;
      activeRequest.current?.abort();
    };
  }, []);
  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!choice || !token || submitting.current || final) return;
    submitting.current = true;
    const version = ++requestVersion.current;
    const controller = new AbortController();
    activeRequest.current = controller;
    const timeout = setTimeout(() => controller.abort(), 12000);
    const isCurrent = () => version === requestVersion.current &&
      token === (new URLSearchParams(location.hash.slice(1)).get("invite") || "");
    setState("loading");
    setMessage("");
    try {
      const response = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, response: choice }),
        signal: controller.signal,
      });
      const data = await response.json();
      if (!isCurrent()) return;
      if (
        response.ok &&
        (data.status === "accepted" || data.status === "already_submitted")
      ) {
        const accepted = data.status === "accepted";
        setState(accepted ? "success" : "final");
        setMessage(accepted ? invitation.rsvp.success : invitation.rsvp.final);
        if (
          data.response === "attending" ||
          data.response === "unable_to_attend"
        )
          setChoice(data.response);
      } else {
        setState("error");
        setMessage(
          response.status === 503
            ? invitation.rsvp.unavailable
            : response.status === 404
              ? invitation.rsvp.invalid
              : invitation.rsvp.error,
        );
      }
    } catch {
      if (!isCurrent()) return;
      setState("error");
      setMessage(invitation.rsvp.error);
    } finally {
      clearTimeout(timeout);
      if (version === requestVersion.current) {
        submitting.current = false;
        activeRequest.current = null;
      }
    }
  }
  return (
    <form
      onSubmit={submit}
      className="reply-form"
      aria-describedby="rsvp-policy"
      aria-busy={state === "loading"}
    >
      <p className="pending-label">TEKS PRATINJAU · MENUNGGU PERSETUJUAN</p>
      <fieldset disabled={state === "loading" || final}>
        <legend>{invitation.rsvp.question}</legend>
        {(
          [
            ["attending", "Attending"],
            ["unable_to_attend", "Unable to Attend"],
          ] as const
        ).map(([value, label]) => (
          <label className="response-option" key={value}>
            <input
              type="radio"
              name="attendance"
              value={value}
              checked={choice === value}
              onChange={() => setChoice(value)}
              required
            />
            <span className="selection-mark" aria-hidden="true" />
            <span>{label}</span>
          </label>
        ))}
      </fieldset>
      <p id="rsvp-policy" className="supporting">
        {invitation.rsvp.note}
      </p>
      {!token && <p className="supporting">{invitation.rsvp.missing}</p>}
      <button
        className="submit-button"
        disabled={!token || !choice || state === "loading" || final}
        type="submit"
      >
        {state === "loading"
          ? "MENGIRIM…"
          : final
            ? "JAWABAN DITERIMA"
            : "KIRIM JAWABAN"}
      </button>
      <p className="form-status" role="status" aria-live="polite">
        {message}
      </p>
      <noscript>
        <p>Aktifkan JavaScript untuk mengirim RSVP melalui tautan pribadi.</p>
      </noscript>
    </form>
  );
}

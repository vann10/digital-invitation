import { cookies } from "next/headers";
import { operatorUser, privateHeaders, supabase } from "@/lib/backend";
import { csvCell } from "@/lib/rsvp-core";
export async function GET() {
  try {
    const token = (await cookies()).get("operator_session")?.value;
    if (!token || !(await operatorUser(token)))
      return Response.json(
        { error: "unauthorized" },
        { status: 401, headers: privateHeaders },
      );
    const rows: string[] = ["guest_name,response,submitted_at"];
    for (let offset = 0; ; offset += 500) {
      const response = await supabase(
        `/rest/v1/invitees?select=id,display_name,responses(response,submitted_at)&order=id.asc&limit=500&offset=${offset}`,
      );
      if (!response.ok) throw new Error("unavailable");
      const guests = await response.json();
      if (!Array.isArray(guests)) throw new Error("unavailable");
      for (const guest of guests) {
        const response = Array.isArray(guest.responses)
          ? guest.responses[0]
          : guest.responses;
        rows.push(
          [
            guest.display_name,
            response?.response || "pending",
            response?.submitted_at || "",
          ]
            .map(csvCell)
            .join(","),
        );
      }
      if (guests.length < 500) break;
    }
    return new Response("\uFEFF" + rows.join("\r\n"), {
      headers: {
        ...privateHeaders,
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": 'attachment; filename="rsvp.csv"',
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch {
    return Response.json(
      { error: "unavailable" },
      { status: 503, headers: privateHeaders },
    );
  }
}

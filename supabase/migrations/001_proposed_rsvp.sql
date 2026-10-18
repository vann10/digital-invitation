-- PROPOSAL / PENDING ACCEPTANCE. Apply only to a reviewed development project.
begin;
create table public.invitees (
  id uuid primary key default gen_random_uuid(),
  display_name text not null check (length(display_name) between 1 and 200),
  token_hash text not null unique check (token_hash ~ '^[a-f0-9]{64}$'),
  expires_at timestamptz not null,
  revoked_at timestamptz,
  created_at timestamptz not null default now()
);
create table public.responses (
  invitee_id uuid primary key references public.invitees(id),
  response text not null check (response in ('attending','unable_to_attend')),
  submitted_at timestamptz not null default now()
);
alter table public.invitees enable row level security;
alter table public.responses enable row level security;
revoke all on public.invitees, public.responses from public, anon, authenticated;
grant select, insert, update on public.invitees to service_role;
grant select, insert on public.responses to service_role;
revoke update, delete on public.responses from service_role;

create function public.prevent_response_revision() returns trigger
language plpgsql set search_path = '' as $$
begin raise exception 'Accepted responses are final'; end;
$$;
create trigger response_is_final before update or delete on public.responses
for each row execute function public.prevent_response_revision();

create function public.submit_invitation_response(p_token_hash text, p_response text)
returns jsonb language plpgsql security definer set search_path = '' as $$
declare guest public.invitees%rowtype; accepted public.responses%rowtype;
begin
  if p_response is null or p_response not in ('attending','unable_to_attend') then
    return jsonb_build_object('status','invalid_invitation');
  end if;
  select * into guest from public.invitees where token_hash = p_token_hash for update;
  if not found or guest.revoked_at is not null or guest.expires_at <= now() then
    return jsonb_build_object('status','invalid_invitation');
  end if;
  select * into accepted from public.responses where invitee_id = guest.id;
  if found then return jsonb_build_object('status','already_submitted','response',accepted.response); end if;
  insert into public.responses(invitee_id,response) values(guest.id,p_response);
  return jsonb_build_object('status','accepted','response',p_response);
end;
$$;
revoke all on function public.submit_invitation_response(text,text) from public, anon, authenticated;
revoke all on function public.prevent_response_revision() from public, anon, authenticated;
grant execute on function public.submit_invitation_response(text,text) to service_role;
commit;

import { contact } from "@/data/contact";

const FROM = process.env.CONTACT_FROM_EMAIL ?? "Pinnacle Construction <onboarding@resend.dev>";
const TO = process.env.CONTACT_TO_EMAIL ?? contact.email;

function clean(value, max) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function escapeHtml(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function POST(request) {
  let payload;
  try {
    payload = await request.json();
  } catch {
    return Response.json({ error: "Could not read that request." }, { status: 400 });
  }

  const name = clean(payload.name, 120);
  const phone = clean(payload.phone, 20);
  const email = clean(payload.email, 160);
  const project = clean(payload.project, 120);
  const date = clean(payload.date, 20);
  const message = clean(payload.message, 2000);

  if (!name || !phone || !email) {
    return Response.json({ error: "Name, phone, and email are all required." }, { status: 400 });
  }
  if (!/^\S+@\S+\.\S+$/.test(email)) {
    return Response.json({ error: "That email address doesn't look right." }, { status: 400 });
  }
  if (!/^[0-9+\s-]{10,15}$/.test(phone)) {
    return Response.json({ error: "Enter a 10-digit mobile number we can reach you on." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    // No mail credential configured. Fail loudly rather than reporting a success
    // that never reaches the inbox; the form shows the phone/WhatsApp fallback.
    console.error("[contact] RESEND_API_KEY is not set, site visit request was not sent");
    return Response.json({ error: "Our booking system is offline right now." }, { status: 503 });
  }

  const rows = [
    ["Name", name],
    ["Phone", phone],
    ["Email", email],
    ["Project", project || "Not specified"],
    ["Preferred date", date || "Not specified"],
    ["Message", message || "None"],
  ];

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM,
        to: [TO],
        reply_to: email,
        subject: `Site visit request: ${name}${project ? ` — ${project}` : ""}`,
        text: rows.map(([label, value]) => `${label}: ${value}`).join("\n"),
        html: `<h2>New site visit request</h2><table cellpadding="6">${rows
          .map(([label, value]) => `<tr><td><strong>${label}</strong></td><td>${escapeHtml(value)}</td></tr>`)
          .join("")}</table>`,
      }),
    });

    if (!response.ok) {
      console.error("[contact] Resend rejected the request", response.status, await response.text());
      return Response.json({ error: "We couldn't send that just now." }, { status: 502 });
    }
  } catch (error) {
    console.error("[contact] Resend request failed", error);
    return Response.json({ error: "We couldn't reach our booking system." }, { status: 502 });
  }

  return Response.json({ ok: true });
}

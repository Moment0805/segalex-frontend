import { NextResponse } from "next/server";
import { timingSafeEqual } from "node:crypto";

export async function POST(request: Request) {
  const expectedPassword = process.env.PROTOTYPE_PASSWORD;
  if (!expectedPassword) {
    return NextResponse.json({ error: "Password gate is not configured." }, { status: 503 });
  }

  let submittedPassword: unknown;
  try {
    const body = await request.json();
    submittedPassword = body?.password;
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (typeof submittedPassword !== "string") {
    return NextResponse.json({ error: "Enter the access password." }, { status: 400 });
  }

  const submitted = Buffer.from(submittedPassword);
  const expected = Buffer.from(expectedPassword);
  const isValid = submitted.length === expected.length && timingSafeEqual(submitted, expected);

  if (!isValid) {
    return NextResponse.json({ error: "Incorrect access password." }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set("proto_pass", expectedPassword, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  return response;
}

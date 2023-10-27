import { getToken } from "next-auth/jwt";

export async function GET(req) {
  const secret = process.env.NEXTAUTH_SECRET;
  const token = await getToken({ req, secret });

  return Response.json({ token });
}

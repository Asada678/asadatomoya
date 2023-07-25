import "server-only";
import { UserSchema } from "asadatomoya-common/models";
import { db } from "asadatomoya-common/utils/db";

export async function POST(req: Request) {
  const body = await req.json();

  const { username, password, regUser } = UserSchema.parse(body);

  await db.user.create({
    data: {
      username,
      password,
      regUser: "asada",
    },
  });

  return new Response("OK");
}

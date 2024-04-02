import { eq } from "drizzle-orm";
import db from "../db";
import { router, publicProcedure } from "../trpc";
import { z } from "zod";
import { saltcheck } from "./saltcheck";

import { CompactSign } from "jose";

let key = new TextEncoder().encode(
    "cc7e0d44fd473002f1c42167459001140ec6389b7353f8088f4d9a95f2f596f2"
  ),
  expire_after = 3600 * 24 * 5;

function moment() {
  return Math.floor(Date.now() / 1000);
}

export const authRouter = router({
  sign: publicProcedure
    .input(
      z.strictObject({
        username: z.string().regex(/^[a-zA-Z0-9_]{2,16}$/gm),
        password: z.string().regex(/^[a-f0-9]{64}$/gm),
      })
    )
    .query(async ({ input: { username, password } }) => {
      let q = await db.query.authme.findFirst({
        where: (users, { eq }) => eq(users.username, username.toLowerCase()),
        with: {
          password: true,
        },
      });
      if (!q) return { err: "No user found" };
      if (!(await saltcheck(password, q.password)))
        return { err: "Wrong password" };
      return {
        token: await new CompactSign(
          new TextEncoder().encode(`${moment() + expire_after}`)
        )
          .setProtectedHeader({
            alg: "HS256",
          })
          .sign(key),
      };
    }),
});

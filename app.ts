import { Hono } from "hono";

type Env = {
  Variables: {
    kv: Deno.Kv;
  };
};

type User = {
  "username": string;
  "age": number;
  "like": Array<string>;
};

export function createApp(kv: Deno.Kv) {
  const app = new Hono<Env>()
    .use(async (c, next) => {
      c.set("kv", kv);
      await next();
    })
    .get("/", async (c) => {
      const result = await kv.get<User>(["user"]);
      return c.json(result.value);
    });
  return app;
}

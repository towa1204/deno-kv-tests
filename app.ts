import { Hono } from "hono";

type Env = {
  Variables: {
    kv: Deno.Kv;
  };
};

export function createApp(kv: Deno.Kv) {
  const app = new Hono<Env>();

  app.use(async (c, next) => {
    c.set("kv", kv);
    await next();
  });

  app.get("/", async (c) => {
    const result = await kv.get(["user"]);
    return c.json(result);
  });

  return app;
}

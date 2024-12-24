import { setTestDataFromFile } from "./kv_test_helper.ts";
import { createApp } from "./app.ts";

const kv = await Deno.openKv(":memory:");
await setTestDataFromFile(kv, ["user"], "user.json");

Deno.serve({ port: 8080 }, createApp(kv).fetch);

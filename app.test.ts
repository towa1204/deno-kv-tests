import { afterEach, beforeEach, describe, it } from "@std/testing/bdd";
import { createApp } from "./app.ts";
import { setTestData } from "./kv_test_helper.ts";
import { assertEquals } from "@std/assert";

describe("app get /", () => {
  let kv: Deno.Kv;

  beforeEach(async () => {
    kv = await Deno.openKv(":memory:");
    await setTestData(kv, ["user"], "user.json");
  });

  afterEach(() => {
    kv.close();
  });

  it("レスポンスボディが一致", async () => {
    const app = createApp(kv);
    const res = await app.request("/");

    assertEquals(res.status, 200);

    const json = await res.json();
    console.log(json);
    assertEquals(json.value.username, "taro");
  });
});

import { assertEquals } from "@std/assert";
import { afterEach, beforeEach, describe, it } from "@std/testing/bdd";
import {
  setTestDataFromFile,
  setTestDataFromObject,
  setTestDataMultipleFromObject,
} from "./kv_test_helper.ts";
import { setTestDataMultipleFromFile } from "./kv_test_helper.ts";

const testData = {
  path: "user.json",
  expected: {
    "username": "taro",
    "age": 100,
    "like": [
      "soccer",
      "programming",
    ],
  },
};

describe("setTestDataFromFile", () => {
  let kv: Deno.Kv;

  beforeEach(async () => {
    kv = await Deno.openKv(":memory:");
  });

  afterEach(() => {
    kv.close();
  });

  it("1件セットできる", async () => {
    await setTestDataFromFile(kv, ["user"], testData.path);

    const result = await kv.get(["user"]);
    assertEquals(result.value, testData.expected);
  });
});

describe("setTestDataFromObject", () => {
  let kv: Deno.Kv;

  beforeEach(async () => {
    kv = await Deno.openKv(":memory:");
  });

  afterEach(() => {
    kv.close();
  });

  it("1件セットできる", async () => {
    await setTestDataFromObject(kv, ["user"], testData.expected);

    const result = await kv.get(["user"]);
    assertEquals(result.value, testData.expected);
  });
});

describe("setTestDataMultipleFromFile", () => {
  let kv: Deno.Kv;

  beforeEach(async () => {
    kv = await Deno.openKv(":memory:");
  });

  afterEach(() => {
    kv.close();
  });

  it("1件セットできる", async () => {
    await setTestDataMultipleFromFile(kv, [{
      key: ["user"],
      fileName: testData.path,
    }]);

    const result = await kv.get(["user"]);
    assertEquals(result.value, testData.expected);
  });

  it("複数件セットできる", async () => {
    await setTestDataMultipleFromFile(kv, [
      {
        key: ["user"],
        fileName: testData.path,
      },
      {
        key: ["user", "taro"],
        fileName: testData.path,
      },
    ]);

    const result = await kv.get(["user"]);
    assertEquals(result.value, testData.expected);

    const result2 = await kv.get(["user", "taro"]);
    assertEquals(result2.value, testData.expected);
  });
});

describe("setTestDataMultipleFromObject", () => {
  let kv: Deno.Kv;

  beforeEach(async () => {
    kv = await Deno.openKv(":memory:");
  });

  afterEach(() => {
    kv.close();
  });

  it("1件セットできる", async () => {
    await setTestDataMultipleFromObject(kv, [{
      key: ["user"],
      object: testData.expected,
    }]);

    const result = await kv.get(["user"]);
    assertEquals(result.value, testData.expected);
  });

  it("複数件セットできる", async () => {
    await setTestDataMultipleFromObject(kv, [
      {
        key: ["user"],
        object: testData.expected,
      },
      {
        key: ["user", "taro"],
        object: testData.expected,
      },
    ]);

    const result = await kv.get(["user"]);
    assertEquals(result.value, testData.expected);

    const result2 = await kv.get(["user", "taro"]);
    assertEquals(result2.value, testData.expected);
  });
});

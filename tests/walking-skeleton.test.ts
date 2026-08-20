import assert from "node:assert/strict";
import test from "node:test";

import { parseInstrument } from "../src/contracts.ts";
import worker from "../src/app.ts";

test("qualified fixture flows through the API contract", async () => {
  const response = await worker.fetch(new Request("https://richtide.test/api/instruments/HK-00700"));
  assert.equal(response.status, 200);
  const payload = parseInstrument(await response.json());
  assert.deepEqual(payload, {
    canonicalId: "HK-00700",
    symbol: "00700",
    legalName: "腾讯控股有限公司",
    exchange: "香港交易所",
    currency: "HKD",
    instrumentType: "普通股",
    observedAt: "2026-08-20T08:00:00.000Z",
    price: 559.5,
    dataState: "fixture"
  });
});

test("instrument contract rejects malformed data", () => {
  assert.throws(() => parseInstrument({ canonicalId: "HK-00700", price: "559.5" }), /Invalid Instrument/);
});

test("request-to-render page exposes identity, time, price, and fixture notice", async () => {
  const response = await worker.fetch(new Request("https://richtide.test/instruments/HK-00700"));
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /腾讯控股有限公司/);
  assert.match(html, /559\.50 HKD/);
  assert.match(html, /2026年8月20日.*16:00.*香港时间/);
  assert.match(html, /演示数据，不用于投资决策/);
  assert.match(html, /viewport/);
});

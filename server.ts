import { Hono } from "https://deno.land/x/hono@v3.1.6/mod.ts";
import { serve } from 'https://deno.land/std/http/server.ts'

const app = new Hono()

const denokv = await Deno.openKv();
denokv.listenQueue(async (msg: unknown) => {
  console.log({ msg })
});

app.all("/", async (c) => {

  await denokv.enqueue("bar-1",);
  await denokv.enqueue("bar-2", { delay: 5 * 60_000 });
  await denokv.enqueue("bar-3", { delay: 10 * 60_000 });

  return c.json({ data: "pushed to queue" })
})

Deno.serve(app.fetch)


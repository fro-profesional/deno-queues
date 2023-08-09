import { HandlerContext } from "$fresh/server.ts";

const denokv = await Deno.openKv();

export const handler = async (_req: Request, _ctx: HandlerContext): Response => {
  await denokv.enqueue("bar-1",);
  await denokv.enqueue("bar-2", { delay: 5 * 60_000 });
  await denokv.enqueue("bar-3", { delay: 10 * 60_000 });
  const body = {
    data: "enqueue"
  }
  return new Response(JSON.stringify(body))
};

const RUN_ID_HEADER = "X-Lovable-AIG-Run-ID";

export function createLovableAiGatewayRunIdFetch(initialRunId?: string | null) {
  const state: { runId: string | null } = { runId: initialRunId ?? null };

  const wrapped: typeof fetch = async (input, init) => {
    const headers = new Headers(init?.headers);
    if (state.runId) headers.set(RUN_ID_HEADER, state.runId);
    const response = await fetch(input, { ...init, headers });
    const returned = response.headers.get(RUN_ID_HEADER);
    if (returned) state.runId = returned;
    return response;
  };

  return {
    fetch: wrapped,
    get runId() {
      return state.runId;
    },
  };
}

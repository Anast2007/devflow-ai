const BASE_URL = "/api";

export async function runAgentPipeline(requirement, language) {
  const res = await fetch(`${BASE_URL}/agent/run`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ requirement, language }),
  });

  if (!res.ok) {
    let message = `Request failed with status ${res.status}`;
    try {
      const data = await res.json();
      if (data?.error) message = data.error;
    } catch {
      // ignore JSON parse errors on failure responses
    }
    throw new Error(message);
  }

  return res.json();
}

export async function checkHealth() {
  try {
    const res = await fetch(`${BASE_URL}/health`);
    if (!res.ok) return { status: "error", liveMode: false };
    return res.json();
  } catch {
    return { status: "unreachable", liveMode: false };
  }
}

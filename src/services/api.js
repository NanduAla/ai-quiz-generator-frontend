const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export async function generateQuiz(url) {
  const res = await fetch(`${BACKEND_URL}/generate_quiz`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url }),
  });
  if (!res.ok) {
    let errorMessage = `HTTP error! Status: ${res.status}`;
    try { errorMessage = (await res.json()).detail || errorMessage; } catch {}
    throw new Error(errorMessage);
  }
  return res.json();
}

export async function getQuizHistory() {
  const res = await fetch(`${BACKEND_URL}/history`);
  if (!res.ok) throw new Error(`Failed to fetch history: ${res.status}`);
  return res.json();
}

export async function getSingleQuiz(id) {
  const res = await fetch(`${BACKEND_URL}/quiz/${id}`);
  if (!res.ok) throw new Error(`Failed to fetch quiz ID ${id}`);
  return res.json();
}

const API_URL = (
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api"
).trim();

const handleResponse = async (res) => {
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.message || "Request failed");
  }
  return data;
};

export const signupRequest = async (payload) => {
  const res = await fetch(`${API_URL}/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    const message = data.message || data.error || "Request failed";
    throw new Error(message);
  }

  return res.json();
};

export const loginRequest = async (payload) => {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return handleResponse(res);
};

export const getRoadmapRequest = async (token) => {
  const res = await fetch(`${API_URL}/roadmap/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return handleResponse(res);
};

export const getNoteRequest = async (token, stepId) => {
  const res = await fetch(`${API_URL}/notes/${stepId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return handleResponse(res);
};

export const saveNoteRequest = async (token, stepId, content) => {
  const res = await fetch(`${API_URL}/notes/${stepId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ content }),
  });
  return handleResponse(res);
};

export const updateNoteRequest = async (token, stepId, content) => {
  const res = await fetch(`${API_URL}/notes/${stepId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ content }),
  });
  return handleResponse(res);
};

export const updateStepStatusRequest = async (token, stepId, status) => {
  const res = await fetch(`${API_URL}/roadmap/step/${stepId}/status`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ status }),
  });
  return handleResponse(res);
};

export const askAIRequest = async (token, payload) => {
  const res = await fetch(`${API_URL}/ai/ask`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  return handleResponse(res);
};

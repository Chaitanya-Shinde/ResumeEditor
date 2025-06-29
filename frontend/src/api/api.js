const API_URL = import.meta.env.VITE_API_URL;

// Enhance a section with AI (mocked by backend)
export const aiEnhance = async (section, content) => {
  const res = await fetch(`${API_URL}/ai-enhance`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ section, content }),
  });
  // Returns: { enhanced_content: "✨ Enhanced Version of ..."}
  return res.json();
};

// Save the resume (returns {message, resume_id})
export const saveResume = async (resume) => {
  const res = await fetch(`${API_URL}/save-resume`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ resume }),
  });
  return res.json();
};

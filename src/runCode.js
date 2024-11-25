import axios from "axios";

// API Key
const RAPID_API_KEY = "cd139ddf63mshcfdbdcbac2b35eap11f422jsnfcee69eba82f";

// Map languages to Judge0 language IDs
export const getLanguageId = (lang) => {
  const languageMap = {
    javascript: 63, // JavaScript
    python: 71, // Python 3
    "text/x-java": 62, // Java
    "text/x-csrc": 50, // C
    "text/x-c++src": 54, // C++
    "text/x-csharp": 51, // C#
    ruby: 72, // Ruby
  };

  return languageMap[lang] || 63; // Default to JavaScript
};

// Function to submit code and get submission ID
export const runCode = async (code, languageId) => {
  try {
    const options = {
      method: "POST",
      url: "https://judge0-ce.p.rapidapi.com/submissions",
      params: { base64_encoded: "false", fields: "*" },
      headers: {
        "x-rapidapi-key": RAPID_API_KEY,
        "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
        "Content-Type": "application/json",
      },
      data: {
        language_id: languageId,
        source_code: code,
        stdin: "", // Add input if needed
      },
    };

    const response = await axios.request(options);
    return response.data; // Return submission details
  } catch (error) {
    console.error("Error executing code:", error);
    return { output: "Error executing code" };
  }
};

// Function to fetch submission results
export const getSubmissionResult = async (submissionId) => {
  try {
    const options = {
      method: "GET",
      url: `https://judge0-ce.p.rapidapi.com/submissions/${submissionId}`,
      headers: {
        "x-rapidapi-key": RAPID_API_KEY,
        "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
      },
    };

    const response = await axios.request(options);
    return response.data; // Return result details
  } catch (error) {
    console.error("Error fetching result:", error);
    return null;
  }
};

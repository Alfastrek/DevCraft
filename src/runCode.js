import axios from "axios";

const RAPID_API_KEY = process.env.REACT_APP_RAPIDAPI_KEY; // Use the environment variable

export const getLanguageId = (lang) => {
  const languageMap = {
    javascript: 63, // JavaScript
    python: 71, // Python 3
    "text/x-csrc": 50, // C
    "text/x-c++src": 54, // C++
    "text/x-csharp": 51, // C#
    ruby: 72, // Ruby
  };

  return languageMap[lang] || 63; // Default to JavaScript if not found
};

// Function to run code and get the submission ID
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
        stdin: "", // If you have any input, you can provide it here
      },
    };

    const response = await axios.request(options);
    return response.data; // Return the submission result
  } catch (error) {
    console.error("Error executing code:", error);
    return { output: "Error executing code" };
  }
};

// Function to poll the Judge0 API and get the submission result
export const getSubmissionResult = async (submissionId) => {
  const options = {
    method: "GET",
    url: `https://judge0-ce.p.rapidapi.com/submissions/${submissionId}`,
    headers: {
      "x-rapidapi-key": process.env.REACT_APP_RAPIDAPI_KEY,
      "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.error("Error fetching result:", error);
    return null;
  }
};

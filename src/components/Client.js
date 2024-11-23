import React, { useEffect, useState } from "react";

// Function to generate a consistent hash from the username
const generateAvatarIndex = (username) => {
  let hash = 0;
  for (let i = 0; i < username.length; i++) {
    hash = (hash << 5) - hash + username.charCodeAt(i);
  }
  return (Math.abs(hash) % 12) + 1; // Ensure it's between 1 and 12 for avatars s1.png to s12.png
};

const Client = ({ username }) => {
  const [avatarIndex, setAvatarIndex] = useState(null);

  useEffect(() => {
    const storedAvatarIndex = sessionStorage.getItem(username);

    if (storedAvatarIndex) {
      setAvatarIndex(storedAvatarIndex); // Use stored avatar index
    } else {
      const newAvatarIndex = generateAvatarIndex(username);
      setAvatarIndex(newAvatarIndex);
      sessionStorage.setItem(username, newAvatarIndex); // Store it in sessionStorage
    }
  }, [username]);

  if (avatarIndex === null) return null; // Wait until the avatarIndex is assigned

  // Construct the avatar URL based on the avatar index
  const avatarUrl = `/iconpack/s${avatarIndex}.png`;

  return (
    <div className="client">
      <img
        src={avatarUrl}
        alt={username || "Guest"}
        className="avatar"
        style={{
          borderRadius: "14px",
          width: 50,
          height: 50,
          border: "2px solid #ddd",
          boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
        }}
      />
      <span className="userName">{username || "Guest"}</span>
    </div>
  );
};

export default Client;

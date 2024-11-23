import React from "react";

const Client = ({ username }) => {
  // Generate a random RoboHash avatar based on username or a random string
  const avatarUrl = `https://robohash.org/${
    username || Math.random().toString(36).substring(2, 15)
  }?set=set2&size=50x50`;

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

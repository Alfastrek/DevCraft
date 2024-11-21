import React, { useState } from "react";
import Client from "../components/Client";
import Editor from "../components/Editor";

const Editorpage = () => {
  const [clients, setClients] = useState([
    { socketId: 1, username: "aradhya" },
    { socketId: 2, username: "alfastrek" },
  ]);

  return (
    <div className="mainWrap">
      <div className="aside">
        <div className="asideInner">
          <div className="logo">
            <img
              className="logoImage"
              src="/devcrafttext.png"
              alt="devcraft logo"
            />
          </div>
          <hr className="customHrDashed" />
          <h3 className="liveStatus">You are Live!</h3>
          <hr className="customHrDashed" />
          <div className="clientsList">
            {clients.map((client) => (
              <Client key={client.socketId} username={client.username} />
            ))}
          </div>
        </div>
        <hr className="customHrGradient" />
        <button className="copyBtn">Copy Room ID</button>
        <button className="leaveBtn">Leave</button>
      </div>
      <div className="editorwrap">
        <Editor />
      </div>
    </div>
  );
};

export default Editorpage;

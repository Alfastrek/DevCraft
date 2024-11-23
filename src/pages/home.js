/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const [roomId, setroomId] = useState("");
  const [username, setUsername] = useState("");
  const createNewRoom = (e) => {
    e.preventDefault();
    const id = uuidv4();
    setroomId(id);
    toast.success("Created a new room");
  };

  const joinRoom = () => {
    if (!roomId || !username) {
      toast.error("ROOM ID & username is required");
      return;
    }

    // Redirect
    navigate(`/editor/${roomId}`, {
      state: {
        username,
      },
    });
  };

  const handleInputEnter = (e) => {
    if (e.code === "Enter") {
      joinRoom();
    }
  };
  return (
    <div className="homePageWrapper">
      <div className="formWrapper">
        <div className="boxshadow">
          <img
            className="homepagelogo"
            src="/devcraftwithbg.png"
            alt="Devcraft Logo"
          />
        </div>
        <h4 className="mainLabel">
          Enter your <em>Invite</em> Room ID
        </h4>
        <div className="inputGroup">
          <input
            type="text"
            className="inputBox"
            placeholder="Paste your Room ID or Generate one"
            onChange={(e) => setroomId(e.target.value)}
            value={roomId}
            onKeyUp={handleInputEnter}
          />
          <input
            type="text"
            className="inputBox"
            placeholder="Set your Username"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            onKeyUp={handleInputEnter}
          />
          <button className="btn joinBtn" onClick={joinRoom}>
            Start!
          </button>
          <span className="createInfo">
            No invite?&nbsp;
            <a onClick={createNewRoom} href="#" className="createNewBtn">
              Generate Room!
            </a>
          </span>
        </div>
      </div>
      <footer>
        <h4>
          Built by Aradhya Shukla.&nbsp;
          <a href="https://github.com/alfastrek">GitHub</a>
        </h4>
      </footer>
    </div>
  );
};

export default Home;

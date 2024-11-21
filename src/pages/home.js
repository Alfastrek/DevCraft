import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-hot-toast";
const Home = () => {
  const [roomid, setRoomid] = useState("");
  const [username, setUsername] = useState("");

  const createNewRoom = (e) => {
    e.preventDefault();
    const id = uuidv4();
    setRoomid(id);
    toast.success("New Room Created Successfully!");
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
        <h4 className="mainLabel">Invite Room ID</h4>
        <div className="inputGroup">
          <input
            type="text"
            className="inputBox"
            placeholder="ROOM ID"
            onChange={(e) => setRoomid(e.target.value)}
            value={roomid}
          />
          <input
            type="text"
            className="inputBox"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
          <button className="btn joinBtn">Start!</button>
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
          Built by Aradhya Shukla @
          <a href="https://github.com/alfastrek">Github</a>
        </h4>
      </footer>
    </div>
  );
};

export default Home;

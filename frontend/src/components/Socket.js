import React, { useState, useEffect } from "react";
// import io from "socket.io-client";
import socketIOClient from "socket.io-client";
import Navbar from "./navbar";

import moment from "moment";
// import userGen from "username-generator";
import { Button, Input } from "reactstrap";
// const socket = io("http://localhost:4000", {
//   transports: ["websocket", "polling"]
// });
const ENDPOINT = "http://127.0.0.1:4000";
const socket = socketIOClient(ENDPOINT);
function Socket(props) {
  const [user, setUser] = useState({
    usersList: null
  });
  const [msg, setMsg] = useState("");
  const [recMsg, setRecMsg] = useState({
    listMsg: []
  });
  const [loggedUser, setLoggedUser] = useState();

  useEffect(() => {
    // subscribe a new user

    socket.emit("login", props.user.user.username);
    // list of connected users
    socket.on("users", data => {
      setUser({ usersList: JSON.parse(data) });
    });
    // get the logged user
    socket.on("connecteduser", data => {
      setLoggedUser(JSON.parse(data));
    });

    // we get the messages
    socket.on("getMsg", data => {
      let listMessages = recMsg.listMsg;
      listMessages.push(JSON.parse(data));
      setRecMsg({ listMsg: listMessages });
    });
  }, []);
  const disconect = name => {
    // e.preventDefault();

    socket.emit("disconect", name);

    socket.disconnect();
  };
  // to send a message
  const sendMessage = () => {
    socket.emit("sendMsg", JSON.stringify({ id: loggedUser.id, msg: msg }));
    setMsg("");

    setMsg("");
  };

  return (
    <div>
      <Navbar disconect={disconect} />
      <div className="table22">
        <div className="tableNames ">
          <h3> Active users: {user.usersList?.length} </h3>
          <table className="connect">
            <thead>
              <tr>
                <th> User name </th>
                <th> Connection Date </th>
              </tr>
            </thead>
            <tbody>
              {user.usersList?.map(user => {
                return (
                  <tr key={user.id}>
                    <td> {user.userName} </td>
                    <td> {user.connectionTime} </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <div className="messageChat2">
        {/* <h3 className="d-flex justify-content-center">
          {" "}
          Hi, ! Start a new conversation
        </h3> */}
        <p>
          This is a place where you can meet new people who share your ideas and
          views
        </p>
        <p>Join our chat now</p>
        <div className="messageChat">
          <h3 id="chatH" className="d-flex justify-content-center">
            {" "}
            Messanger
          </h3>
          <div id="chat">
            {recMsg.listMsg ? (
              recMsg.listMsg?.map((msgInfo, index) => {
                return (
                  <div id="newCh" key={index}>
                    {" "}
                    <b>{msgInfo.userName} </b> : {msgInfo.msg}{" "}
                    <small
                      style={{
                        marginLeft: "18px",
                        color: "blue",
                        marginTop: "5px"
                      }}
                    >
                      {" "}
                      {msgInfo.time}{" "}
                    </small>{" "}
                  </div>
                );
              })
            ) : (
              <div>No new messages yet</div>
            )}
          </div>
        </div>
        <div id="messText" className="d-flex justify-content-center">
          <textarea
            style={{
              display: "inline",
              width: "800px",
              height: "80px",
              padding: "10px",
              textAlign: "left",
              width: "100%"
            }}
            id="inputmsg"
            value={msg}
            onChange={event => setMsg(event.target.value)}
          />
          <Button
            className="btn"
            id="btnmsg"
            onClick={() => {
              sendMessage();
            }}
          >
            {" "}
            Send{" "}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Socket;

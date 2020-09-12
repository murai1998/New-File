import React, { useState, useEffect } from "react";
// import io from "socket.io-client";
import socketIOClient from "socket.io-client";
import Navbar from "./navbar";

import moment from "moment";
import userGen from "username-generator";
import { Button, Input } from "reactstrap";
// const socket = io("http://localhost:4000", {
//   transports: ["websocket", "polling"]
// });
const ENDPOINT = "http://127.0.0.1:4000";
const socket = socketIOClient(ENDPOINT);
function Socket(props) {
  //   const [state, setState] = useState({
  //     message: "",
  //     name: props.user.user.username,
  //     users: []
  //   });
  //   const [chat, setChat] = useState([]);

  //   useEffect(() => {
  //     socket.on("message", ({ name, message }) => {
  //       setChat([...chat, { name, message }]);
  //     });
  //   });

  //   const onTextChange = e => {
  //     setState({ ...state, [e.target.name]: e.target.value });
  //   };

  //   const onMessageSubmit = e => {
  //     e.preventDefault();
  //     const { name, message, users } = state;
  //     socket.emit("message", { name, message });
  //     users.push(name);
  //     console.log("users", name);
  //     setState({ message: "", name });
  //   };

  //   const renderChat = () => {
  //     console.log("Name", props.user.user.username);
  //     return chat.map(({ name, message }, index) => (
  //       <div key={index}>
  //         <h3>
  //           {name}: <span>{message}</span>
  //         </h3>
  //       </div>
  //     ));
  //   };

  //   return (
  //     <div>
  //       <Navbar />
  //       {props.user.user.username}
  //       <div className="card">
  //         <form onSubmit={onMessageSubmit}>
  //           <h1>Messanger</h1>
  //           <div className="render-chat">
  //             <h1>Chat Log</h1>
  //             {renderChat()}
  //           </div>

  //           <div>
  //             <h2>Active users</h2>
  //             <p></p>
  //           </div>
  //           <div>
  //             <textarea
  //               name="message"
  //               onChange={e => onTextChange(e)}
  //               value={state.message}
  //               variant="outlined"
  //               label="Message"
  //             />
  //           </div>
  //           <button>Send Message</button>
  //         </form>
  //       </div>
  //     </div>
  //   );

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
    socket.emit("login", userGen.generateUsername());
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

  // to send a message
  const sendMessage = () => {
    socket.emit("sendMsg", JSON.stringify({ id: loggedUser.id, msg: msg }));
  };
  return (
    <div>
      <h3 className="d-flex justify-content-center">
        {" "}
        Connected users : {user.usersList?.length}{" "}
      </h3>
      <table className="table">
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
      <h3 className="d-flex justify-content-center">
        {" "}
        User : {loggedUser?.userName}{" "}
      </h3>
      <div style={{ borderStyle: "inset" }}>
        <h2 className="d-flex justify-content-center"> Chat </h2>
        {recMsg.listMsg?.map((msgInfo, index) => {
          return (
            <div className="d-flex justify-content-center" key={index}>
              {" "}
              <b>{msgInfo.userName} </b> : {msgInfo.msg}{" "}
              <small
                style={{ marginLeft: "18px", color: "blue", marginTop: "5px" }}
              >
                {" "}
                {msgInfo.time}{" "}
              </small>{" "}
            </div>
          );
        })}
      </div>
      <div className="d-flex justify-content-center">
        <Input
          style={{ width: "300px", display: "inline" }}
          id="inputmsg"
          onChange={event => setMsg(event.target.value)}
        />
        <Button
          className="btn btn-info"
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
  );
}

export default Socket;

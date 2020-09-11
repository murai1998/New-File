import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import Navbar from "./navbar";

import moment from "moment";

const socket = io.connect("http://localhost:4000");
function Socket(props) {
  const username = props.user.user.username;

  console.log("userName", username);
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on("connect", () => {
      socket.emit("username", username);
    });

    socket.on("users", users => {
      setUsers(users);
    });

    socket.on("message", message => {
      setMessages(messages => [...messages, message]);
    });

    socket.on("connected", user => {
      setUsers(users => [...users, user]);
    });

    socket.on("disconnected", name => {
      setUsers(users => {
        return users.filter(user => user.name !== name);
      });
    });
  }, []);

  const submit = event => {
    event.preventDefault();
    socket.emit("send", message);
    setMessage("");
  };
  console.log("MESS", messages);
  return (
    <div>
      {" "}
      <Navbar />
      <div className="container">
        <div className="row">
          <div className="col-md-12 mt-4 mb-4">
            <h6>Hello {username}</h6>
          </div>
        </div>
        <div className="row">
          <div className="col-md-8">
            <h6>Messages</h6>

            <div id="messages">
              {messages.map(({ user, date, text }, index) => (
                <div key={index} className="row mb-2">
                  <div className="col-md-3">
                    {moment(date).format("h:mm:ss a")}
                  </div>
                  {user !== undefined ? (
                    <div className="col-md-2">{user.name}</div>
                  ) : (
                    ""
                  )}

                  <div className="col-md-2">{text}</div>
                </div>
              ))}
            </div>
            <form onSubmit={submit} id="form">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  onChange={e => setMessage(e.currentTarget.value)}
                  value={message}
                  id="text"
                />
                <span className="input-group-btn">
                  <button id="submit" type="submit" className="btn btn-primary">
                    Send
                  </button>
                </span>
              </div>
            </form>
          </div>
          <div className="col-md-4">
            <h6>Users</h6>
            <ul id="users">
              {/* {users.map(({ name, id }) => (
                <li key={id}>{name}</li>
              ))} */}
              {messages.map(({ user, date, text }, index) => (
                <li key={user}>{user}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );

  //   const [state, setState] = useState({
  //     message: "",
  //     name: props.user.user.username
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
  //     const { name, message } = state;
  //     socket.emit("message", { name, message });
  //     console.log(name, message);
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

  //       <div className="card">
  //         <form onSubmit={onMessageSubmit}>
  //           <h1>Messanger</h1>
  //           <div className="render-chat">
  //             <h1>Chat Log</h1>
  //             {renderChat()}
  //           </div>

  //           <div>
  //               <h2>Active users</h2>
  //               <p></p>
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
}

export default Socket;

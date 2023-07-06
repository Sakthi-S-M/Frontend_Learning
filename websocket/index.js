// WebSocket connection
const WebSocket = require("ws");
const socket = new WebSocket("ws://localhost:3000");

// Event listener for name input
window.addEventListener("load", () => {
  userName = prompt("Enter your name:");
});

// WebSocket event listeners
socket.addEventListener("open", () => {
  console.log("Connected to WebSocket server.");
});

socket.addEventListener("message", (event) => {
  const message = event.data;

  if (message === "typing") {
    displayMessage(`${userName} is typing...`);
  } else if (message === "stopped typing") {
    displayMessage(`${userName} stopped typing.`);
  } else {
    displayMessage(message);
  }
});

socket.addEventListener("close", () => {
  console.log("Disconnected from WebSocket server.");
});

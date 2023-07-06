const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 3000 });
const typingStatus = {};
wss.on("connection", function (ws, request) {
  const username = request.url.substring(1);
  console.log(`WebSocket connection established for user: ${username}`);

  ws.on("message", function (data) {
    const message = JSON.parse(data);

    if (message.type === "chat") {
      broadcastMessage(ws, message.text, message.username);
    } else if (message.type === "typing") {
      handleTypingIndicator(ws, message.username, message.isTyping);
    }
  });

  ws.on("close", function () {
    console.log(`WebSocket connection closed for user: ${username}`);
    handleTypingIndicator(ws, username, false);
  });
});

function broadcastMessage(sender, message, username) {
  wss.clients.forEach(function (client) {
    if (client !== sender && client.readyState === WebSocket.OPEN) {
      const data = {
        type: "chat",
        text: message,
        username: username,
      };
      client.send(JSON.stringify(data));
    }
  });
}

function handleTypingIndicator(sender, username, isTyping) {
  typingStatus[username] = isTyping;

  wss.clients.forEach(function (client) {
    if (client !== sender && client.readyState === WebSocket.OPEN) {
      const data = {
        type: "typing",
        username: username,
        isTyping: isTyping,
      };
      client.send(JSON.stringify(data));
    }
  });
}


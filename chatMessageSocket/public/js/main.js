const socket = io();

function render(data) {
  const messagesHtml = data
    .map((elem, index) => {
      return `
      <div class="message">
        <strong>${elem.author}</strong>
        <em>${elem.message}</em>
      </div>
    `;
    })
    .join("");
  document.getElementById("messages").innerHTML = messagesHtml;
}

socket.on("messages", function (data) {
  render(data);
});

function addMessage(e) {
  const author = document.getElementById("username").value;
  const message = document.getElementById("texto").value;
  socket.emit("new-message", { author, message });
  return false;
}

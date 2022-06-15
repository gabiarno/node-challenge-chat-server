setInterval(() => {
  fetch("/messages")
    .then((response) => response.json())
    .then((messages) => {
      console.log("messages", messages);
      let messagesDiv = document.getElementById("see-messages");
      messagesDiv.textContent = "";
      let ulElement = document.createElement("ul");
      messages.forEach((message) => {
        let liElement = document.createElement("li");
        liElement.textContent = `${message.from}: ${message.text}`;
        ulElement.append(liElement);
      });
      messagesDiv.append(ulElement);
    });
}, 1000);



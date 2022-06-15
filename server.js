const express = require("express");
const cors = require("cors");
const bp = require('body-parser');
const path = require('path');

const app = express();

app.use(cors());
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

const welcomeMessage = {
  id: 0,
  from: "Bart",
  text: "Welcome to CYF chat system!",
};

let nextId = 1;

//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.
let messages = [welcomeMessage];

app.get("/", function (request, response) {
  response.sendFile(__dirname + "/index.html");
});

app.post("/messages", function (request, response) {
    console.log(request.body);
    const {from, text} = request.body;
    if (from && text) {
      const newMessage = {
        id: nextId++,
        from: from,
        text: text,
      };
  
      messages.push(newMessage);
  
      response.sendFile(__dirname + "/index.html");
      
    } else {
      response.sendStatus(400);
    }
   // response.sendStatus(201);
})

app.get("/messages", function (request, response) {
  
  response.json(messages);

  
})

app.listen(3000, () => {
   console.log("Listening on port 3000")
  });

  app.get("/messages/:id", function (request, response) {
    console.log(request.params.id);
    const id = request.params.id;
    const message = messages.filter(message => message.id == id);
    console.log("message", message);
    response.json(message);
    
  });

  app.delete("/messages/:id", function (request, response) {
    const id = request.params.id;
    const afterDelete = messages.filter(message => message.id != id);
    messages = afterDelete;
    response.json(messages);
  })


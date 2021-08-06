const express = require("express");

const app = new express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let messages = [
    {
        username: "Aiden",
        message: "Hello!"
    },
    {
        username: "Bob",
        message: "lol"
    }
]

app.get("/messages", (req, res) => {
    res.status(200).send(messages)
})

app.post("/messages/post", (req, res) => {
    messages.push(req.body)
    console.log(messages)
    res.status(200).send(messages);
})

app.listen(4000, () => console.log("Server running on 4000"));
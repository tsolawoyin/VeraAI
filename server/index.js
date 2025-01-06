const express = require("express");
const parseInt = require("./parseIntReloaded");
const cors = require("cors");
const app = express(); // creates an express application for us

// middlewares
app.use(cors()); // nice and easy. this is to allow cross-origin resource sharing...
app.use(express.json()); // this is to allow express parse the body of a request more accurately and correctly.
// it's working as expected. Thank you.

// Let's have some list of predefined greetings here
const greetings = [
    "Hi, I'm VeraAI. Enter any number in words and I will magically turn it into digits.",
    "Hi. I'm VeraAI. I'm here to help you convert words to digits"
]

app.get("/", (request, response) => {
    response.json(greetings);
})

app.post("/parse", (request, response) => {
    // I expect an json object with just one field, sentence.
    let body = request.body;

    try {
        let calc = parseInt.parseInt(body.sentence);
        // it doesn't even matter. whatever the result is, it's ok
        response.json({val: calc});
    } catch (err) {
        console.log(err);
        response.status(500).end(); // no need to explain anything sef...
    }
})

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Listening at port ${PORT}`); // nice and easy.
})
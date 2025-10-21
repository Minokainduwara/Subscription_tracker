import express from "express";
const app = express();

//Create an API
app.get("/", (req, res) => {
    res.send("Welcome to the EOS App");
})


app.listen(3000,() =>{
    console.log("Listening on port 3000: http://localhost:3000");
});

export default app;
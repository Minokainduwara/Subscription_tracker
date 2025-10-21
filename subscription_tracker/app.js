import express from "express";
const app = express();
import { PORT } from "./config/env.js";

//Create an API
app.get("/", (req, res) => {
    res.send("Welcome to the EOS App");
})


app.listen(3000,() =>{
    console.log(`Listening on port : http://localhost:${ PORT }`);
});

export default app;
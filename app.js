import express from "express";
import bodyParser from "body-parser";
import router from "./Routes/users.js";
import cors from "cors";

const app = express();

const PORT = 3000;
app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded());

app.use("/users", router);

app.get("/", (req, res) => {
  res.send("Hello from homepage");
});

app.listen(PORT, () => {
  console.log("Server is Running on http://localhost:3000/");
});

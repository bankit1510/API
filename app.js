import express from "express";
import bodyParser from "body-parser";
import router from "./Routes/users.js";
import cors from "cors";
import * as OpenApiValidator from "express-openapi-validator";

const app = express();

const PORT = 3000;
app.use(
  OpenApiValidator.middleware({
    apiSpec: ".././openApi.json",
    validateRequests: true, // (default)
    validateResponses: true, // false by default
  })
);
app.use((err, req, res, next) => {
  // format error
  res.status(err.status || 500).json({
    message: err.message,
    errors: err.errors,
  });
});

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

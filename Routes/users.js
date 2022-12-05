import express from "express";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";
import e from "express";

const router = express.Router();

let users = [];
fs.readFile(".././data.json", (err, data) => {
  if (err) {
    console.log(err);
  } else {
    users = JSON.parse(data);
  }
});

router.get("/", (req, res) => {
  // fs.readFile(".././data.json", (err, data) => {
  //   if (err) {
  //     console.log(err);
  //   } else {
  //     users = JSON.parse(data);
  //     res.send(users);
  //   }
  // });
  res.send(users);
});

router.post("/", (req, res) => {
  const user = req.body;

  const userWithID = {
    ...user,
    id: uuidv4(),
  };
  users.push(userWithID);
  let json = JSON.stringify(users);

  fs.writeFile(".././data.json", json, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("\nFile Contents pushed");
    }
  });

  res.send("User Data Pushed");
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  const foundUser = users.find((user) => user.id === id);
  res.send(foundUser);
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  users = users.filter((user) => user.id !== id);
  let json = JSON.stringify(users);
  fs.writeFile(".././data.json", json, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("\nFile Contents pushed using patch");
    }
  });
  res.send(`User with id ${id} deleted`);
});

//Patch is for updating directly if doesn't exist then return error

router.patch("/:id", (req, res) => {
  const { id } = req.params;
  const { FName, LName, Age } = req.body;
  const user = users.find((user) => user.id === id);
  if (FName) user.FName = FName;
  if (LName) user.LName = LName;
  if (Age) user.Age = Age;
  let json = JSON.stringify(users);
  fs.writeFile(".././data.json", json, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("\nFile Contents pushed using patch");
    }
  });
  res.send(`user with ${id} has been updated`);
});
export default router;

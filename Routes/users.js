import express from "express";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";

const router = express.Router();

let users = [];
// Reading the file in global scope
fs.readFile(".././data.json", (err, data) => {
  if (err) {
    console.log(err);
  } else {
    users = JSON.parse(data);
  }
});
// Getting the user data
router.get("/", (req, res) => {
  res.send(users);
});
// Adding data to the file
router.post("/", (req, res) => {
  const user = req.body;
  if (user.FName == null || user.LName == null || user.Age == null) {
    res.send("Please enter valid data");
  } else {
    const userWithID = {
      ...user,
      id: uuidv4(),
    };
    users.push(userWithID);
    res.send("User Data Pushed");
  }
  let json = JSON.stringify(users);

  fs.writeFile(".././data.json", json, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("\nFile Contents pushed");
    }
  });
});
// to get the details about the specific  id
router.get("/:id", (req, res) => {
  const { id } = req.params;
  const foundUser = users.find((user) => user.id === id);
  res.send(foundUser);
});
// To delete the user
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

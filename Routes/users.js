import express from "express";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";
import validator from "validator";

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

//Getting the data from file

router.get("/", (req, res) => {
  res.send(users);
});
// Adding data to the file
router.post("/", (req, res) => {
  const user = req.body;
  if (
    !validator.isAlpha(user.fName) ||
    !validator.isAlpha(user.lName) ||
    !Number.isInteger(user.age)
  ) {
    res.send("Please enter valid data");
  } else {
    const userWithID = {
      ...user,
      id: uuidv4(),
    };
    res.send(`User Data Pushed with id ${userWithID.id}`);
    users.push(userWithID);
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
  const { fName, lName, age } = req.body;
  const user = users.find((user) => user.id === id);
  if (fName) user.fName = fName;
  if (lName) user.lName = lName;
  if (age) user.age = age;
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

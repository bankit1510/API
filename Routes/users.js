import express from 'express'
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
const router = express.Router();

const users =[
 
]

router.get('/',(req,res)=>{
    res.send(users)
})

router.post('/',(req,res)=>{
    const user = req.body;
    
    const userWithID={
        ...user,
        id:uuidv4()
    }
    users.push(userWithID)
    
    fs.appendFile("../data.json", JSON.stringify(userWithID), (err) => {
        if (err) {
          console.log(err);
        }
        else {
          console.log("\nFile Contents of file after append:")
        }
      });
      
  
    res.send("User Data Pushed")
})

router.get('/:id',(req,res)=>{
    const {id}=req.params;
    const foundUser=users.find((user)=>user.id===id);
    res.send(foundUser)
})

router.delete('/:id',(req,res)=>{
    const {id}=req.params;
    users=users.filter((user)=>user.id===id);
    res.send(`User with id ${id} deleted`)
})

export default router;
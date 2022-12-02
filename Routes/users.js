import express from 'express'
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
const router = express.Router();

let users =[
 
]

router.get('/',(req,res)=>{
  fs.readFile('.././data.json',(err,data)=>{
    if(err){
        console.log(err)
    }
    else{
      users=JSON.parse(data)
        res.send(users)
    }
})
    // res.send(users)
})

router.post('/',(req,res)=>{
    const user = req.body;
    
    const userWithID={
        ...user,
        id:uuidv4()
    }
    users.push(userWithID)
    let json = JSON.stringify(users)
    
    fs.writeFile(".././data.json", json, (err) => {
        if (err) {
          console.log(err);
        }
        else {
          console.log("\nFile Contents pushed")
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
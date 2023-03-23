const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const events = require("../models/events");
const users = require("../models/users");



// Route 1 : Register a User for events
router.post('/register/:eid',fetchuser,
    async (req,res)=>{
    try{
      const updatedUserEventList = await users.findOneAndUpdate(
        { _id: req.user.id }, 
        { $addToSet: { 
                revents: req.params.eid
            } 
        },
        {new:true})
        res.json(updatedUserEventList);

    } catch (error){
        console.error(error.message);
        res.status(500).send("Internal Server error");
    }
})


//Route 2 : Unregister a user from a event
router.put('/unregister/:eid',fetchuser,
    async (req,res)=>{
    try{
       const updatedUserEventList = await users.findOneAndUpdate(
        { _id: req.user.id },
        {
            $pull: {
                revents : req.params.eid
            }
        },
        {new:true})
        res.json(updatedUserEventList);

    } catch (error){
        console.error(error.message);
        res.status(500).send("Internal Server error");
    }
})

// Route 3: Fetch all events that user is registered for
router.get('/getevents',fetchuser,
    async (req,res)=>{
    try{
        let allEvents = [];
        const curruser = await users.findById(req.user.id);
        for(const id of curruser.revents){
            const event = await events.find({eid:id});
            allEvents.push(event[0]);    
        }
        // you can write this function in this way also - dont use foreach loop in this case
        // we need to await for all the promises to resolve
        //  await Promise.all(
        //     curruser.revents.map(async (id)=>{
        //         const event = await events.find({eid:id});
        //         allEvents.push(event[0]);    
        //     })
        //  )
        res.send(allEvents);
    } catch (error){
        console.error(error.message);
        res.status(500).send("Internal Server error");
    }
})



module.exports = router
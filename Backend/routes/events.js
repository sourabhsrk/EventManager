const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const events = require("../models/events");
const { body, check, validationResult } = require("express-validator");

// Route 1 : get all the events
router.get('/fetchallevents',
    async (req,res)=>{
    try{
        const allevents = await events.find();
        res.json(allevents);
    } catch (error){
        console.error(error.message);
        res.status(500).send("Internal Server error");
    }
})

// Route 2 : get all the events that user created
router.get('/fetchUserEvents',fetchuser,
    async (req,res)=>{
    try{
        const myevents = await events.find({user: req.user.id});
        res.json(myevents);
    } catch (error){
        console.error(error.message);
        res.status(500).send("Internal Server error");
    }
})

// Route 3 : get all the events category vise
router.get('/fetchevents/:tag',
    async (req,res)=>{
    try{
        const tagevents = await events.find({tag: req.params.tag});
        res.json(tagevents);
    } catch (error){
        console.error(error.message);
        res.status(500).send("Internal Server error");
    }
})

// Route 4 : adding notes for a user
router.post('/addevent',fetchuser,
    [
        check("eid","Enter a valid event id")
        .isNumeric()
        .custom(id=>{
            return events.exists({eid:id}).then(event => {
                if (event) {
                  return Promise.reject('Event already registered');
                }
              })
        }),                
        body("title", "Enter a valid title").isLength({ min: 3 }),
        body("tag", "Enter a valid category").isLength({ min: 2 }),
        body("venue", "Enter a valid venue").isLength({ min: 3 }),
        body("dateTime", "Enter a valid date and time").matches(/(\d{2})-(\d{2})-(\d{4}) (\d{2}):(\d{2})/),
        body("description", "description should be atleast contains 5 char").isLength({ min: 5 })
    ],
    async (req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
    }   
    try{
        const {eid,title,tag,venue,dateTime,description} = req.body;
        const addedevent = new events({
            eid,title,tag,venue,dateTime,description,user:req.user.id
        })
        const savedevent = await addedevent.save();
        res.json(savedevent);

    } catch (error){
        console.error(error.message);
        res.status(500).send("Internal Server error");
    }
})

// Route 3 : updating notes for a user
router.put('/updateEvent/:eid',fetchuser,
    async (req,res)=>{
    try{
       const {title,tag,venue,dateTime,description} = req.body;
        // create a new objet for newevent
        const newevent = {};
        if(title){newevent.title = title};
        if(venue){newevent.venue = venue};
        if(dateTime){newevent.dateTime = dateTime};
        if(description){newevent.description = description};
        if(tag){newevent.tag = tag};

        // find the event by id, match with given user id and update it
        const event = await events.find({eid: req.params.eid});
        if(!event){return res.status(404).send("Not found any events for given id")};

        if(event[0].user.toString() !== req.user.id){
            return res.status(401).send("Not allowed");
        }

        let updatedevent = await events.findByIdAndUpdate(event[0]._id,{$set: newevent},{new:true});
        res.json(updatedevent);

    } catch (error){
        console.error(error.message);
        res.status(500).send("Internal Server error");
    }
})

// Route 4 : deleting events for a user
router.delete('/deleteEvent/:eid',fetchuser,
    async (req,res)=>{
    let success = false;
    try{
        // find the note by id, match with given user id and delete it
        const event = await events.find({eid: req.params.eid});
        if(!event){return res.status(404).send("Not found any events for given id")};
        //checking if logged in user is deleting his own notes
        if(event[0].user.toString() !== req.user.id){
            return res.status(401).send("Not allowed");
        }

        let deletedevent= await events.findByIdAndDelete(event[0]._id);
        success = true;
        res.json({"Message" : "Event has been deleted successfully" , deletedevent , success});

    } catch (error){
        console.error(error.message);
        res.status(500).send("Internal Server error");
    }
})

module.exports = router
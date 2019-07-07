const express = require("express")
const router = express.Router();
const { check, validationResult } = require('express-validator/check')
const User = require("../models/User")
const Contact = require("../models/Contact")
const auth = require("../middleware/auth")

// @ route    GET api/contacts
// @desc      Get all users contacts
// @access    Private
router.get("/", auth, async (req, res) => {
    try {
        const contacts = await Contact.find({user: req.user.id}).sort({date: -1})
        res.json(contacts)
    }
    catch (err) {
        console.error(err)
        res.status(500).send("Sever Error")
    }
});

// @ route    POST api/auth
// @desc      Add new contact
// @access    Private
router.post("/", auth, [
    check("name", "Name is required").not().isEmpty()
], async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const {name, email, phone, type} = req.body;

    try {
        const newContact = new Contact({
            name, email, phone, type, user: req.user.id
        })
        const contact = await newContact.save()
        res.json(contact)
    }
    catch (err) {
        console.error(err)
        res.status(500).send("Sever Error")
    }
});

// @ route    PUT api/contacts/:id
// @desc      Update contact
// @access    Private
router.put("/:id", auth, async (req, res) => {
    // Object Destructuring and property shorthand (https://stackoverflow.com/questions/17781472/how-to-get-a-subset-of-a-javascript-objects-properties)
    const contactFields = (({name, email, phone, type}) => ({name, email, phone, type}))(req.body)
    Object.keys(contactFields).forEach((key) => (contactFields[key] == null) && delete contactFields[key]);

    try {
        let contact = await Contact.findById(req.params.id);
        if (!contact) return res.status(404).json({msg: "Contact not found"});
        //contact.user is of type object
        if (contact.user.toString() !== req.user.id) return res.status(401).json({msg: "Not authorized"})

        contact = await Contact.findByIdAndUpdate(req.params.id,
            {$set: contactFields},
            {new: true})
        res.json(contact)
    }
    catch (err) {
        console.error(err)
        res.status(500).send("Sever Error")
    }
});


// @ route    DELETE api/auth
// @desc      Delete contact
// @access    Private
router.delete("/:id", auth, async (req, res) => {
    try {
        let contact = await Contact.findById(req.params.id);
        if (!contact) return res.status(404).json({msg: "Contact not found"});
        //contact.user is of type object
        if (contact.user.toString() !== req.user.id) return res.status(401).json({msg: "Not authorized"})

        await Contact.findByIdAndRemove(req.params.id)
        res.json({msg: "Contact deleted"})
    }
    catch (err) {
        console.error(err)
        res.status(500).send("Sever Error")
    }
});

module.exports = router;
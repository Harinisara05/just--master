import express from "express";
import Contact from "../models/contact.js";





const router = express.Router();
router.use(express.json());


router.get("/", async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.status(200).json(contacts);
  } 
  
  catch (error) {
    res.status(500).json({ message: error.message });
  }
});






router.post("/", async (req, res) => {
  const contact = new Contact(req.body);
  try {
    await contact.save();
    res.status(201).json(contact);
  } 
  
  
  catch (error) {
    res.status(400).json({ message: error.message });
  }
});








router.delete("/:id", async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Contact deleted successfully!" });
  } 
  
  catch (error) {
    res.status(500).json({ message: error.message });
  }
});









export default router;

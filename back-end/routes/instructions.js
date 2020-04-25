const router = require("express").Router();
const Instrcution = require("../models/Instruction");

// Create new Instrcution
router.post("/", async (req, res) => {
    const { text } = req.body.instruction;

    const newInstruction = new Instrcution();
    newInstruction.text = text;

    try {
        const instruction = await newInstruction.save();
        res.status(201).json({ instruction });
    } catch (err) {
        res.status(500).send("Server Error");
    }
});

module.exports = router;

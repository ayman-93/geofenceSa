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

// Get all Instruction
router.get("/", async (req, res) => {
    try {
        const instructions = await Instrcution.find();

        if (instructions.length === 0) {
            return res
                .status(404)
                .json({ message: "There are no instructions." });
        }

        res.status(200).json({ instructions });
    } catch (err) {
        res.status(500).send("Server Error");
    }
});

// Delete Instruction by id
router.delete("/:id", async (req, res) => {
    try {
        const instruction = await Instrcution.findById(req.params.id);

        if (!instruction) {
            return res.status(404).json({ message: "Instruction not found" });
        }

        await instruction.remove();

        res.json({ message: "Instrcution removed successfully" });
    } catch (err) {
        res.status(500).send("Server Error");
    }
});

module.exports = router;

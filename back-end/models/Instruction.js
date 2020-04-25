const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const instructionSchema = new Schema({
    text: {
        type: String,
        required: true
    }
});

const Instruction = mongoose.model("instruction", instructionSchema);

module.exports = Instruction;

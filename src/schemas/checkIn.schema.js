const mongoose = require("mongoose");

const checkInSchema = new mongoose.Schema(
     {
        cusId: {type: mongoose.Schema.Types.ObjectId, ref: "customers"},
        createAt: {type: Date, default: Date.now},
        roomId: {type: mongoose.Schema.Types.ObjectId, ref: "rooms"}
     },
     { collection: "checkIn" }
);

module.exports = mongoose.model("checkIn", checkInSchema);

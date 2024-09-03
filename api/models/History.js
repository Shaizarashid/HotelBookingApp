import mongoose from "mongoose";

const HistorySchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    hotelId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Hotel",
        required: true
    },
    roomId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Room",
        required: true
    },
    roomNumbers: [{
        type: mongoose.Schema.Types.Mixed, // Use Mixed type to store an array of objects
        required: true
    }],
    dates: [{ type: Date }], // Dates the user chose to book the room on
    totalPrice: {
        type: Number,
        required: true
    },
    status:{
        type: Boolean,
        default: false
    }
}, { timestamps: true });

export default mongoose.model("History", HistorySchema);

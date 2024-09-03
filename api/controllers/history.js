import History from "../models/History.js";
import mongoose from "mongoose";
import Hotel from "../models/Hotels.js";

export const getHistory = async (req, res) => {
  try {
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    const userObjectId = new mongoose.Types.ObjectId(userId);

    const histories = await History.find({ userId: userObjectId })
      .populate({
        path: 'hotelId',
        select: 'name',
        model: Hotel
      })
      .exec();

    // Transform the history entries to include roomNumbers and status
    const transformedHistories = histories.map(history => ({
      ...history.toObject(),
      roomNumbers: history.roomNumbers.map(room => room.number), // Map room numbers to their number field
      status: Boolean(history.status) // Ensure status is a boolean
    }));

    res.json(transformedHistories);
  } catch (err) {
    console.error('Error fetching history:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

export const updateStatus = async (req, res) => {
  try {
    const { userId, roomId } = req.body;

    if (!userId || !roomId) {
      return res.status(400).json({ message: 'User ID and Room ID are required' });
    }

    const userObjectId = new mongoose.Types.ObjectId(userId);
    const roomObjectId = new mongoose.Types.ObjectId(roomId);

    const history = await History.findOneAndUpdate(
      { userId: userObjectId, roomId: roomObjectId },
      { status: true },
      { new: true }
    );

    if (!history) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    res.json({ message: 'Payment status updated successfully', history });
  } catch (err) {
    console.error('Error updating payment status:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
}
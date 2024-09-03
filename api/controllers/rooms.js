import Room from "../models/Room.js"
import Hotel from "../models/Hotels.js"
import History from "../models/History.js";
import { createError } from "../utils/error.js"

export const createRoom = async (req,res,next) =>{
    const hotelId = req.params.hotelid
    const newRoom = new Room(req.body)

    try{
        const savedRoom = await newRoom.save()
        try{
            await Hotel.findByIdAndUpdate(hotelId, {
                $push: {rooms: savedRoom._id},

            })
        }catch(err){
            next(err)
        }

        res.status(200).json(savedRoom)
    }catch (err){
        next(err)
    }
}

export const updateRoom = async(req, res, next) =>{
    try{
        const updatedRoom = await Room.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true})
        res.status(200).json(updatedRoom)
    } catch (err){
        next(err)
    }
}

export const deleteRoom = async (req, res, next) => {
    const hotelId = req.params.hotelid;
    try {
      await Room.findByIdAndDelete(req.params.id);
      try {
        await Hotel.findByIdAndUpdate(hotelId, {
          $pull: { rooms: req.params.id },
        });
      } catch (err) {
        next(err);
      }
      res.status(200).json("Room has been deleted.");
    } catch (err) {
      next(err);
    }
  }

export const getRoom = async(req, res, next) =>{
    try{
        const room = await Room.findById(req.params.id)
        res.status(200).json(room)
    } catch (err){
        next(err)
    }
}

export const getRooms = async(req, res, next) =>{
    //const failed = true;
    //if (failed) return next(createError(404, "Not found!"));

    try{
        const rooms = await Room.find()
        res.status(200).json(rooms)
    } catch (err){
        next(err)
    }
}

const getDatesInRange = (startDate, endDate) => {
  let dates = [];
  let currentDate = new Date(startDate);
  const end = new Date(endDate);

  while (currentDate <= end) {
      dates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
  }

  return dates;
};

/*export const updateRoomAvailability = async (req, res, next) => {
    /*try {
      await Room.updateOne(
        { "roomNumbers._id": req.params.id },
        {
          $push: {
            "roomNumbers.$.unavailableDates": req.body.dates
          },
        }
      );
      res.status(200).json("Room status has been updated.");
    } catch (err) {
      next(err);
    }
      const { id } = req.params; // Room ID
      const { dates, userId, hotelId, totalPrice } = req.body; // Booking details
  
      try {
          // Update room availability
          await Room.updateOne(
              { "roomNumbers._id": id },
              {
                  $push: {
                      "roomNumbers.$.unavailableDates": {
                          $each: dates // Push the selected booking dates into unavailableDates
                      }
                  }
              }
          );
  
          // Create history entry
          const historyEntry = new History({
              userId,
              hotelId,
              roomId: id,
              dates, // Dates the user chose to book the room
              totalPrice
          });
  
          await historyEntry.save();
  
          res.status(200).json("Room status has been updated and booking history recorded.");
      } catch (err) {
          next(err);
      }  
    
  }*/

      export const updateRoomAvailability = async (req, res, next) => {
        try {
            const { id } = req.params;
            const roomId = id;
            const { dates, userId, hotelId, totalPrice, selectedRooms } = req.body;
    
            // Validate the input data
            if (!dates || !Array.isArray(dates) || !userId || !hotelId || !totalPrice || !selectedRooms) {
                return res.status(400).json({ message: "Invalid request data" });
            }
    
            // Update room availability
            const updateResult = await Room.updateOne(
                { "roomNumbers._id": roomId },
                {
                    $push: {
                        "roomNumbers.$.unavailableDates": { $each: dates }
                    }
                }
            );
    
            if (updateResult.nModified === 0) {
                return res.status(404).json({ message: "Room not found" });
            }
    
            // Create a history entry
            const historyEntry = new History({
                userId,
                hotelId,
                roomId,
                roomNumbers: selectedRooms.map(roomId => ({ _id: roomId })), // Include roomNumbers
                dates,
                totalPrice
            });
    
            // Save history entry to the database
            await historyEntry.save();
    
            res.status(200).json("Room status has been updated and history has been recorded.");
        } catch (err) {
            console.error('Error updating room availability and saving history:', err);
            res.status(500).json({ message: "Internal Server Error", error: err.message });
        }
    };
    
      

const eventModel = require("../model/eventSchema");
const fs = require("fs");
const cloudinary = require("../cloudinary/cloudinary");

module.exports = {
  addAnEvent: async (req, res) => {

    let url = "";

    const { title, category, description, date, Ticketprice, maximumSeats } =
      req.body;

     const eventId = req.params.id;

     const organizerId = req.params.organizerId

    const uploader = async (path) => await cloudinary.uploads(path, "images");
    if (req.method == "POST") {
      const files = req.file;

      console.log("files",files)

        const { path } = files;

        const newPath = await uploader(path);

        url = newPath;

        fs.unlinkSync(path);
      

      const event = new eventModel({
        title,
        category,
        description,
        date,
        Ticketprice,
        maximumSeats,
        image:url,
        venue:eventId,
        createdBy:organizerId,
      });
      await event.save();
      res.status(200).json({
        status: "success",
        message: "Event created succesfully",
        data: event,
      });
    } else {
      res.status(400).json({
        err: " image not uploaded",
      });
    }
  },
  getAlleventByOrganizer: async (req, res) => {
    const id = req.params.id;

    const jobsByorganizer = await eventModel.find({ createdBy: id });

    return res.status(200).json({
      message: "success",
      data: jobsByorganizer,
    });
  },
};

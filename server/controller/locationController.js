const Location = require("../model/Location");
const { getUserNameFromJWT } = require("../middleware/auth");

// Get all location from database
exports.getUserLocations = async (req, res) => {
  try {
    const locations = await Location.find({});
    res.status(200).send(locations);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching locations", error: error.message });
  }
};

// Get one location by location ID
exports.getLocationById = async (req, res) => {
  const { LOCATION_ID } = req.params;

  try {
    const location = await Location.findOne({ _id: LOCATION_ID });

    if (!location) {
      res.status(400).send("Failed to find the location");
    } else {
      res.status(200).send(location);
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching location", error: error.message });
  }
};

// Upload location
exports.postUserLocations = async (req, res) => {
  const customLocation = req.body;

  customLocation.creator = getUserNameFromJWT(req.cookies.jwt);

  /*
  customLocation.coordinates = [customLocation.latitude, customLocation.longitude]
  delete customLocation.latitude
  delete customLocation.longitude
  */

  console.log("upload location", customLocation);

  try {
    await Location.create(customLocation);
    res.status(200).json({
      success: true,
      message: `Added Location ${customLocation.activityName}`,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error saving location", error: error.message });
  }
};

// Delete location by location ID
exports.deleteUserLocations = async (req, res) => {
  const { postIdToDelete } = req.body;

  try {
    await Location.deleteOne({ id: postIdToDelete });
    res
      .status(200)
      .json({ success: true, message: `Deleted Location ${postIdToDelete}` });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting location", error: error.message });
  }
};

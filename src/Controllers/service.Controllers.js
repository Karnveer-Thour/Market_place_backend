const { serviceModel } = require("../Models");

// Controller to create service
const create = async (req, res) => {
  try {
    const Service = await serviceModel.insertOne({
      ...req.body,
      Service_provider_id: req.userID,
    });
    res.status(201).json({
      success: true,
      message: "Service created successfully",
      Details: Service,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: err.message,
    });
  }
};

// Get all created Services of same user
const getServices = async (req, res) => {
  try {
    let Services = await serviceModel.find({ Service_provider_id: req.userID}).populate('Service_provider_id');
    if (Services.length === 0) {
      return res.status(404).send({ reason: "No Services found" });
    }
    res.status(200).json({
      success: true,
      message: "All Services found successfully",
      Details: Services,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: err.message,
    });
  }
};

//Get Service by particular id
const get = async (req, res) => {
  try {
    if (!req.query.id) {
      return res.status(401).send({ reason: "id not found" }).populate('Service_provider_id');
    }
    const Service = await serviceModel.findOne({
      _id: req.query.id,
      Service_provider_id: req.userID,
    }).populate('Service_provider_id');
    if (!Service) {
      return res.status(404).send({ reason: "No Service found" });
    }
    res.status(200).json({
      success: true,
      message: "Service found successfully",
      Details: Service,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: err.message,
    });
  }
};

//Update a particular Service
const update = async (req, res) => {
  try {
    if (!req.query.id) {
      return res.status(401).send({ reason: "id not found" });
    }
    const Service = await serviceModel.findOneAndUpdate(
      {
        _id: req.query.id,
        Service_provider_id: req.userID,
      },
      req.body,
      { new: true }
    );
    if (!Service) {
      return res.status(404).send({ reason: "No Service found" });
    }
    res.status(200).json({
      success: true,
      message: "Service updated successfully",
      Details: Service,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: err.message,
    });
  }
};

//Delete a particular Service
const remove = async (req, res) => {
  try {
    if (!req.query.id) {
      return res.status(401).send({ reason: "id not found" });
    }
    const Service = await serviceModel.findOneAndDelete({
      _id: req.query.id,
      Service_provider_id: req.userID,
    });
    if (!Service) {
      return res.status(404).send({ reason: "No Service found" });
    }
    res.status(200).json({
      success: true,
      message: "Service Deleted successfully",
      Details: Service,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: err.message,
    });
  }
};
module.exports = {
  create,
  getServices,
  get,
  update,
  remove,
};

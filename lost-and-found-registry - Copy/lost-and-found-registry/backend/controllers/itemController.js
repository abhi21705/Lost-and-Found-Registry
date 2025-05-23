const Item = require('../models/Item');

const createItem = async (req, res) => {
  try {
    const { itemName, description, lostLocation, ownerContact } = req.body;

    const newItem = new Item({ itemName, description, lostLocation, ownerContact });
    const savedItem = await newItem.save();

    res.status(201).json(savedItem);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
};

module.exports = { createItem };
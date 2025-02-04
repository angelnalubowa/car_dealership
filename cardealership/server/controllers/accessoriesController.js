const getAccessories = (req, res) => {
  res.status(200).json({ message: 'Get accessories' });
};

const addAccessory = (req, res) => {
  res.status(201).json({ message: 'Add accessory' });
};

module.exports = { getAccessories, addAccessory };
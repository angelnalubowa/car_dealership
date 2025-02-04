const getSales = (req, res) => {
  res.status(200).json({ message: 'Get sales' });
};

const addSale = (req, res) => {
  res.status(201).json({ message: 'Add sale' });
};

module.exports = { getSales, addSale };
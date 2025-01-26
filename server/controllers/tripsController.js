const getTrips = (req, res) => {
  res.status(200).json({ message: 'Get trips' });
};

const addTrip = (req, res) => {
  res.status(201).json({ message: 'Add trip' });
};

module.exports = { getTrips, addTrip };
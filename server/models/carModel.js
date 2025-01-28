const mongoose = require("mongoose");

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/listings", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define Schemas
const carSchema = new mongoose.Schema({
  id: String,
  model: String,
  price: Number,
  status: String,
});

const Car = mongoose.model("Car", carSchema);

// Example for fetching cars
app.get("/cars", async (req, res) => {
  const cars = await Car.find();
  res.json(cars);
});

app.post("/cars", async (req, res) => {
  const newCar = new Car({ id: generateId(), ...req.body });
  await newCar.save();
  res.status(201).json(newCar);
});

app.delete("/cars/:id", async (req, res) => {
  const { id } = req.params;
  await Car.findOneAndDelete({ id });
  res.status(204).send();
});

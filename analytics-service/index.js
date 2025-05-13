const express = require('express');
const mongoose = require('mongoose');
const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });
const EventSchema = new mongoose.Schema({
  event: String,
  timestamp: Date
});
const Event = mongoose.model('Event', EventSchema);

app.post('/events', async (req, res) => {
  const event = new Event({ ...req.body, timestamp: new Date() });
  await event.save();
  res.status(201).json(event);
});

app.listen(3003, () => console.log('Analytics service running on port 3003'));
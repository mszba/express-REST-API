const express = require('express')
const router = express.Router()
const Subscriber = require('../models/subscriber');
const subscriber = require('../models/subscriber');


// Getting all subs
router.get('/', async (req, res) => {
  try {
    const subscribers = await Subscriber.find()
    res.json(subscribers)
  } catch (err) {
    res.status(500).json({ message: err.message })

  }
})


// Getting one sub
router.get('/:id', getSubscriber, (req, res) => {
  res.send(req.subscriber.name)
})


// Creating one sub
router.post('/', async (req, res) => {
  const subscriber = new Subscriber({
    name: req.body.name,
    subscribedToChannel: req.body.subscribedToChannel
  })

  try {
    const newSubscriber = await subscriber.save();
    res.status(201).json(newSubscriber)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})


// Updating one sub
router.patch('/:id', (req, res) => {

})


// Deleting one sub
router.delete('/:id', (req, res) => {
  res.subscriber
})

async function getSubscriber(req, res, next) {
  let subscriber;
  try {
    subscriber = await Subscriber.findById(req.params.id);
    if (subscriber == null) {
      return res.status(404).json({ message: 'cannot find subscriber' })
    }
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }

  res.subscriber = subscriber;
  next();
}


module.exports = router
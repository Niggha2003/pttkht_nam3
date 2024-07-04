const Flight = require("../../models/orderModels/flight");

const connectCreate = require('../../routes/connect');

const asyncHandler = require("express-async-handler");

// Display list of all flights.
exports.flight_list = asyncHandler(async (req, res, next) => {
  connectCreate.connect();
  
  if(req.query.workerId) {
    const flight_detail = await Flight.find({worker : req.query.workerId}).exec();
    if(!flight_detail) {
      res.json([])
    }else{
      res.json(flight_detail);
    }
  }else{
    const flight_list = await Flight.find({}).exec();
    res.json(flight_list);
  }
});

// Display detail page for a specific flight.
exports.flight_detail = asyncHandler(async (req, res, next) => {
  connectCreate.connect();

  const flight_detail = await Flight.findById(req.params.id).exec();
  res.json(flight_detail);
});

// Display flight create form on GET.
exports.flight_create_get = asyncHandler(async (req, res, next) => {
  res.send(`NOT IMPLEMENTED: flight create GET`);
});

// Handle flight create on POST.
exports.flight_create_post = asyncHandler(async (req, res, next) => {
  connectCreate.connect();

  const flight = new Flight(); 
  flight.airlineName = req.body.airlineName;
  flight.flightNumber = req.body.flightNumber;
  flight.ticketClass = req.body.ticketClass;
  flight.from = req.body.from;
  flight.to = req.body.to;
  flight.time = req.body.time;
  flight.airlineGateway = req.body.airlineGateway;
  flight.flightSeat = req.body.flightSeat;
  flight.worker = req.body.workerId;

  await flight.save();
  res.status(200).send({status: 'create success'})
  
});

// Display flight delete form on GET.
exports.flight_delete_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: flight delete GET");
});

// Handle flight delete on POST.
exports.flight_delete_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: flight delete POST");
});

// Display flight update form on GET.
exports.flight_update_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: flight update GET");
});

// Handle flight update on POST.
exports.flight_update_post = asyncHandler(async (req, res, next) => {
  connectCreate.connect();
  
  const checkOrderExist = await Order.findById(req.params.id).exec();

  if(!checkOrderExist) {
    res.status(404).json({ error: 'ID not exists' });
  }else{
    await Order.updateOne(
      {_id: req.params.id},
      {$set: 
        {
          airlineName : req.body.airlineName,
          flightNumber : req.body.flightNumber,
          ticketClass : req.body.ticketClass,
          from : req.body.from,
          to : req.body.to,
          time : req.body.time,
          airlineGateway : req.body.airlineGateway,
          flightSeat : req.body.flightSeat,
          worker : req.body.worker,
        }
      }
    ).exec();
    res.status(200).send({status: 200})
  }
});

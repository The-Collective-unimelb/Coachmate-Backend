const Coach = require("../models/coach");
const Booking = require("../models/booking");
const Trainee = require("../models/trainee");

exports.bookSession = async (req, res) => {
  if (!USER) {
    res.redirect("/login");
  }
  const athleteId = USER.id;
  const athlete = await Trainee.findById(athleteId);
  const coachId = (await Coach.findOne({ email: req.body.coachEmail }))._id;
  const coach = await Coach.findById(coachId);
  const sessionTime = req.body.sessionTime;
  const sessionDate = req.body.sessionDate;
  const sessionType = req.body.sessionType;
  console.log("athlete: ", athlete);
  console.log("coach", coach);

  const newBooking = new Booking({
    sessionTime: sessionTime,
    sessionDate: sessionDate,
    sessionType: sessionType,
    coach: coachId,
    location: req.body.location,
    price: req.body.price,
    status: "Pending",
  });
  newBooking.trainees.push(athlete);
  await newBooking.save();

  await athlete.bookings.push(newBooking);
  await athlete.save();
  await coach.bookings.push(newBooking);
  await coach.save();
  console.log("booking", newBooking);

  res.sendStatus(200);
};

exports.updateProfile = async (req, res) => {
  const athlete = await Trainee.findById(req.body.id);
  const body = req.body;
  athlete.firstName = body.firstName;
  athlete.lastName = body.lastName;
  athlete.age = body.age;
  athlete.gender = body.gender;
  athlete.password = await bcrypt.hash(body.password, 10);

  if (await Trainee.findOne({ email: body.email })) {
    throw Error("Email is already registered");
  } else {
    athlete.email = body.email;
  }

  await athlete.save();
};

exports.viewBookings = async (req, res) => {
  console.log("In viewBookings user id  = " + USER.id);
  const athleteId = USER.id;
  var book = await Booking.find({
    trainees: { $elemMatch: { _id: athleteId } },
  });

  //console.log(book);

  for (let i = 0; i < book.length; i++) {
    var coachID = book[i].coach;
    console.log(typeof coachID);
    var coach = await Coach.findById(coachID);
    book[i].coachName = coach.firstName;
  }

  //console.log(book);
  res.send(book);
};

exports.cancelBooking = async (req, res) => {
  const athlete = await Coach.findById(USER.id);
  const booking = await athlete.bookings.findById(req.body.bookingId);

  if (booking) {
    booking.status = "Cancelled";
    await booking.save();
  } else {
    throw Error("Cancel failed");
  }
};

let model = require("./../models/bookingModel");
let houseModel = require("./../models/houseModel");
let userModel = require("./../models/userModel");
let AsyncError = require("./../utils/catchAsync");
let appError = require("./../utils/classError");
let stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

//Mpesa
const Mpesa = require("mpesa-api").Mpesa;
//Mpesa Test Credentials
let consumerKey = "g7D4d6nP67wxLLzaq3QkbtNiVeAEMc7X";
let consumerSecret = "yTAzCn6rN8kDtvzV";
let InitiatorPassword = "Safaricom986!";
let BusinessShortCode = 174379;
let InitiatorName = "testapi";
let PassKey = "bfb279f9aa9bdbcf158e97ddXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX";
let phone = 254710664418;
const credentials = {
  clientKey: consumerKey,
  clientSecret: consumerSecret,
  initiatorPassword: InitiatorPassword,
  // securityCredential: PassKey,
  certificatePath: null,
};
const environment = "sandbox";
// create a new instance of the api
const mpesa = new Mpesa(credentials, environment);

//End of Mpesa

//Paypal
const paypal = require("paypal-rest-sdk");

paypal.configure({
  mode: "sandbox", //sandbox or live
  client_id:
    "AeuKv1bLzSu62rivlCgn2TpWwBwfXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  client_secret:
    "EO3x8vGxy84bX_LU5dxvkKdhft7Pe-2cXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
});

//End of paypal

exports.createSession = async function (req, res, next) {
  try {
    let house = await houseModel.findById(req.body.houseID);
    if (!house) {
      return next(new appError("No tour data found in checkout", 404));
    }
    let payment = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      success_url: `${req.protocol}://${req.get("host")}/myhouse`,

      cancel_url: `${req.protocol}://${req.get("host")}/profile`,
      customer_email: req.user.email,
      client_reference_id: house.id,
      line_items: [
        {
          name: req.user.name,
          description:
            "Unihome House Payment. A company of Techkey Cybernetics",
          images: [
            "https://secret-lowlands-84151.herokuapp.com/img/tours/tour-8-cover.jpg",
          ],
          amount: house.price * 100,
          currency: "usd",
          quantity: 1,
        },
      ],
    });

    res.json({
      status: "success",
      data: payment,
    });
  } catch (err) {
    console.log(err);
    res.json({
      status: err,
    });
  }
};

exports.getAllBooking = AsyncError(async function (req, res, next) {
  let bookings = await model.find();
  res.json({
    status: "success",
    response: bookings.length,
    bookings,
  });
});

exports.add = AsyncError(async function (req, res) {
  let newDoc = await model.create(req.body);
  res.status(200).json({ status: "success", data: newDoc });
});

exports.getOne = AsyncError(async function name(req, res, next) {
  let booking = await model.findById(req.params.id);
  res.status(200).json({ status: "successs", booking });
});

exports.delete = AsyncError(async function (req, res, next) {
  let deleted = await model.findOneAndDelete({ _id: req.params.id });
  res.status(204).json({ status: "success", data: null });
});
exports.unbook = AsyncError(async function (req, res, next) {
  //bookingiid, userid

  let currentbooking = await model.findById(req.body.bookingid);

  if (currentbooking.userID == req.body.userid) {
    let currenthouse = await houseModel.findById(currentbooking.houseID);

    currenthouse.isBooked = false;
    await currenthouse.save({ validateBeforeSave: false });

    let deleted = await model.findOneAndDelete({ _id: req.body.bookingid });
    res.status(204).json({ status: "success", data: null });
  } else {
    res.status(200).json({ status: "failed" });
  }
});
exports.update = AsyncError(async function (req, res, next) {
  let updated = await model.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: true,
    runvalidators: true,
  });
  res.status(200).json({ status: "success", data: updated });
});

async function createBooking(session) {
  let buffer = await userModel.find({
    email: session.customer_email,
  });
  let user = buffer[0].id;
  let houseID = session.client_reference_id;
  let price = session.amount_total / 100;

  await model.create({
    userID: user,
    houseID,
    paymentMethod: "Stripe",
    amount: price,
  });
}

exports.receiveWebhook = async function (req, res, next) {
  try {
    let signature = req.headers["stripe-signature"];
    let event = stripe.webhooks.constructEvent(
      req.body,
      signature,
      process.env.WEBHOOK_SECRETE
    );

    if (event.type == "checkout.session.completed") {
      await createBooking(event.data.object);
    }

    res.status(200).json({ status: "received", event });
  } catch (err) {
    res.status(400).send("Api Webhook error " + err.message);
  }
};
exports.useMpesa = async function (req, res, next) {
  phone = req.body.phone;
  try {
    mpesa
      .lipaNaMpesaOnline({
        BusinessShortCode: BusinessShortCode,
        Amount: 1 /* 1000 is an example amount */,
        PartyA: phone, // use your real phone number
        PartyB: BusinessShortCode, // LiAccount Referencepa Na Mpesa Online Shortcode on test credentials page
        PhoneNumber: phone, // use your real phone number
        CallBackURL: "https://example.com/mpesaSuccess", // this is where the api sends a callback. It must a hosted endpoint with public access.
        AccountReference: "TechkeyCyber", // This is what the customer would have put as account number if they used normal mpesa
        passKey: PassKey,
        TransactionType: "CustomerPayBillOnline",
        TransactionDesc: "unihome house booking",
      })
      .then((response) => {
        res.status(200).json({ status: "success" });
      })
      .catch((error) => {
        res.status(200).json({ status: "failed", data: "Sim Tool Kit error" });
        console.error(error);
      });
  } catch (err) {
    res.status(400).send("Mpesa  error " + err);
  }
};

exports.paypalObject = async function (req, res, next) {
  const create_payment_json = {
    intent: "sale",
    payer: {
      payment_method: "paypal",
    },
    redirect_urls: {
      return_url: `https://example.com/api/v1/bookings/purchase/success`,
      cancel_url: `https://example.com/`,
    },
    transactions: [
      {
        item_list: {
          items: [
            {
              name: req.body.itemname,
              sku: "001",
              price: req.body.price,
              currency: "USD",
              quantity: 1,
            },
          ],
        },
        amount: {
          currency: "USD",
          total: req.body.price,
        },
        description: "Dummy description ",
      },
    ],
  };

  req.create_payment_json = create_payment_json;
  next();
};
exports.paypalSession = async function (req, res, next) {
  try {
    paypal.payment.create(req.create_payment_json, function (error, payment) {
      if (error) {
        console.log("error", error);
        res.json({ status: "failed" });
      } else {
        //searching for Approval Url
        for (let i = 0; i < payment.links.length; i++) {
          if (payment.links[i].rel === "approval_url") {
            res
              .status(200)
              .json({ status: "success", url: payment.links[i].href });

            // res.redirect(payment.links[i].href);
          }
        }
      }
    });
  } catch (error) {
    console.log("Catch error", error);
    res.send("Catch error");
  }
};

exports.paypalProcess = async function (req, res, next) {
  const payerId = req.query.PayerID;
  const paymentId = req.query.paymentId;

  //req.create_payment_json.transactions[0].item_list.items[0].price,
  const execute_payment_json = {
    payer_id: payerId,
    // Not needed
    // transactions: [
    //   {
    //     amount: {
    //       currency: "USD",
    //       total: "25.00",
    //     },
    //   },
    // ],
  };

  paypal.payment.execute(
    paymentId,
    execute_payment_json,
    function (error, payment) {
      if (error) {
        console.log(error.response);
      } else {
        console.log("payment two", payment);
        res.redirect(`${req.get("host")}/profile`);
      }
    }
  );
};

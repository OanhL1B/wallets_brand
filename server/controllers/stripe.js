const asyncHandler = require("express-async-handler");
const KEY = process.env.STRIPE_KEY;
const stripe = require("stripe")(KEY);
const payment = asyncHandler(async (req, res) => {
  stripe.charges.create(
    {
      source: req.body.tokenId,
      amount: req.body.amount,
      currency: "vnd",
    },
    (stripeErr, stripeRes) => {
      if (stripeErr) {
        res.status(500).json(stripeErr);
      } else {
        res.status(200).json(stripeRes);
      }
    }
  );
});

module.exports = {
  payment,
};

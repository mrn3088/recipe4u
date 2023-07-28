const AWS = require("aws-sdk");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event, context, callback) => {
  try {
    // AWS Lambda uses a different event structure
    const { amount } = JSON.parse(event.body);

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
      payment_method_types: ["card"],
    });

    console.log(paymentIntent);

    callback(null, {
      statusCode: 200,
      body: JSON.stringify(paymentIntent),
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*", // for CORS
      },
    });
  } catch (error) {
    console.log({ error });

    callback(null, {
      statusCode: 400,
      body: JSON.stringify(error),
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*", // for CORS
      },
    });
  }
};

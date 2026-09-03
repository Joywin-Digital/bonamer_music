require("dotenv").config();
const Stripe = require("stripe");
const services = require("../../src/_data/services.json").items;

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

function json(statusCode, body) {
  return {
    statusCode,
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  };
}

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return json(405, { message: "Method not allowed" });
  }

  if (!stripeSecretKey) {
    return json(500, { message: "Missing STRIPE_SECRET_KEY environment variable." });
  }

  const stripe = new Stripe(stripeSecretKey);

  let payload;
  try {
    payload = JSON.parse(event.body || "{}");
  } catch (error) {
    return json(400, { message: "Invalid JSON request body." });
  }

  const service = services.find((item) => item.id === payload.serviceId);
  if (!service) {
    return json(404, { message: "Service not found." });
  }

  const baseUrl = process.env.URL || "http://localhost:8888";

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: service.currency,
            unit_amount: service.price,
            product_data: {
              name: service.name,
              description: service.description
            }
          }
        }
      ],
      success_url: `${baseUrl}/success/`,
      cancel_url: `${baseUrl}/cancel/`,
      metadata: {
        serviceId: service.id
      }
    });

    return json(200, { url: session.url });
  } catch (error) {
    return json(500, { message: "Stripe checkout session creation failed.", detail: error.message });
  }
};

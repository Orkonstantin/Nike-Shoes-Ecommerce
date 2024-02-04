import { mongooseConnect } from "@/lib/mongoose";
import { Order } from "@/models/Order";
import { Product } from "@/models/Product";

const _ = require("lodash");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.json({ message: "Should be a POST request" });
    return;
  }
  const {
    name,
    email,
    city,
    postalCode,
    streetAddress,
    country,
    cartProducts,
  } = req.body;
  await mongooseConnect();

  const cartItems = cartProducts.map((item) => ({
    _id: item._id,
    size: item.size,
    quantity: item.quantity,
  }));

  const groupedCartItems = _.groupBy(cartItems, "_id");

  let line_items = [];
  let totalPrices = 0;

  for (const id in groupedCartItems) {
    const items = groupedCartItems[id];

    for (const item of items) {
      const product = await Product.findById(item._id);

      // Create a price object
      const price = await stripe.prices.create({
        currency: "usd",
        product_data: {
          name: `${product.title} - Size: ${item.size}`,
        },
        unit_amount: product.price * 100,
      });

      totalPrices += product.price * item.quantity;

      line_items.push({
        price: price.id,
        quantity: item.quantity,
      });
    }
  }

  const orderDoc = await Order.create({
    line_items: cartItems,
    name,
    email,
    city,
    postalCode,
    streetAddress,
    country,
    paid: false,
    totalPrice: totalPrices,
  });

  const session = await stripe.checkout.sessions.create({
    line_items,
    mode: "payment",
    customer_email: email,
    success_url: process.env.PUBLIC_URL + "/cart?success=1",
    cancel_url: process.env.PUBLIC_URL + "/cart?canceled=1",
    metadata: {
      orderId: orderDoc._id.toString(),
      test: "ok",
    },
  });

  res.json({ url: session.url });
}

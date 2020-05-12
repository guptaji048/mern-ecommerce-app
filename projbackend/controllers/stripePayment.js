const stripe = require("stripe")(process.env.SECRET_KEY);
const uuid = require("uuid/v4");

exports.processPayment = (req, res) => {
  const { products, token } = req.body;
  let amount = 0;
  products.map(p => {
    amount = amount + p.price;
  });
  const idempotencyKey = uuid();

  return stripe.customers
    .create({
      email: token.email,
      source: token.id
    })
    .then(customer => {
      stripe.charges
        .create(
          {
            amount: amount,
            currency: "INR",
            customer: customer.id,
            receipt_email: token.email,
            description: "a test account",
            shipping: {
              name: token.card.name,
              address: {
                line1: token.card.address_line1,
                line2: token.card.address_line2,
                city: token.card.address_city,
                countary: token.card.address_countary,
                postal_code: token.card.address_zip
              }
            }
          },
          { idempotencyKey }
        )
        .then(result => res.status(200).json(result))
        .catch(err => console.log(err));
    })
    .catch(console.log("FAILED"));
};

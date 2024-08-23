const stripe = require('stripe')(process.env.STRIPE_KEY); 
// Note that this is the secret key stored in .env, the publishable key is used in the frontend, see public/checkout.js! All API keys are stored in: https://dashboard.stripe.com/test/apikeys

// POST /api/v1/stripe
// All payment records can be seen in: https://dashboard.stripe.com/test/payments
const stripeController = async (req, res) => {
    // in public/checkout.js, the request body is an object that has a property called items whose value is an array of objects!
    console.log(req.body);
    const { items } = req.body;

    const calculateOrderAmount = (items) => {
        return 1000;
    };
    
    const paymentIntent = await stripe.paymentIntents.create({
        amount: calculateOrderAmount(items),
        currency: "usd"
    });
    
    res.json({ clientSecret: paymentIntent.client_secret });
}

module.exports = stripeController;
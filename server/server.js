const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")

const app = express();
app.use(express.static("public"))

app.use(bodyParser.urlencoded(({ extended: false })))
app.use(bodyParser.json())
app.use(cors({ origin: true, credentials: true }))

const stripe = require("stripe")('sk_test_51Os3OuRu7QNWcb2cXWXXq9slvNriNOjBe4wUrAaJYO2mjAjHkash5ciW3CDbfLcWFNVKWi2qrWlAR07SrYtsIMdk00HTWfkhac')

app.post("/checkout", async (req, res, next) => {
  try {
    const session = await stripe.checkout.sessions.create({
      line_items: req.body.items.map((item) => (
        {
          price_data: {
            currency: 'brl',
            product_data: {
              name: item.name,
              images: [item.product]
            },
            unit_amount: item.price * 100
          }, quantity: item.quantity
        })), mode: "payment",
      success_url: "http://localhost:4242/success.html",
      cancel_url: "http://localhost:4200/home"

    })

    res.status(200).json(session)
  }
  catch (error) {
    next(error)
  }
}
)

app.listen(4242, () => console.log('server is runing on 4242'))
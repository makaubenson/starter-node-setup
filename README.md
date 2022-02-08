## UNIHOME NODE VERSION 1

### This is the original version of unihome build with node JS,

### Architecture

1. Database models 'OLD'- Different from the current existing models
2. Controllers
3. Routes - REST routes
4. Mongo DB

#### Server side rendering

### View Template

- PUG

### Utils

- Email Controller
- Error Controller
- Asynchronous JS Module

### PAYMENT SETUP

### a. Stripe

1.  WEBHOOK_SECRETE
2.  STRIPE_SECRET_KEY
    set up in `config.env`
3.  Callback URL

```js
let payment = await stripe.checkout.sessions.create({
  //
});
```

#### Ref : stripe npm

### b. MPESA

1.  Daranja API configs
    set up in `bookingController.js`

    ```javascript
    mpesa.lipaNaMpesaOnline({
      BusinessShortCode: BusinessShortCode,
      Amount: 1 /* 1000 is an example amount */,
      PartyA: phone, // use your real phone number
      PartyB: BusinessShortCode, // LiAccount Referencepa Na Mpesa Online Shortcode on test credentials page
      PhoneNumber: phone, // use your real phone number
      CallBackURL: "https://example.com/mpesaSuccess", // this is where the api sends a callback. It must a hosted endpoint with public access.
      AccountReference: "Techkey", // This is what the customer would have put as account number if they used normal mpesa
      passKey: PassKey,
      TransactionType: "CustomerPayBillOnline",
      TransactionDesc: "unihome house booking",
    });
    ```

#### Ref : mpesa-api npm

### c. Paypal

1.  client_secret
2.  client_id
    set up in `bookingController.js`

```js
paypal.payment.create(req.create_payment_json, function (error, payment) {
```

#### Ref : paypal-rest-sdk npm

---

## Config.env

1. NODE_ENV = define production / development
   Ex : NODE_ENV = development
2. OWNER = your company name
   EX: techkey
3. DBUSER = Mongo DB username
4. DBPASSWORD = Mongo DB password
5. DBSTRING = Atlas Mongo cluster connection string
6. TOKENSECRETE = Json web token secrete
7. TOKENDURATION = how long token will be valid
8. COOKIEDURATION = cookie duration

#### Email setup

9. EMAILUSER = Cpanel / SMTP user
   Ex : info@example.com
10. EMAILPASSWORD = email user password
11. EMAILHOST = email host URL
12. EMAILPORT = SMTP port number
13. EMAILFROM = email client will view as sent from
14. NODE_TLS_REJECT_UNAUTHORIZED = allows unsecure domains to send emails
    .
15. WEBHOOK_SECRETE = stripe web hook, provided in stripe dashboard
16. STRIPE_SECRET_KEY = stripe secret key

---

## Challenges

- No admin dash to add data to the system, this App requires Post man to add data

---

# Redeployed as a public Project

#### Feel Free to Fork/Contribute

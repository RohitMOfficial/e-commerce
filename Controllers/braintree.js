const User = require('../models/user');
const braintree = require('braintree');
require('dotenv').config();

var gateway = braintree.connect({
    environment:  braintree.Environment.Sandbox,
    merchantId:   '2324pyfxxd6qk4g3',
    publicKey:    '6s36764f24zk4929',
    privateKey:   '12d2f82e8934d182d92a85d2d228fb82'
});

exports.generateToken = (req, res) => {
    gateway.clientToken.generate({}, function(err, response) {
        console.log(response);
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(response);
        }
    });
};

exports.processPayment = (req, res) => {
    let nonceFromTheClient = req.body.paymentMethodNonce;
    let amountFromTheClient = req.body.amount;
    // charge
    let newTransaction = gateway.transaction.sale(
        {
            amount: amountFromTheClient,
            paymentMethodNonce: nonceFromTheClient,
            options: {
                submitForSettlement: true
            }
        },
        (error, result) => {
            if (error) {
                res.status(500).json(error);
            } else {
                res.json(result);
            }
        }
    );
};
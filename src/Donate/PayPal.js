const clientID = 'AZvCj-KCukwVnf6WmPZ1gNfWpD6OCSkT6onE2lUOCRkJ0UUgyX5IW4MLF-IbH87fpfehrqYiN41hB3ta'
const Secret = "EDHnTM9xP-RrXkMPvvzPKLknPVOPPh26otB1QfUZO7sVC9mF516deEhAuBvPJZYcXQZ8mOKRteQQRupZ"


var paypal = require('paypal-rest-sdk')
paypal.configure({
    'mode': 'sandbox',
    'client_id': clientID,
    'client_secret': Secret
})

var create_payment_json = {
    "intent": "sale",
    "payer": {
        "payment_method": "paypal"
    },
    "redirect_urls": {
        "return_url": "http://return.url",
        "cancel_url": "http://cancel.url"
    },
    "transactions": [{
        "item_list": {
            "items": [{
                "name": "item",
                "sku": "item",
                "price": "1.00",
                "currency": "USD",
                "quantity": 1
            }]
        },
        "amount": {
            "currency": "USD",
            "total": "1.00"
        },
        "description": "Please Donate 1 USD for donation purposes"
    }]
};


paypal.payment.create(create_payment_json, function (error, payment) {
    if (error) {
        throw error;
    } else {
        console.log("Create Payment Response");
        console.log(payment);
    }
});
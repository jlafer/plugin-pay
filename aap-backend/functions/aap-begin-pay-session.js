const TokenValidator = require('twilio-flex-token-validator').functionValidator;
exports.handler = TokenValidator(function (context, event, callback) {
  let cors = require(Runtime.getFunctions()['utility/cors-response'].path);
  const client = context.getTwilioClient();
  const whenShouldListExpire = new Date();
  whenShouldListExpire.setDate(whenShouldListExpire.getDate() + 1);
  client
    .sync
    .services(context.SYNC_SERVICE_SID)
    .syncLists
    .create({ 
      uniqueName: 'aap:' + event.CallSid, 
      dateExpires: whenShouldListExpire.toISOString()
    })
    .then(() => {
      console.log("list created. Starting payment");
      client.calls(event.CallSid).payments.create({
        chargeAmount: event.ChargeAmount,
        idempotencyKey: event.IdempotencyKey,
        paymentConnector: context.PAYMENT_CONNECTOR,
        postalCode: false,
        statusCallback: 'https://' + context.DOMAIN_NAME + '/aap-webhook-ingress',
        currency: event.Currency,
        validCardTypes: 'visa mastercard amex',
        paymentMethod: event.PaymentMethod,
        description: event.Description
      }).then((success) => {
        console.log("payment created");
        console.log(success);
        return callback(null, cors.response(success));
      }).catch((error) => {
        console.log("unable to create payment");
        console.log(error);
        response.setBody(error);
        return callback(error, cors.response(error));
      });
    })
    .catch((error) => {
      console.log("could not get sync list");
      console.log(error);
      response.setBody(error);
      return callback(error, cors.response(error));
    });
});
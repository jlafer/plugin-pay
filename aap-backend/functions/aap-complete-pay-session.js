const TokenValidator = require('twilio-flex-token-validator').functionValidator;
exports.handler = TokenValidator(async function (context, event, callback) {
  try {
    const client = context.getTwilioClient();
    let cors = require(Runtime.getFunctions()['utility/cors-response'].path);

    const res = await client.calls(event.CallSid).payments(event.PaymentSid).update({
      status: 'complete',
      idempotencyKey: event.IdempotencyKey,
      statusCallback: 'https://' + context.DOMAIN_NAME + '/aap-webhook-ingress'
    });
    console.log('aap-complete-pay-session: res', res);
    callback(null, cors.response(res))
  }
  catch (error) {
    console.error(error);
    callback(error, cors.response(error));
  }
});
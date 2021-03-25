const TokenValidator = require('twilio-flex-token-validator').functionValidator;
exports.handler = TokenValidator(async function (context, event, callback) {
  try {
    let cors = require(Runtime.getFunctions()['utility/cors-response'].path);
    const client = context.getTwilioClient();
    const listName = `aap:${event.CallSid}`;
    console.log(`aap-cleanup-session: removing syncList ${listName}`);
    await client.sync.services(context.SYNC_SERVICE_SID).syncLists(listName).remove();
    console.log('aap-cleanup-session: removed syncList');
    callback(null, cors.response({session: 'cleaned'}));
  }
  catch (error) {
    console.error(error);
    callback(error, cors.response(error));
  }
});
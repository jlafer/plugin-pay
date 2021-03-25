exports.handler = async function (context, event, callback) {
  console.log('aap-webhook-ingress: event', event);
  try {
    const client = context.getTwilioClient();
    const res = await client.sync.services(context.SYNC_SERVICE_SID)
    .syncLists('aap:' + event.CallSid).syncListItems
    .create({
      data: event
    });
    console.log(res);
    callback(null, 'Updated');
  }
  catch (error) {
    console.log(error);
    callback(error, 'Something went wrong');
  }
};

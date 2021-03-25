import * as R from 'ramda';
import { SyncClient } from "twilio-sync";
import { GetTokenisedFetchOptions } from './FlexUtil';
import {
  PayCaptureParameter, PayCompleteSession, PayInitiateRequest, PayCleanupSession
} from './PayRequestFactory';

export const initiateAAP = R.curry( (props, data) => {
  console.log('initiateAAP: props:', props);
  console.log('  data:', data);
  const {currentTask, idempotencyKey, manager, runtimeUrl} = props;
  const {currency, chargeAmount, paymentMethod, description} = data;
  const pmtData = {...data, aapStatus: []};
  const callSid = currentTask.attributes.conference.participants.customer;
  console.log(`initiating payment for call sid ${callSid}`);

  fetch(runtimeUrl + "/sync-token", GetTokenisedFetchOptions({}))
  .then((token) => {
    token.json()
    .then((json) => {
      const body = {
        CallSid: callSid,
        ChargeAmount: chargeAmount,
        Currency: currency,
        IdempotencyKey: idempotencyKey,
        Description: description,
        PaymentMethod: paymentMethod
      };
      console.table(body);

      fetch(PayInitiateRequest(body, manager))
      .then((success) => {
        success.json()
        .then((response) => {
          console.log('initiateAAP: received response', response);
          pmtData.paymentSid = response.sid;
          pmtData.idempotencyKey = idempotencyKey+1;
          subscribeToSync(props, pmtData, json.token);
          props.setPmtFormData(pmtData);
          props.setPaymentSid(pmtData.paymentSid);
          props.setIdempotencyKey(pmtData.idempotencyKey);
          props.setPmtSessionState('INITIATED');
        });
      })
      .catch((err) => {
        console.error("failed to initiate AAP", err);
      });
    });
  })
  .catch((error) => {
    console.error(error);
  });
});

// NOTE: mutates arr!
const addPaymentStatusState = (arr, item) => {
  arr.push(item);
};

export const subscribeToSync = (props, data, token) => {
  const {currentTask} = props;
  const callSid = currentTask.attributes.call_sid
  console.log(
    `subscribing to Sync list for aap: ${callSid}`);
  var sync = new SyncClient(token);
  sync.list(`aap:${callSid}`)
  .then((list) => {
    console.log(`successfully opened Sync List for SID: ${list.sid}`);
    list.getItems({ from: 0, order: "asc" })
      .then((paginator) => {
        paginator.items.forEach((item) => {
          console.log(`  found item in list:`, item);
          addPaymentStatusState(data.aapStatus, item.data.value);
        });
      })
      .catch(function (error) {
        console.error("sync.list.getItems failed:", error);
      });

    list.on("itemAdded", (event) => {
      console.log("received itemAdded event:", event);
      const pmtStatus = event.item.data.value;
      props.addPaymentStatus(pmtStatus);
      checkForSessionCompleted(props, pmtStatus);
    });
  })
  .catch(function (error) {
    console.log("error caught:", error);
  });
};

export const checkForSessionCompleted = (props, pmtStatus) => {
  console.log('checkForSessionCompleted: pmtStatus:', pmtStatus);
  if (!pmtStatus.Result)
    return;
  fetch(PayCleanupSession({CallSid: pmtStatus.CallSid}, props.manager));
  console.log('payment session completed; cleaning up on server');
  if (pmtStatus.Result === 'success')
    props.setPmtSessionState('PMT_SUCCESS')
  else
    props.setPmtSessionState('PMT_FAILURE')
}

export const requestCapture = R.curry((props, data, captureField) => {
  const {currentTask, manager} = props;
  const {aapStatus, paymentSid, idempotencyKey} = data;
  const body = {
    CallSid: currentTask.attributes.call_sid,
    PaymentSid: paymentSid,
    Capture: captureField,
    IdempotencyKey: idempotencyKey
  };

  console.log(`requestCapture: requesting field: ${captureField}`);
  console.log(`  body:`, body);
  
  fetch(PayCaptureParameter(body, manager))
  .then((_success) => {
    console.log(`requestCapture: succeeded in requesting field: ${captureField}`);
    props.setIdempotencyKey(idempotencyKey+1);
  })
  .catch((err) => {
    console.log(`failed to request payment field: ${captureField}`);
    console.log(err);
  });
});

export const processPayment = (props) => () => {
  console.log("attempting to process payment via Pay Connector");

  const body = {
    CallSid: props.currentTask.attributes.call_sid,
    PaymentSid: props.paymentSid,
    Status: "complete",
    IdempotencyKey: props.idempotencyKey,
  };

  fetch(PayCompleteSession(body, props.manager))
  .then((_success) => {
    console.log("payment request completed");
    const newIdempotencyKey = props.idempotencyKey + 1;
    props.setIdempotencyKey(newIdempotencyKey);
    props.setPmtSessionState('PAYING')
  })
  .catch((err) => {
    console.log("payment request failed:", err);
  });
};

export const latestPaymentState = (aapStatus) => {
  if (aapStatus.length === 0) return null;
  return aapStatus[aapStatus.length - 1];
};

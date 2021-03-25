import * as R from 'ramda';
import React from "react";
import { withTaskContext } from "@twilio/flex-ui";
import {
  initiateAAP, requestCapture, processPayment, latestPaymentState
} from '../../util/PayUtil';
import PaymentForm from "./PaymentForm";
import PaymentInProgress from "./PaymentInProgress";
import PaymentSuccess from "./PaymentSuccess";
import PaymentFailure from "./PaymentFailure";

const PaymentAgentView = (props) => {
  console.log('PaymentAgentView: called with props', props);

  const paymentState = latestPaymentState(props.aapStatus);
  if (props.pmtSessionState === 'INACTIVE') {
    return null;
  }
  const {chargeAmt, currency, description} = props.pmtFormData;
  let pageContent;
  if (props.pmtSessionState === 'GETTING_PMT_FORM') {
    pageContent = (
      <PaymentForm
        initiateAAP={initiateAAP(props)}
        defaultPaymentAmount={chargeAmt}
        defaultDescription={description}
      />
    );
  } else if (props.pmtSessionState === 'INITIATED') {
    // TODO props arg to requestCapture(props) can just be passed as ...props
    const captureData = R.pick(['paymentSid', 'idempotencyKey'], props);
    pageContent = (
      <PaymentInProgress
        captureField={props.captureField}
        paymentState={paymentState}
        requestCapture={requestCapture(props, captureData)}
        processPayment={processPayment(props)}
        chargeAmount={chargeAmt}
        currency={currency}
      />
    );
  } else if (props.pmtSessionState === 'PMT_SUCCESS') {
    pageContent = (
      <PaymentSuccess
        chargeAmount={chargeAmt}
        currency={currency}
        confirmation={paymentState.PaymentConfirmationCode}
        resetPaymentInfo={props.resetPaymentInfo}
      />
    );
  } else if (props.pmtSessionState === 'PMT_FAILURE') {
    pageContent = (
      <PaymentFailure
        chargeAmount={chargeAmt}
        currency={currency}
        paymentState={paymentState}
      />
    )
  }

  return (
    <div className="component-container">
      <div className="hero-background"></div>
      {pageContent}
    </div>
  );
}

export default withTaskContext(PaymentAgentView);

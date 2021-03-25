import React from "react";
import PaymentElement from "./PaymentElement";
import {GetSymbolForCurrencyISO} from "../../util/CurrencyUtil";

export default (props) => {
  console.log('PaymentInProgress: props:', props);
  const required = props.paymentState ? props.paymentState.Required : 'all';

  return (
    <>
      <div className="input-card">
        <div className="payment-details-container">
          <div className="pay-icon"></div>
          <h1 className="payment-form-heading">
            {GetSymbolForCurrencyISO(props.currency)} {props.chargeAmount}
          </h1>
        </div>
        <h1 className="payment-form-heading">
          Capture Credit Card Information
        </h1>
        <hr />
        <h3>
          Still Required: {required}
        </h3>
        <hr />
        <PaymentElement
          captureField={props.captureField}
          requestCapture={props.requestCapture}
          paymentState={props.paymentState}
          friendlyName="Payment Card Number"
          pascalCaseName="PaymentCardNumber"
          riverCaseName="payment-card-number"
        />
        <PaymentElement
          captureField={props.captureField}
          requestCapture={props.requestCapture}
          paymentState={props.paymentState}
          friendlyName="Expiration Date"
          pascalCaseName="ExpirationDate"
          riverCaseName="expiration-date"
        />
        <PaymentElement
          captureField={props.captureField}
          requestCapture={props.requestCapture}
          paymentState={props.paymentState}
          friendlyName="Security Code"
          pascalCaseName="SecurityCode"
          riverCaseName="security-code"
        />
        <>
          {props.paymentState && props.paymentState.ErrorType &&
            props.paymentState.ErrorType !== "" &&
          (
            <div
              style={{ color: "red", fontWeight: "bold" }}
            >
              Error: {props.paymentState.ErrorType}
            </div>
          )}
            <button
              className="payment-form-button Twilio-Button Twilio-TaskCanvasHeader-EndButton"
              disabled={required !== ""}
              type="button"
              onClick={() => props.processPayment()}
            >
              Process Payment
            </button>
        </>
      </div>
    </>
  );
}

import React from "react";
import {GetSymbolForCurrencyISO} from "../../util/CurrencyUtil";

export default (props) => {
  return (
    <div className="input-card centered-text">
      <div className="payment-checkmark"></div>
      <h1 className="payment-form-heading">Payment Complete</h1>
      <hr className="payment-card-divider" />
      <p>
        <strong>Amount:</strong> {GetSymbolForCurrencyISO(props.currency)}{" "}
        {props.chargeAmount}
      </p>
      <p>
        <strong>Confirmation Code:</strong>{" "}
        {props.confirmation}
      </p>
      <button
        onClick={props.resetPaymentInfo}
        className="Twilio-Button payment-form-button"
      >
        Hide
      </button>,
    </div>
  );
}

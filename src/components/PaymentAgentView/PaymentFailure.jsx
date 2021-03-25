import React from "react";
import {GetSymbolForCurrencyISO} from "../../util/CurrencyUtil";

export default (props) => {
  return (
    <div className="input-card centered-text">
      <div className="payment-errormark"></div>
      <h1 className="payment-form-heading">Payment Failed!</h1>
      <hr className="payment-card-divider" />
      <p>
        <strong>Amount:</strong> {GetSymbolForCurrencyISO(props.currency)}{" "}
        {props.chargeAmount}
      </p>
      <p>
        <strong>Payment Result:</strong>{" "}
        {props.paymentState.Result}
      </p>
      <p>
        <strong>Payment Error:</strong>{" "}
        {props.paymentState.PaymentError}
      </p>
      <p>
        <strong>Connector Error:</strong>{" "}
        {props.paymentState.ConnectorError}
      </p>
    </div>
  );
}

import React from "react";
import config from '../../payConfig.json'

class PaymentForm extends React.Component {
  constructor(props) {
    super(props);

    this.paymentAmountRef = React.createRef();
    this.paymentCurrencyRef = React.createRef();
    this.paymentMethodRef = React.createRef();
    this.paymentDescriptionRef = React.createRef();

    this.state = {
      showLoadingSpinner: false,
    };
  }

  initiateAAP = () => {
    const data = {
      currency: this.paymentCurrencyRef.current.value,
      chargeAmount: this.paymentAmountRef.current.value,
      paymentMethod: 'credit-card',
      description: this.paymentDescriptionRef.current.value
    };
    this.props.initiateAAP(data);
  };

  render() {
    const currencies = [];
    config.CURRENCY_CONFIG.forEach((currency, index) => {
      currencies.push(
        <option value={currency.ISO} key={currency.ISO}>
          {currency.ISO.toUpperCase()} ({currency.Symbol})
        </option>
      )
    })

    return (
      <div className="input-card">
        <div className="pay-icon"></div>
        <h1 className="payment-form-heading">Checkout with Twilio Pay</h1>
        <div className="payment-form">
          <div className="payment-form-group">
            <h2 className="form-label">Currency</h2>
            <select
              className="payment-form-select"
              ref={this.paymentCurrencyRef}
            >
              {currencies}
            </select>
          </div>
          <br />
          <div className="payment-form-group">
            <h2 className="form-label">Charge Amount</h2>
            <input
              ref={this.paymentAmountRef}
              className="payment-form-input"
              defaultValue={this.props.defaultPaymentAmount}
            />
          </div>
          <br /> 
          <div className="payment-form-group">
            <h2 className="form-label">Charge Description</h2>
            <input
              ref={this.paymentDescriptionRef}
              className="payment-form-input"
              placeholder={this.props.defaultDescription}
            />
          </div>
        </div>
        <br></br>
        <button
          className="Twilio-Button Twilio-TaskCanvasHeader-EndButton payment-form-button"
          onClick={this.initiateAAP}
        >
          Request payment
        </button>
      </div>
    );
  }
}

export default PaymentForm;

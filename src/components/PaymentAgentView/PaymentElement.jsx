import React from "react";

export default (props) => {
  const value = (props.paymentState && props.paymentState[props.pascalCaseName])
    ? props.paymentState[props.pascalCaseName] : '';
  return (
    <div style={getStyle(props)} className="payment-input-container">
      <h2 className="form-label">{props.friendlyName}</h2>
      <input
        value={value} readOnly={true}
      />
      <button
        className="Twilio-Button Twilio-TaskCanvasHeader-EndButton payment-form-button"
        type="button"
        onClick={() =>
            props.requestCapture(props.riverCaseName)
        }
      >
        Request {props.friendlyName}
      </button>
      <div className="circle-loader">
        <div className="checkmark draw"></div>
      </div>
    </div>
  );
}

const getStyle = (props) => {
  if (
    props.paymentState &&
    props.paymentState[props.pascalCaseName] !== undefined &&
    props.paymentState[props.pascalCaseName] !== ""
  ) {
    return {
      backgroundColor: "#3bb78f",
      backgroundImage: "linear-gradient(315deg, rgb(59, 183, 143) 0%, rgb(136 218 182) 74%)",
    };
  }
  if (props.captureField === props.riverCaseName) {
    return {
      backgroundColor: "#fec84e",
      backgroundImage: "linear-gradient(315deg, #fec84e 0%, #ffdea8 74%)"
    };
  } else {
    return {
      backgroundColor: "#e7eff9",
      backgroundImage: "linear-gradient(315deg, #e7eff9 0%, #cfd6e6 74%)"
    };
  }
}

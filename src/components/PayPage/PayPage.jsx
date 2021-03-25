import React from "react";

import "./PayPage.css";
import PaymentAgentView from "../PaymentAgentView/PaymentAgentView";

export default function PayPage (props) {
  return (
    <div>
      <h2>Flexy Pay</h2>
      <PaymentAgentView {...props} />
    </div>
  );
}

import React from "react";
import {connect} from 'react-redux';
import {field} from 'jlafer-flex-util';
import {namespace} from '../../states';

const CasePanel = (props) => {
  if (!props.currentTask)
    return null;
  const attributes = props.currentTask.attributes;
  const {
    userName, acctNum, acctStatus, balance, lastInput, miranda, namespace,
    pmtType, pmtMethod 
  } = attributes;

  return (
    <div className="main-content px-1 py-2 m-1">
      <div className="container-fluid px-1 py-2">
        <div className="card-body px-1 py-2 m-1">
          <h1 className="card-title">Call Triage Info</h1>
          {field('miranda', 'Mini Miranda', miranda)}
          {field('customer', 'Customer', userName)}
          {field('status', 'Status', acctStatus)}
          {field('namespace', 'Namespace', namespace)}
          {field('balance', 'Balance', balance)}
          {field('pmtType', 'Pmt Type', pmtType)}
          {field('method', 'Pmt Method', pmtMethod)}
          {field('userInput', 'Last Input', lastInput)}
          {field('account', 'Account', acctNum)}
        </div>
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  const {currentTask} = state[namespace].appState;
  return {currentTask};
}

export default connect(mapStateToProps)(CasePanel);

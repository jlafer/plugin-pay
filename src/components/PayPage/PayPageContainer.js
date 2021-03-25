import { connect } from 'react-redux';

import {
  namespace, addPaymentStatus, resetPaymentInfo,
   setCaptureField, setPmtFormData, setIdempotencyKey, setPaymentSid,
   setPmtSessionState
} from '../../states';
import PayPage from './PayPage';

const mapStateToProps = (state, ownProps) => {
  const {currentTask, manager} = state[namespace].appState;
  const {
    aapStatus, captureField, pmtFormData, idempotencyKey, paymentSid,
    pmtSessionState
  } = state[namespace].paymentState;

  return {
    aapStatus,
    captureField,
    pmtFormData,
    currentTask,
    idempotencyKey,
    manager,
    paymentSid,
    pmtSessionState,
    ...ownProps
  };
};

export default connect(
  mapStateToProps,
  {
    addPaymentStatus, resetPaymentInfo, setCaptureField, setPmtFormData,
    setIdempotencyKey, setPaymentSid, setPmtSessionState
  }
)(PayPage);
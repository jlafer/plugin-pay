import { combineReducers } from "redux";

import {
  ADD_PMT_STATUS, RESET_PMT_INFO, SET_CAPTURE_FIELD, SET_CURRENT_TASK,
  SET_RUNTIME_URL, SET_PMT_FORM_DATA, SET_IDEMPOTENCY_KEY,
  SET_PAYMENT_SID, SET_FLEX_MGR, SET_PMT_SESSION_STATE
} from './actions';
import appStateReducer from "./AppState";
import paymentStateReducer from "./PaymentState";

export const namespace = "flex-payments";

export default combineReducers({
  paymentState: paymentStateReducer,
  appState: appStateReducer
});

export const addPaymentStatus = (payload) => ({
  type: ADD_PMT_STATUS, payload
});

export const setPmtSessionState = (payload) => ({
  type: SET_PMT_SESSION_STATE, payload
});

export const resetPaymentInfo = () => ({
  type: RESET_PMT_INFO
});

export const setFlexMgr = (payload) => ({
  type: SET_FLEX_MGR, payload
});

export const setRuntimeUrl = (payload) => ({
  type: SET_RUNTIME_URL, payload
});

export const setCaptureField = (payload) => ({
  type: SET_CAPTURE_FIELD, payload
});

export const setCurrentTask = (payload) => ({
  type: SET_CURRENT_TASK, payload
});

export const setIdempotencyKey = (payload) => ({
  type: SET_IDEMPOTENCY_KEY, payload
});

export const setPmtFormData = (payload) => ({
  type: SET_PMT_FORM_DATA, payload
});

export const setPaymentSid = (payload) => ({
  type: SET_PAYMENT_SID, payload
});

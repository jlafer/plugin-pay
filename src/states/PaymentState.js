import {
  ADD_PMT_STATUS, RESET_PMT_INFO, SET_CAPTURE_FIELD, SET_PMT_FORM_DATA,
  SET_IDEMPOTENCY_KEY, SET_PAYMENT_SID, SET_PMT_SESSION_STATE
} from './actions';
  
const initialState = {
  pmtSessionState: 'INACTIVE',
  aapStatus: [],
  captureField: '',
  pmtFormData: {
    chargeAmt: '0.00',
    currency: 'usd',
    description: ''
  },
  idempotencyKey: 1,
  paymentSid: ''
};

export default function reduce(state = initialState, action) {
  switch (action.type) {
    case ADD_PMT_STATUS:
      return {...state, aapStatus: [...state.aapStatus, action.payload]};
    case SET_PMT_SESSION_STATE:
      return {...state, pmtSessionState: action.payload};
    case SET_CAPTURE_FIELD:
      return {...state, captureField: action.payload};
    case SET_IDEMPOTENCY_KEY:
      return {...state, idempotencyKey: action.payload};
    case RESET_PMT_INFO:
      const idempotencyKey = state.idempotencyKey;
      return {...initialState, idempotencyKey};
    case SET_PMT_FORM_DATA:
      return {...state, pmtFormData: {...state.pmtFormData, ...action.payload}};
    case SET_PAYMENT_SID:
      return {...state, paymentSid: action.payload};
    default:
      return state;
  }
}

import {SET_RUNTIME_URL, SET_CURRENT_TASK, SET_FLEX_MGR} from './actions';

const initialState = {
  manager: null,
  currentTask: null,
  runtimeUrl: null
};

export default function reduce(state = initialState, action) {
  switch (action.type) {
    case SET_FLEX_MGR:
      return {
        ...state,
        manager: action.payload
      };
    case SET_CURRENT_TASK:
      return {
        ...state,
        currentTask: action.payload
      };
    case SET_RUNTIME_URL:
      return {
        ...state,
        runtimeUrl: action.payload
      };
    default:
      return state;
  }
}

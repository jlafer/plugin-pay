import { GetTokenisedFetchOptions } from './FlexUtil'
import config from '../payConfig.json'

export const PayInitiateRequest = (payload, manager) => {
  var baseUrl = config.RUNTIME_URL;
  var payRequest = new Request(
    baseUrl + "/aap-begin-pay-session", 
    GetTokenisedFetchOptions(payload, manager)
  );
  return payRequest;
}

export const PayCaptureParameter = (payload, manager) => {
  var baseUrl = config.RUNTIME_URL;
  var payRequest = new Request(
    baseUrl + "/aap-capture-parameter", 
    GetTokenisedFetchOptions(payload, manager)
  );
  return payRequest;
}

export const PayCompleteSession = (payload, manager) => {
  var baseUrl = config.RUNTIME_URL;
  var payRequest = new Request(
    baseUrl + "/aap-complete-pay-session", 
    GetTokenisedFetchOptions(payload, manager)
  );
  return payRequest;
}

export const PayCleanupSession = (payload, manager) => {
  var baseUrl = config.RUNTIME_URL;
  var payRequest = new Request(
    baseUrl + "/aap-cleanup-session", 
    GetTokenisedFetchOptions(payload, manager)
  );
  return payRequest;
}

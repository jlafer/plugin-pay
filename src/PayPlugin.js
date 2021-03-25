import * as R from 'ramda';
import React from "react";
import * as Flex from '@twilio/flex-ui';
import { FlexPlugin } from "flex-plugin";
import './styles/styles.css';

import CasePanel from './components/CasePanel/CasePanel';
import PayPage from "./components/PayPage/PayPageContainer";
import SidebarPayButton from './components/SidebarPayButton/SidebarPayButton';
import reducers, {
  namespace, resetPaymentInfo, setCurrentTask, setFlexMgr, setPmtFormData,
  setRuntimeUrl
} from './states';

const PLUGIN_NAME = "PayPlugin";

const initializePayPage = R.curry((manager, payload) => {
  const {dispatch} = manager.store;
  dispatch( resetPaymentInfo() );
  dispatch( setCurrentTask(payload.task) );
  const chargeAmt = payload.task.attributes.balance || "0.00";
  const description = payload.task.attributes.pmtType || '';
  dispatch( setPmtFormData({chargeAmt, description}) );
});

const resetPayPage = R.curry((manager, _payload) => {
  const {dispatch} = manager.store;
  dispatch( resetPaymentInfo() );
  dispatch( setCurrentTask(null) );
});

export default class PayPlugin extends FlexPlugin {
  constructor() {
    super(PLUGIN_NAME);
  }

  init(flex, manager) {
    console.log(`${PLUGIN_NAME}: initializing...`);
    manager.store.addReducer(namespace, reducers);
    const REACT_APP_SERVICE_BASE_URL = process.env.REACT_APP_SERVICE_BASE_URL;
    const REACT_APP_UI = process.env.REACT_APP_UI;
    const runtimeUrl = REACT_APP_SERVICE_BASE_URL;
    console.log(`${PLUGIN_NAME}: using runtime ${runtimeUrl}`);
    console.log(`${PLUGIN_NAME}: using ui ${REACT_APP_UI}`);
    manager.store.dispatch( setRuntimeUrl(runtimeUrl) );
    // TODO manager probably not needed in Redux store; instead
    // just use Manager.getInstance()
    manager.store.dispatch( setFlexMgr(manager) );

    if (REACT_APP_UI === 'default') {
      flex.SideNav.Content.add(<SidebarPayButton key="pay" />);
      flex.ViewCollection.Content.add(
        <Flex.View key="pay-page" name="pay-page">
          <PayPage runtimeUrl={runtimeUrl} />
        </Flex.View>
      );
    }

    flex.TaskInfoPanel.Content.replace(
      <CasePanel key="case-panel"/>
    );

    flex.Actions.addListener("afterAcceptTask", initializePayPage(manager));
    flex.Actions.addListener("afterCompleteTask", resetPayPage(manager));
  }
}

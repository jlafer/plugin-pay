import React from 'react';
import { Actions, Manager, SideLink } from "@twilio/flex-ui";
import {setPmtSessionState} from '../../states';
import { PayIcon, PayIconActive } from "./PayIcon";

export default class SidebarPayButton extends React.Component {

	constructor(props, context) {
		super(props, context);
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick() {
    const manager = Manager.getInstance();
    manager.store.dispatch( setPmtSessionState('GETTING_PMT_FORM') );
		Actions.invokeAction("NavigateToView", { viewName: "pay-page" });
	}

	render() {
		return (
			<SideLink
				{...this.props}
				icon={<PayIcon />}
				iconActive={<PayIconActive />}
				isActive={this.props.activeView === "pay-page"}
				onClick={this.handleClick}
			>
				Flex Pay
			</SideLink>
		);
	}
}

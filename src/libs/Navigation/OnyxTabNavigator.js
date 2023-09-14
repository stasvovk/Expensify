import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {withOnyx} from 'react-native-onyx';
import PropTypes from 'prop-types';
import Tab from '../actions/Tab';
import ONYXKEYS from '../../ONYXKEYS';
import * as Browser from '../Browser';
import CONST from '../../CONST';

const propTypes = {
    /* ID of the tab component to be saved in onyx */
    id: PropTypes.string.isRequired,

    /* Name of the selected tab */
    selectedTab: PropTypes.string,

    /* Children nodes */
    children: PropTypes.node.isRequired,
};

const defaultProps = {
    selectedTab: '',
};

// eslint-disable-next-line rulesdir/no-inline-named-export
export const TopTab = createMaterialTopTabNavigator();

// Will set this for all platforms once issue below is fixed for native devices.
// https://github.com/Expensify/App/issues/27117
const keyboardDismissModeProp = Browser.getBrowser() === CONST.BROWSER.SAFARI ? {keyboardDismissMode: 'none'} : {};

// This takes all the same props as MaterialTopTabsNavigator: https://reactnavigation.org/docs/material-top-tab-navigator/#props,
// except ID is now required, and it gets a `selectedTab` from Onyx
function OnyxTabNavigator({id, selectedTab, children, ...rest}) {
    return (
        <TopTab.Navigator
            /* eslint-disable-next-line react/jsx-props-no-spreading */
            {...rest}
            /* eslint-disable-next-line react/jsx-props-no-spreading */
            {...keyboardDismissModeProp}
            id={id}
            initialRouteName={selectedTab}
            backBehavior="initialRoute"
            screenListeners={{
                state: (event) => {
                    const state = event.data.state;
                    const index = state.index;
                    const routeNames = state.routeNames;
                    Tab.setSelectedTab(id, routeNames[index]);
                },
                ...(rest.screenListeners || {}),
            }}
        >
            {children}
        </TopTab.Navigator>
    );
}

OnyxTabNavigator.defaultProps = defaultProps;
OnyxTabNavigator.propTypes = propTypes;
OnyxTabNavigator.displayName = 'OnyxTabNavigator';

export default withOnyx({
    selectedTab: {
        key: ({id}) => `${ONYXKEYS.COLLECTION.SELECTED_TAB}${id}`,
    },
})(OnyxTabNavigator);

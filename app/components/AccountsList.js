import React, { Component, PropTypes } from 'react';
import {
    ListView,
    InvertibleScrollView,
    TouchableHighlight,
    View,
    Text
} from 'react-native'
import s from '../styles/components/AccountListStyles'

export default class AccountsList extends Component {
    constructor(props) {
        super(props);

        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

        this.state = {
            ds: ds.cloneWithRows(props.accounts)
        }
    }

    _pressRow(account) {
        if (this.props.onPress) {
            this.props.onPress(account);
        }
    }

    _longPressRow(account) {
        if (this.props.onLongPress) {
            this.props.onLongPress(account);
        }
    }

    componentWillReceiveProps(nextProps) {

        console.log("componentWillReceiveProps", nextProps.accounts);

        if (nextProps.accounts !== this.props.accounts) {
            this.setState({
                ds: this.state.ds.cloneWithRows(nextProps.accounts)
            })
        }
    }

    renderRow(account, _, id) {
        let registration = account.get('registration');

        return (
            <TouchableHighlight onPress={() => this._pressRow(account)} onLongPress={() => this._longPressRow(account)}>
                <View style={s.row}>
                    <View style={s.rowCircle}>
                        <Text style={s.rowCircleText}>{account.get('id')}</Text>
                    </View>
                    <View style={s.rowDescription}>
                        <Text style={s.rowURIText}>{account.get('uri')}</Text>
                        <Text style={s.rowRegistrationText}>
                            {
                                registration ? registration['statusText'] : 'Undefined'
                            }
                        </Text>
                    </View>
                </View>
            </TouchableHighlight>
        );
    }

    render() {
        return (
            <ListView
                dataSource={this.state.ds}
                scrollRenderAheadDistance={1000}
                pageSize={30}
                initialListSize={30}
                renderRow={this.renderRow.bind(this)} />
        )
    }
}

AccountsList.propTypes = {
    accounts: PropTypes.array,
    dispatch: PropTypes.func,
    onPress: PropTypes.func,
    onLongPress: PropTypes.func
};

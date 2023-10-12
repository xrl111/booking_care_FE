import React, { Component } from 'react';
import { connect } from 'react-redux';

import { LANGUAGES } from '../../utils';
import { FormattedMessage } from 'react-intl';
import HomeHeader from '../HomePage/HomeHeader';
import './VerifyEmail.scss';
import { postVerifyBookAppointment } from '../../services/userService';

class VerifyEmail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            statusVerify: false,
            errCode: 0,
        };
    }

    async componentDidMount() {
        if (this.props.location && this.props.location.search) {
            let urlParams = new URLSearchParams(this.props.location.search);
            let token = urlParams.get('token');
            let doctorId = urlParams.get('doctorId');
            let res = await postVerifyBookAppointment({
                token: token,
                doctorId: doctorId,
            });

            if (res && res.errCode === 0) {
                this.setState({
                    statusVerify: true,
                    errCode: res.errCode,
                });
            } else {
                this.setState({
                    statusVerify: false,
                    errCode: res && res.errCode ? res.errCode : -1,
                });
            }
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
        }
    }
    render() {
        let { statusVerify, errCode } = this.state;
        return (
            <>
                <HomeHeader />
                <div className="verify-email-container">
                    {statusVerify === false ? (
                        <div>LOADING DATA......</div>
                    ) : (
                        <div>
                            {+errCode === 0 ? (
                                <div className="infor-booking">
                                    <FormattedMessage id="patient.booking-alert.booking-success" />
                                </div>
                            ) : (
                                <div className="infor-booking">
                                    <FormattedMessage id="patient.booking-alert.booking-false" />
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmail);

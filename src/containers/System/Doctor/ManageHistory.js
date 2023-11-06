import React, { Component } from 'react';
import { connect } from 'react-redux';

import { LANGUAGES } from '../../../utils';
import { FormattedMessage } from 'react-intl';
import './ManageHistory.scss';
import DatePicker from '../../../components/Input/DatePicker';
import moment from 'moment';
import { getAllHistoryForDoctor } from '../../../services/userService';
class ManageHistory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentDate: moment(new Date()).startOf('day').valueOf(),
            dataPatient: [],
            isOpenRemedyModal: false,
            dataModal: {},
            isShowLoading: false,
            description: '',
        };
    }

    async componentDidMount() {
        this.getDataPatient();
    }

    getDataPatient = async () => {
        let { user } = this.props;
        let { currentDate } = this.state;
        let formattedDate = new Date(currentDate).getTime();

        let res = await getAllHistoryForDoctor({
            doctorId: user.id,
            date: formattedDate,
        });
        if (res && res.errCode === 0) {
            this.setState({
                dataPatient: res.data,
            });
        }
    };
    handleOnChangeDatePicker = (date) => {
        this.setState(
            {
                currentDate: date[0],
            },
            async () => {
                this.getDataPatient();
            },
        );
    };

    componentDidUpdate(prevProps, prevState, snapshot) {}

    render() {
        let { dataPatient } = this.state;
        let { language } = this.props;
        return (
            <>
                <div className="manage-patient-container">
                    <div className="m-p-title">
                        <FormattedMessage id="doctor.manage-schedule.history" />
                    </div>
                    <div className="manage-patient-body row">
                        <div className="col-4 form-group">
                            <label>
                                <FormattedMessage id="doctor.manage-schedule.choose-date" />
                            </label>
                            <DatePicker
                                onChange={this.handleOnChangeDatePicker}
                                className="form-control"
                                value={this.state.currentDate}
                            />
                        </div>
                        <div className="col-12 table-manage-patient">
                            <table style={{ width: '100%' }}>
                                <tbody>
                                    <tr>
                                        <th>
                                            <FormattedMessage id="doctor.manage-schedule.number" />
                                        </th>
                                        <th>
                                            <FormattedMessage id="doctor.manage-schedule.time" />
                                        </th>
                                        <th>
                                            <FormattedMessage id="doctor.manage-schedule.fullName" />
                                        </th>
                                        <th>
                                            <FormattedMessage id="doctor.manage-schedule.address" />
                                        </th>
                                        <th>
                                            <FormattedMessage id="doctor.manage-schedule.gender" />
                                        </th>
                                        <th>
                                            <FormattedMessage id="doctor.manage-schedule.note" />
                                        </th>
                                    </tr>
                                    {dataPatient && dataPatient.length > 0 ? (
                                        dataPatient.map((item, index) => {
                                            let time =
                                                language === LANGUAGES.VI
                                                    ? item.timeTypeDataHistory.valueVi
                                                    : item.timeTypeDataHistory.valueEn;

                                            let gender =
                                                language === LANGUAGES.VI
                                                    ? item.patientDataHistory.genderData.valueVi
                                                    : item.patientDataHistory.genderData.valueEn;

                                            return (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{time}</td>
                                                    <td>{item.patientDataHistory.firstName}</td>
                                                    <td>{item.patientDataHistory.address}</td>
                                                    <td>{gender}</td>
                                                    <td>{item.description}</td>
                                                </tr>
                                            );
                                        })
                                    ) : (
                                        <tr>
                                            <td colSpan="6" style={{ textAlign: 'center' }}>
                                                no data
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
        user: state.user.userInfo,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageHistory);
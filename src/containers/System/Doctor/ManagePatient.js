import React, { Component } from 'react';
import { connect } from 'react-redux';

import { LANGUAGES } from '../../../utils';
import { FormattedMessage } from 'react-intl';
import './ManagePatient.scss';
import DatePicker from '../../../components/Input/DatePicker';
import moment from 'moment';
import { toast } from 'react-toastify';
import LoadingOverlay from 'react-loading-overlay';
import RemedyModal from './RemedyModal';
import { getAllPatientForDoctor, postSendRemedy } from '../../../services/userService';
class ManagePatient extends Component {
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

        let res = await getAllPatientForDoctor({
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
    handleBtnConfirm = (item) => {
        let data = {
            doctorId: item.doctorId,
            patientId: item.patientId,
            email: item.patientData.email,
            timeType: item.timeType,
            patientName: item.patientData.firstName,
        };
        this.setState({
            isOpenRemedyModal: true,
            dataModal: data,
        });
    };
    closeRemedyModal = () => {
        this.setState({
            isOpenRemedyModal: false,
            dataModal: {},
        });
    };

    sendRemedy = async (dataChild) => {
        let { dataModal, description, currentDate } = this.state;
        let formattedDate = new Date(currentDate).getTime();
        this.setState({
            isShowLoading: true,
        });

        let res = await postSendRemedy({
            email: dataChild.email,
            imgBase64: dataChild.imgBase64,
            doctorId: dataModal.doctorId,
            patientId: dataModal.patientId,
            timeType: dataModal.timeType,
            language: this.props.language,
            patientName: dataModal.patientName,
            description: description,
            date: formattedDate,
        });

        if (res && res.errCode === 0) {
            this.setState({
                isShowLoading: false,
            });
            toast.success('Remedy sent successfully');
            this.closeRemedyModal();
            await this.getDataPatient();
        } else {
            this.setState({
                isShowLoading: false,
            });
            toast.error('Something went wrong...!');
        }
    };
    handleBtnRemedy = () => {};
    componentDidUpdate(prevProps, prevState, snapshot) {}
    handleTextarea = (event) => {
        this.setState({
            description: event.target.value,
        });
    };
    render() {
        let { dataPatient, isOpenRemedyModal, dataModal, description } = this.state;
        let { language } = this.props;
        return (
            <>
                <LoadingOverlay active={this.state.isShowLoading} spinner text="Loading...">
                    <div className="manage-patient-container">
                        <div className="m-p-title">
                            <FormattedMessage id="doctor.manage-schedule.title" />
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
                                            <th>
                                                <FormattedMessage id="doctor.manage-schedule.actions" />
                                            </th>
                                        </tr>
                                        {dataPatient && dataPatient.length > 0 ? (
                                            dataPatient.map((item, index) => {
                                                let time =
                                                    language === LANGUAGES.VI
                                                        ? item.timeTypeDataPatient.valueVi
                                                        : item.timeTypeDataPatient.valueEn;

                                                let gender =
                                                    language === LANGUAGES.VI
                                                        ? item.patientData.genderData.valueVi
                                                        : item.patientData.genderData.valueEn;

                                                return (
                                                    <tr key={index}>
                                                        <td>{index + 1}</td>
                                                        <td>{time}</td>
                                                        <td>{item.patientData.firstName}</td>
                                                        <td>{item.patientData.address}</td>
                                                        <td>{gender}</td>
                                                        <td>
                                                            <textarea
                                                                value={description}
                                                                onChange={(event) => this.handleTextarea(event)}
                                                            ></textarea>
                                                        </td>
                                                        <td>
                                                            <button
                                                                className="mp-btn-confirm"
                                                                onClick={() => this.handleBtnConfirm(item)}
                                                            >
                                                                <FormattedMessage id="doctor.manage-schedule.button" />
                                                            </button>
                                                        </td>
                                                    </tr>
                                                );
                                            })
                                        ) : (
                                            <tr>
                                                <td colSpan="7" style={{ textAlign: 'center' }}>
                                                    no data
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <RemedyModal
                        isOpenModal={isOpenRemedyModal}
                        dataModal={dataModal}
                        closeRemedyModal={this.closeRemedyModal}
                        sendRemedy={this.sendRemedy}
                    />
                </LoadingOverlay>
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

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ManageDoctor.scss';
import * as actions from '../../../store/actions';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import Select from 'react-select';
import { CRUD_ACTIONS, LANGUAGES } from '../../../utils';
import { getDetailInfoDoctor } from '../../../services/userService';
import { FormattedMessage } from 'react-intl';
const mdParser = new MarkdownIt();
class ManageDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contentMarkdown: '',
            contentHTML: '',
            selectedOption: '',
            description: '',
            listDoctor: [],
            hasOldData: false,

            //save to doctor_info table

            listPrice: [],
            listPayment: [],
            listProvince: [],
            listClinic: [],
            listSpecialty: [],
            selectedPrice: '',
            selectedPayment: '',
            selectedProvince: '',
            selectedClinic: '',
            selectedSpecialty: '',
            nameClinic: '',
            addressClinic: '',
            note: '',
            clinicId: '',
            specialtyId: '',
        };
    }

    componentDidMount() {
        this.props.fetchAllDoctor();
        this.props.getAllRequiredDoctorInfo();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allDoctors !== this.props.allDoctors) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors, 'USERS');
            this.setState({
                listDoctor: dataSelect,
            });
        }
        if (prevProps.language !== this.props.language) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors, 'USERS');
            this.setState({
                listDoctor: dataSelect,
            });
        }
        if (prevProps.allRequiredDoctorInfo !== this.props.allRequiredDoctorInfo) {
            let { resPayment, resPrice, resProvince, resSpecialty, resClinic } = this.props.allRequiredDoctorInfo;
            let dataSelectPrice = this.buildDataInputSelect(resPrice, 'PRICE');
            let dataSelectPayment = this.buildDataInputSelect(resPayment, 'PAYMENT');
            let dataSelectProvince = this.buildDataInputSelect(resProvince, 'PROVINCE');
            let dataSelectSpecialty = this.buildDataInputSelect(resSpecialty, 'SPECIALTY');
            let dataSelectClinic = this.buildDataInputSelect(resClinic, 'CLINIC');

            this.setState({
                listPrice: dataSelectPrice,
                listPayment: dataSelectPayment,
                listProvince: dataSelectProvince,
                listSpecialty: dataSelectSpecialty,
                listClinic: dataSelectClinic,
            });
        }
    }

    buildDataInputSelect = (InputData, type) => {
        let result = [];
        let { language } = this.props;
        if (InputData && InputData.length > 0) {
            if (type === 'USERS') {
                InputData.map((item, index) => {
                    let object = {};
                    let labelVi = `${item.lastName} ${item.firstName}`;
                    let labelEn = `${item.firstName} ${item.lastName}`;
                    object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                    object.value = item.id;
                    result.push(object);
                });
            }
        }
        if (type === 'PRICE' || type === 'PAYMENT' || type === 'PROVINCE') {
            InputData.map((item, index) => {
                let object = {};
                let labelVi = `${item.valueVi}`;
                let labelEn = `${item.valueEn}`;
                object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                object.value = item.keyMap;
                result.push(object);
            });
        }
        if (type === 'SPECIALTY') {
            InputData.map((item, index) => {
                let object = {};
                object.label = item.name;
                object.value = item.id;
                result.push(object);
            });
        }
        if (type === 'CLINIC') {
            InputData.map((item, index) => {
                let object = {};
                object.label = item.name;
                object.value = item.id;
                result.push(object);
            });
        }

        return result;
    };

    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentMarkdown: text,
            contentHTML: html,
        });
    };
    handleSaveContentMarkdown = () => {
        let { hasOldData } = this.state;
        this.props.saveDetailDoctor({
            contentHTML: this.state.contentHTML,
            contentMarkdown: this.state.contentMarkdown,
            description: this.state.description,
            doctorId: this.state.selectedOption.value,
            action: hasOldData === true ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE,

            selectedPrice: this.state.selectedPrice.value,
            selectedPayment: this.state.selectedPayment.value,
            selectedProvince: this.state.selectedProvince.value,
            nameClinic: this.state.nameClinic,
            addressClinic: this.state.addressClinic,
            note: this.state.note,
            clinicId: this.state.selectedClinic,
            specialtyId: this.state.selectedSpecialty,
        });
        console.log('check state:', this.state);
    };
    handleChangeSelect = async (selectedOption) => {
        this.setState({
            selectedOption,
        });
        let { listPayment, listPrice, listProvince, listClinic, listSpecialty } = this.state;

        let res = await getDetailInfoDoctor(selectedOption.value);
        if (res && res.errCode === 0 && res.data && res.data.Markdown) {
            let markdown = res.data.Markdown;

            let addressClinic = '',
                nameClinic = '',
                note = '',
                paymentId = '',
                priceId = '',
                provinceId = '',
                clinicId = '',
                specialtyId = '',
                selectedPayment = '',
                selectedPrice = '',
                selectedProvince = '',
                selectedSpecialty = '',
                selectedClinic = '';
            if (res.data.Doctor_Info) {
                addressClinic = res.data.Doctor_Info.addressClinic;
                nameClinic = res.data.Doctor_Info.nameClinic;
                note = res.data.Doctor_Info.note;
                paymentId = res.data.Doctor_Info.paymentId;
                priceId = res.data.Doctor_Info.priceId;
                provinceId = res.data.Doctor_Info.provinceId;
                clinicId = res.data.Doctor_Info.clinicId;
                specialtyId = res.data.Doctor_Info.specialtyId;

                selectedPayment = listPayment.find((item) => {
                    return item && item.value === paymentId;
                });

                selectedPrice = listPrice.find((item) => {
                    return item && item.value === priceId;
                });

                selectedProvince = listProvince.find((item) => {
                    return item && item.value === provinceId;
                });
                selectedSpecialty = listSpecialty.find((item) => {
                    return item && item.value === specialtyId;
                });
                selectedClinic = listClinic.find((item) => {
                    return item && item.value === clinicId;
                });
            }
            this.setState({
                contentHTML: markdown.contentHTML,
                contentMarkdown: markdown.contentMarkdown,
                description: markdown.description,
                hasOldData: true,
                addressClinic: addressClinic,
                nameClinic: nameClinic,
                note: note,
                selectedPayment: selectedPayment,
                selectedPrice: selectedPrice,
                selectedProvince: selectedProvince,
                selectedClinic: selectedClinic,
                selectedSpecialty: selectedSpecialty,
            });
        } else {
            this.setState({
                contentHTML: '',
                contentMarkdown: '',
                description: '',
                hasOldData: false,
                addressClinic: '',
                nameClinic: '',
                note: '',
                selectedPayment: '',
                selectedPrice: '',
                selectedProvince: '',
                selectedClinic: '',
                selectedSpecialty: '',
            });
        }
    };
    handleOnChangeText = (event, id) => {
        let stateCopy = { ...this.state };
        stateCopy[id] = event.target.value;
        this.setState({
            ...stateCopy,
        });
    };
    handleChangeSelectDoctorInfo = async (selectedOption, name) => {
        let stateName = name.name;
        let stateCopy = { ...this.state };
        stateCopy[stateName] = selectedOption;
        this.setState({
            ...stateCopy,
        });
    };
    render() {
        let { hasOldData } = this.state;
        return (
            <div className="manage-doctor-container">
                <div className="manage-doctor-title">
                    <FormattedMessage id="admin.manage-doctor.title" />
                </div>
                <div className="more-info">
                    <div className="content-left form-group">
                        <label>
                            <FormattedMessage id="admin.manage-doctor.select-doctor" />
                        </label>
                        <Select
                            value={this.state.selectedOption}
                            onChange={this.handleChangeSelect}
                            options={this.state.listDoctor}
                            placeholder={<FormattedMessage id="admin.manage-doctor.select-doctor" />}
                        />
                    </div>
                    <div className="content-right">
                        <label>
                            <FormattedMessage id="admin.manage-doctor.intro" />
                        </label>
                        <textarea
                            className="form-control"
                            rows="4"
                            onChange={(event) => this.handleOnChangeText(event, 'description')}
                            value={this.state.description}
                        ></textarea>
                    </div>
                </div>

                <div className="more-infor-extra row">
                    <div className="col-4 form-group">
                        <label>
                            <FormattedMessage id="admin.manage-doctor.price" />
                        </label>
                        <Select
                            value={this.state.selectedPrice}
                            onChange={this.handleChangeSelectDoctorInfo}
                            name="selectedPrice"
                            options={this.state.listPrice}
                            placeholder={<FormattedMessage id="admin.manage-doctor.price" />}
                        />
                    </div>
                    <div className="col-4 form-group">
                        <label>
                            <FormattedMessage id="admin.manage-doctor.payment" />
                        </label>
                        <Select
                            value={this.state.selectedPayment}
                            onChange={this.handleChangeSelectDoctorInfo}
                            name="selectedPayment"
                            options={this.state.listPayment}
                            placeholder={<FormattedMessage id="admin.manage-doctor.payment" />}
                        />
                    </div>
                    <div className="col-4 form-group">
                        <label>
                            <FormattedMessage id="admin.manage-doctor.province" />
                        </label>
                        <Select
                            value={this.state.selectedProvince}
                            onChange={this.handleChangeSelectDoctorInfo}
                            name="selectedProvince"
                            options={this.state.listProvince}
                            placeholder={<FormattedMessage id="admin.manage-doctor.province" />}
                        />
                    </div>
                    <div className="col-4 form-group">
                        <label>
                            <FormattedMessage id="admin.manage-doctor.nameClinic" />
                        </label>
                        <input
                            className="form-control"
                            onChange={(event) => this.handleOnChangeText(event, 'nameClinic')}
                            value={this.state.nameClinic}
                        ></input>
                    </div>
                    <div className="col-4 form-group">
                        <label>
                            <FormattedMessage id="admin.manage-doctor.addressClinic" />
                        </label>
                        <input
                            className="form-control"
                            onChange={(event) => this.handleOnChangeText(event, 'addressClinic')}
                            value={this.state.addressClinic}
                        ></input>
                    </div>
                    <div className="col-4 form-group">
                        <label>
                            <FormattedMessage id="admin.manage-doctor.note" />
                        </label>
                        <input
                            className="form-control"
                            onChange={(event) => this.handleOnChangeText(event, 'note')}
                            value={this.state.note}
                        ></input>
                    </div>
                </div>
                <div className="row">
                    <div className="col-4 form-group">
                        <label>
                            <FormattedMessage id="admin.manage-doctor.specialty" />
                        </label>
                        <Select
                            value={this.state.selectedSpecialty}
                            onChange={this.handleChangeSelectDoctorInfo}
                            options={this.state.listSpecialty}
                            placeholder={<FormattedMessage id="admin.manage-doctor.specialty" />}
                            name="selectedSpecialty"
                        />
                    </div>
                    <div className="col-4 form-group">
                        <label>
                            <FormattedMessage id="admin.manage-doctor.clinic" />
                        </label>
                        <Select
                            value={this.state.selectedClinic}
                            onChange={this.handleChangeSelectDoctorInfo}
                            options={this.state.listClinic}
                            placeholder={<FormattedMessage id="admin.manage-doctor.clinic" />}
                            name="selectedClinic"
                        />
                    </div>
                </div>
                <div className="manage-doctor-editor">
                    <MdEditor
                        style={{ height: '300px' }}
                        renderHTML={(text) => mdParser.render(text)}
                        onChange={this.handleEditorChange}
                        value={this.state.contentMarkdown}
                    />
                </div>

                <button
                    className={hasOldData === true ? 'save-content-doctor' : 'create-content-doctor'}
                    onClick={() => this.handleSaveContentMarkdown()}
                >
                    {hasOldData === true ? (
                        <span>
                            <FormattedMessage id="admin.manage-doctor.save" />
                        </span>
                    ) : (
                        <span>
                            <FormattedMessage id="admin.manage-doctor.add" />
                        </span>
                    )}
                </button>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        allDoctors: state.admin.allDoctors,
        language: state.app.language,
        allRequiredDoctorInfo: state.admin.allRequiredDoctorInfo,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchAllDoctor: () => dispatch(actions.fetchAllDoctor()),
        saveDetailDoctor: (data) => dispatch(actions.saveDetailDoctor(data)),
        getAllRequiredDoctorInfo: () => dispatch(actions.getRequiredDoctorInfo()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);

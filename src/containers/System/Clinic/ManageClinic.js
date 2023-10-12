import React, { Component } from 'react';
import { connect } from 'react-redux';

import { LANGUAGES } from '../../../utils';
import { FormattedMessage } from 'react-intl';
import * as actions from '../../../store/actions';
import './ManageClinic.scss';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import { CommonUtils } from '../../../utils';
import { createNewClinic, getAllDetailClinicByIdForManageClinic } from '../../../services/userService';
import { toast } from 'react-toastify';

import Select from 'react-select';

const mdParser = new MarkdownIt();

class ManageClinic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listClinic: [],
            clinicId: '',
            name: '',
            address: '',
            imageBase64: '',
            descriptionHTML: '',
            descriptionMarkdown: '',
            selectedClinic: '',
            action: 'EDIT',
        };
    }

    async componentDidMount() {
        this.props.getAllRequiredDoctorInfo();
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allRequiredDoctorInfo !== this.props.allRequiredDoctorInfo) {
            let { resClinic } = this.props.allRequiredDoctorInfo;
            console.log(resClinic);
            let dataSelectClinic = this.buildDataInputSelect(resClinic);
            this.setState({
                listClinic: dataSelectClinic,
            });
        }
    }
    buildDataInputSelect = (inputData) => {
        let results = [];
        if (inputData && inputData.length > 0) {
            inputData.map((item, index) => {
                let object = {};
                object.value = item.id;
                object.label = item.name;
                results.push(object);
            });
        }
        console.log(results);
        return results;
    };
    handleOnChangeInput = (event, id) => {
        let stateCopy = { ...this.state };
        stateCopy[id] = event.target.value;
        this.setState({ ...stateCopy });
    };

    handleEditorChange = ({ html, text }) => {
        this.setState({
            descriptionHTML: html,
            descriptionMarkdown: text,
        });
    };
    handleOnchangeImage = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            this.setState({
                imageBase64: base64,
            });
        }
    };

    handleSaveNewClinic = async () => {
        let res = await createNewClinic(this.state);
        console.log('saveNewClinic', this.state);
        if (res && res.errCode === 0) {
            toast.success('Add new specialty succeeds');
            this.setState({
                name: '',
                address: '',
                imageBase64: '',
                descriptionHTML: '',
                descriptionMarkdown: '',
            });
        } else {
            toast.error('Add new specialty fails');
        }
    };

    handleChangeSelect = async (selectedOption) => {
        this.setState({
            selectedOption,
        });
        console.log('check selected option', selectedOption);
        let { listClinic } = this.state;
        let res = await getAllDetailClinicByIdForManageClinic(selectedOption.value);
        console.log('check handle change select', res);
        if (res && res.errCode === 0) {
            let clinicId = '',
                name = '',
                address = '',
                descriptionHTML = '',
                descriptionMarkdown = '',
                selectedClinic = '';
            if (res.data) {
                name = res.data.name;
                address = res.data.address;
                descriptionHTML = res.data.descriptionHTML;
                descriptionMarkdown = res.data.descriptionMarkdown;
                clinicId = selectedOption.value;
                selectedClinic = listClinic.find((item) => {
                    return item && item.value === clinicId;
                });
            }
            this.setState({
                clinicId: selectedOption.value,
                name: name,
                address: address,
                descriptionHTML: descriptionHTML,
                descriptionMarkdown: descriptionMarkdown,
                selectedClinic: selectedClinic,
            });
        } else {
            this.setState({
                clinicId: '',
                name: '',
                address: '',
                descriptionHTML: '',
                descriptionMarkdown: '',
                selectedClinic: '',
            });
        }
    };

    render() {
        console.log('list clinic', this.state.listClinic);
        return (
            <>
                <div className="manage-specialty-container">
                    <div className="ms-title">
                        <FormattedMessage id="menu.admin.manage-clinic" />
                    </div>

                    <div className="add-new-specialty row">
                        <div className="col-6 form-group">
                            <label>
                                <FormattedMessage id="menu.admin.clinic-name" />
                            </label>
                            <Select
                                value={this.state.selectedClinic}
                                onChange={this.handleChangeSelect}
                                options={this.state.listClinic}
                            />
                        </div>

                        <div className="col-6 form-group">
                            <label>
                                <FormattedMessage id="menu.admin.clinic-image" />
                            </label>
                            <input
                                className="form-control-file"
                                type="file"
                                onChange={(event) => this.handleOnchangeImage(event)}
                            />
                        </div>
                        <div className="col-6 form-group">
                            <label>
                                <FormattedMessage id="menu.admin.clinic-address" />
                            </label>
                            <input
                                className="form-control"
                                type="text"
                                value={this.state.address}
                                onChange={(event) => this.handleOnChangeInput(event, 'address')}
                            />
                        </div>
                        <div className="col-12">
                            <MdEditor
                                style={{ height: '300px' }}
                                renderHTML={(text) => mdParser.render(text)}
                                onChange={this.handleEditorChange}
                                value={this.state.descriptionMarkdown}
                            />
                        </div>
                        <div className="col-12">
                            <button className="btn-save-specialty" onClick={() => this.handleSaveNewClinic()}>
                                Update
                            </button>
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
        allRequiredDoctorInfo: state.admin.allRequiredDoctorInfo,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getAllRequiredDoctorInfo: () => dispatch(actions.getRequiredDoctorInfo()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageClinic);

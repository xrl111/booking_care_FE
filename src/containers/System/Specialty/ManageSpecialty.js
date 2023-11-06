import React, { Component } from 'react';
import { connect } from 'react-redux';

import { LANGUAGES } from '../../../utils';
import { FormattedMessage } from 'react-intl';
import './ManageSpecialty.scss';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import { CommonUtils } from '../../../utils';
import { createNewSpecialty, getAllDetailSpecialtyByIdForManageSpecialty } from '../../../services/userService';
import { toast } from 'react-toastify';
import * as actions from '../../../store/actions';
import Select from 'react-select';
const mdParser = new MarkdownIt();

class ManageSpecialty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listSpecialty: [],
            specialtyId: '',
            selectedSpecialty: '',
            name: '',
            imageBase64: '',
            descriptionHTML: '',
            descriptionMarkdown: '',
            action: 'EDIT',
        };
    }

    componentDidMount() {
        this.props.getAllRequiredDoctorInfo();
    }
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

    handleSaveNewSpecialty = async () => {
        let res = await createNewSpecialty(this.state);
        if (res && res.errCode === 0) {
            toast.success('Add new specialty succeeds');
        } else {
            toast.error('Add new specialty fails');
        }
    };
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allRequiredDoctorInfo !== this.props.allRequiredDoctorInfo) {
            let { resSpecialty } = this.props.allRequiredDoctorInfo;

            let dataSelectSpecialty = this.buildDataInputSelect(resSpecialty);
            this.setState({
                listSpecialty: dataSelectSpecialty,
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

        return results;
    };
    handleChangeSelect = async (selectedOption) => {
        this.setState({
            selectedOption,
        });

        let { listSpecialty } = this.state;
        let res = await getAllDetailSpecialtyByIdForManageSpecialty(selectedOption.value);

        if (res && res.errCode === 0) {
            let specialtyId = '',
                name = '',
                descriptionHTML = '',
                descriptionMarkdown = '',
                selectedSpecialty = '';
            if (res.data) {
                name = selectedOption.label;
                descriptionHTML = res.data.descriptionHTML;
                descriptionMarkdown = res.data.descriptionMarkdown;
                specialtyId = selectedOption.value;
                selectedSpecialty = listSpecialty.find((item) => {
                    return item && item.value === specialtyId;
                });
            }
            this.setState({
                specialtyId: selectedOption.value,
                name: name,
                descriptionHTML: descriptionHTML,
                descriptionMarkdown: descriptionMarkdown,
                selectedSpecialty: selectedSpecialty,
            });
        } else {
            this.setState({
                specialtyId: '',
                name: '',
                descriptionHTML: '',
                descriptionMarkdown: '',
                selectedSpecialty: '',
            });
        }
    };
    render() {
        return (
            <>
                <div className="manage-specialty-container">
                    <div className="ms-title">
                        {' '}
                        <FormattedMessage id="menu.admin.manage-specialty" />
                    </div>
                    <div className="add-new-specialty row">
                        <div className="col-6 form-group">
                            <label>
                                {' '}
                                <FormattedMessage id="menu.admin.specialty-name" />
                            </label>
                            <Select
                                value={this.state.selectedSpecialty}
                                onChange={this.handleChangeSelect}
                                options={this.state.listSpecialty}
                            />
                        </div>

                        <div className="col-6 form-group">
                            <label>
                                <FormattedMessage id="menu.admin.specialty-image" />
                            </label>
                            <input
                                className="form-control-file"
                                type="file"
                                onChange={(event) => this.handleOnchangeImage(event)}
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
                            <button className="btn-save-specialty" onClick={() => this.handleSaveNewSpecialty()}>
                                Save
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageSpecialty);

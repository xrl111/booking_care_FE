import React, { Component } from 'react';
import { connect } from 'react-redux';

import { LANGUAGES } from '../../../utils';
import { FormattedMessage } from 'react-intl';
import './CreateClinic.scss';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import { CommonUtils } from '../../../utils';
import { createNewClinic } from '../../../services/userService';
import { toast } from 'react-toastify';

const mdParser = new MarkdownIt();

class CreateClinic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            address: '',
            imageBase64: '',
            descriptionHTML: '',
            descriptionMarkdown: '',
            action: 'ADD',
        };
    }

    componentDidMount() {}
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
    componentDidUpdate(prevProps, prevState, snapshot) {}
    render() {
        return (
            <>
                <div className="manage-specialty-container">
                    <div className="ms-title">
                        <FormattedMessage id="menu.admin.create-clinic" />
                    </div>

                    <div className="add-new-specialty row">
                        <div className="col-6 form-group">
                            <label>
                                <FormattedMessage id="menu.admin.clinic-name" />
                            </label>
                            <input
                                className="form-control"
                                type="text"
                                value={this.state.name}
                                onChange={(event) => this.handleOnChangeInput(event, 'name')}
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
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateClinic);

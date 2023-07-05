
import { Modal, ModalBody, ModalFooter, ModalHeader, Button } from "reactstrap";
import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
class ModalUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: '',
        }
    }
    componentDidMount() {
    }

    toggle = () => {
        this.props.toggleFromParent();
    }

    handleOnChangeInput(event, id) {
        let copyState = { ...this.state };
        copyState[id] = event.target.value;

        this.setState({
            ...copyState
        }, () => {
            console.log('check state', copyState);
        })
    }

    checkValidateInput = () => {
        let isValid = true;
        let arrInput = ['email', 'password', 'firstName', 'lastName', 'address']
        for (let i = 0; i < arrInput.length; i++) {
            if (this.state[arrInput[i]]) {
                isValid = false;
                alert('Missing parameter: ' + arrInput[i]);
                break;
            }

        }
        return isValid;
    }

    handAddNewUser

    render() {
        return (
            <Modal
                isOpen={this.props.isOpen}
                toggle={() => { this.toggle() }}
                className={'modal-user-container'}
                size="lg"
                centered
            >
                <ModalHeader toggle={() => { this.toggle() }}>Create a new user</ModalHeader>
                <ModalBody>
                    <div className="modal-user-body">
                        <div className="input-container">
                            <label>Email</label>
                            <input
                                type="text"
                                className=""
                                onChange={(event) => { this.handleOnChangeInput(event, 'email') }}
                                value={this.state.email}
                            />
                        </div>
                        <div className="input-container">
                            <label>Password</label>
                            <input
                                type="password"
                                className=""
                                onChange={(event) => { this.handleOnChangeInput(event, 'password') }}
                            />
                        </div>
                        <div className="input-container">
                            <label>firstName</label>
                            <input
                                type="text"
                                className=""
                                onChange={(event) => { this.handleOnChangeInput(event, 'firstName') }}
                                value={this.state.firstName}
                            />
                        </div>
                        <div className="input-container">
                            <label>lastName</label>
                            <input
                                type="text"
                                className=""
                                onChange={(event) => { this.handleOnChangeInput(event, 'lastName') }}
                                value={this.state.lastName}
                            />
                        </div>
                        <div className="input-container max-width-input">
                            <label>address</label>
                            <input
                                type="text"
                                className=""
                                onChange={(event) => { this.handleOnChangeInput(event, 'address') }}
                                value={this.state.address}
                            />
                        </div>
                    </div>

                </ModalBody>
                <ModalFooter>
                    <Button color="primary" className="px-3" onClick={() => { this.handAddNewUser() }}>Add new</Button>
                    <Button color="secondary" className="px-3" onClick={() => { this.toggle() }}>Cancel</Button>
                </ModalFooter>
            </Modal>
        )
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);


import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import * as actions from '../../../store/actions'
import { LANGUAGES } from '../../../utils';

import Slider from "react-slick"

class OutStandingDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrDoctors: []
        };
    }
    componentDidMount() {
        this.props.loadTopDoctor()
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.topDoctorRedux !== this.props.topDoctorRedux) {
            this.setState({
                arrDoctors: this.props.topDoctorRedux
            })
        }
    }
    render() {
        let arrDoctors = this.state.arrDoctors;
        return (
            <div className='section-share section-outstanding-doctor'>
                <div className='section-container '>
                    <div className='section-header'>
                        <span className='title-section'>Bác sĩ nổi bật</span>
                        <button className='btn-section'>xem them</button>
                    </div>
                    <div className='section-body'>
                        <Slider {...this.props.settings}>

                            {arrDoctors && arrDoctors.length > 0 &&
                                arrDoctors.map((item, index) => {
                                    let imageBase64 = ''
                                    if (item.image) {
                                        imageBase64 = new Buffer(item.image, 'base64').toString('binary');
                                    }
                                    let nameVi = `${item.positionData.valueVi}, ${item.lastName} ${item.firstName} `;
                                    let nameEn = `${item.positionData.valueEn}, ${item.firstName} ${item.lastName}`
                                    return (
                                        <div className='section-customize' key={index}>
                                            <div className='customize-border'>
                                                <div className='outer-bg'>
                                                    <div className='bg-image section-outstanding-doctor'
                                                        style={{ backgroundImage: `url(${imageBase64})` }}></div>
                                                </div>

                                                <div className='position text-center'>
                                                    <div>{this.props.language === LANGUAGES.VI ? nameVi : nameEn}</div>
                                                    <div>Co xuong khop 1</div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                        </Slider>
                    </div>

                </div>
            </div>

        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        topDoctorRedux: state.admin.topDoctors
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadTopDoctor: () => dispatch(actions.fetchTopDoctor())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(OutStandingDoctor);

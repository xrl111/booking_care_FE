import React, { Component } from 'react';
import { connect } from 'react-redux';
import './MedicalFacility.scss';
import Slider from 'react-slick';
import { FormattedMessage } from 'react-intl';
class MedicalFacility extends Component {
    render() {
        return (
            <div className='section-share section-medical-facility'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='title-section'><FormattedMessage id="homepage.facility" /></span>
                        <button className='btn-section'><FormattedMessage id="homepage.moreInfo" /></button>
                    </div>
                    <div className='section-body'>
                        <Slider {...this.props.settings}>
                            <div className='section-customize'>
                                <div className='bg-image section-medical-facility'></div>
                                <div>Hệ thống thu cúc 1</div>
                            </div>
                            <div className='section-customize'>
                                <div className='bg-image section-medical-facility1'></div>
                                <div>Bệnh viện Chợ Rẫy</div>
                            </div>
                            <div className='section-customize'>
                                <div className='bg-image section-medical-facility2'></div>
                                <div>Phòng khám Bênh viện Đại học Y Dược 1</div>
                            </div>
                            <div className='section-customize'>
                                <div className='bg-image section-medical-facility3'></div>
                                <div>Trung tâm Khám sức khỏe định kỳ, Bệnh viện Trung ương Quân đội 108</div>
                            </div>
                            <div className='section-customize'>
                                <div className='bg-image section-medical-facility'></div>
                                <div>Hệ thống thu cúc 1</div>
                            </div>
                            <div className='section-customize'>
                                <div className='bg-image section-medical-facility'></div>
                                <div>Hệ thống thu cúc 1</div>
                            </div>
                            <div className='section-customize'>
                                <div className='bg-image section-medical-facility'></div>
                                <div>Hệ thống thu cúc 1</div>
                            </div>
                            <div className='section-customize'>
                                <div className='bg-image section-medical-facility'></div>
                                <div>Hệ thống thu cúc 1</div>
                            </div>
                            <div className='section-customize'>
                                <div className='bg-image section-medical-facility'></div>
                                <div>Hệ thống thu cúc 1</div>
                            </div>
                            <div className='section-customize'>
                                <div className='bg-image section-medical-facility'></div>
                                <div>Hệ thống thu cúc 1</div>
                            </div>
                            <div className='section-customize'>
                                <div className='bg-image section-medical-facility'></div>
                                <div>Hệ thống thu cúc 1</div>
                            </div>
                        </Slider>
                    </div>

                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MedicalFacility);

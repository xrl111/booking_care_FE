import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import './Specialty.scss';
import Slider from "react-slick"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


class Specialty extends Component {

    render() {
        let settings = {
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 1
        };

        return (
            <div className='section-specialty'>
                <div className='specialty-content'>
                    <Slider {...settings}>
                        <div className='img-customize'>
                            <h3>1</h3>
                        </div>
                        <div className='img-customize'>
                            <h3>1</h3>
                        </div>
                        <div className='img-customize'>
                            <h3>1</h3>
                        </div>
                        <div className='img-customize'>
                            <h3>1</h3>
                        </div>
                        <div className='img-customize'>
                            <h3>1</h3>
                        </div>
                        <div className='img-customize'>
                            <h3>1</h3>
                        </div>
                    </Slider>
                </div>
            </div>

        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Specialty);
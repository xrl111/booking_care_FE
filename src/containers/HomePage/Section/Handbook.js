import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Slider from "react-slick"

class HandBook extends Component {

    render() {

        return (
            <div className='section-share section-handbook'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='title-section'><FormattedMessage id="homepage.handbook" /></span>
                        <button className='btn-section'><FormattedMessage id="homepage.moreInfo" /></button>
                    </div>
                    <div className='section-body'>
                        <Slider {...this.props.settings}>
                            <div className='section-customize'>
                                <a target='_blank' href='https://edoctor.io/bai-viet/chuom-mat-ho-tro-ha-sot-sau-tiem-vaccine-covid-19-nen-lam-the-nao-de-hieu-qua?id=614411ee39443e002363bba2'> <div className='bg-image section-handbook'></div>
                                    <div>Chườm mát hỗ trợ hạ sốt sau tiêm vaccine COVID-19 nên làm thế nào để hiệu quả?</div>
                                </a>
                            </div>
                            <div className='section-customize'>
                                <a target='_blank' href='https://edoctor.io/bai-viet/8-bi-quyet-giu-vung-suc-khoe-tinh-than-mua-dich?id=610be0923e7a23001c196f67'>
                                    <div className='bg-image section-handbook1'></div>
                                    <div>8 bí quyết giữ vững sức khỏe tinh thần mùa dịch</div>
                                </a>
                            </div>
                            <div className='section-customize'>
                                <a target='_blank' href='https://edoctor.io/bai-viet/8-bi-quyet-giu-vung-suc-khoe-tinh-than-mua-dich?id=610be0923e7a23001c196f67'>
                                    <div className='bg-image section-handbook2'></div>
                                    <div>6 món đồ quen thuộc trong gia đình chính là 'ổ chứa' chất gây ung thư</div>
                                </a>
                            </div>
                            <div className='section-customize'>
                                <a target='_blank' href='https://edoctor.io/bai-viet/xoay-co-giam-nhuc-moi-dung-cach'>
                                    <div className='bg-image section-handbook3'></div>
                                    <div>Xoay cổ giảm nhức mỏi đúng cách</div>
                                </a>
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
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HandBook);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';


class Address extends Component {

    render() {

        return (
            <div className='section-share section-address'>
                <div className='section-address-header'>
                    <FormattedMessage id='homeheader.address' />
                </div>
                <div className='section-address-content'>
                    <div className='content-left'>
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.249153860677!2d105.78806025461147!3d21.02271448163657!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x313454b329f68977%3A0x6ddf5ff1e829fc56!2zxJDhuqFpIEjhu41jIEdyZWVud2ljaCBWaeG7h3QgTmFt!5e0!3m2!1svi!2s!4v1692668929208!5m2!1svi!2s"
                            width="100%"
                            height="100%"
                            allowfullscreen=""
                            loading="lazy"
                            referrerpolicy="no-referrer-when-downgrade"></iframe>
                    </div>
                    <div className='content-right'>
                        <div><b>Thông tin liên hệ:</b></div>
                        <div>Địa chỉ: Tòa nhà Golden Park, số 2 Phạm Văn Bạch, phường Yên Hòa, quận Cầu Giấy, Hà Nội</div>
                        <div>Greenwich Việt Nam, cơ sở Hà Nội</div>
                        <div><b>SĐT:</b>024.730 66788</div>
                        <div><b>Email:</b>acad.gre.hn@fe.edu.vn</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Address);

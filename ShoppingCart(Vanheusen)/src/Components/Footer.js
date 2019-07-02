import React, { Component } from 'react';

class Footer extends Component {
    render() {
        return (  
            <div className='footer'>
            <br/>
            <p className='foottext'>follow us on</p>
            <br/>
            <div className='footicons'>
            <i class="fab fa-facebook-f icons"></i>
            <i class="fab fa-twitter icons"></i>
            <i class="fab fa-instagram icons1"></i>
            </div>
            </div>
        );
    }
}

export default Footer;

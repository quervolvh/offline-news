import React, { FunctionComponent } from 'react';

const LandingLayoutFooterCr: FunctionComponent = () => {

    return (
        <div className="landingLayout-footer-cr footer">

            <div className="landingLayout-footer-cr-holder">

                <p> ©{new Date().getFullYear()} All rights reserved </p>

            </div>

        </div>
    );
}

export default LandingLayoutFooterCr;
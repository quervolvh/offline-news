import React, { useState } from 'react';
import { Button, MobileHeaderToggler } from 'components';
import { rightLinks } from 'constants/index';

export const MobileHeader: React.FC<Props> = ({ addRecordTrigger, revealRecords }) => {

    const [isExpanded, setIsExpanded] = useState(false);

    const links = rightLinks;

    return (
        <div className="landingLayout-header-mobile">

            <MobileHeaderToggler setExpansion={setIsExpanded} isExpanded={isExpanded} />

            <div className={`landingLayout-header-mobile-exp ${isExpanded ? "expanded" : ""}`}>

                <MobileHeaderToggler setExpansion={setIsExpanded} isExpanded={isExpanded} />

                <div className="landingLayout-header-mobile-bottom">

                    <div className="landingLayout-header-mobile-links">

                        <a

                            onClick={(e) => {

                                e.preventDefault();

                                revealRecords()

                            }}

                        >

                            Show Records

                        </a>

                        <Button

                            className='no-bg'

                            label='Add Record'

                            onClick={() => addRecordTrigger()}

                        />

                    </div>

                </div>

            </div>

        </div>
    );
}

interface Props {

    addRecordTrigger(): void,

    revealRecords(): void

}

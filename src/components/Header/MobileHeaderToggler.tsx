import React from 'react';
import Link from 'next/link';

export const MobileHeaderToggler: React.FC<Props> = ({ setExpansion, isExpanded }): JSX.Element => {

    return (

        <div className="landingLayout-header-mobile-top">

            <Link href={"/"} >

                <img src={"svg/boldo-dual.svg"} alt={"companyal"} />

            </Link>

            <i
                className={isExpanded ? "fas fa-times" : "fas fa-bars"}
                onClick={() => {
                    setExpansion(!isExpanded);
                }}
            />

        </div>

    );
}

interface Props {
    setExpansion(e: boolean): void,
    isExpanded: boolean
}

import React, { useEffect } from 'react';
import Link from 'next/link';
import { classnames } from 'utils';
import { Button } from 'components';


export const FullHeader: React.FC<Props> = ({ addRecordTrigger, revealRecords }) => {

    const scrollListener = () => {

        if (window.scrollY > 150 && window.screenY < 180) {

            document?.getElementsByClassName?.("landingLayout-header")?.[0]?.classList?.add("header-stick-to-background");

        }

        if (window.scrollY < 120) {

            document?.getElementsByClassName?.("landingLayout-header")?.[0]?.classList?.remove("header-stick-to-background");

        }

    };

    useEffect(() => {

        if (typeof window !== "undefined") {

            window.addEventListener("scroll", scrollListener, true);


            return (() => {

                window.removeEventListener("scroll", scrollListener, true)

            })

        }

        // eslint-disable-next-line
    }, [document]);

    return (
        <div
            className={classnames('landingLayout-header', 'with-shades')}>

            <div className="landingLayout-header-holder">

                <div className="landingLayout-header-left">

                    <a onClick={(e) => e?.preventDefault()}>

                        <img src={"svg/boldo-dual.svg"} alt={"boldo"} />

                    </a>

                </div>


                <div className="landingLayout-header-right">

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
    );
}

interface Props {

    addRecordTrigger(): void,

    revealRecords(): void

}

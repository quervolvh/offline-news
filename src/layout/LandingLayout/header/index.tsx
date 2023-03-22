import React, { useState } from 'react';
import { AddRecord } from './AddRecord';
import { FullHeader } from './FullHeader';
import { ListRecords } from './ListRecords';
import { MobileHeader } from './MobileHeader';

export const Header: React.FC<Props> = ({ isMobile }): JSX.Element => {

    const [trigger, setTrigger] = useState({

        addRecord: 0,

        listRecords: 0

    });

    const click = (action: "addRecord" | "listRecords") => {

        setTrigger((prevState) => ({ ...prevState, [action]: prevState[action] + 1 }));

    }

    return (
        <>

            {(isMobile) ?

                <MobileHeader

                    addRecordTrigger={() => click("addRecord")}

                    revealRecords={() => click("listRecords")}

                /> :

                <FullHeader

                    addRecordTrigger={() => click("addRecord")}

                    revealRecords={() => click("listRecords")}

                />

            }

            <AddRecord trigger={trigger.addRecord} />

            <ListRecords trigger={trigger.listRecords} />

        </>
    )
}
interface Props {
    isMobile: boolean,
    deviceWidth: number,
}

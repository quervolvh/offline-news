import React, { useEffect, useState } from "react";
import { Modal, ViewFormatter } from "components";
import { blogPostType, userRecord } from "types";
import { EmptyHistory } from "common/Placeholders";

export const ListRecords: React.FC<{ trigger?: number, post?: blogPostType }> = ({ trigger }) => {

    const [state, setState] = useState<{
        visibility: boolean,
        userRecords: userRecord[],

    }>({
        visibility: false,
        userRecords: []
    });

    const onExit = () => setState((prevState) => ({

        ...prevState,

        visibility: false,

    }));

    useEffect(() => {

        if (trigger && trigger > 0) {

            let userRecords: userRecord[] = [];

            const storageRef: any = localStorage.getItem("user-records");

            if (storageRef && JSON.parse(storageRef)) {

                const records: { userRecords: userRecord[] } = JSON.parse(storageRef);

                userRecords = records?.userRecords || [];

            }

            setState({ userRecords, visibility: true });

        }

        // eslint-disable-next-line
    }, [trigger]);

    return (

        <>

            <Modal

                visibility={state.visibility}

                toggleOut={() => onExit()}


            >

                <>

                    <h2 className="text-center color-darker mb-2 mt-1"> Records </h2>

                    <p className="text-center small-text color-darker mb-5">All saved records are here </p>

                    {state.userRecords.map((item) => (

                        <ViewFormatter title={item.name} value={item.email} />

                    ))}

                    {!state.userRecords.length && <EmptyHistory />}

                </>

            </Modal>

        </>

    );

}
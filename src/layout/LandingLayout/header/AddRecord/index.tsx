import React, { useEffect, useState } from "react";
import { Modal } from "components";
import { blogPostType, userRecord } from "types";
import { AddRecordForm } from "./AddRecordForm";

export const AddRecord: React.FC<{ trigger?: number, post?: blogPostType }> = ({ trigger }) => {

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

    // const ratePost = (score: number) => {

    //     setState((prevState) => ({ ...prevState, blogRating: score }));

    //     const storageRef: any = localStorage.getItem("ratings");

    //     if (storageRef && JSON.parse(storageRef) && post) {

    //         const userRatedBlogs: { [key: string]: number } = JSON.parse(storageRef);

    //         userRatedBlogs[post.id] = score;

    //         localStorage.setItem("ratings", JSON.stringify(userRatedBlogs));

    //         return;

    //     }

    //     localStorage.setItem("ratings", JSON.stringify({ [post?.id || '']: score }));

    // };

    useEffect(() => {

        if (trigger && trigger > 0) {

            let userRecords: userRecord[] = [];

            const storageRef: any = localStorage.getItem("user-records");

            if (storageRef && JSON.parse(storageRef)) {

                const records: { users: userRecord[] } = JSON.parse(storageRef);

                userRecords = records?.users || [];

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

                <AddRecordForm

                    onClose={() => onExit()}

                />

            </Modal>

        </>

    );

}
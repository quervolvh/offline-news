import React, { useEffect, useState } from 'react';
import { Button, FormError, FormField } from 'components';
import { change, errorItem, getPredefinedErrors, quickValidation } from 'utils';
import { userRecord } from 'types';

export const AddRecordForm: React.FC<Props> = ({ onClose }) => {

    const initialState = {
        email: "",
        name: "",
        error: getPredefinedErrors(["email"]),
        loading: false,
        attempt: 0,
        success: undefined
    };

    const [state, setState] = useState<stateType>(initialState);

    const getAllRecords = () => {

        let userRecords: userRecord[] = [];

        const storageRef: any = localStorage.getItem("user-records");

        if (storageRef && JSON.parse(storageRef)) {

            const records: { userRecords: userRecord[] } = JSON.parse(storageRef);

            userRecords = records?.userRecords || [];

        }

        return userRecords;

    }

    const onChanged = (e: any, field: string) => {

        e = field === "email" ? String(e).trim() : String(e);

        const validation = quickValidation(field, e, state);

        setState((prevState) => ({ ...prevState, [field]: e, error: validation, success: undefined }));

    }

    const formError = Object.values(state.error || {}).map(item => item).filter((item) => Array.isArray(item)).length > 0;

    const disabled = () => {

        if (state.attempt > 0) return formError;

        return false;

    }

    const subscribe: () => void = async () => {

        change(true, "loading", setState);

        const body =

        {

            "email": state?.email,

            "name": state?.name

        };

        localStorage.setItem("user-records",

            JSON.stringify({

                userRecords: [...getAllRecords(), body]

            })

        );

        setState((prevState) => ({

            ...prevState,

            success: true,

            loading: false

        }));

    };

    const preProcess = () => {

        if (state.success === true) return;

        setState((prevState) => ({ ...prevState, success: undefined, attempt: prevState.attempt + 1 }))

        if (!state?.email || state.loading) return;

        if (formError) return;

        if (getAllRecords()?.find(item => state.email?.toLowerCase() === item.email.toLowerCase())) {

            setState((prevState) => ({ ...prevState, success: "Similar email record exists" }));

            return;

        }

        subscribe();
    }

    const keyDown = (e: React.KeyboardEvent) => {

        if (e.key === "Enter") {

            preProcess();

        }

    }

    useEffect(() => {

        if (state.success === true) {

            setTimeout(() => {

                onClose();

            }, 3000);

        }

        // eslint-disable-next-line
    }, [state.success]);

    const errorText = () => {

        if (state.success === true) return undefined;

        if (typeof state.success === "string") return state.success;

        return undefined;

    }

    const extraProps = {
        className: "",
        disabled: state.success === true,
        onKeyDown: (e: React.KeyboardEvent) => keyDown(e)
    };

    return (

        <div

            className='newsletter-form'
            id={"news-letter"}
        >

            <div>

                <h2 className="text-center color-darker mb-2 mt-1"> Add User Account </h2>

                <p className="text-center small-text color-darker mb-5"> Create a user account for later use </p>

                <FormField
                    label='Name'
                    placeHolder={"input your name"}
                    value={state.name}
                    onChange={(e: any) => onChanged(e, "name")}
                    error={state.attempt > 0 && errorItem(state?.error || {}, "name")}
                    {...extraProps}
                />

                <FormField
                    label='Email'
                    placeHolder={"input your email address"}
                    value={state.email}
                    onChange={(e: any) => onChanged(e, "email")}
                    error={state.attempt > 0 && errorItem(state?.error || {}, "email")}
                    {...extraProps}
                />

                <FormError
                    text={errorText() || ""}
                    condition={(typeof state.success === "string" || state.success === true) && errorText() !== undefined}
                    className={state.success === true ? "newsletter-form-success" : undefined}
                />

                <Button
                    label={(state.success === true) ? "Success" : (state.loading ? "Please wait..." : "Join")}
                    onClick={() => preProcess()}
                    disabled={disabled()}
                    className={state.success === true ? "button-success" : ""}
                />

            </div>

        </div>

    );

}

type stateType = {
    fullName?: string,
    error: { [key: string]: {} },
    loading: boolean,
    attempt: number,
    success?: boolean | string,
    email?: string,
    name?: string,
    state?: { label: string, value: string }
}

interface Props {

    onClose: () => void,

}

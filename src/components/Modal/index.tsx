import React, { ReactElement, useRef, useState } from 'react';
import { useOnClickOutside } from '../../hooks/useOnClickOutside';
import { createPortal } from "react-dom";
import { useEffect } from 'react';
import { classnames, getModalHierarchy } from 'utils';
import router from 'next/router';

const ModalDom: React.FC<Props> = ({ title, subtitle, noObviousExit, ...props }) => {

    const [animClass, setAnimClass] = useState({ modal: "", overlay: "fadeInside", holder: "slideUpInside" });

    const [modalHierarchy, setModalHierarchy] = useState(1);
    const [uniqueId] = useState("modal-" + Math.random().toString(36).substring(2, 5));

    const ref: any = useRef();

    const showReboundEffect = () => {
        setAnimClass({ modal: "", overlay: "", holder: "" });
        setTimeout(() => setAnimClass({ modal: "rebound", overlay: "", holder: "" }), 100);
    };

    const urlOperation = (actionMode?: boolean, popMode?: boolean) => {

        if (actionMode) {

            router.replace(router.pathname);

        }

        if ((popMode && window) && !actionMode) {

            window.history.go(-1);

        }

    }

    const toggle = (force = false) => {

        if (props.toggleOut) {

            if (props.outsideEscape === false && props.normalEscape !== true) {
                showReboundEffect();
                return;
            }

            if (props.toggleOut !== undefined) {

                setAnimClass({ modal: "slideDown", overlay: "fadeOutside", holder: "" });

                setTimeout(() => {

                    if (!force) {

                        urlOperation(["login", "expiredToken"].includes(String(router.query?.action)), true);

                    }

                    // @ts-expect-error
                    props.toggleOut();

                }, 500);

            }

        }
    }

    const toggleModal = (force: boolean) => {
        if (props.visibility && toggle) {
            toggle(force);
        }
    }

    const applyToggle = (force?: boolean | 'exitClick') => {

        const noRipple = force === "exitClick" && props.normalEscape;

        const reboundCondition = !noRipple && props.outsideEscape === false && props.normalEscape !== true;

        if (reboundCondition) {
            showReboundEffect();
            return;
        }

        if (modalHierarchy === 0 || getModalHierarchy(uniqueId).hierarchy === 0) {

            toggleModal(true);

        }

    }

    useEffect(() => {

        const config = { childList: true };

        const callback = function () {
            setModalHierarchy(getModalHierarchy(uniqueId).hierarchy);
        };

        const observer = new MutationObserver(callback);

        if (process.browser) {
            observer.observe(document.body, config);
        }

        return (() => {
            observer.disconnect();
        })

        // eslint-disable-next-line
    }, [process.browser]);

    useOnClickOutside(ref, () => applyToggle());

    if (props.visibility) {

        return (
            <div
                className={classnames('modal-overlay', props.overlayClass, animClass.overlay)} id={uniqueId}
                onTouchStart={e => e.stopPropagation()}
                tabIndex={0}>

                <div
                    className={classnames('modal-holder', props.holderClass, animClass.holder)}
                    onTouchStart={e => e.stopPropagation()}
                >

                    <div
                        className="modal-container"
                        onTouchStart={e => e.stopPropagation()}
                    >

                        {props.topIcon &&
                            <div className={`modal-top-icon`} >
                                <img
                                    src={props.topIcon}
                                    alt={title || ""} />
                            </div>
                        }

                        <div
                            className={`modal ${animClass.modal} ${props.class || ''}`} ref={ref}>

                            {
                                !noObviousExit &&

                                <div className="modal-exit">
                                    <i
                                        className="fas fa-times"
                                        onClick={() => applyToggle("exitClick")}
                                        role={"button"}
                                        onKeyDown={(e) => e.key === "Enter" && applyToggle(true)}
                                        tabIndex={0} >
                                    </i>
                                </div>

                            }

                            {
                                props.navigatorExit &&

                                <div
                                    className="modal-navigator-exit"
                                    onClick={() => applyToggle(true)}
                                    role={"button"}
                                    onKeyDown={(e) => e.key === "Enter" && applyToggle(true)}
                                    tabIndex={0}
                                >

                                    <i className="fas fa-chevron-left" />

                                </div>

                            }

                            {props.icon &&
                                <div className="modal-icon">
                                    <img
                                        src={props.icon}
                                        alt={title || ""} />
                                </div>
                            }

                            {(title || subtitle) && !props.legendComponent &&
                                <div
                                    className={`modal-legend ${props.legendClass || ""}`}>
                                    {
                                        title &&

                                        <div className={
                                            classnames(
                                                "modal-legend-title",
                                                (props.titleSvgIcon || props.titleFlexComponent) && "modal-legend-title-flex"
                                            )
                                        }>

                                            <p> {title} </p>

                                            {props.titleSvgIcon &&
                                                <div
                                                    className="modal-legend-title-icon"
                                                    dangerouslySetInnerHTML={{ __html: props.titleSvgIcon }}
                                                />
                                            }

                                            {props.titleFlexComponent && props.titleFlexComponent}

                                        </div>
                                    }

                                    {
                                        (subtitle || props.subtitleLoader) &&
                                        <>
                                            {
                                                props.subtitleLoader ?
                                                    <div className="content-loader modal-subtitle">

                                                    </div>
                                                    :
                                                    <div className="modal-legend-subtitle">
                                                        <p> {subtitle} </p>
                                                    </div>
                                            }
                                        </>
                                    }
                                </div>
                            }

                            {props.legendComponent && <div className={props.legendClass || ""}> {props.legendComponent} </div>}

                            {
                                props.children &&

                                <div className="modal_body">
                                    {props.children}
                                </div>
                            }

                        </div>

                    </div>

                </div>

            </div>
        )
    }

    return (<React.Fragment />)

}

export const Modal: React.FC<Props> = (props) => {

    if (process.browser && props.visibility) {

        return createPortal(<ModalDom {...props} />, document.body);

    }

    return <></>
}

interface Props {
    title?: string,
    toggleVisibility?: () => void,
    toggleOut?: () => void,
    visibility?: boolean,
    class?: string,
    children?: React.ReactElement,
    overlayClass?: string,
    holderClass?: string,
    subtitle?: string,
    icon?: string,
    extendableRef?: any,
    legendClass?: string,
    legendComponent?: React.ReactElement,
    noObviousExit?: boolean,
    outsideEscape?: boolean,
    normalEscape?: boolean,
    topIcon?: string,
    subtitleLoader?: boolean,
    titleLoader?: boolean,
    titleSvgIcon?: string,
    titleFlexComponent?: ReactElement,
    navigatorExit?: boolean
}

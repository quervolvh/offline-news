import React from 'react';
import { classnames } from 'utils';

export const PaginationPages: React.FC<Props> = ({ pages, page, isMobile, empty, ...props }) => {

    const Pages = parseInt(String(pages)?.includes(".") ? String(pages + 1) : String(pages))

    // Sets the limit of pages to be displayed in either direction
    // i.e , direction to the left and right of the current page
    const directionLimit = isMobile ? 1 : 2;

    // Gets the amount of previous pages with regards to the current page
    let prevPagesToDisplay = Math.abs(page - directionLimit);

    // Assuming the current page number is less than 4, this value represents
    // the amount of pages greater than the current page to display
    const zeroPrevLimit = directionLimit * 2 - page;

    // Assuming the previous page limit is lesser than directionLimit
    // this calculation provides an improved better limit
    const ForwardLimit = directionLimit + (directionLimit - prevPagesToDisplay);

    //  Determines the amount of pages that should be displayed after the current page
    //  If its less than the previous number of pages ,  then we assign this value to the directionLimit
    //  Otherwise it becomes either the zeroPrevLimit or a calculation determining
    const nextPagesToDisplay =
        prevPagesToDisplay > directionLimit ? directionLimit : page < 4 ? zeroPrevLimit : ForwardLimit;

    // Creates an array from the number of pages we are provided with and
    // splices it so that the array only contains pages that are greater than the value of the current page
    let pages_ = [...Array(Pages)].map((page, index) => index + 1).splice(page, nextPagesToDisplay);

    // Creates a limit for slicing the array of prevPage numbers
    const prevPageLengthLimit = directionLimit + (directionLimit - pages_.length);

    // Creates an array from the number of pages we are provided with and
    // splices it so that the array only contains pages that are less than the value of the current page
    let prevPages = [...Array(Pages)].map((page, index) => index + 1).splice(0, page);

    prevPages = prevPages.reverse().splice(0, prevPageLengthLimit).reverse();

    // this function takes a user to the selected page
    const clickHer = (page: number) => props.onClick(page);

    if (empty) return (<></>);

    return (
        <li className='pagination-pages'>

            <li
                onClick={() => page === 1 ? null : clickHer(page - 1)}
                role={"button"}
                className='pagination-nav'
                tabIndex={0}>
                <i className={classnames( page === 1 && "inactive" , 'fa-solid fa-chevron-left')} />
            </li>

            <ul>

                {page !== 1 && !prevPages.filter((page_, index) => (index >= page - 4)).includes(1) && (
                    <li
                        onClick={() => clickHer(1)}
                        role={"button"}
                        tabIndex={0}>
                        <i className="fas fa-angle-double-left" />
                    </li>
                )}

                {prevPages.map((page_, index) => index < 4 && (
                    <li
                        key={`post-${page_}-${index}`}
                        onClick={() => clickHer(page_)}
                        className={page === page_ ? 'active' : 'passive'}
                        role={"button"}
                        tabIndex={0}
                    >
                        {page_}
                    </li>
                ))}

                {!prevPages.filter(((page_, index) => index < 4)).includes(page) && !pages_.includes(page) && (
                    <li
                        onClick={() => clickHer(page)}
                        className="active"
                        role={"button"}
                        tabIndex={0}>
                        {page}
                    </li>
                )}

                {pages_.map((page, index) => index < 4 && (
                    <li
                        key={`post-${page}-${index}`}
                        onClick={() => clickHer(page)}
                        role={"button"}
                        tabIndex={0}>
                        {page}
                    </li>
                ))}


                {!pages_.filter((page, index) => index < 4).includes(Pages) && (
                    <>
                        <li>
                            ...
                        </li>
                        <li>
                            {Pages}
                        </li>
                    </>
                )}

            </ul>

            {page !== pages && !pages_.includes(page) && (
                <li
                    onClick={() => (Number(page) !== Number(pages)) ? clickHer(page + 1) : null}
                    className='pagination-nav'
                    role={"button"}
                    tabIndex={0}>
                    <i className={classnames( page === pages && "inactive" , "fa-solid fa-chevron-right")} />{' '}
                </li>
            )}

        </li>

    );
};

interface Props {

    pages: number,

    page: number,

    isMobile: boolean,

    onClick(e: number): void,

    empty?: boolean

}

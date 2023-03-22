import React, { useState } from 'react';
import { FormField } from 'components';
import { PaginationPages } from './PaginationPages';

export const Pagination: React.FC<Props> = ( props ) => {

    const { pages, page, perPage = 20, empty, isMobile } = props;

    const initialState = perPage || 20;

    const [_perPage, _setPerPage] = useState(initialState);

    const clickHer = (e: { page: number, perPage: number }) => props.onClick(e);

    return (
        <div className='pagination'>
            
            {

                !empty &&

                <div className="pagination-flex">

                    <PaginationPages 

                        isMobile={isMobile}
                    
                        page={page || 1} 
                        
                        pages={pages || 1}

                        onClick={e => clickHer({ page: e , perPage : _perPage })}
                        
                    />

                </div>

            }

        </div>

    );
};

interface Props {
    isMobile: boolean,
    pages: number,
    page: number,
    perPage?: number,
    onClick: (e: { perPage: number, page: number }) => void,
    perPageSelector?: boolean,
    empty?: boolean
}

import React from 'react';

export const EmptyHistory: React.FC = ({ }) => {

    return (

        <div className="dashboard-page-history dashboard-page-history-empty">

            <p> {"You have no records "} </p>

            <img src={'/svg/empty-transaction.svg'} alt={"Empty transaction"} />


        </div>
    )

}

import React, { useContext } from "react";
import { RequestContext } from "../../contexts/RequestContext";
import RequestListItem from "./RequestListItem/RequestListItem";
import styles from './RequestList.module.scss'

const RequestList = (props) => {

    const { state } = useContext(RequestContext)

    return (

        <div className={` ${styles["request-list-container"]} container`}>
            {state.length > 0 ?
                state.map((request, index) => (
                    <React.Fragment key={index}>
                        <RequestListItem request={request} />
                    </React.Fragment>
                ))
                :
                <p className={styles["empty-list"]}>You have no requests at the time...</p>

            }
        </div>
    )
}

export default RequestList;
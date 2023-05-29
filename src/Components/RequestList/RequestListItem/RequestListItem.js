import styles from './RequestListItem.module.scss'

const RequestListItem = (props) => {

    return (

        <div className={styles["request-item"]}>
            <div className={styles["request-data"]}>
                <div><span className={styles["label"]}>Request Code:</span> {props.request.code}</div>

                <div className={styles["requestor-information"]}>
                    <span>
                        <span className={styles["label"]}>First Name: </span>
                        {props.request.name}
                    </span>
                    <span>
                        <span className={styles["label"]}>Last Name: </span>
                        {props.request.surname}
                    </span>
                    <span>
                        <span className={styles["label"]}>Nationality: </span>
                        {props.request.country}
                    </span>
                </div>
                <div className={styles["description"]}>
                    <span className={styles["label"]}>Description: </span>
                    <p className={styles["text"]}>{props.request.description}</p>
                </div>

            </div>
            <div className={styles["request-amount"]}>
                {props.request.currency} {props.request.amount}
            </div>
        </div>
    );

}

export default RequestListItem;
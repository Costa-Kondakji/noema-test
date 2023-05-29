
import { Alert } from "reactstrap";
import styles from './NoemaAlert.module.scss';
import React from "react";
import ReactDOM from "react-dom";


const NoemaAlert = (props) => {
    return (
        <React.Fragment>
            {ReactDOM.createPortal(
                <div className={styles["alert"]}>
                    <Alert>
                        <h4 className="alert-heading">
                            {props.message}
                        </h4>
                    </Alert>
                </div>
                , document.getElementById('alert-root'))}
        </React.Fragment>
    );
}

export default NoemaAlert
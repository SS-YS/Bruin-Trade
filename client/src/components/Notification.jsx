import React from "react";
import { Alert } from '@material-ui/lab';
import { Snackbar } from "@material-ui/core";

export default function Notification(props) {
    return(
        <Snackbar open={props.alert} 
            autoHideDuration={5000} 
            onClose={props.closeAlert}
            anchorOrigin={{vertical: "top", horizontal: "middle"}}
        >
            <Alert onClose={props.closeAlert} severity={props.alertType}>
                {props.alertMessage}
            </Alert>
        </Snackbar>
    );
}
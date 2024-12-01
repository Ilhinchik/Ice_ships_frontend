import React from "react";
import "./Notifications.css";
import {Notification} from "../Notification";
import {useSelector} from "../../core/store";

export const NotificationBar: React.FC = () => {
    const notifications = useSelector((state) => state.app.notifications);

    const firstNotification = notifications.length > 0 ? notifications[0] : null;
    return (
        <div className="notify-container mt-1">
            {firstNotification ? (
                <Notification key={firstNotification.id} notifyInfo={firstNotification}/>
            ) : (
                <></>
            )}
        </div>
    );

};
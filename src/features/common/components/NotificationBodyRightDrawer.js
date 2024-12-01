import React, { useState, useEffect } from "react";
import axios from "axios";
import { URL } from "../../../utils/constant";

function NotificationBodyRightDrawer() {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const response = await axios.get(`${URL}notification`);
                const { notifications } = response.data;
                setNotifications(notifications);
                //setLoading(false);
            } catch (error) {
                console.error("Error fetching notifications:", error);
               // setLoading(false);
            }
        };

        // Initial fetch
        fetchNotifications();

        // Polling mechanism
        const intervalId = setInterval(fetchNotifications, 5000); // Call every 5 seconds

        // Cleanup on unmount
        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className="p-4 bg-gray-100 w-full h-full overflow-y-auto">
            {loading ? (
                <div>Loading notifications...</div>
            ) : notifications.length > 0 ? (
                notifications.map((notification, i) => (
                    <div
                        key={i}
                        className={`grid mt-3 card bg-base-200 rounded-box p-4 shadow-md transition-all duration-300 ${
                            i < 5 ? "bg-blue-100" : "bg-white"
                        }`}
                    >
                        {/* Title: Booking Details */}
                        <h3 className="text-lg font-semibold text-gray-800">
                            {notification.data}
                        </h3>

                        <p className="text-sm font-medium text-gray-700">
                            Building: {notification?.booking?.building?.name}
                        </p>
                        <p className="text-sm font-medium text-gray-700">
                            Owner: {notification?.booking?.building?.owner?.name}
                        </p>
                        <p className="text-sm font-medium text-gray-700">
                            Date & Time: {notification?.booking?.appointment_date}{" "}
                            {notification?.booking?.appointment_time}
                        </p>
                    </div>
                ))
            ) : (
                <div>No notifications available.</div>
            )}
        </div>
    );
}

export default NotificationBodyRightDrawer;

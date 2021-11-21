import { CListGroupItem } from "@coreui/react";
import React from "react";
import { Link } from "react-router-dom";

const Notification = ({ notificationsList }) => {
  return (
    <div className="w-100" style={{ maxHeight: "400px", overflow: 'auto' }}>
      <Link style={{ textDecoration: "none" }} to="#">
        {notificationsList.map(item => {
          return <CListGroupItem className="d-flex justify-content-between align-items-center">
            <div>
              <h5>{item.message ? item.message : "N/A"}</h5>
              <div className="text-uppercase mb-1">
                <small className="text-muted">{item.datenotif} {item.timenotif}</small>
              </div>
            </div>
            <div>
              <div className="new-notif"></div>
            </div>
          </CListGroupItem>
        })}
      </Link>
    </div>
  );
};

export default Notification;

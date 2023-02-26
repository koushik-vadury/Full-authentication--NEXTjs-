import ReactDOM from "react-dom";
import classes from "./notification.module.css";

function Notification(props) {
  const { status, message } = props;
  console.log(status, message);
  let statusClass;

  if (status === "success") {
    statusClass = classes.success;
  }
  if (status === "error") {
    statusClass = classes.error;
  }
  const cssClasses = `${classes.notification} ${statusClass}`;

  return ReactDOM.createPortal(
    <div className={cssClasses}>
      <div>{message}</div>
    </div>,
    document.getElementById("notifications")
  );
}

export default Notification;

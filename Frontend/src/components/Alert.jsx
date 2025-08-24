import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const Alert = ({ msg, handleClose }) => {
  return (
    <div className="absolute inset-x-0 top-2 flex bg-red-600/30 text-red-800 border-red-600 border-2 p-3 rounded">
      <p className="flex-1">{msg}</p>
      <button className="ml-4 text-red-800 hover:text-red-600 focus:outline-none" onClick={handleClose}>
        <FontAwesomeIcon icon={faXmark} />
      </button>
    </div>
  );
};

export default Alert;

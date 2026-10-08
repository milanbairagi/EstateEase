import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";

const FormFieldError = ({ msg }) => {
	return (
		<div className="flex items-center mt-1 text-sm text-red-600 bg-red-500/20 rounded-md px-2 py-1 gap-1">
			<FontAwesomeIcon icon={faExclamationCircle} className="w-4 h-4 flex-shrink-0" />
			<span>{msg}</span>
		</div>
	);
};

export default FormFieldError;

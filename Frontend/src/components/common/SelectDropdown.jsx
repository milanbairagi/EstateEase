import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";

import ClickAwayListener from "./ClickAwayListener";

const SelectDropdown = ({ options, selectedValue, onChange }) => {
	const [showOptions, setShowOptions] = useState(false);
	return (
		// <select
		//     className="focus:outline-0 w-full"
		//     value={selectedValue}
		//     onChange={onChange}
		// >
		//     {options.map((option, index) => (
		//         <option key={index} value={option.value}>
		//             {option.label}
		//         </option>
		//     ))}
		// </select>
		<div className="relative cursor-pointer">
            <ClickAwayListener onClickAway={() => setShowOptions(false)}>
                <div className="flex justify-between items-center" onClick={() => setShowOptions(!showOptions)}>
                    <input
                        type="button"
                        className="w-full h-full text-start py-1.5"
                        value={
                            options.find((option) => option.value === selectedValue)
                                .label
                        }
                    />
                    <FontAwesomeIcon icon={faAngleDown} className={`${showOptions && "rotate-180"} transform transition-transform`} />
                </div>
                <ul
                    className={`${
                        showOptions ? "block" : "hidden"
                    } absolute w-full max-h-56 overflow-y-scroll z-10 bg-white border border-gray-400 rounded-b-lg`}
                >
                    {options.map((option, index) => (
                        <li
                            key={index}
                            className="p-2 hover:bg-indigo-500 hover:text-white cursor-pointer"
                            onClick={() => {
                                onChange(option.value);
                                setShowOptions(false);
                            }}
                        >
                            {option.label}
                        </li>
                    ))}
                </ul>
            </ClickAwayListener>
		</div>
	);
};

export default SelectDropdown;

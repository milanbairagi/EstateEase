import React, { useEffect, useRef } from "react";

function ClickAwayListener({ children, onClickAway }) {
	const ref = useRef(null);

	useEffect(() => {
		function handleClick(event) {
			if (ref.current && !ref.current.contains(event.target)) {
				onClickAway();
			}
		}
		document.addEventListener("click", handleClick);

		return () => {
			document.removeEventListener("click", handleClick);
		};
	}, [onClickAway]);

	return <div ref={ref}>{children}</div>;
}

export default ClickAwayListener;
export const debounce = (callback, timeoutMs) => {
	let lastCall, lastCallTimer;
	return (...args) => {
		if (lastCall && lastCall - Date.now() <= timeoutMs) {
			clearTimeout(lastCallTimer);
		}

		lastCall = Date.now();
		lastCallTimer = setTimeout(() => callback(...args), timeoutMs);
	};
};

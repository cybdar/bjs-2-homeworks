// Задача №1
function cachingDecoratorNew(func) {
	let cache = [];

	return function(...args) {
		const hash = md5(args);
		const cachedObject = cache.find(item => item.hash === hash);

		if (cachedObject) {
			return `Из кеша: ${cachedObject.value}`;
		}

		const result = func(...args);
		cache.push({
			hash,
			value: result
		});

		if (cache.length > 5) {
			cache.shift();
		}

		return `Вычисляем: ${result}`;
	}
}

// Задача №2
function debounceDecoratorNew(func, delay) {
	let timeoutId = null;

	function wrapper(...args) {
		wrapper.allCount++;

		if (!timeoutId) {
			func(...args);
			wrapper.count++;
		}

		clearTimeout(timeoutId);

		timeoutId = setTimeout(() => {
			func(...args);
			wrapper.count++;
		}, delay);
	}

	wrapper.count = 0;
	wrapper.allCount = 0;

	return wrapper;
}
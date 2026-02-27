'use strict';

// Задача 1
function compareArrays(arr1, arr2) {
	if (arr1.length !== arr2.length) return false;
	return arr1.every((item, index) => item === arr2[index]);
}

// Задача 2
function getUsersNamesInAgeRange(users, gender) {
	const filtered = users.filter(user => user.gender === gender);
	if (filtered.length === 0) return 0;
	return filtered.reduce((sum, user) => sum + user.age, 0) / filtered.length;
}
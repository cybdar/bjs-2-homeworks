"use strict";

// Задача 1
function parseCount(value) {
	const parsed = Number.parseFloat(value);
	if (isNaN(parsed)) {
		const error = new Error("Невалидное значение");
		throw error;
	}
	return parsed;
}

function validateCount(value) {
	try {
		const result = parseCount(value);
		return result;
	} catch (error) {
		console.log("Перехвачена ошибка:");
		console.log(error);
		return error;
	}
}

// Задача 2
class Triangle {
	constructor(a, b, c) {
		console.log("Проверка треугольника...");

		if (a + b <= c || a + c <= b || b + c <= a) {
			const error = new Error("Треугольник с такими сторонами не существует");
			throw error;
		}

		this.a = a;
		this.b = b;
		this.c = c;
	}

	get perimeter() {
		return this.a + this.b + this.c;
	}

	get area() {
		const p = this.perimeter / 2;
		const area = Math.sqrt(p * (p - this.a) * (p - this.b) * (p - this.c));
		return Number(area.toFixed(3));
	}
}

function getTriangle(a, b, c) {
	try {
		console.log("Пытаемся создать треугольник...");
		const triangle = new Triangle(a, b, c);
		return triangle;
	} catch (error) {
		console.log("Не удалось создать треугольник:");
		console.log(error);

		return {
			get perimeter() {
				return "Ошибка! Треугольник не существует";
			},
			get area() {
				return "Ошибка! Треугольник не существует";
			}
		};
	}
}
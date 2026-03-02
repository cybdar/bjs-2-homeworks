class AlarmClock {
	constructor() {
		this.alarmCollection = [];
		this.intervalId = null;
	}

	addClock(time, callback) {
		if (!time || !callback) {
			throw new Error('Отсутствуют обязательные аргументы');
		}

		const isAlarmExist = this.alarmCollection.some(function(alarm) {
			return alarm.time === time;
		});

		if (isAlarmExist) {
			console.warn('Уже присутствует звонок на это же время');
		}

		this.alarmCollection.push({
			callback: callback,
			time: time,
			canCall: true
		});
	}

	removeClock(time) {
		this.alarmCollection = this.alarmCollection.filter(function(alarm) {
			return alarm.time !== time;
		});
	}

	getCurrentFormattedTime() {
		const now = new Date();
		const hours = now.getHours();
		const minutes = now.getMinutes();

		const formattedHours = hours < 10 ? '0' + hours : hours;
		const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;

		return formattedHours + ':' + formattedMinutes;
	}

	start() {
		if (this.intervalId) {
			return;
		}

		const self = this;

		this.intervalId = setInterval(function() {
			const currentTime = self.getCurrentFormattedTime();

			self.alarmCollection.forEach(function(alarm) {
				if (alarm.time === currentTime && alarm.canCall) {
					alarm.canCall = false;
					alarm.callback();
				}
			});
		}, 1000);
	}

	stop() {
		clearInterval(this.intervalId);
		this.intervalId = null;
	}

	resetAllCalls() {
		this.alarmCollection.forEach(function(alarm) {
			alarm.canCall = true;
		});
	}

	clearAlarms() {
		this.stop();
		this.alarmCollection = [];
	}
}
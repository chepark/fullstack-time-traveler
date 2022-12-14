export class Game {
  static gameId = null;
  static userName = "";
  static co2benefit = null;
  static co2budget = null;
  static co2consumed = null;
  static co2left = null;
  static currentTime = undefined;
  static goalTime = undefined;
  static currentLongitude = undefined;
  static currentLatitude = undefined;
  static currentAirport = undefined;
  static country = undefined;
  static gameOver = false;

  static setGameId(id) {
    this.gameId = id;
  }

  static setUserName(name) {
    this.userName = name;
  }

  static setCo2Benefit(benefit) {
    this.co2benefit = benefit;
  }

  static setCountry(country) {
    this.country = country;
  }

  static setGameOver() {
    this.gameOver = true;
  }

  static setCurrerntAirport(airport) {
    this.currentAirport = airport;
  }

  static setTime(time, target) {
    if (target === "current") {
      this.currentTime = time;
    } else this.goalTime = time;
  }

  static setCo2(co2level, target) {
    const formattedCo2 = Number.parseFloat(co2level).toFixed(2);

    if (target === "co2budget") {
      this.co2budget = formattedCo2;
    }

    if (target === "co2left") {
      this.co2left = formattedCo2;
    }
  }

  static setNewGoal(goal) {
    this.goalTime = goal;
  }

  static setGameData(data) {
    const {
      co2budget,
      co2consumed,
      current_latitude,
      current_location,
      current_longitude,
      current_time,
      current_hour,
      goal_time,
      goal_hour,
      country,
    } = data;
    this.co2budget = Math.ceil(co2budget);
    this.co2consumed = Math.ceil(co2consumed);
    this.currentTime = current_time;
    this.currentHour = current_hour;
    this.currentLongitude = Number.parseFloat(current_longitude).toFixed(2);
    this.currentLatitude = Number.parseFloat(current_latitude).toFixed(2);
    this.currentAirport = current_location;
    this.goalTime = goal_time;
    this.goalHour = goal_hour;
    this.co2left = this.co2budget - this.co2consumed;
    this.country = country;
  }
}

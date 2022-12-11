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

  static setGameOver() {
    this.gameOver = true;
  }

  static setGameData(data) {
    const {
      co2budget,
      co2consumed,
      current_latitude,
      current_location,
      current_longitude,
      current_time,
      goal_time,
    } = data;

    this.co2budget = Math.ceil(co2budget);
    this.co2consumed = Math.ceil(co2consumed);
    this.currentTime = current_time;
    this.currentLongitude = Number.parseFloat(current_longitude).toFixed(2);
    this.currentLatitude = Number.parseFloat(current_latitude).toFixed(2);
    this.currentAirport = current_location;
    this.goalTime = goal_time;
    this.co2left = this.co2budget - this.co2consumed;
  }
}

export const red = "#e2393e";
export const green = "#58db8f";

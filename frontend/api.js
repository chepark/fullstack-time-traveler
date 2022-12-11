// all api requests
const BASE_URL = "http://127.0.0.1:5000";

// Data: list of aiports
export const fetchAllAirports = async () => {
  try {
    const allAirportsURL = `${BASE_URL}/airport/all`;

    const response = await fetch(allAirportsURL);
    const { data } = await response.json();

    return data;
  } catch (error) {
    console.log("Errors in fetching aiports:", error);
  }
};

// Fetches user data from backend
// Data: is_new_user, game_id, max_score
export const getUser = async (name) => {
  try {
    const userURL = `${BASE_URL}/user/${name}`;
    const response = await fetch(userURL);
    const { data } = await response.json();

    return data;
  } catch (error) {
    console.log("Errors in getting user:", error);
  }
};

// Fetches new game from backend
// Data:
// gameId, userName, score, co2consumed, co2benefit, co2budget,
// current_location, current_longitude, current_latitude,
// current_time, current_hour
// goal_time, goal_hour
export const fetchNewGame = async (gameid, co2benefit) => {
  try {
    const newGameURL = `${BASE_URL}/newgame?gameId=${gameid}&co2benefit=${co2benefit}`;
    const response = await fetch(newGameURL);
    const { data } = await response.json();

    return data;
  } catch (error) {
    console.log("Errors in fetching new game:", error);
  }
};

// Fetches game result
// Data: current_time, co2budget, success, game_over
export const getResult = async (gameId, airportName) => {
  try {
    const resultURL = `${BASE_URL}/result?gameId=${gameId}?airport_name=${airportName}`;
    const response = await fetch(resultURL);
    const { data } = await response.json();
    return data;
  } catch (error) {
    console.log("Errors in getting results:", error);
  }
};

//Fetches new goal from backend
// Data: new_goal
export const fetchNewGoal = async (gameid, current_loc) => {
  try {
    const newGoalURL = `${BASE_URL}/newgoal?gameid=${gameid}?current_loc=${current_loc}`;
    const response = await fetch(newGoalURL);
    const { data } = await response.json();

    return data;
  } catch (error) {
    console.log("Errors in fetching new goal:", error);
  }
};

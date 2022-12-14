// all api requests
const BASE_URL = "http://127.0.0.1:5000";

// Data: list of aiports
export const fetchAllAirports = async () => {
  try {
    const allAirportsURL = `${BASE_URL}/airport/all`;

    const response = await fetch(allAirportsURL);
    const { data } = await response.json();
    console.log("LARGE AIRPORTS:", data);
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

    console.log("NEW GAME DATA: ", data);
    return data;
  } catch (error) {
    console.log("Errors in fetching new game:", error);
  }
};

// Fetches game result
// Data: current_time, co2budget, success, game_over
export const getResult = async (gameId, airportName) => {
  try {
    const resultURL = `${BASE_URL}/result?gameId=${gameId}&airport_name=${airportName}`;
    const encodedURL = encodeURI(resultURL);
    const response = await fetch(encodedURL);
    const { data } = await response.json();
    console.log("RESULT:", data);
    return data;
  } catch (error) {
    console.log("Errors in getting results:", error);
  }
};

//Fetches new goal from backend
// Data: new_goal
export const fetchNewGoal = async (gameid, current_loc) => {
  try {
    const newGoalURL = `${BASE_URL}/newgoal?gameId=${gameid}&current_location=${current_loc}`;
    const encodedURL = encodeURI(newGoalURL);
    const response = await fetch(encodedURL);
    const { data } = await response.json();

    return data;
  } catch (error) {
    console.log("Errors in fetching new goal:", error);
  }
};

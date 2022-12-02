// ADD TRY ACCEPT in each method

// all api requests
const BASE_URL = "http://127.0.0.1:5000";

export const fetchAllAirports = async () => {
  const allAirportsURL = `${BASE_URL}/airport/all`;

  const response = await fetch(allAirportsURL);
  const { data } = await response.json();

  return data;
};

// DIEP
// It fetches user data from backend
export const getUser = () => {
  const uerURL = "";
};

// DIEP
//It fetches new game from backend
export const fetchNewGame = async () => {
  const newGameURL = "";
};

// ANNA
//It fetches result from backend
export const getResult = async () => {
  const resultURL = "";
};

// MAMITA
//It fetches new goal from backend
export const fetchNewGoal = async (userid, gameid, current_loc) => {
  const newGoalURL = `${BASE_URL}/newgoal?userid=${userid}?gameid=${gameid}?current_loc=${current_loc}`;
  const response = await fetch(newGoalURL);

  // complete rest...
};

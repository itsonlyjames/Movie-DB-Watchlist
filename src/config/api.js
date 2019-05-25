const baseUrl = "https://api.themoviedb.org/3";

export const CustomPOST = body => {
  return {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  };
};

export const API_URL = {
  newToken: `${baseUrl}/authentication/token/new?api_key=a92dd8aa9907d3e3a7879100568a5f91`,
  newSession: `${baseUrl}/authentication/session/new?api_key=a92dd8aa9907d3e3a7879100568a5f91`,
  account: SESSION_ID =>
    `${baseUrl}/account?api_key=a92dd8aa9907d3e3a7879100568a5f91&session_id=${SESSION_ID}`,
  search: SEARCH =>
    `${baseUrl}/search/movie?api_key=a92dd8aa9907d3e3a7879100568a5f91&query=${SEARCH}`,
  authenticate: REQUEST_TOKEN =>
    `https://www.themoviedb.org/authenticate/${REQUEST_TOKEN}?redirect_to=http://localhost:3000/`,
  watchlist: (ACCOUNT_ID, SESSION_ID) =>
    `${baseUrl}/account/${ACCOUNT_ID}/watchlist?api_key=a92dd8aa9907d3e3a7879100568a5f91&session_id=${SESSION_ID}`,
  watchlistMovies: (ACCOUNT_ID, SESSION_ID) =>
    `${baseUrl}/account/${ACCOUNT_ID}/watchlist/movies?api_key=a92dd8aa9907d3e3a7879100568a5f91&session_id=${SESSION_ID}&sort_by=created_at.desc`
};

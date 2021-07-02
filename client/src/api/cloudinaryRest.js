import axios from "axios";

// for production environment just replace it with the server heroku URL
// const serverURL = "https://bears07chingu.herokuapp.com/";
const serverURL = "https://resto-fund.herokuapp.com";

export default axios.create({
  baseURL: serverURL,
  headers: { "Content-type": "application/json" },
});

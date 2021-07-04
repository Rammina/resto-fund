import axios from "axios";

// just toggle between dev server and prod server
// const serverURL = "https://resto-fund.herokuapp.com";
const serverURL = "https://resto-fund.herokuapp.com";

export default axios.create({
  baseURL: serverURL,
});

import axios from "axios";

// just toggle between dev server and prod server
// const serverURL = "http://localhost:5000";
const serverURL = "http://localhost:5000";

export default axios.create({
  baseURL: serverURL,
});

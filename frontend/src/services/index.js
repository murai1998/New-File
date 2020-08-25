import axios from "axios";
let baseURL;

/**CHANGE THIS**/
process.env.NODE_ENV === "production"
  ? (baseURL = "/api") //https://rocky-ocean-03987.herokuapp.com/
  : (baseURL = "http://localhost:5000/api");
/****/

console.log(process.env, baseURL);

const service = axios.create({ withCredentials: true, baseURL });

const actions = {
  isLoggedIn: async () => {
    return await service.get("/is-logged-in");
  },
  signUp: async user => {
    return await service.post("/signup", user);
  },
  logIn: async user => {
    return await service.post("/login", user);
  },
  logOut: async () => {
    return await service.get("/logout");
  },
  list: async () => {
    return await service.get("/exercise/list");
  },
  createExs: async exs => {
    return await service.post("/exercise/add", exs);
  },
  addActivity: async act => {
    return await service.post("/add-activity", act);
  },
  showActivity: async userDate => {
    return await service.get(`/show-activity/${userDate}`);
  },
  displayRes: async (userDate, uptade) => {
    return await service.post(`/activity-added/${userDate}`, uptade);
  }
};

export default actions;

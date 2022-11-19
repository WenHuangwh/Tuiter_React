import axios from "axios";

const BASE_URL = "http://localhost:4000";
// const BASE_URL = "https://tuiter-node-hw.herokuapp.com"
const USERS_API = `${BASE_URL}/api/users`;

const api = axios.create({
    withCredentials: true
});

export const userTogglesTuitLikes = (uid, tid) =>
    api.put(`${USERS_API}/${uid}/likes/${tid}`)
    .then(response => response.data);
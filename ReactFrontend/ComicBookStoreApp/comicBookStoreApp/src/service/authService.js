import axios from "axios";

const MASTER_URL = "http://localhost:8090/auth"
// Add a request interceptor
axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    config.headers.Authorization = getToken()
    console.log(config.headers)
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

export const storeToken = (token) => {
  sessionStorage.setItem("token", token)
}

export const getToken = () => {
  return sessionStorage.getItem("token")
}

export const setLoggedInUser = (user) => {
  sessionStorage.setItem("user", user)
}

export const getLoggedInUser = () => {
  return sessionStorage.getItem("user")
}

export const logout = () => {
  sessionStorage.clear()
  localStorage.clear()
}

export const isLoggedIn = () => {
  let user = getLoggedInUser()

  if(user == null){
    return false
  }
  else{
    return true
  }
}

export const sendLoginInfo = (loginForm) => {
  return axios.post(MASTER_URL + "/login", loginForm)
}

export const sendRegisterInfo = (registerForm) => {
  return axios.post(MASTER_URL + "/register", registerForm)
}

export const getUsername = (usernameOrEmail) => {
  return axios.get(MASTER_URL + "/getUsername/" + usernameOrEmail)
}

import Cookies from "js-cookie";

const token = Cookies.get("token");

const check = () => {
  if (token) return true
  else { return true};
};
const resettoken = () =>{
  Cookies.remove('token');
}

export { check, resettoken };

import { signout } from "../user/api-auth";
const bcrypt = require ("bcrypt-nodejs");

const auth = {

  cryptPass(password){
    var salt = bcrypt.genSaltSync(10)                                                                                                                                     
    var cryptPassword  = bcrypt.hashSync(password, salt)
    return cryptPassword;
  },

  isEmail(val){
    const ai = val.indexOf('@');
    const gdi = val
      .split('')
      .reduce((acc, char, i) => (char ==='.' ? i: acc), 0);
      if(ai > -1 && gdi) return true;
      else return false; 
  },

  isPassword(val){

    if(val == ' ' || val.length<6)return false;
    else return true;
  },

  isAuthenticated() {
    if (typeof window == "undefined") return false;
    if (sessionStorage.getItem("jwt") &&JSON.parse(sessionStorage.getItem("jwt")).token != null){
      return JSON.parse(sessionStorage.getItem("jwt"));
    }
    else return false;
  },
  authenticate(jwt, cb) {
    if (typeof window !== "undefined")
      sessionStorage.setItem("jwt", JSON.stringify(jwt));
    cb();
  },
  signout(cb) {
    if (typeof window !== "undefined") sessionStorage.removeItem("jwt");
    cb();
  },
  updateUser(user, cb) {
    if (typeof window !== "undefined") {
      if (sessionStorage.getItem("jwt")) {
        let auth = JSON.parse(sessionStorage.getItem("jwt"));
        auth.user = user;
        sessionStorage.setItem("jwt", JSON.stringify(auth));
        cb();
      }
    }
  }
};

export default auth;

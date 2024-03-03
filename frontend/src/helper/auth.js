import { useEffect } from 'react';
import { CLIENT_ID, gapi } from "../config/config";

const initAuth = () => {
  gapi.load("auth2", () => {
    gapi.auth2.init({
      client_id: CLIENT_ID
    });
  });
};

const signOut = () => {
  const auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(() => {
    console.log("User signed out.");
    localStorage.clear();
  });
};

const setStorage = (googleUser) => {
  localStorage.setItem("email", googleUser.profileObj.email);
  localStorage.setItem("token", googleUser.tokenId);
};

const Auth = () => {
  useEffect(() => {
    initAuth();
  }, []);

  return null;
};

export { Auth, initAuth };// Exporting initAuth function

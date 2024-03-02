import { useEffect } from 'react';
import { CLIENT_ID, gapi } from "../config/config";

const Auth = () => {
  useEffect(() => {
    const initAuth = () => {
      gapi.load("auth2", () => {
        gapi.auth2.init({
          client_id: CLIENT_ID
        });
      });
    };
    initAuth();
  }, []);

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

  return null; // Since Auth component doesn't render anything
};

export default Auth;

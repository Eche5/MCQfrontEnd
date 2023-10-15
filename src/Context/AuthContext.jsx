import { createContext, useContext, useRef, useState } from "react";
import PropTypes from "prop-types";
import axios from "../api/axios";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [username, setUsername] = useState("");
  const [pwd, setPwd] = useState("");
  const [auth, setAuth] = useState({});

  const [errMsg, setErrMsg] = useState("");
  const [matchPwd, setMatchPwd] = useState("");
  const [isCreated, setIsCreated] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [isSigningUp, setIssSigningUp] = useState("Sign Up");
  const errRef = useRef();

  //Create Account
  const CreateAccount = async () => {
    const REGISTER_URL = "/register";
    try {
      const userData = { username, password: pwd, confirmPassword: matchPwd };
      setIssSigningUp("Creating your account...");
      setIsAuthenticating(true);

      await axios.post(REGISTER_URL, JSON.stringify(userData), {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      setIsCreated(true);
      setIssSigningUp("Sign Up");
      setIsAuthenticating(false);

      setUsername("");
      setPwd("");
      setMatchPwd("");
    } catch (err) {
      if (err.response.status === 404) {
        setErrMsg(err.response.data.message);
      } else {
        setErrMsg("Registration Failed!");
      }
      setIsCreated(false);
      setIssSigningUp("Sign Up");
      setIsAuthenticating(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        username,
        pwd,
        errRef,
        errMsg,
        setErrMsg,
        setUsername,
        setPwd,
        isAuthenticating,
        matchPwd,
        setMatchPwd,
        CreateAccount,
        isCreated,
        isSigningUp,
        setAuth,
        auth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
AuthProvider.propTypes = {
  children: PropTypes.any,
};
function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("AuthContext was used outside the AuthProvider");
  return context;
}
export { AuthProvider, useAuth };

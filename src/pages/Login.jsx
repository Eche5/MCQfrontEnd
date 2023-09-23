import { useState, useRef, useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import visible from "../assets/icons8-visible-30.png";
import notvisible from "../assets/icons8-not-visible-30.png";
import axios from "../api/axios";
import { useAuth } from "../Context/AuthContext";
import Spinner from "../components/Spinner";
function Login() {
  const usernameRef = useRef();

  const [showPassword, setShowPassword] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const [isValid, setIsValid] = useState(false);
  const [username, setUsername] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const errRef = useRef();
  const [isLogin, setIssLoggingin] = useState("Log in");

  const [pwd, setPwd] = useState("");
  const LOGIN_URL = "/auth";
  const { setAuth } = useAuth();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/course";
  //saves last inputed username
  useEffect(() => {
    const savedUsername = localStorage.getItem("lastUsername");
    if (savedUsername) {
      setUsername(savedUsername);
    }
  }, []);

  const onHandleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIssLoggingin("Logging in...");
      setIsAuthenticating(true);
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ username, password: pwd }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      const accessToken = response?.data?.accessToken;
      const foundUser = response?.data?.foundUser;
      setAuth({ foundUser, accessToken });
      localStorage.setItem("lastUsername", username);

      setIssLoggingin("Log in");
      setUsername("");
      setPwd("");
      navigate(from, { replace: true });
    } catch (err) {
      console.log(err.response);
      if (err.response.status === 404) {
        setErrMsg(err.response.data.message);
      } else if (err.response.status === 401) {
        setErrMsg(err.response.data.message);
      } else {
        setErrMsg("No Server Response");
      }
      setIssLoggingin("Log in");
      setIsAuthenticating(false);
      errRef.current.focus();
    }
  };

  const inputType = showPassword ? "text" : "password";

  useEffect(() => {
    document.title = "Medical Point | Login ";
  }, []);

  useEffect(() => {
    if (username.length >= 4 && pwd.length >= 4) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [username, pwd]);

  useEffect(() => {
    usernameRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [username, pwd, setErrMsg]);

  return (
    <div
      className="
    flex flex-col justify-center items-center
    min-h-screen py-4 px-2
  "
      id="loginpage"
    >
      <section className="w-full max-w-[420px] min-h-[400px]  p-8 bg-gray-800 text-white rounded-lg">
        <p
          ref={errRef}
          className={errMsg ? "errmsg" : "offscreen"}
          aria-live="assertive"
        >
          {errMsg}
        </p>
        <h1 className="text-5xl leading-5 mt-4">Sign In</h1>
        <form onSubmit={onHandleSubmit} className="flex flex-col pb-4">
          <label htmlFor="username" className="mt-4">
            Username
          </label>
          <input
            id="username"
            type="text"
            onChange={(e) => setUsername(e.target.value.trim())}
            value={username}
            required
            ref={usernameRef}
            className="text-[22px] p-1 rounded text-black"
          />
          <label htmlFor="password" className="mt-4">
            Password
          </label>
          <div className=" flex justify-between border-l-2 bg-white rounded">
            <input
              id="password"
              onChange={(e) => setPwd(e.target.value)}
              value={pwd}
              required
              type={inputType}
              className="text-[22px] p-1  text-black"
            />
            {showPassword && (
              <img
                src={visible}
                onClick={togglePasswordVisibility}
                className=" cursor-pointer w-8 h-8 m-1"
              />
            )}
            {!showPassword && (
              <img
                src={notvisible}
                onClick={togglePasswordVisibility}
                className=" cursor-pointer w-8 h-8 m-1"
              />
            )}
          </div>

          <button
            disabled={!isValid || isAuthenticating}
            type="submit"
            className={
              isValid
                ? `border rounded-lg border-transparent py-2 px-4 text-base font-medium ${
                    isAuthenticating
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-gray-900 hover:bg-green-700"
                  } hover:border-gray-400 transition duration-250 ease-in-out mt-4`
                : "cursor-not-allowed border rounded-lg border-transparent py-2 px-4 text-base font-medium bg-gray-900 hover:border-gray-400 transition duration-250 ease-in-out mt-4"
            }
          >
            <div className="flex justify-center gap-4">
              {isLogin}
              {isAuthenticating && <Spinner />}
            </div>
          </button>
        </form>
        <p className=" text-center">Don&apos;t have an account</p>
        <NavLink to="/Register">
          <p className="text-center text-2xl text-blue-400"> Sign up</p>
        </NavLink>
      </section>
    </div>
  );
}

export default Login;

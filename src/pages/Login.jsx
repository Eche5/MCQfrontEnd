import { useState, useRef, useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import visible from "../assets/icons8-visible-30.png";
import notvisible from "../assets/icons8-not-visible-30.png";
import axios from "../api/axios";
import { useAuth } from "../Context/AuthContext";
import Spinner from "../components/Spinner";
function Login() {
  const usernameRef = useRef();

  const usernameDivRef = useRef();

  const pwdDivRef = useRef();

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

    usernameRef.current.focus();

    usernameDivRef.current.focus();
  }, []);

  useEffect(() => {
    if (username.length >= 4 && pwd.length >= 4) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [username, pwd]);

  useEffect(() => {
    setErrMsg("");
  }, [username, pwd, setErrMsg]);

  const handleUsernameFocus = () => {};

  usernameDivRef.current?.classList?.add("focus-outline");

  const handleUsernameBlur = () => {
    usernameDivRef.current.classList.remove("focus-outline");
  };

  const handlePwdFocus = () => {
    pwdDivRef.current.classList.add("focus-outline");
  };

  const handlePwdBlur = () => {
    pwdDivRef.current.classList.remove("focus-outline");
  };

  return (
    <div
      className="
    flex flex-col justify-center items-center
    min-h-screen py-4 px-2
  "
      id="homepage"
    >
      <section className="w-full max-w-[420px] min-h-[400px]  p-8 bg-gray-800 text-white rounded-lg">
        <p
          ref={errRef}
          className={errMsg ? "errmsg" : "offscreen"}
          aria-live="assertive"
        >
          {errMsg}
        </p>
        <h1 className="text-5xl leading-5 mt-4 mb-16 text-center">Welcome</h1>
        <form onSubmit={onHandleSubmit} className="flex flex-col pb-4">
          <div
            className=" flex bg-white text-[1.2rem] p-1 rounded text-black mb-4"
            ref={usernameDivRef}
            onFocus={handleUsernameFocus}
            onBlur={handleUsernameBlur}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="1em"
              viewBox="0 0 448 512"
              className="w-8 h-8 p-1"
            >
              <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
            </svg>
            <input
              id="username"
              type="text"
              placeholder="username"
              className="pl-4 w-full"
              onChange={(e) => setUsername(e.target.value.trim())}
              value={username}
              required
              ref={usernameRef}
            />
          </div>

          <div
            ref={pwdDivRef}
            onFocus={handlePwdFocus}
            onBlur={handlePwdBlur}
            className=" w-full flex justify-between p-1 text-[1.2rem]  border-l-2  bg-white rounded text-black shadow-lg border-2 border-gray-800"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="1em"
              width="1em"
              viewBox="0 0 512 512"
              className="w-8 h-8 p-1 "
            >
              <path d="M336 352c97.2 0 176-78.8 176-176S433.2 0 336 0S160 78.8 160 176c0 18.7 2.9 36.8 8.3 53.7L7 391c-4.5 4.5-7 10.6-7 17v80c0 13.3 10.7 24 24 24h80c13.3 0 24-10.7 24-24V448h40c13.3 0 24-10.7 24-24V384h40c6.4 0 12.5-2.5 17-7l33.3-33.3c16.9 5.4 35 8.3 53.7 8.3zM376 96a40 40 0 1 1 0 80 40 40 0 1 1 0-80z" />
            </svg>
            <input
              id="password"
              onChange={(e) => setPwd(e.target.value)}
              value={pwd}
              placeholder="Password"
              required
              type={inputType}
              className="pl-4 w-full"
            />
            {showPassword && (
              <img
                src={visible}
                onClick={togglePasswordVisibility}
                className=" cursor-pointer w-8 h-8 p-1"
              />
            )}
            {!showPassword && (
              <img
                src={notvisible}
                onClick={togglePasswordVisibility}
                className=" cursor-pointer w-8 h-8 p-1"
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

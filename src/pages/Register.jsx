import { useRef, useEffect, useState } from "react";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import Spinner from "../components/Spinner";

function Register() {
  const usernameRef = useRef();
  const errRef = useRef();

  const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
  const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const {
    matchPwd,
    CreateAccount,
    username,
    setUsername,
    pwd,
    setPwd,
    setMatchPwd,
    isCreated,
    isSigningUp,
    isAuthenticating,
    errMsg,
    setErrMsg,
  } = useAuth();

  useEffect(() => {
    usernameRef.current.focus();
  }, []);

  const navigate = useNavigate();

  useEffect(() => {
    setValidName(USER_REGEX.test(username));
  }, [username, USER_REGEX]);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
    setValidMatch(pwd === matchPwd);
  }, [pwd, matchPwd, PWD_REGEX]);

  useEffect(() => {
    setErrMsg("");
  }, [username, pwd, matchPwd]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const v1 = USER_REGEX.test(username);
    const v2 = PWD_REGEX.test(pwd);
    if (!v1 || !v2) {
      setErrMsg("Invalid Entry");
      return;
    }
    CreateAccount();
  };

  useEffect(() => {
    document.title = "Medical Point | Register ";
  }, []);
  useEffect(() => {
    if (isCreated) navigate("/course", { replace: true });
  });

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
        <h1 className="text-5xl leading-5 mt-4">Register</h1>
        <form onSubmit={handleSubmit} className="flex flex-col pb-4">
          <label htmlFor="username" className="mt-4">
            Username
            <FontAwesomeIcon
              icon={faCheck}
              className={validName ? "valid" : "hide"}
            />
            <FontAwesomeIcon
              icon={faTimes}
              className={validName || !username ? "hide" : "invalid"}
            />
          </label>

          <input
            type="text"
            id="username"
            ref={usernameRef}
            autoComplete="off"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            required
            aria-invalid={validName ? "false" : "true"}
            aria-describedby="uidnote"
            onFocus={() => setUserFocus(true)}
            onBlur={() => setUserFocus(false)}
            className="text-[22px] p-1 rounded text-black"
          />
          <p
            id="uidnote"
            className={
              userFocus && username && !validName ? "instructions" : "offscreen"
            }
          >
            <FontAwesomeIcon icon={faInfoCircle} />
            4 to 24 characters.
            <br />
            Must begin with a letter.
            <br />
            Letters, numbers, underscores, hyphens allowed.
          </p>

          <label htmlFor="password">
            Password:
            <FontAwesomeIcon
              icon={faCheck}
              className={validPwd ? "valid" : "hide"}
            />
            <FontAwesomeIcon
              icon={faTimes}
              className={validPwd || !pwd ? "hide" : "invalid"}
            />
          </label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPwd(e.target.value)}
            value={pwd}
            required
            aria-invalid={validPwd ? "false" : "true"}
            aria-describedby="pwdnote"
            onFocus={() => setPwdFocus(true)}
            onBlur={() => setPwdFocus(false)}
            className="text-[22px] p-1 rounded text-black"
          />
          <p
            id="pwdnote"
            className={pwdFocus && !validPwd ? "instructions" : "offscreen"}
          >
            <FontAwesomeIcon icon={faInfoCircle} />
            8 to 24 characters.
            <br />
            Must include uppercase and lowercase letters, a number and a special
            character.
            <br />
            Allowed special characters:{" "}
            <span aria-label="exclamation mark">!</span>{" "}
            <span aria-label="at symbol">@</span>{" "}
            <span aria-label="hashtag">#</span>{" "}
            <span aria-label="dollar sign">$</span>{" "}
            <span aria-label="percent">%</span>
          </p>
          <label htmlFor="confirm_pwd">
            Confirm Password:
            <FontAwesomeIcon
              icon={faCheck}
              className={validMatch && matchPwd ? "valid" : "hide"}
            />
            <FontAwesomeIcon
              icon={faTimes}
              className={validMatch || !matchPwd ? "hide" : "invalid"}
            />
          </label>
          <input
            type="password"
            id="confirm_pwd"
            onChange={(e) => setMatchPwd(e.target.value)}
            value={matchPwd}
            required
            aria-invalid={validMatch ? "false" : "true"}
            aria-describedby="confirmnote"
            onFocus={() => setMatchFocus(true)}
            onBlur={() => setMatchFocus(false)}
            className="text-[22px] p-1 rounded text-black"
          />
          <p
            id="confirmnote"
            className={matchFocus && !validMatch ? "instructions" : "offscreen"}
          >
            <FontAwesomeIcon icon={faInfoCircle} />
            Must match the first password input field.
          </p>

          <button
            disabled={!validName || !validPwd || !validMatch ? true : false}
            className={
              validMatch
                ? `border rounded-lg border-transparent py-2 px-4 text-base font-medium ${
                    isAuthenticating
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-gray-900 hover:bg-green-700"
                  } hover:border-gray-400 transition duration-250 ease-in-out mt-4`
                : "cursor-not-allowed border rounded-lg border-transparent py-2 px-4 text-base font-medium bg-gray-900 hover:border-gray-400 transition duration-250 ease-in-out mt-4"
            }
          >
            <div className=" flex justify-center gap-4">
              {isSigningUp} {isAuthenticating && <Spinner />}
            </div>
          </button>
        </form>
        <p className=" text-center">Already have an account</p>
        <NavLink to="/login">
          <p className="text-center text-2xl text-blue-400"> Login</p>
        </NavLink>
      </section>
    </div>
  );
}

export default Register;

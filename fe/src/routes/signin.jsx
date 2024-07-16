import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { LoginStatus } from "../main.jsx";

export default function SignIn() {
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");

  let [loginFail, setLogInFail] = useState("");

  const { loggedIn, setLoggedIn } = useContext(LoginStatus);

  function handleSignInBtn() {
    let newJSON = {
      email: email,
      password: password,
    };
    axios
      .post("http://localhost:3000/companies/login", newJSON)
      .then((res) => {
        if (res.status === 200) {
          setLoggedIn({
            isLoggedIn: true,
            company: res.data.company,
          });

          localStorage.setItem("loginToken", res.data.token);
          localStorage.setItem("company", res.data.company.company_name);
          window.location.href = "/";
        }
      })
      .catch((err) => {
        setLogInFail("Login has failed.");
      });
  }

  function handleKeyboard(event) {
    if (event.key === "Enter") {
      handleSignInBtn();
    }
  }

  return (
    <React.Fragment>
      <div className="container">
        <h1>Sign In</h1>
        <form>
          <label htmlFor="email">Company Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyPress={handleKeyboard}
          />
          <label htmlFor="pw" value={password}>
            Password
          </label>
          <input
            type="password"
            id="pw"
            onChange={(e) => setPassword(e.target.value)}
            onKeyPress={handleKeyboard}
          />
          <button type="button" onClick={handleSignInBtn}>
            Sign In
          </button>
        </form>
        <br />
        <form>
          <Link to="/sign-up">
            <button
              onClick={() => {
                window.location.href = "/sign-up";
              }}
            >
              Sign Up
            </button>
          </Link>
        </form>
        {loginFail && <h1 style={{ color: "#ff0000" }}>{loginFail}</h1>}
      </div>
    </React.Fragment>
  );
}

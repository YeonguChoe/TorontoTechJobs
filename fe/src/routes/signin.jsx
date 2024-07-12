import React, {useContext, useState} from "react";
import '../styles/authentication.css'
import {Link} from "react-router-dom";
import axios from "axios";
import {LoginStatus} from "../main.jsx";

export default function SignIn() {

    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");

    let [loginFail, setLogInFail] = useState("");

    const {loggedIn, setLoggedIn} = useContext(LoginStatus);

    function handleSignInBtn() {
        let newJSON = {
            email: email,
            password: password
        }
        axios.post("http://localhost:3000/companies/login", newJSON)
            .then(res => {
                if (res.status === 200) {
                    setLoggedIn({
                        isLoggedIn: true,
                        company: res.data.company // 서버에서 받아온 회사 정보
                    });

                    localStorage.setItem("loginToken", res.data.token);
                    localStorage.setItem("company", res.data.company.company_name); // 예시: 회사 이름 저장
                    window.location.href = '/'; // 로그인 성공 후 홈페이지로 이동
                }
            })
            .catch(err => {
                setLogInFail("Login has failed!!!"); // 로그인 실패 시 메시지 설정
            });
    }

    return (
        <React.Fragment>
            <h1>Sign In</h1>
            <form>
                <label htmlFor='email'>Company Email:</label>
                <input type="email" id='email' value={email} onChange={e => setEmail(e.target.value)}/>
                <label htmlFor='pw' value={password}>Password</label>
                <input type="password" id='pw' onChange={e => setPassword(e.target.value)}/>
                <button type="button" onClick={handleSignInBtn}>Sign In</button>
            </form>
            <br/>
            <form>
                <Link to="/sign-up">
                    <button onClick={() => {
                        window.location.href = '/sign-up'
                    }}>Sign Up
                    </button>
                </Link>
            </form>
            {loginFail && <h1 style={{color: '#ff0000'}}>{loginFail}</h1>}
        </React.Fragment>
    );
}
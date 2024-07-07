import React, {useState} from "react";
import axios from "axios";

export default function SignUp() {

    let [company, setCompany] = useState("");
    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");
    let [URL, setURL] = useState("");

    function handleBtn(e) {
        e.preventDefault();
        let accountJSON = {
            companyName: company,
            email: email,
            password: password,
            companyURL: URL,
        }
        axios.post("http://localhost:3000/companies/register", accountJSON).then(res => {
            console.log(res.data)
        })
    }

    return (
        <React.Fragment>
            <h1>Sign Up</h1>
            <form>
                <label htmlFor='company'>Company name: <input type='text' id='company' value={company}
                                                              onChange={e => setCompany(e.target.value)}
                                                              required/></label> <br/>
                <label htmlFor='id'>Email: <input type='email' id='email' value={email}
                                                  onChange={e => setEmail(e.target.value)} required/></label><br/>
                <label htmlFor='pw'>New PW:<input type='password' value={password}
                                                  onChange={e => setPassword(e.target.value)} required/> </label><br/>
                <label htmlFor='url'>Company URL: <input type='url' value={URL} onChange={e => setURL(e.target.value)}
                                                         required/> </label><br/>
                <button type='click' onClick={handleBtn}>Submit</button>
            </form>
        </React.Fragment>
    )
}
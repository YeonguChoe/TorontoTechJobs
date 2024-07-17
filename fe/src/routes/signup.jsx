import React, {useState} from "react";
import axios from "axios";

export default function SignUp() {
    let [company, setCompany] = useState("");
    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");
    let [URL, setURL] = useState("");

    const [invalidCredential, setInvalidCredential] = useState("");

    function handleBtn(e) {
        e.preventDefault();
        let accountJSON = {
            company_name: company,
            email: email,
            password: password,
            companyURL: URL,
        };
        axios
            .post("http://localhost:3000/companies/register", accountJSON)
            .then((res) => {
                window.location.href = "/sign-in";
            })
            .catch((err) => {
                setInvalidCredential(err.message);
            });
    }

    function handleKeyboard(event) {
        if (event.key === "Enter") {
            handleBtn(event);
        }
    }

    return (
        <React.Fragment>
            <form>
                <h2 className='mb-3'>Sign Up</h2>
                <div>
                    <label for="company_name">Company</label>
                    <div id='explanation' className='form-text'>We require company name for verification.</div>
                    <input
                        type='text'
                        className='form-control'
                        id='company_name'
                        onChange={e => setCompany(e.target.value)}
                        aria-describedby='explanation'
                        required
                    />
                </div>
                <div>
                    <label for='company_url'>Company URL</label>
                    <input type='url'
                           className='form-control'
                           id='company_url'
                           onChange={(e) => setURL(e.target.value)}
                           required/>
                </div>
                <div>
                    <label for='company_email' className='form-label'>Email</label>
                    <input type='email' className='form-control' id='company_email'
                           onChange={e => setEmail(e.target.value)} required/>
                </div>
                <div>
                    <label for='password' className='form-label'>Password</label>
                    <input type='password' className='form-control' id='password'
                           onChange={e => setPassword(e.target.value)}/>
                </div>
                <button className='btn btn-primary' onClick={handleBtn}>Submit</button>
            </form>
            {invalidCredential && (
                <h1 style={{color: "#ff0000"}}>{invalidCredential}</h1>
            )}
        </React.Fragment>
    );
}

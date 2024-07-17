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
                setInvalidCredential("Sign Up failed!");
            });
    }

    function handleKeyboard(event) {
        if (event.key === "Enter") {
            handleBtn(event);
        }
    }

    return (
        <React.Fragment>
            <div className='container'>
                <form>
                    <h2 className='mb-3'>Sign Up</h2>
                    <div className='d-flex justify-content-center align-items-center flex-column mb-2'>
                        <label for="company_name">Company</label>
                        <input
                            type='text'
                            className='form-control'
                            id='company_name'
                            onChange={e => setCompany(e.target.value)}
                            style={{width: '30%'}}
                            required
                        />
                    </div>
                    <div className='d-flex justify-content-center align-items-center flex-column mb-2'>
                        <label for='company_url'>Company URL</label>
                        <input type='url'
                               className='form-control'
                               id='company_url'
                               onChange={(e) => setURL(e.target.value)}
                               style={{width: '30%'}}
                               required/>
                    </div>
                    <div className='d-flex justify-content-center align-items-center flex-column mb-2'>
                        <label for='company_email' className='form-label'>Email</label>
                        <input type='email' className='form-control' id='company_email'
                               onChange={e => setEmail(e.target.value)}
                               style={{width: '30%'}}
                               required/>
                    </div>
                    <div className='d-flex justify-content-center align-items-center flex-column mb-2'>
                        <label for='password' className='form-label'>Password</label>
                        <input type='password' className='form-control' id='password'
                               onChange={e => setPassword(e.target.value)}
                               style={{width: '30%'}}
                               required
                        />
                    </div>
                    <div className='d-flex justify-content-center align-items-center flex-column mb-2'>
                        <button className='btn btn-outline-primary' style={{width: '30%'}} onClick={handleBtn}>Submit</button>
                    </div>
                </form>

                <div className="d-flex justify-content-center align-items-center">
                    {invalidCredential && (
                        <h5 style={{color: "#ff0000"}}>{invalidCredential}</h5>
                    )}
                </div>
            </div>
        </React.Fragment>
    );
}

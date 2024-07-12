import React, {createContext, useEffect, useState} from "react";
import ReactDOM from 'react-dom'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Root from "./routes/root.jsx";
import ErrorPage from "./error-page.jsx";
import Post from "./routes/post.jsx";
import Create from "./routes/create.jsx";
import SignIn from "./routes/signin.jsx";
import SignUp from "./routes/signup.jsx";
import Edit from "./routes/edit.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root/>,
        errorElement: <ErrorPage/>,
        children: [
            {
                path: "post/:postID",
                element: <Post/>
            },
            {
                path: "new-post/",
                element: <Create/>
            },
            {
                path: "edit/:postID",
                element: <Edit/>
            },
            {
                path: "sign-in",
                element: <SignIn/>
            },
            {
                path: "sign-up",
                element: <SignUp/>
            }
        ]
    },
]);

export const LoginStatus = createContext();

const App = () => {

    const [loggedIn, setLoggedIn] = useState({
        isLoggedIn: false,
        company: ''
    })

    useEffect(() => {
        let token = localStorage.getItem("loginToken");
        let company = localStorage.getItem("company");
        if (token !== null && company !== null) {
            setLoggedIn({
                isLoggedIn: true,
                company: company
            })
        }

    }, []);

    return (
        <React.StrictMode>
            <LoginStatus.Provider value={{loggedIn, setLoggedIn}}>
                <RouterProvider router={router}/>
            </LoginStatus.Provider>
        </React.StrictMode>
    )
}

ReactDOM.createRoot(document.getElementById("root")).render(<App/>);
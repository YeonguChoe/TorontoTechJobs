import React from "react";
import ReactDOM from 'react-dom'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Root from "./routes/root.jsx";
import ErrorPage from "./error-page.jsx";
import Post from "./routes/post.jsx";
import Create from "./routes/create.jsx";
import SignIn from "./routes/signin.jsx";
import SignUp from "./routes/signup.jsx";

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

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <RouterProvider router={router}/>
    </React.StrictMode>
)
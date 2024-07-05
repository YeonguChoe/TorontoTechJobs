import React from "react";
import ReactDOM from 'react-dom'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Root from "./routes/root.jsx";
import ErrorPage from "./error-page.jsx";
import Post from "./routes/post.jsx";
import Create from "./routes/create.jsx";
import SignIn from "./routes/signin.jsx";

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
                path: "create-post/",
                element: <Create/>
            }
            ,
            {
                path: "signin",
                element: <SignIn/>
            }
        ]
    },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <RouterProvider router={router}/>
    </React.StrictMode>
)
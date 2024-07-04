import React from 'react';
import {createRoot} from 'react-dom/client';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import Root from "./routes/root";


const router = createBrowserRouter([
    {
        path: "/",
        element: <Root/>,
    }
])

createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <RouterProvider router={router}/>
    </React.StrictMode>
);
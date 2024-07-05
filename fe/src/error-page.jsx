import {useRouteError} from "react-router-dom";

export default function ErrorPage() {
    const error = useRouteError();

    return (
        <div id="error-page">
            <h1>Error occurred</h1>
            <p>
                <i>{error.statusText || error.message}</i>
            </p>
        </div>
    )
}
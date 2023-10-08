
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

export const ProtectedRoute = ( { children, ...rest } ) => {
    const token = Cookies.get("token");
    console.log("token: ", token);

    if (token === null || token === undefined) {
        return <Navigate to={"/Login"} replace />
    } else {
        return children;
    }
}

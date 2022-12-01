import { Outlet } from "react-router-dom";
import ResponsiveAppBar from "./components/AppBar";

export default function LayOut() {
    return (
        <>
            <ResponsiveAppBar />

            <Outlet />
        </>
    )
}
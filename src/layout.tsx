import { Outlet } from "react-router-dom";
import { Navbar } from "./components/Navbar";

export function Layout() {
    return (
        <div className="">
            <Navbar />
            <div className="text-lg">
                <Outlet />
            </div>
        </div>
    )
}
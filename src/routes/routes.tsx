import { Route, Routes } from "react-router-dom";
import List from "../pages/list";
import Item from "../pages/item";
import Stats from "../pages/stats";

export default function AppRoutes() {
    const routes = [
        {
            path: "/list",
            element: <List />
        },
        {
            path: "/item/:id",
            element: <Item />
        },
        {
            path: "/stats",
            element: <Stats />
        }
    ]
    return (
        <Routes>
            {routes.map((route) => (
                <Route key={route.path} path={route.path} element={route.element} />
            ))}
        </Routes>
    );
}
import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Spinner from "../components/atoms/spinner/spinner";

const List = lazy(() => import("../pages/list"));
const Item = lazy(() => import("../pages/item/item"));
const Stats = lazy(() => import("../pages/stats/stats"));

function LoadingFallback() {
    return <Spinner size="large" />;
}

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
        <Suspense fallback={<LoadingFallback />}>
            <Routes>
                {routes.map((route) => (
                    <Route key={route.path} path={route.path} element={route.element} />
                ))}
            </Routes>
        </Suspense>
    );
}
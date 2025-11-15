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
    return (
        <Suspense fallback={<LoadingFallback />}>
            <Routes>
                <Route path="/list" element={<List />} />
                <Route path="/item/:id" element={<Item />} />
                <Route path="/stats" element={<Stats />} />
            </Routes>
        </Suspense>
    );
}
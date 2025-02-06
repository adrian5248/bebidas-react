import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./Layouts/Layout";
import FavoritePage from "./pages/FavoritePage";
import HomePage from "./pages/HomePage";

export default function AppRouter(){
    return (
        <BrowserRouter>
        <Routes>
            <Route element={<Layout />}>
                <Route path="/" element={<HomePage/>} />
                <Route path="favoritos/" element={<FavoritePage/>}/>
            </Route>
            </Routes>
        </BrowserRouter>
    )
}

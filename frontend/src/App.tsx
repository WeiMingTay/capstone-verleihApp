import './assets/App.scss'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import AddTool from "./pages/AddTool/AddTool.tsx";
import StartPage from "./pages/StartPage/StartPage.tsx";
import Uebersicht from "./pages/Uebersicht/Uebersicht.tsx";
import SchwarzesBrett from "./pages/SchwarzesBrett/SchwarzesBrett.tsx";
import Tool from "./pages/Tool/Tool.tsx";
import WelcomePage from "./pages/WelcomePage/WelcomePage.tsx";
import Header from "./components/Header/Header.tsx";


export default function App() {

    return (
        <BrowserRouter>
            <Header/>
            <Routes>
                <Route path={"/"} element={<WelcomePage/>}/>
                <Route path={"/start"} element={<StartPage/>}/>
                <Route path={"/werkzeuge"} element={<Uebersicht/>}/>
                <Route path={"/werkzeuge/:id"} element={<Tool/>}/>
                <Route path={"/werkzeuge/add"} element={<AddTool/>}/>
                <Route path={"/schwarzes-brett"} element={<SchwarzesBrett/>}/>
            </Routes>
        </BrowserRouter>
    )
}
import './assets/App.scss'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import AddTool from "./pages/AddTool/AddTool.tsx";
import StartPage from "./pages/StartPage/StartPage.tsx";
import ToolGallery from "./pages/ToolGallery/ToolGallery.tsx";
import SchwarzesBrett from "./pages/SchwarzesBrett/SchwarzesBrett.tsx";
import WelcomePage from "./pages/WelcomePage/WelcomePage.tsx";
import Header from "./components/Header/Header.tsx";
import {useEffect, useState} from "react";
import {Tools} from "./assets/entities/tools.ts";
import axios from "axios";
import ToolPage from "./pages/Tool/ToolPage.tsx";
import Footer from "./components/Footer/Footer.tsx";
import CategoryGalleryPage from "./pages/CategoryGalleryPage/CategoryGalleryPage.tsx";
import CategoryPage from "./pages/CategoryPage/CategoryPage.tsx";



export default function App() {
    const [tools, setTools] = useState<Tools[]>([])


    useEffect(
        getAllTools, []
    )

    function getAllTools() {
        axios.get("/api/tools")
            .then(response => {
                setTools(response.data)
            })
            .catch(error => {
                console.error(error)
            })
    }



    return (
        <BrowserRouter>
            <Header/>
            <Routes>
                <Route path={"/"} element={<WelcomePage/>}/>
                <Route path={"/start"} element={<StartPage tools={tools}/>}/>
                <Route path={"/werkzeuge"} element={<ToolGallery tools={tools}/>}/>
                <Route path={"/werkzeuge/:id"} element={<ToolPage onToolUpdate={getAllTools}/>}/>
                <Route path={"/werkzeuge/add"} element={<AddTool onToolUpdate={getAllTools}/>}/>
                <Route path={"/kategorie"} element={<CategoryGalleryPage/>}/>
                <Route path={"/kategorie/:id"} element={<CategoryPage tools={tools}/>}/>
                <Route path={"/schwarzes-brett"} element={<SchwarzesBrett/>}/>
            </Routes>
            <Footer/>
        </BrowserRouter>
    )
}
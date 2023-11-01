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
import ContactPage from "./pages/ContactPage/ContactPage.tsx";
import ProfilPage from "./pages/ProfilPage/ProfilPage.tsx";
import UserLogin from "./pages/UserLogin/UserLogin.tsx";
import {UserProfile} from "./assets/entities/userProfile.ts";


export default function App() {
    const [tools, setTools] = useState<Tools[]>([])
    const [userProfile, setUserProfile] = useState<UserProfile>()

    useEffect(
        getAllTools, []
    )
    useEffect(
        profile, []
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

    function login() {
        const host = window.location.host === 'localhost:5173' ? 'http://localhost:8080': window.location.origin

        window.open(host + '/oauth2/authorization/github', '_self')
    }

    function profile() {
        axios.get("/api/user/profile")
            .then(response => {
                setUserProfile(response.data);
            })
            .catch(error => {
                console.error("Fehler beim Abrufen des Benutzerprofils", error)
            })
    }
    return (
        <BrowserRouter>
            <Header/>
            <Routes>
                <Route path={"/login"} element={<UserLogin userProfile={userProfile} login={login}/>}/>
                <Route path={"/"} element={<WelcomePage/>}/>
                <Route path={"/start"} element={<StartPage tools={tools}/>}/>
                <Route path={"/profil"} element={<ProfilPage/>}/>
                <Route path={"/contact"} element={<ContactPage/>}/>
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
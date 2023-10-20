import './assets/App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import AddTool from "./pages/AddTool/AddTool.tsx";


export default function App() {


    return (
        <BrowserRouter>
            <h1>Moin</h1>
            <Routes>
                <Route path={"werkzeuge/add"} element={<AddTool/>}/>
            </Routes>
        </BrowserRouter>
    )
}
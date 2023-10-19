import './assets/App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import AddTool from "./pages/AddTool/AddTool.tsx";
import FlipCard from "./pages/FlipCard/FlipCard.tsx";


export default function App() {


    return (
        <BrowserRouter>
            <h1>Moin</h1>
            <Routes>
                <Route path={"werkzeuge/add"} element={<AddTool/>}/>
                <Route path={"ulrike/flipCard"} element={<FlipCard/>}/>
            </Routes>
        </BrowserRouter>
    )
}
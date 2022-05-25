import {Container, } from "@mui/material";
import HomePage from "./components/HomePage";
import {Routes, Route} from 'react-router-dom';
import About from "./components/About";
import PageNotFound from "./components/PageNotFound";

function App() {
    return (
        <Container sx={{marginTop: 5, maxWidth: "md"}}>
            <Routes>
                <Route exact  path="/" element={<HomePage/>}/>
                <Route path="/about" element={<About/>}/>
                <Route path="*" element={<PageNotFound/>}/>
            </Routes>
        </Container>
    );
}

export default App;

import Home from "../src/pages/Home/Home";
import Login from "../src/pages/login/Login";
import SignUp from "../src/pages/signup/Signup";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

function App() {
    return (
    <Router>
        <Routes>
            <Route exact path="/" element = {<Home/>}>     
            </Route>
            <Route path="/login" element = {<Login/>}>
             </Route>
             <Route path="/signup" element = {<SignUp/>}>    
             </Route>            
        </Routes>
    </Router>
    );
}
export default App;
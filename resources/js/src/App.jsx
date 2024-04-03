import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Currencies from "./components/Currencies/Currencies";

const App = () => {

    return (
        <React.Fragment>
            <Router>
                <Routes>
                    <Route path='/' element={<Currencies/>}></Route>
                </Routes>
            </Router>
        </React.Fragment>
    );

}

export default App;

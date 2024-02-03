
import Home from './pages/Home/HomePage'
import APP from './App'
import SIGNUP from './signup'
import LOGIN from './login'
import Dashboard from './pages/Dashboard';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

//import TaskTracker from './taskTracker';

import { useSelector } from 'react-redux';

function DApp() {
    const { auth } = useSelector((state) => ({ ...state }));
    return (

        <Router>
            <div>
                <h2> Welcome to Task Tracker System</h2>
                <Header />
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/LOGIN' element={!auth.currentUser ? < APP /> : <LOGIN />} />
                    <Route path='/LOGIN' element={!auth.currentUser ? <LOGIN /> : <Dashboard />} />
                    <Route path='/signup' element={!auth.currentUser ? <SIGNUP /> : <LOGIN />} />
                    <Route path='/taskTracker' element={
                        <RequireAuth>
                            <TaskTracker />
                        </RequireAuth>
                    } />
                    <Route
                        path='/Dashboard' element={
                            <RequireAuth>
                                <Dashboard />
                            </RequireAuth>
                        } />
                </Routes>
            </div>
        </Router>

    );
}

export default DApp;
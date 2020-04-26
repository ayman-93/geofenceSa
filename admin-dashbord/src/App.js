import React, { useState } from "react";
// import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import Sidebar from "./components/Sidebar";
import Chat from "./components/Chat";
import ViolationsList from "./components/ViolationsList";
import UserManagement from './components/UserManagement';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./components/Sidebar.css";
import AddUser from "./components/AddUser";
import EditUser from "./components/EditUser";
 
function App() {
    const [active, toggleActive] = useState(false);
 
    return (
        <Router>
            <div className="wrapper d-flex align-items-stretch">
                <Sidebar active={active} />
                <div id="content" className="p-4 p-md-5">
                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
                        <div className="container-fluid">
                            <button
                                type="button"
                                id="sidebarCollapse"
                                className="btn btn-primary"
                                onClick={() => toggleActive(!active)}
                            >
                                <i className="fa fa-bars"></i>
                                <span className="sr-only">Toggle Menu</span>
                            </button>
                        </div>
                    </nav>
                    <Switch>
                        <Route exact path="/chat" component={Chat} />
                        <Route exact path="/UserManagement" component={UserManagement} />
                        <Route
                            exact
                            path="/violations"
                            component={ViolationsList}
                        />
                        <Route exact path="/UserManagement/addUser" component={AddUser} />
                        <Route exact path="/UserManagement/editUser/:id" component={EditUser} />
                    </Switch>
                </div>
            </div>
        </Router>
    );
}
 
export default App;
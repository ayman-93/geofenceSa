import React, { useState } from "react";
import "./Sidebar.css";

const Sidebar = () => {
    const [active, toggleActive] = useState(false);
    const [collapse, toggleCollapse] = useState(false);

    return (
        <div className="wrapper d-flex align-items-stretch">
            <nav id="sidebar" className={active ? "active" : ""}>
                <div className="p-4 pt-5">
                    <ul className="list-unstyled components mb-5">
                        <li>
                            <a href="#">About</a>
                        </li>
                        <li>
                            <a href="#">Portfolio</a>
                        </li>
                        <li>
                            <a href="#">Contact</a>
                        </li>
                    </ul>

                    <div className="footer">
                        <p>@siajlab</p>
                    </div>
                </div>
            </nav>

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
                        <button
                            className="btn btn-dark d-inline-block d-lg-none ml-auto"
                            type="button"
                            data-toggle="collapse"
                            data-target="#navbarSupportedContent"
                            aria-controls="navbarSupportedContent"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                            onClick={() => {
                                toggleCollapse(!collapse);
                            }}
                        >
                            <i className="fa fa-bars"></i>
                        </button>

                        <div
                            className={`navbar-collapse ${
                                collapse ? "collapse" : ""
                            } `}
                            id="navbarSupportedContent"
                        >
                            <ul className="nav navbar-nav ml-auto">
                                <li className="nav-item active">
                                    <a className="nav-link" href="#">
                                        Home
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#">
                                        About
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#">
                                        Portfolio
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#">
                                        Contact
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>

                <h2 className="mb-4">Sidebar #01</h2>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum.
                </p>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum.
                </p>
            </div>
        </div>
    );
};

export default Sidebar;

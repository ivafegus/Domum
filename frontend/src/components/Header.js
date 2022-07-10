import { useContext } from "react";
import { UserContext } from "../userContext";
import { Link } from "react-router-dom";

function Header(props) {
    return (
        <header>
            <nav className="navbar navbar-expand-lg navbar-light bg-success mb-2 px-4">
                <a className="navbar-brand" href="/">
                    <img src={require('../images/logo.png')}  width="40" height="40" alt=""></img>
                </a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item nav-link"><Link to='/'>Home</Link></li>
                            <UserContext.Consumer>
                                {context => (
                                    context.user ? (
                                        <>
                                            <li className="nav-item nav-link"><Link to='/filteredApartments'>Apartments</Link></li>
                                            {context.user.admin ? (<li className="nav-item nav-link"><Link to='/admin'>Admin panel</Link></li>) : <></>}
                                            <li className="nav-item nav-link redLogout"><Link to='/logout'>Logout</Link></li>
                                        </>
                                    ) : (
                                        <>
                                            <li className="nav-item nav-link"><Link to='/login'>Login</Link></li>
                                            <li className="nav-item nav-link"><Link to='/register'>Register</Link></li>
                                        </>
                                    )
                                )}
                            </UserContext.Consumer>
                        </ul>
                </div>
            </nav>
        </header >
    );
}

export default Header;
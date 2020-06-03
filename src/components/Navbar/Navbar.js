import React, { Component } from 'react'

import { NavLink } from 'react-router-dom'

import './Navbar.css'

class Navbar extends Component {
    render() {
        return (
            <nav className="nav__wrapper--outer">
                <div className="nav__wrapper--inner">
                    <div className="nav__links">
                        {/* <NavLink exact className="nav__link" activeClassName="section__selected" to="/News">News</NavLink> */}
                       
                        <NavLink
                            exact
                            className="nav__link"
                            activeClassName="section__selected"
                            to="/"
                        >
                            Tic-Tac-Toe
                        </NavLink>

                        <a className="nav__link" href="https://github.com/ayanbag/tic-tac-toe"> Github</a>


                    </div>
                </div>
            </nav>
        )
    }
}

export default Navbar

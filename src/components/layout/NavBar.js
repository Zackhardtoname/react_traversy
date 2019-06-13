import React from 'react';
import PropTypes from "prop-types";

const NavBar = ({icon, title}) => {
    return (
        <nav className='navbar bg-primary'>
            <h1>
                {/*If you split this in two lines, you won't have a space in the middle*/}
                <i className={icon} /> {title}
            </h1>
        </nav>
    );
}

NavBar.defaultProps = {
    title: "Github Finder",
    icon: "fab fa-github"
}

NavBar.propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
}

export default NavBar;
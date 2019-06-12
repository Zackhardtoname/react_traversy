import React, {Component} from 'react';
import PropTypes from "prop-types"

export class NavBar extends Component {
    static defaultProps = {
        title: "Github Finder",
        icon: "fab fa-github"
    }

    static propTypes = {
        title: PropTypes.string.isRequired,
        icon: PropTypes.string.isRequired,
    }

    render() {
        return (
            <nav className='navbar bg-primary'>
                <h1>
                    {/*If you split this in two lines, you won't have a space in the middle*/}
                    <i className={this.props.icon} /> {this.props.title}
                </h1>
            </nav>
        );
    }
}

export default NavBar;
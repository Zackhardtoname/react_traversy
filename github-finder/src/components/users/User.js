import React, {useEffect, Fragment, useContext} from 'react';
import Repos from "../repos/Repos"
import Spinner from "../layout/Spinner"
import {Link} from "react-router-dom"
import GithubContext from "../../context/github/githubContext"

const getter = (comp, section_head, TagType="strong") => {
    // variable starts with uppercase instead of lowercase since lowercase JSX tag names are directly compiled as strings.
    return (
        <div>
            {comp &&
                (<Fragment>
                    <h3>{section_head}</h3>
                    <TagType>{comp}</TagType>
                </Fragment>)
            }
        </div>
    )
}

const User = ({match}) => {
    const githubContext = useContext(GithubContext)
    const{ getUser, loading, repos, getUserRepos, user } = githubContext

    useEffect(() => {
        getUser(match.params.login)
        getUserRepos(match.params.login)
    //  eslint-disable-next-line
    }, [])
    //[] would make it only run once (no specified conditions)

    const {
        name,
        company,
        avatar_url,
        location,
        bio,
        blog,
        login,
        html_url,
        followers,
        following,
        public_repos,
        public_gists,
        hireable
    } = user

    if (loading) {
        return <Spinner/>
    }
    else {
        return (
            <Fragment>
                <Link to="/" className="btn btn-light">Back to Search</Link>

                <div className="card grid-2">
                    <div className="all-center">
                        <img src={avatar_url} alt="avatar" className="round-img" style={{width: "150px"}}/>
                    <h1>{name}</h1>
                    <p>location: {location}</p>
                    <div>
                        Hireable: {hireable ? (<i className="fas fa-check text-success"></i>) : (<i className="fas fa-times-circle text-danger"></i>)}
                    </div>
                    </div>
                    <div>
                        {getter(bio, "Bio", "p")}
                        <a href={html_url} className="btn btn-dark my-1" target="_blank" rel="noopener noreferrer">Visit GitHub Profile</a>
                        <ul>
                            <li>
                                {getter(login, "Username")}
                            </li>
                            <li>
                                {getter(company, "Company")}
                            </li>
                            <li>
                                {getter(blog, "Website")}
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="card text-center">
                    <div className="badge badge-primary">
                        Followers: {followers}
                    </div>
                    <div className="badge badge-success">
                        Following: {following}
                    </div>
                    <div className="badge badge-dark">
                        Public Repos: {public_repos}
                    </div>
                    <div className="badge badge-light">
                        Public Gists: {public_gists}
                    </div>
                </div>
                <Repos repos={repos} />
            </Fragment>
        );
    }
}

export default User;
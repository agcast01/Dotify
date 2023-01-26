import { useContext, useState } from "react";
import { useSelector } from "react-redux"
import { NavLink, useHistory } from "react-router-dom"
import LogoutButton from "./auth/LogoutButton";
import PlaylistTop from "./Playlists/PlaylistTop";
import { ThemeContext } from "./Providers/ThemeProvider";
import UserTop from './User/UserTop'

function ContentTopBar({path}) {
    const history = useHistory();
    const user = useSelector(state => state.session.user)
    const [dropMenu, setDropMenu] = useState(false)
    const {theme} = useContext(ThemeContext)

    return (
        <div id={theme}>
        <div className={`content-top-bar`} id={theme}>
            <div className="navArrows">
                <button className="nav-arrow" onClick={() => history.goBack()}><span className={history.length > 0 ? "material-symbols-outlined active" : "material-symbols-outlined inactive"}>
                    arrow_back_ios
                </span></button>
                <button className="nav-arrow" onClick={() => history.goForward()}><span className="material-symbols-outlined">
                    arrow_forward_ios
                </span></button>
            </div>
            {user === null &&
                <div className="auth-buttons">
                    <NavLink to='/signup' id="sign-up">Sign Up</NavLink>
                    <NavLink to='/login' id='login'>Log in</NavLink>
                </div>}
            {user !== null && (
                <>
                    <div></div>
                    <div id={dropMenu ? 'active-profile' : 'profile'} onClick={() => setDropMenu(!dropMenu)}>
                        <span className="material-symbols-outlined">
                            person
                        </span>
                        <span>
                            {user.username}
                        </span>
                        {!dropMenu && <span className="material-symbols-outlined">
                            arrow_drop_down
                        </span>}
                        {dropMenu && (
                            <>
                            <span className="material-symbols-outlined">
                            arrow_drop_up
                            </span>
                            <div id='drop-down'>
                                <div onClick={() => history.push('/new-song')}>Upload Song</div>
                                <LogoutButton />
                            </div>
                            </>
                        )}
                    </div>
                </>
            )}
        </div>
        {(path !== '/' && path !== '/library' && path !== '/search') && (
            <div className='playlist-info'>
                {path === '/user/songs' && user !== null && <UserTop />}
            </div>
        )}
        </div>
    )
}


export default ContentTopBar
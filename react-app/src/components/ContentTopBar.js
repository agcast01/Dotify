import { useState } from "react";
import { useSelector } from "react-redux"
import { NavLink, useHistory } from "react-router-dom"
import LogoutButton from "./auth/LogoutButton";

function ContentTopBar() {
    const history = useHistory();
    console.log(history)
    const user = useSelector(state => state.session.user)
    const [dropMenu, setDropMenu] = useState(false)

    return (
        <div id='content-top-bar'>
            <div className="navArrows">
                <button className="nav-arrow" onClick={() => history.goBack()}><span class={history.length > 0 ? "material-symbols-outlined active" : "material-symbols-outlined inactive"}>
                    arrow_back_ios
                </span></button>
                <button className="nav-arrow" onClick={() => history.goForward()}><span class="material-symbols-outlined">
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
                        <span class="material-symbols-outlined">
                            person
                        </span>
                        <span>
                            {user.username}
                        </span>
                        {!dropMenu && <span class="material-symbols-outlined">
                            arrow_drop_down
                        </span>}
                        {dropMenu && (
                            <>
                            <span class="material-symbols-outlined">
                            arrow_drop_up
                            </span>
                            <div id='drop-down'>
                                <LogoutButton />
                            </div>
                            </>
                        )}
                    </div>
                </>
            )}
        </div>
    )
}


export default ContentTopBar
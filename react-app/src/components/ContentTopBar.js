import { useSelector } from "react-redux"
import { useHistory } from "react-router-dom"

function ContentTopBar() {
    const history = useHistory();
    console.log(history)
    const user = useSelector(state => state.session.user)
    if (user === null) {
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
                <div className="auth-buttons">
                    <button id="sign-up">Sign Up</button>
                    <button id='login'>Log in</button>
                </div>
            </div>
        )
    }
}

export default ContentTopBar
import { useSelector } from "react-redux"
import { useHistory } from "react-router-dom"

function YourAlbumsButton({path}) {
    const user = useSelector(state => state.session.user)
    const history = useHistory()

    function handleClick() {
        if (user !== null) {
            return history.push('/your-albums')
        }
    }

    return (
        <button className={path === '/your-albums' ? 'sidebar-link active' : 'sidebar-link'} onClick={handleClick} style={user === null ? { 'cursor': 'not-allowed' } : { 'cursor': 'pointer' }}>
            <span className="material-symbols-outlined">
                web_stories
            </span>

            <span>
                Your Albums
            </span>
        </button>
    )
}

export default YourAlbumsButton
import { useSelector } from "react-redux"
import { useHistory } from "react-router-dom"

function LikedSongsButton() {
    const user = useSelector(state => state.session.user)
    const history = useHistory()

    function handleClick() {
        if(user !== null) {
            return history.push('/liked-songs')
        }
    }

    return (
        <button className="sidebar-link" onClick={handleClick} style={user=== null ? {'cursor': 'not-allowed'}: {'cursor': 'pointer'}}> 
            <span className="material-symbols-outlined" id='liked-icon'>
                favorite
            </span>

            <span>
                Liked Songs
            </span>
        </button>
    )
}

export default LikedSongsButton
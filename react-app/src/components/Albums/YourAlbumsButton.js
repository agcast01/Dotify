import { useSelector } from "react-redux"
import { useHistory } from "react-router-dom"

function YourAlbumsButton() {
    const user = useSelector(state => state.session.user)
    const history = useHistory()

    function handleClick() {
        if(user !== null) {
            return history.push('/your-albums')
        }
    }

    return (
        <button className="sidebar-link" onClick={handleClick} style={user=== null ? {'cursor': 'not-allowed'}: {'cursor': 'pointer'}}> 
            <span className="material-symbols-outlined" id='liked-icon'>
                favorite
            </span>

            <span>
                Your Albums
            </span>
        </button>
    )
}

export default YourAlbumsButton
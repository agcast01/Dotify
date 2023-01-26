import { useSelector } from "react-redux"
import { useHistory } from "react-router-dom"

function PlaylistNavbar({ path }) {
    const user = useSelector(state => state.session.user)
    const history = useHistory()

    if (user === null) return null
    return (
        <div id="playlist-sidebar">
            {user.playlists.map(playlist => (
                <div className={path === `/playlists/${playlist.id}`?  'sidebar-link center active':"sidebar-link center"} onClick={() => history.push(`/playlists/${playlist.id}`)}>{playlist.title}</div>
            ))}
        </div>
    )
}

export default PlaylistNavbar
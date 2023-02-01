import { useSelector } from "react-redux"
import CreatePlaylistButton from "./Playlists/CreatePlaylistButton"
import LikedSongsButton from "./User/LikedSongsButton"

function SongPlaylistNavBar() {
    const user = useSelector(state => state.session.user)
    return (
        <div className="song-navbar">
            <ul>
                <li className={user === null ? 'disabled': ''}>
                    <CreatePlaylistButton />
                </li>
                <li>
                    <LikedSongsButton />
                </li>
            </ul>
        </div>
    )
}

export default SongPlaylistNavBar
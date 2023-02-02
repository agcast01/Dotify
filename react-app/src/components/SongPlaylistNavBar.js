import { useSelector } from "react-redux"
import YourAlbumsButton from "./Albums/YourAlbumsButton"
import CreatePlaylistButton from "./Playlists/CreatePlaylistButton"
import LikedSongsButton from "./User/LikedSongsButton"

function SongPlaylistNavBar({path}) {
    const user = useSelector(state => state.session.user)
    return (
        <div className="song-navbar">
            <ul>
                <li className={user === null ? 'disabled': ''}>
                    <CreatePlaylistButton />
                </li>
                <li>
                    <LikedSongsButton path={path}/>
                </li>
                <li>
                    <YourAlbumsButton path={path}/>
                </li>
            </ul>
        </div>
    )
}

export default SongPlaylistNavBar
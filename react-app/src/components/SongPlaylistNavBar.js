import CreatePlaylistButton from "./Playlists/CreatePlaylistButton"
import LikedSongsButton from "./User/LikedSongsButton"

function SongPlaylistNavBar() {
    return (
        <div className="song-navbar">
            <ul>
                <li>
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
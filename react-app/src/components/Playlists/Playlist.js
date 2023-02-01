import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Songs from "../Songs/Songs";
import PlaylistTop from "./PlaylistTop";

function Playlist({setPath}) {
    const {playlistId} = useParams()
    setPath(`/playlists/${playlistId}`)
    const playlists = useSelector(state => state.playlists)
    const playlist = playlists[playlistId]
    if(!playlist) return null
    return (
        <div>
            <PlaylistTop playlistId={playlist.id} />
            
            <Songs songs={playlist.songs} />
        </div>
    )
}

export default Playlist
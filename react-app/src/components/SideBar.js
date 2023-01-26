import NavBar from "./NavBar"
import PlaylistNavbar from "./Playlists/PlaylistNavbar"
import SongPlaylistNavBar from "./SongPlaylistNavBar"

function SideBar({path, setPath}){
    return(
        <div className="sidebar">
            <div id='logo'>Dotify</div>
            <NavBar path={path} setPath={setPath}/>
            <SongPlaylistNavBar />
            <PlaylistNavbar path={path}/>
        </div>
    )
}

export default SideBar
import NavBar from "./NavBar"
import SongPlaylistNavBar from "./SongPlaylistNavBar"

function SideBar(){
    return(
        <div className="sidebar">
            <div id='logo'>Spotify</div>
            <NavBar />
            <SongPlaylistNavBar />
            
        </div>
    )
}

export default SideBar
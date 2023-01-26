import NavBar from "./NavBar"
import SongPlaylistNavBar from "./SongPlaylistNavBar"

function SideBar({path, setPath}){
    return(
        <div className="sidebar">
            <div id='logo'>Spotify</div>
            <NavBar path={path} setPath={setPath}/>
            <SongPlaylistNavBar />
            
        </div>
    )
}

export default SideBar
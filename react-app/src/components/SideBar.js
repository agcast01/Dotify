import NavBar from "./NavBar"
import PlaylistNavbar from "./Playlists/PlaylistNavbar"
import SongPlaylistNavBar from "./SongPlaylistNavBar"

function SideBar({path, setPath}){
    return(
        <div className="sidebar">
            <div id='logo'>Dotify</div>
            <NavBar path={path} setPath={setPath}/>
            <SongPlaylistNavBar path={path}/>
            <PlaylistNavbar path={path}/>
            <div className="about-me">
                <p className="title">About Me</p>
                <a href="https://github.com/agcast01" target='_blank' rel="noreferrer noopener">Github</a>
                <a href="https://linkedin.com" target="_blank" rel="noreferrer noopener">LinkedIn</a>
            </div>
        </div>
    )
}

export default SideBar
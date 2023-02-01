import { useState } from "react"
import HomeAlbums from "./Albums/HomeAlbums"
import HomePlaylists from "./Playlists/HomePlaylists"
import HomeSongs from "./Songs/HomeSongs"

function Home({setPath}) {
    setPath('/')
    const [page, setPage] = useState('playlist')

    function showPage() {
        if(page === 'playlist') return <HomePlaylists />
        if(page === 'songs') return <HomeSongs />
        return <HomeAlbums />
    }

    return (
        <div>
            <div className="home-buttons">
                <button onClick={() => setPage('playlist')} className={page === 'playlist'? 'sidebar-link active': 'sidebar-link inactive'}>Playlists</button>
                <button onClick={()=> setPage('songs')} className={page === 'songs'? 'sidebar-link active': 'sidebar-link inactive'}>Songs</button>
                <button onClick={()=> setPage('albums')} className={page === 'albums'? 'sidebar-link active': 'sidebar-link inactive'}>Albums</button>
            </div>

            {showPage()}
        </div>
    )
}

export default Home
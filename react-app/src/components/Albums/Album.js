import { useSelector } from "react-redux";
import { Redirect, useParams } from "react-router-dom";
import Songs from "../Songs/Songs";
import AlbumTop from "./AlbumTop";

function Album({setPath}) {
    const {albumId} = useParams()
    setPath(`/albums/${albumId}`)
    const albums = useSelector(state => state.albums)
    const album = albums[albumId]
    
    if(!album) return <Redirect to={'/'}/>

    return (
        <div>
            <AlbumTop albumId={albumId}/>
            
            <Songs songs={album.songs} />
        </div>
    )
}

export default Album
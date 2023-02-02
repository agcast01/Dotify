import { useState } from "react"
import { useSelector } from "react-redux"
import DeleteAlbumModal from "./DeleteAlbumModal"
import EditAlbumModal from "./EditAlbumModal"

function AlbumTop({albumId}) {
    const user = useSelector(state => state.session.user)
    const albums = useSelector(state => state.albums)
    const album = albums[albumId]
    const [showEditModal, setShowEditModal]= useState(false)
    const [showModal, setShowModal] = useState(false)
    const [options, setOptions] = useState(false)


    const title = () => {
        if ( user !== null && user.username === album.user) {
            return (
                <>
                    <h1 onClick={() => setShowEditModal(true)} id='editable-title'>{album.title}</h1>
                    {showEditModal && <EditAlbumModal album={album} setShowEditModal={setShowEditModal} isSong={false}/>}
                </>
            )
        } return false
    }

    return (
        <div onClick={() => setOptions(false)}>
        <div className="playlist-info">
            <span className='playlist-image' style={{'backgroundImage': `url(${album.imageUrl})`}}>
            </span>
            <span className="playlist-data">
                <p>ALBUM</p>
                {title() || <h1>{album.title}</h1>}
                {album.description && <p className="description">{album.description}</p>}
                <p className="playlist-stats">{album.user} • {album.songs.length} songs</p>
            </span>
        </div>
        {showModal && <DeleteAlbumModal album={album} setShowModal={setShowModal} />}
            { user !== null && album.user === user.username && <div className="drop-div">
                <button className="more-options" onClick={(e) => {e.stopPropagation(); setOptions(!options)}}>...</button>
                {options && (
                    <div id="options">
                        <button onClick={(e) => {e.stopPropagation(); setShowEditModal(true)}}>Edit Details</button>
                        <button onClick={(e) => {e.stopPropagation(); setShowModal(true)}}>Delete</button>
                    </div>
                )}
            </div>}
        </div>
    )
}

export default AlbumTop
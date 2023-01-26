import { useState } from "react"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import DeleteSong from "./DeleteSongModal"
import EditSongModal from "./EditSongModal"

function SingleSong({ setPath }) {
    setPath('/users/:songId')
    const { songId } = useParams()
    const songs = useSelector(state => state.songs)
    const user = useSelector(state => state.session.user)
    const song = songs[songId]

    const [showModal, setShowModal] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false)
    const [options, setOptions] = useState(false)

    const title = () => {
        if ( user !== null && user.username === song.user) {
            return (
                <>
                    <h1 onClick={() => setShowEditModal(true)} id='editable-title'>{song.title}</h1>
                    {showEditModal && <EditSongModal song={song} setShowEditModal={setShowEditModal} />}
                </>
            )
        } return false
    }
    return (
        <div>
            <div className="playlist-header">
                <div className="playlist-info">
                    <div className='album-pic'></div>
                    <div className="playlist-data">
                        <p>Song</p>
                        {title() || <h1 >{song.title}</h1>}
                        <p>{song.user}</p>
                    </div>

                </div>
            </div>

            {showModal && <DeleteSong song={song} setShowModal={setShowModal} />}
            { song.user === user.username && <div className="drop-div">
                <button className="more-options" onClick={() => setOptions(!options)}>...</button>
                {options && (
                    <div id="options">
                        <button onClick={() => setShowEditModal(true)}>Edit Details</button>
                        <button onClick={() => setShowModal(true)}>Delete</button>
                    </div>
                )}
            </div>}


        </div>
    )
}

export default SingleSong
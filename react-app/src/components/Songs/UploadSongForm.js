import React, { useState } from "react"
import { useSelector } from "react-redux"
import { Redirect } from "react-router-dom"
import { uploadFile } from 'react-s3';

function UploadSongForm() {
    const user = useSelector(state => state.session.user)

    const [title, setTitle] = useState('')
    const fileInput = React.createRef()

    const config = {
        bucketName: 'dotify-bucket',
        dirName: 'songs',
        region: 'us-east-1',
        accessKeyId: 'AKIAULR2G7V7TFM75PRE',
        secretAccessKey: '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'
    }

    function handleSubmit(e) {
        e.preventDefault();
        const file = fileInput.current.files[0]
        
        uploadFile(file, config)
            .then(data => console.log(data))
            .catch(err => console.error(err))
    }

    if(user === null) return <Redirect to={'/login'}/>
    return (
        <>
            <div>Dotify</div>
            <form className="form" id="song-form" onSubmit={handleSubmit}>
                <h3>Start your artistic journey here</h3>
                <div>
                    <label>What is the title of your song?</label>
                    <input 
                        placeholder="Enter your title here."
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                </div>
                <div>
                    <label>Upload your file</label>
                    <input 
                        type="file"
                        ref={fileInput}
                    />
                </div>
                <button type='submit' className="login-button">Upload your song</button>
            </form>
        </>
    )
}

export default UploadSongForm
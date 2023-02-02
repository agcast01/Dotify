import WaveSurfer from 'wavesurfer.js'
import { useRef, useEffect, useContext, useState } from "react"
import { SongContext } from '../Providers/SongContext'

function AudioPlayer() {
    const waveRef = useRef()
    const { currentSong, wavesurfer, setWavesurfer } = useContext(SongContext)

    
    const [isPlaying, setIsPlaying] = useState(true)
    const [isMuted, setIsMuted] = useState(false)

    useEffect(() => {
        if(wavesurfer) {
            wavesurfer.destroy()
        }
        if (waveRef.current) {
            let wavesurfer = WaveSurfer.create({
                container: waveRef.current,
                autoCenter: true,
                fillParent: true,
                height: 20,
                responsive: true
            })
            setWavesurfer(wavesurfer)
            wavesurfer.load(currentSong.file_name)
        }
        
    }, [currentSong])

    function play() {
        wavesurfer.playPause()
        setIsPlaying(!isPlaying)
    }

    if(wavesurfer) wavesurfer.on('ready', function () {
        wavesurfer.play()
    })

    function checkPlay() {
        if (wavesurfer) {
            return isPlaying ?
                <span class="material-symbols-outlined">
                    pause
                </span> :
                <span class="material-symbols-outlined">
                    play_arrow
                </span>
        }
    }

    return (
        <div id='audio-player'>
            <div id='current-song-details'>
                <div className='currentSong-image' style={{'background-image': `url(${currentSong.imageUrl})`}}></div>
                <div>
                    <p className='title'>{currentSong.title}</p>
                    <p>{currentSong.user}</p>
                </div>
            </div>
            <div id='player-controls'>
                <div id='control-buttons'>
                    <button id='controls-play' onClick={play}>
                        {wavesurfer && checkPlay()}
                    </button>
                </div>
                <div ref={waveRef} id='wave'></div>
            </div>
            <div id='volume-controls'>
                {wavesurfer && isMuted ?
                    <span class="material-symbols-outlined" onClick={() => {wavesurfer.setMute(!wavesurfer.getMute()); setIsMuted(!isMuted)}}>
                        volume_mute
                    </span> :
                    <span class="material-symbols-outlined" onClick={() => {wavesurfer.setMute(!wavesurfer.getMute()); setIsMuted(!isMuted)}}>
                        volume_up
                    </span>}
            </div>
        </div>
    )
}

export default AudioPlayer
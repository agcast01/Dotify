import WaveSurfer from 'wavesurfer.js'
import { useRef, useEffect, useContext, useState } from "react"
import { SongContext } from '../Providers/SongContext'

function AudioPlayer() {
    const waveRef = useRef()
    const { currentSong } = useContext(SongContext)

    const [wavesurfer, setWavesurfer] = useState('')
    const [isPlaying, setIsPlaying] = useState(false)
    const [isMuted, setIsMuted] = useState(false)

    useEffect(() => {
        if (waveRef.current) {
            let wavesurfer = WaveSurfer.create({
                container: waveRef.current,
                autoCenter: true,
                fillParent: true,
                height: 32
            })
            setWavesurfer(wavesurfer)
            wavesurfer.load(currentSong.file_name)

        }
    }, [currentSong])

    function play() {
        wavesurfer.playPause()
        setIsPlaying(!isPlaying)
    }

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
                <image></image>
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
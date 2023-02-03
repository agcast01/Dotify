import WaveSurfer from 'wavesurfer.js'
import { useRef, useEffect, useContext, useState } from "react"
import { SongContext } from '../Providers/SongContext'

function AudioPlayer() {
    const waveRef = useRef()
    const { currentSong, wavesurfer, setWavesurfer } = useContext(SongContext)


    const [isPlaying, setIsPlaying] = useState(true)
    const [isMuted, setIsMuted] = useState(false)
    const [duration, setDuration] = useState(0)
    const [intId, setIntId] = useState('')
    const [currentTime, setCurrentTime] = useState('0:00')
    const [progress, setProgress] = useState(0)

    useEffect(() => {
        if (wavesurfer) {
            wavesurfer.destroy()
        }
        if (waveRef.current) {
            let wavesurfer = WaveSurfer.create({
                container: waveRef.current,
                autoCenter: true,
                fillParent: true,
                height: 0,
            })
            setWavesurfer(wavesurfer)
            wavesurfer.load(currentSong.file_name)
        }

    }, [currentSong])

    function play() {
        wavesurfer.playPause()
        setIsPlaying(!isPlaying)
    }

    if (wavesurfer) wavesurfer.on('ready', function () {
        wavesurfer.play()
        setDuration(getDuration())
        setIntId(setInterval(getTime, 1000))
    })

    if (wavesurfer) wavesurfer.on('finish', function() {
        clearInterval(intId)
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
    function getTime() {
        const seconds = Math.floor(wavesurfer.getCurrentTime())
        const minutes = Math.floor(seconds / 60)
        const remainder = Math.ceil(seconds % 60)
        setCurrentTime(`${minutes}:${remainder < 10 ? '0' + remainder: remainder}`)
        setProgress(wavesurfer.getCurrentTime() / wavesurfer.getDuration())
    }

    function getDuration() {
        const seconds = Math.ceil(wavesurfer.getDuration())
        const minutes = Math.floor(seconds / 60)
        const remainder = Math.ceil(seconds % 60)
        return `${minutes}:${remainder < 10 ? '0' + remainder: remainder}`
    }

    return (
        <div id='audio-player'>
            <div id='current-song-details'>
                <div className='currentSong-image' style={{ 'background-image': `url(${currentSong.imageUrl})` }}></div>
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
                <div ref={waveRef} id='wave' style={{'display': 'hidden'}}></div>
               {wavesurfer &&  <div id='controls'>

                    <p>{currentTime}</p>
                    <input type='range' min={0} max={1} step={.01} value={progress} onChange={e => wavesurfer.seekTo(Number(e.target.value))} />
                    <p>{duration}</p>
                </div>}
            </div>
            <div id='volume-controls'>

                {wavesurfer && isMuted ?
                    <span class="material-symbols-outlined" onClick={() => { wavesurfer.setMute(!wavesurfer.getMute()); setIsMuted(!isMuted) }}>
                        volume_mute
                    </span> :
                    <span class="material-symbols-outlined" onClick={() => { wavesurfer.setMute(!wavesurfer.getMute()); setIsMuted(!isMuted) }}>
                        volume_up
                    </span>}
                <input type='range' defaultValue={100} max={100} onChange={e => wavesurfer.setVolume(e.target.value / 100)} />
            </div>
        </div>
    )
}

export default AudioPlayer
import { createContext, useState } from "react"

export const SongContext = createContext('')


function SongProvider({children}) {
    const [currentSong, setCurrentSong] = useState('')
    const [wavesurfer, setWavesurfer] = useState('')

    return (
        <SongContext.Provider value={{currentSong, setCurrentSong, wavesurfer, setWavesurfer}}>
            {children}
        </SongContext.Provider>
    )
}

export default SongProvider
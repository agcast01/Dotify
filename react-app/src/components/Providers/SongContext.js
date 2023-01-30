import { createContext, useState } from "react"

export const SongContext = createContext('')


function SongProvider({children}) {
    const [currentSong, setCurrentSong] = useState('')

    return (
        <SongContext.Provider value={{currentSong, setCurrentSong}}>
            {children}
        </SongContext.Provider>
    )
}

export default SongProvider
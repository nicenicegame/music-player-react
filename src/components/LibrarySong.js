import React from 'react'

const LibrarySong = ({
  song,
  setCurrentSong,
  songs,
  id,
  audioRef,
  isPlaying,
  setSongs,
}) => {
  const songSelectHandler = async () => {
    const [selectedSong] = songs.filter((state) => id === state.id)
    await setCurrentSong(selectedSong)
    const newSongs = songs.map((song) => {
      if (song.id === id) {
        return {
          ...song,
          active: true,
        }
      } else {
        return {
          ...song,
          active: false,
        }
      }
    })
    setSongs(newSongs)
    console.log('play')
    if (isPlaying) {
      audioRef.current.play()
    }
  }

  return (
    <div
      onClick={songSelectHandler}
      className={`library-song ${song.active ? 'selected' : ''}`}
    >
      <img alt={song.name} src={song.cover} />
      <div className="song-description">
        <h3>{song.name}</h3>
        <h4>{song.artist}</h4>
      </div>
    </div>
  )
}

export default LibrarySong

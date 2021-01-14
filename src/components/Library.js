import React from 'react'
import LibrarySong from './LibrarySong'

const Library = ({
  songs,
  setCurrentSong,
  audioRef,
  isPlaying,
  setSongs,
  libraryStatus,
}) => {
  return (
    <div className={`library ${libraryStatus ? 'active' : ''}`}>
      <h2>Library</h2>
      <div className="library-songs">
        {songs.map((song) => {
          return (
            <LibrarySong
              setSongs={setSongs}
              audioRef={audioRef}
              song={song}
              setCurrentSong={setCurrentSong}
              songs={songs}
              id={song.id}
              key={song.id}
              isPlaying={isPlaying}
            />
          )
        })}
      </div>
    </div>
  )
}

export default Library

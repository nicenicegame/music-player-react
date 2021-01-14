import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faPlay,
  faAngleLeft,
  faAngleRight,
  faPause,
} from '@fortawesome/free-solid-svg-icons'

const Player = ({
  audioRef,
  isPlaying,
  setIsPlaying,
  setSongInfo,
  songInfo,
  songs,
  currentSong,
  setCurrentSong,
  setSongs,
}) => {
  const activeLibraryHandler = (nextPrev) => {
    const newSongs = songs.map((song) => {
      if (song.id === nextPrev.id) {
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
  }

  const getTime = (time) => {
    return Math.floor(time / 60) + ':' + ('0' + Math.floor(time % 60)).slice(-2)
  }

  const dragHandler = (e) => {
    const draggedTime = e.target.value
    audioRef.current.currentTime = draggedTime
    setSongInfo({ ...songInfo, currentTime: draggedTime })
  }

  const playSongHandler = () => {
    if (isPlaying) {
      audioRef.current.pause()
    } else {
      audioRef.current.play()
    }
    setIsPlaying(!isPlaying)
  }

  const skipTrackHandler = async (direction) => {
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id)
    if (direction === 'skip-forward') {
      await setCurrentSong(songs[(currentIndex + 1) % songs.length])
      activeLibraryHandler(songs[(currentIndex + 1) % songs.length])
    }
    if (direction === 'skip-back') {
      if (currentIndex === 0) {
        await setCurrentSong(songs[songs.length - 1])
        activeLibraryHandler(songs[songs.length - 1])
      } else {
        await setCurrentSong(songs[(currentIndex - 1) % songs.length])
        activeLibraryHandler(songs[(currentIndex - 1) % songs.length])
      }
    }
    if (isPlaying) {
      audioRef.current.play()
    }
  }

  const trackAnimation = {
    transform: `translateX(${songInfo.animationPercentage}%)`,
  }

  return (
    <div className="player">
      <div className="time-control">
        <p>{getTime(songInfo.currentTime)}</p>
        <div
          className="track"
          style={{
            background: `linear-gradient(to right, ${currentSong.color[0]}, ${currentSong.color[1]})`,
          }}
        >
          <input
            min={0}
            max={songInfo.duration || 0}
            value={songInfo.currentTime}
            onChange={dragHandler}
            type="range"
          />
          <div className="animate-track" style={trackAnimation}></div>
        </div>
        <p>{songInfo.duration ? getTime(songInfo.duration) : '0:00'}</p>
      </div>
      <div className="play-control">
        <FontAwesomeIcon
          className="skip-back"
          size="2x"
          icon={faAngleLeft}
          onClick={() => skipTrackHandler('skip-back')}
        />
        <FontAwesomeIcon
          onClick={playSongHandler}
          className="play"
          size="2x"
          icon={isPlaying ? faPause : faPlay}
        />
        <FontAwesomeIcon
          className="skip-foward"
          size="2x"
          icon={faAngleRight}
          onClick={() => skipTrackHandler('skip-forward')}
        />
      </div>
    </div>
  )
}

export default Player

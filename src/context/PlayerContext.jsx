import { createContext, useEffect, useRef, useState } from "react";
import { songsData } from "../assets/assets";

export const PlayerContext = createContext();

const PlayerContextProvider = (props) => {
  const audioRef = useRef();
  const seekBg = useRef();
  const seekBar = useRef();
  const [track, setTrack] = useState(songsData[0]);
  const [playStatus, setPlayStatus] = useState(false);
  const [time, setTime] = useState({
    currentTime: { second: 0, minute: 0 },
    totalTime: { second: 0, minute: 0 }
  });

  const play = () => {
    audioRef.current.play();
    setPlayStatus(true);
  }

  const pause = () => {
    audioRef.current.pause();
    setPlayStatus(false);
  }

  // Fixed: renamed from "playWidthId" to "playWithId" (typo)
  // Fixed: setState is not async, can't await it — use a proper approach
  const playWithId = async (id) => {
    setTrack(songsData[id]);
    // Audio src updates when track state changes, then we play
    await audioRef.current.play();
    setPlayStatus(true);
  }

  const previous = async () => {
    if (track.id > 0) {
      setTrack(songsData[track.id - 1]);  // Fixed: removed incorrect await on setState
      await audioRef.current.play();
      setPlayStatus(true);
    }
  }

  const next = async () => {
    if (track.id < songsData.length - 1) {
      setTrack(songsData[track.id + 1]);  // Fixed: removed incorrect await on setState
      await audioRef.current.play();
      setPlayStatus(true);
    }
  }

  const seekSong = (e) => {  // Fixed: removed unnecessary async
    audioRef.current.currentTime = ((e.nativeEvent.offsetX / seekBg.current.offsetWidth) * audioRef.current.duration);
  }

  useEffect(() => {
    setTimeout(() => {
      audioRef.current.ontimeupdate = () => {
        seekBar.current.style.width = (Math.floor(audioRef.current.currentTime / audioRef.current.duration * 100)) + "%";
        setTime({
          currentTime: {
            second: Math.floor(audioRef.current.currentTime % 60),
            minute: Math.floor(audioRef.current.currentTime / 60)
          },
          totalTime: {
            second: Math.floor(audioRef.current.duration % 60),
            minute: Math.floor(audioRef.current.duration / 60)
          }
        });
      }
    }, 1000);
  }, [audioRef]);

  const contextValue = {
    audioRef,
    seekBar,
    seekBg,
    track, setTrack,
    playStatus, setPlayStatus,
    time, setTime,
    play, pause,
    playWithId,   // Fixed: was "playWidthId"
    previous, next,
    seekSong
  }

  return (
    <PlayerContext.Provider value={contextValue}>
      {props.children}
    </PlayerContext.Provider>
  );
};

export default PlayerContextProvider;

import { createContext, useEffect, useRef, useState } from "react";
import { songsData } from "../assets/assets";

export const PlayerContext = createContext();

const RECENTLY_PLAYED_KEY = "spotify_recently_played";
const MAX_RECENTLY_PLAYED = 10;

const PlayerContextProvider = (props) => {
  const audioRef = useRef();
  const seekBg = useRef();
  const seekBar = useRef();
  const shouldPlayRef = useRef(false);
  const [track, setTrack] = useState(songsData[0]);
  const [playStatus, setPlayStatus] = useState(false);
  const [recentlyPlayed, setRecentlyPlayed] = useState(() => {
    try {
      const savedIds = JSON.parse(localStorage.getItem(RECENTLY_PLAYED_KEY) || "[]");
      if (!Array.isArray(savedIds)) return [];
      return savedIds
        .map((id) => songsData.find((song) => song.id === Number(id)))
        .filter(Boolean)
        .slice(0, MAX_RECENTLY_PLAYED);
    } catch {
      return [];
    }
  });
  const [time, setTime] = useState({
    currentTime: { second: 0, minute: 0 },
    totalTime: { second: 0, minute: 0 }
  });

  const addToRecentlyPlayed = (song) => {
    if (!song) return;

    setRecentlyPlayed((current) => {
      const updated = [song, ...current.filter((item) => item.id !== song.id)]
        .slice(0, MAX_RECENTLY_PLAYED);

      localStorage.setItem(
        RECENTLY_PLAYED_KEY,
        JSON.stringify(updated.map((item) => item.id))
      );

      return updated;
    });
  };

  const play = () => {
    if (!audioRef.current) return;
    addToRecentlyPlayed(track);
    audioRef.current.play().catch(() => {});
    setPlayStatus(true);
  };

  const pause = () => {
    audioRef.current?.pause();
    setPlayStatus(false);
  };

  const selectTrack = (song) => {
    if (!song) return;
    addToRecentlyPlayed(song);
    shouldPlayRef.current = true;
    setTrack(song);
    setPlayStatus(true);
  };

  const playWithId = (id) => {
    const song = songsData.find((item) => item.id === Number(id));
    selectTrack(song);
  };

  const playRecentlyPlayed = (id) => {
    const song = songsData.find((item) => item.id === Number(id));
    selectTrack(song);
  };

  const previous = () => {
    if (track.id > 0) selectTrack(songsData[track.id - 1]);
  };

  const next = () => {
    if (track.id < songsData.length - 1) selectTrack(songsData[track.id + 1]);
  };

  const seekSong = (e) => {
    if (!audioRef.current?.duration || !seekBg.current) return;
    audioRef.current.currentTime =
      (e.nativeEvent.offsetX / seekBg.current.offsetWidth) * audioRef.current.duration;
  };

  useEffect(() => {
    if (!audioRef.current) return;

    audioRef.current.load();

    if (shouldPlayRef.current) {
      audioRef.current.play().catch(() => {});
      shouldPlayRef.current = false;
    }
  }, [track]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => {
      if (!Number.isFinite(audio.duration)) return;
      if (seekBar.current) {
        seekBar.current.style.width = `${Math.floor(
          (audio.currentTime / audio.duration) * 100
        )}%`;
      }
      setTime({
        currentTime: {
          second: Math.floor(audio.currentTime % 60),
          minute: Math.floor(audio.currentTime / 60)
        },
        totalTime: {
          second: Math.floor(audio.duration % 60),
          minute: Math.floor(audio.duration / 60)
        }
      });
    };

    const handleEnded = () => setPlayStatus(false);
    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("ended", handleEnded);
    };
  }, []);

  const contextValue = {
    audioRef,
    seekBar,
    seekBg,
    track,
    setTrack,
    playStatus,
    setPlayStatus,
    time,
    setTime,
    recentlyPlayed,
    addToRecentlyPlayed,
    play,
    pause,
    playWithId,
    playRecentlyPlayed,
    previous,
    next,
    seekSong
  };

  return (
    <PlayerContext.Provider value={contextValue}>
      {props.children}
    </PlayerContext.Provider>
  );
};

export default PlayerContextProvider;

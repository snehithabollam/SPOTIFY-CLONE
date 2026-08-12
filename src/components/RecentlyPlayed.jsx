import React, { useContext } from "react";
import { PlayerContext } from "../context/PlayerContext";

const RecentlyPlayed = () => {
  const { recentlyPlayed, playRecentlyPlayed } = useContext(PlayerContext);

  if (recentlyPlayed.length === 0) return null;

  return (
    <section className="mb-6">
      <div className="flex items-center justify-between">
        <h1 className="my-5 font-bold text-2xl">Recently Played</h1>
        <span className="text-sm text-slate-400">Latest 10</span>
      </div>
      <div className="flex gap-2 overflow-auto pb-2">
        {recentlyPlayed.map((song) => (
          <div
            key={song.id}
            onClick={() => playRecentlyPlayed(song.id)}
            className="min-w-[180px] p-2 px-3 rounded cursor-pointer hover:bg-[#ffffff26]"
            title={`Play ${song.name}`}
          >
            <img className="rounded" src={song.image} alt={song.name} />
            <p className="font-bold mt-2 mb-1">{song.name}</p>
            <p className="text-slate-200 text-sm">{song.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RecentlyPlayed;

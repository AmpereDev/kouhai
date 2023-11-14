import { useState } from 'react';
import { IAnimeEpisode } from "@consumet/extensions";
import { Link } from "react-router-dom";

type EpisodeSelectorProps = {
  currentEpisode: number;
  episodes: IAnimeEpisode[];
  animeId: string;
};

export default function EpisodeSelector(props: EpisodeSelectorProps) {
  const [searchInput, setSearchInput] = useState('');

  const filteredEpisodes = props.episodes.filter(
    (episode) => episode.number.toString().includes(searchInput)
  );

  return (
    <div>
      <div className="flex flex-wrap text-white bg-gray-800 justify-center">
        <p className="text-lg text-indigo-500 font-bold p-5">Currently watching episode {props.currentEpisode}</p>
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="w-full bg-gray-800 rounded border bg-opacity-40 border-gray-700 focus:ring-2 focus:ring-indigo-500 focus:bg-transparent focus:border-indigo-400 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          placeholder="Search for episode number"
        />
      </div>
      <div className="flex flex-wrap justify-center p-5" style={{ height: '200px', overflowY: 'auto' }}>
        {filteredEpisodes.map((episode: IAnimeEpisode) => (
          <div
            key={episode.number}
            className={`text-white h-16 w-16 flex items-center justify-center hover:bg-indigo-400 ${
              episode.number === props.currentEpisode ? 'bg-indigo-500' : 'bg-gray-900'
            } mx-2 my-2 rounded-md`}
          >
            <Link to={`/stream/${props.animeId}/${episode.number}`} className="text-lg">
              {episode.number}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

import { useNavigate } from "react-router-dom";
import { ANIME, IAnimeInfo, IEpisodeServer, IAnimeEpisode } from "@consumet/extensions";
import preloaderGif from "../assets/imgs/preloader.gif";
import { useEffect, useState } from "react";
import AnimeDetail from "./AnimeDetail";
import EpisodeSelector from "./EpisodeSelector";

type VideoProps = {
  episodeNum: string;
  animeId: string;
};

export default function Video(props: VideoProps) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [currentServer, setCurrentServer] = useState<IEpisodeServer>();
  const [servers, setServers] = useState<IEpisodeServer[]>();
  const [animeDetails, setAnimeDetails] = useState<IAnimeInfo>();
  const [episodes, setEpisodes] = useState<IAnimeEpisode[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const source = new ANIME.Gogoanime();
        const data = await source.fetchEpisodeServers(`${props.animeId}-episode-${props.episodeNum}`);

        if (data.length === 0) {
          navigate("/404"); // Redirect to 404 page if the episode is not found
          return;
        }

        setServers(data);

        const server = data[0];
        setCurrentServer(server);
        setLoading(false);

        const anime: IAnimeInfo = await source.fetchAnimeInfo(props.animeId);
        setAnimeDetails(anime);
        setEpisodes(anime.episodes!);
      } catch (error) {
        navigate("/404"); // Redirect to 404 page if the anime is not found
      }
    })();
  }, [props.animeId, props.episodeNum, history]);

  const handleServerSelection = (server: IEpisodeServer) => {
    setCurrentServer(server);
  };

  return loading ? (
    <div className="flex items-center justify-center bg-gray-900 h-screen">
      <img src={preloaderGif} alt="loading" />
    </div>
  ) : (
    <div>
      <div className="flex flex-wrap items-center justify-center pt-0 space-x-2">
        <div className="text-2xl text-indigo-400 bg-gray-900 w-full text-center font-bold p-4">
          You are watching: {`${animeDetails?.title || "loading..."}, episode ${props.episodeNum}`}
        </div>
        {currentServer && (
          <div className="w-full max-w-screen-lg border-4 border-gray-800 rounded-lg overflow-hidden mt-0 py-1">
            <iframe src={currentServer.url} className="h-screen w-full p-0" allowFullScreen></iframe>

            {episodes.length > 0 && <EpisodeSelector episodes={episodes} currentEpisode={parseInt(props.episodeNum)} animeId={props.animeId}/>}

            <div className="flex flex-wrap p-5 justify-center bg-black text-white body-font space-x-5">
              <div className="flex flex-wrap p-3 space-x-1 text-indigo-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5.25 14.25h13.5m-13.5 0a3 3 0 01-3-3m3 3a3 3 0 100 6h13.5a3 3 0 100-6m-16.5-3a3 3 0 013-3h13.5a3 3 0 013 3m-19.5 0a4.5 4.5 0 01.9-2.7L5.737 5.1a3.375 3.375 0 012.7-1.35h7.126c1.062 0 2.062.5 2.7 1.35l2.587 3.45a4.5 4.5 0 01.9 2.7m0 0a3 3 0 01-3 3m0 3h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008zm-3 6h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008z"
                  />
                </svg>

                <p className="text-lg font-bold">Available servers</p>
              </div>
              {servers?.map((server: IEpisodeServer) => (
                <button
                  key={server.name}
                  onClick={() => handleServerSelection(server)}
                  className={`${
                    currentServer === server ? 'bg-indigo-600 font-bold' : 'bg-gray-800'
                  } p-2 rounded-lg transition duration-300 transform hover:scale-110 hover:-translate-y-1`}
                >
                  {server.name}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
      {animeDetails && <AnimeDetail details={animeDetails} />}
    </div>
  );
}

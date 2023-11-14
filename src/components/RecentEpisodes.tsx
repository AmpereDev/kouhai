import { ANIME, IAnimeResult, ISearch } from "@consumet/extensions";
import { useEffect, useState } from "react";
import RecentEpisode from "./RecentEpisode";
import preloader from "../assets/imgs/preloader.gif";

export default function RecentEpisodes() {
  const [results, setResults] = useState<IAnimeResult[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const source = new ANIME.Gogoanime();
      await source.fetchRecentEpisodes(1).then((res: ISearch<IAnimeResult>) => {
        setResults(res.results);
        setLoading(false);
      }).catch((e) => {
        console.error(e);
      });
    })();
  }, []);

  if (loading) {
    return <img src={preloader} alt="Loading" className="h-full m-auto"/>;
  }

  return (
    <div>
      <div className="flex flex-wrap -m-4 p-4">
        {results.map((result: IAnimeResult, index) => (
          <RecentEpisode episode={result} key={index} />
        ))}
      </div>
    </div>
  );
}

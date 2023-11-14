import { IAnimeResult } from "@consumet/extensions";
import { Link } from "react-router-dom";

type RecentEpisodeProps = {
  episode: IAnimeResult;
  key: number;
};

export default function RecentEpisode(props: RecentEpisodeProps) {
  return (
    <div key={props.key} className="lg:w-1/3 sm:w-1/2 p-4 text-white relative">
      <Link to={`/stream/${props.episode.id}/1`}>
        <div className="relative group overflow-hidden rounded-lg">
          <img
            alt="gallery"
            className="w-full h-64 object-cover object-center transform group-hover:scale-110 transition duration-500 ease-in-out"
            src={props.episode.image as string}
          />
          <div className="absolute inset-0 flex items-end justify-center">
            <div className="bg-black w-full h-16 absolute bottom-0 opacity-80 flex items-center justify-center">
              <h2 className="text-center text-sm text-white">
                {props.episode.title as string}
              </h2>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

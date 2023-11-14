import { useParams } from "react-router-dom";
import Video from "../components/Video";

export default function Stream() {
  const params = useParams();

  return (
    <div>
      <Video episodeNum={params.episodeNum!} animeId={params.animeId!}/>
    </div>
  )
}

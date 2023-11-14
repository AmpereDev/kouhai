import { IAnimeResult } from "@consumet/extensions";
import SearchResult from "./SearchResult";


type SearchResultsProps = {
    results: IAnimeResult[];
    toggleSearch: () => void;
};

export default function SearchResults(props: SearchResultsProps) {
    /*
     * Set the query back to an empty string
     */
    return (
        <div className="bg-gray-800 flex flex-wrap gap-4 transition ease-in-out">
            {props.results.map((result: IAnimeResult, index) => {
                return <SearchResult key={result.id} result={result} index={index} toggleSearch={props.toggleSearch}/>;
            })}
        </div>
    );
}

import { ANIME, IAnimeResult, ISearch } from "@consumet/extensions"
import { useState } from "react"
import SearchResults from "./SearchResults"
import preloader from "../assets/imgs/preloader.gif"

type SearchProps = {
    toggleSearch: () => void 
}

export default function Search(props: SearchProps) {
    const source = new ANIME.Gogoanime()
    const [results, setResults] = useState<IAnimeResult[]>([])
    const [query, setQuery] = useState<string>("")
    const [error, setError] = useState<boolean>(false)  // Use it to inform the user that an error has occured and
    // it has been logged into the console.
    // By default it is false.

    const [loading, setLoading] = useState<boolean>(false)

    function onUpdate(e: any) {
        setQuery(e.target.value)
    }

    /**
     * Fetch results from the API and set the results state
     */
    async function fetchResults(e: any) {
        e.preventDefault();

        if (results.length > 0) {
            setQuery("")
            setResults([])

            return 
        }

        setLoading(true)

        await source.search(query)
            .then((res: ISearch<IAnimeResult>) => {
                setLoading(false)
                setResults(res.results)
            })
            .catch((e) => {
                setError(true)
                console.error(e)
            })
    }

    /**
     * To check whether there are results or not, return the results if true
     */
    function searchResults() {
        return results.length === 0 ? (
            <div>
                <p className="text-2xl font-bold text-indigo-500">Nothing here, maybe try searching again?</p>
            </div>
        ) : (
            <SearchResults results={results} toggleSearch={props.toggleSearch}/>
        )
    }
    return !error ? (
        (
            <div>
                <div className="bg-gray-900 w-full h-screen fixed">
                    <div className="flex flex-col items-center p-4">
                        <form className="flex flex-wrap p-10" onSubmit={fetchResults}>
                            <input type="text" className="bg-gray-800 px-12 py-3 text-white transition hover:-translate-y-1 duration-300 ease-in-out hover:scale-110" onChange={onUpdate} value={query} placeholder="Search..." />

                            <button className="bg-indigo-500 text-white px-5 py-3 hover:bg-indigo-600 transition hover:-translate-y-1 duration-300 ease-in-out hover:scale-110" type="submit">
                                {
                                    results.length === 0 ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75l-2.489-2.489m0 0a3.375 3.375 0 10-4.773-4.773 3.375 3.375 0 004.774 4.774zM21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    )
                                }
                            </button>
                        </form>

                        {
                            !loading ? (
                                searchResults()
                            ) : (
                                <div>
                                    <img src={preloader}/>
                                </div>
                            )
                        }
                
                    </div>
                </div>
            </div>
        )
    ) : (
        <div className="text-white font-bold text-6xl">
            Error
        </div>
    )
}
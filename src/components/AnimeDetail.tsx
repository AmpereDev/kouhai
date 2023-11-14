import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { IAnimeInfo } from "@consumet/extensions";
import { Bookmark } from '../types';

type AnimeDetailProps = {
    details: IAnimeInfo
}

export default function AnimeDetail(props: AnimeDetailProps) {
    const [nickname, setNickname] = useState('');
    const [saved, setSaved] = useState(false);
    const savedAnimeData = Cookies.get('savedAnime');
    const initialSavedAnime: Bookmark[] = savedAnimeData ? JSON.parse(savedAnimeData) : [];
    const [savedAnime, setSavedAnime] = useState<Bookmark[]>(initialSavedAnime);

    useEffect(() => {
        const savedAnimeData = Cookies.get('savedAnime');
        if (savedAnimeData) {
            const parsedSavedAnime: Bookmark[] = JSON.parse(savedAnimeData);
            setSavedAnime(parsedSavedAnime);
        }
    }, []);

    const handleSave = () => {
        if (saved) {
            const updatedSavedAnime = savedAnime.filter(item => item.animeId !== props.details.id);
            Cookies.set('savedAnime', JSON.stringify(updatedSavedAnime)); // Cookie will never expire
            setSavedAnime(updatedSavedAnime);
            setSaved(false);
            setNickname('');
            alert(`${props.details.title} has been unsaved`);
        } else {
            if (nickname) {
                const animeData: Bookmark = {
                    title: `${props.details.title}`,
                    description: `${props.details.description}`,
                    nickname: nickname,
                    image: `${props.details.image}`,
                    animeId: props.details.id
                };
                Cookies.set('savedAnime', JSON.stringify([...savedAnime, animeData])); // Cookie will never expire
                setSavedAnime([...savedAnime, animeData]);
                setSaved(true);
                alert(`${props.details.title} has been saved with nickname ${nickname}`);
            } else {
                alert('Please enter a nickname before saving.');
            }
        }
    };

    return (
        <div>
            <div className="text-gray-400 bg-gray-900 body-font">
                <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
                    <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0">
                        <img
                            className="object-cover object-center rounded"
                            alt={props.details.id || ""}
                            src={props.details.image || ""}
                        />
                    </div>
                    <div className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
                        <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-white font-bold">
                            {`${props.details.title}`}
                        </h1>
                        <p className="mb-8 leading-relaxed hover:text-indigo-500">
                            {`${props.details.description}`}
                        </p>
                        <div className="flex w-full md:justify-start justify-center items-end">
                            <div className="relative mr-4 lg:w-full xl:w-1/2 w-2/4">
                                <label
                                    htmlFor="hero-field"
                                    className="leading-7 text-sm text-indigo-400"
                                >
                                    Bookmark this anime
                                </label>
                                <input
                                    type="text"
                                    value={nickname}
                                    onChange={(e) => setNickname(e.target.value)}
                                    disabled={saved}
                                    className="w-full bg-gray-800 rounded border bg-opacity-40 border-gray-700 focus:ring-2 focus:ring-indigo-500 focus:bg-transparent focus:border-indigo-400 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                    placeholder="Nickname"
                                />
                            </div>
                            <button onClick={handleSave} className="inline-flex text-indigo-500 border-0 py-2 px-6 focus:outline-none transition ease-in-out hover:-translate-y-1 hover:scale-110 transform duration-300 rounded text-lg">
                                {saved ? (
                                    <span><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 3l1.664 1.664M21 21l-1.5-1.5m-5.485-1.242L12 17.25 4.5 21V8.742m.164-4.078a2.15 2.15 0 011.743-1.342 48.507 48.507 0 0111.186 0c1.1.128 1.907 1.077 1.907 2.185V19.5M4.664 4.664L19.5 19.5" />
                                  </svg>
                                  </span>
                                ) : (
                                    <span><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
                                  </svg>
                                  </span>
                                )}
                            </button>
                        </div>
                        <p className="text-sm mt-2 text-gray-500 mb-8 w-full">
                            * This will be saved as ({nickname}) in your browser cookies
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

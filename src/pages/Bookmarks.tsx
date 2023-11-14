import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { Bookmark } from '../types';
import { Link } from 'react-router-dom';

export default function Bookmarks() {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);

  useEffect(() => {
    const savedBookmarks = Cookies.get('savedAnime');
    if (savedBookmarks) {
      const parsedBookmarks: Bookmark[] = JSON.parse(savedBookmarks);
      setBookmarks(parsedBookmarks);
    }
  }, []);

  return (
    <div>
      <p className="text-3xl text-indigo-500 font-bold bg-gray-800 p-5">Welcome to your bookmarks!</p>
      <div className="text-gray-400 body-font p-5">
        <div className="flex flex-wrap -m-4">
          {bookmarks.map((bookmark, index) => (
            <div key={index} className="lg:w-1/3 sm:w-1/2 p-4">
                <Link to={`/stream/${bookmark.animeId}/1`}>
                <div className="flex relative">
                <img alt="gallery" className="absolute inset-0 w-full h-full object-cover object-center" src={bookmark.image} />
                <div className="px-8 py-10 relative z-10 w-full border-4 border-gray-800 bg-gray-900 opacity-0 hover:opacity-100" style={{ maxHeight: '100%' }}>
                  <h2 className="tracking-widest text-sm title-font font-medium text-indigo-400 mb-1">{bookmark.title}</h2>
                  <h1 className="title-font text-lg font-medium text-white mb-3 truncate">{bookmark.description}</h1>
                  <p className="leading-relaxed overflow-hidden text-ellipsis" style={{ maxHeight: '3.6em' }}>{bookmark.nickname}</p>
                </div>
              </div></Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

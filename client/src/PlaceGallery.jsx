import { useState } from "react";
import Image from "./Image.jsx";

export default function PlaceGallery({ place }) {
  const [showAllPhotos, setShowAllPhotos] = useState(false);

  if (showAllPhotos) {
    return (
      <div className="absolute inset-0 bg-black text-white min-h-screen">
        <div className="bg-black p-8 grid gap-4">
          <div>
            <h2 className="text-3xl mr-48">Photos of {place.title}</h2>
            <button
              onClick={() => setShowAllPhotos(false)}
              className="fixed right-12 top-8 flex gap-1 py-2 px-4 rounded-2xl shadow shadow-black bg-white text-black cursor-pointer"
            >
              {/* Close icon */}
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-6 h-6" viewBox="0 0 24 24">
                <path
                  fillRule="evenodd"
                  d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                  clipRule="evenodd"
                />
              </svg>
              Close photos
            </button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {place?.photos?.map((photo, index) => (
              <div key={index} className="relative">
                <Image src={photo} alt="" className="w-full h-full object-cover" />
                <div className="absolute bottom-2 right-2 bg-black/60 text-white text-sm px-2 py-1 rounded-full">
                  {index + 1}/{place.photos.length}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="grid grid-cols-3 grid-rows-2 gap-2 rounded-3xl overflow-hidden h-[600px]">
        {/* First image - large, spans both rows in first column */}
        {place.photos?.[0] && (
          <div className="row-span-2 relative">
            {/* Changed row-span-12 to row-span-2 to match the height */}
            <Image onClick={() => setShowAllPhotos(true)} className="w-full h-full object-cover cursor-pointer" src={place.photos[0]} alt="" />
            <div className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded-full">
              1/{place.photos.length}
            </div>
          </div>
        )}

        {/* Second column: two images */}
        {[place.photos?.[1], place.photos?.[2]].map((photo, index) =>
          photo ? (
            <div key={index + 1} className="relative">
              <Image onClick={() => setShowAllPhotos(true)} className="w-full h-full object-cover cursor-pointer" src={photo} alt="" />
              <div className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded-full">
                {index + 2}/{place.photos.length}
              </div>
            </div>
          ) : null
        )}

        {/* Third column: two images */}
        {[place.photos?.[3], place.photos?.[4]].map((photo, index) =>
          photo ? (
            <div key={index + 3} className="relative">
              <Image onClick={() => setShowAllPhotos(true)} className="w-full h-full object-cover cursor-pointer" src={photo} alt="" />
              <div className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded-full">
                {index + 4}/{place.photos.length}
              </div>
            </div>
          ) : null
        )}
      </div>

      <button
        onClick={() => setShowAllPhotos(true)}
        className="flex gap-1 absolute bottom-2 right-2 py-2 px-4 bg-white rounded-2xl shadow shadow-md shadow-gray-500 cursor-pointer"
      >
        {/* Camera icon */}
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-6 h-6" viewBox="0 0 24 24">
          <path fillRule="evenodd" d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z" clipRule="evenodd" />
        </svg>
        Show all photos
      </button>
    </div>
  );
}

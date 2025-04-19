import {Link, useParams} from "react-router-dom";
import AccountNav from "../AccountNav";
import {useEffect, useState} from "react";
import axios from "axios";
import PlaceImg from "../PlaceImg";

export default function PlacesPage() {
  const [places,setPlaces] = useState([]);
  useEffect(() => {
    axios.get('/api/user-places').then(({data}) => {
      setPlaces(data);
    });
  }, []);

  return (
    <div>
      <AccountNav />
        <div className="text-center">
          <Link className="inline-flex gap-1 bg-[#1E3A8A] text-white py-2 px-6 rounded-full" to={'/account/places/new'}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
              <path fillRule="evenodd" d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z" clipRule="evenodd" />
            </svg>
            Add new place
          </Link>
        </div>
        <div className="mt-8 mx-16">
  {places.length > 0 && places.map(place => (
    <Link
      key={place._id} // Add a unique key prop here
      to={'/account/places/' + place._id}
      className="flex cursor-pointer gap-4 bg-gray-300 shadow-black p-4 rounded-2xl mb-4"
    >
      <div className="flex w-40 h-40 bg-gray-300 grow shrink-0">
        <PlaceImg place={place} />
      </div>
      <div className="grow-0 shrink">
        <h2 className="text-xl font-bold">{place.title}</h2>
        <p className="text-lg mt-2">{place.description}</p>
      </div>
    </Link>
  ))}
</div>
    </div>
  );
}
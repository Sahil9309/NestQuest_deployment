import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import BookingWidget from "../BookingWidget";
import PlaceGallery from "../PlaceGallery";
import AddressLink from "../AddressLink";

export default function PlacePage() {
  const {id} = useParams();
  const [place,setPlace] = useState(null);
  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get(`/api/places/${id}`)
      .then(response => {
        setPlace(response.data);
      })
      .catch(error => {
        console.error("Error fetching place data:", error);
      });
  }, [id]);

  if (!place) return '';

  return (
    <div className="mt-4 bg-gray-100 px-10">
      <div className="px-8">
        <h1 className="text-3xl">{place.title}</h1>
        <AddressLink>{place.address}</AddressLink>
        <PlaceGallery place={place} />
        <div className="mt-8 mb-8 grid gap-8 grid-cols-1 md:grid-cols-[2fr_1fr]">
          <div>
            <div className="my-4">
              <h2 className="font-semibold text-2xl">Description</h2>
              {place.description}
            </div>
            <strong>Check-in:</strong> {place.checkIn}<br />
            <strong>Check-out:</strong> {place.checkOut}<br />
            <strong>Max number of persons:</strong> {place.maxPeople}<br />
          </div>
          <div>
            <BookingWidget place={place} />
          </div>
        </div>
        <div className="bg-white px-8 py-8 border-t">
          <div>
            <h2 className="font-semibold text-2xl">Extra info</h2>
          </div>
          <div className="mb-4 mt-2 text-sm text-gray-700 leading-5">{place.extraInfo}</div>
        </div>
      </div>
    </div>
  );
}
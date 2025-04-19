import PhotosUploader from '../PhotosUploader';
import Perks from '../Perks';
import { useState , useEffect} from 'react';
import axios from 'axios';
import AccountNav from '../AccountNav';
import { Navigate, useParams } from 'react-router-dom';

export default function PlacesFormPage() {
    const {id} = useParams();
    const [title, setTitle] = useState('');
    const [address, setAddress] = useState('');
    const [addedPhotos, setAddedPhotos] = useState([]);
    const [description, setDescription] = useState('');
    const [perks, setPerks] = useState([]);
    const [extraInfo, setExtraInfo] = useState('');
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [maxPeople, setMaxPeople] = useState(1);
    const [price, setPrice] = useState(100);
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        if(!id) {
            return;
        }
        axios.get('/api/places/'+id)
        .then(response => {
            const {data} = response;
            setTitle(data.title || '');
            setAddress(data.address || '');
            setAddedPhotos(data.addedPhotos || []);
            setDescription(data.description || '');
            setPerks(data.perks || []);
            setExtraInfo(data.extraInfo || '');
            setCheckIn(data.checkIn || '');
            setCheckOut(data.checkOut || '');
            setMaxPeople(data.maxPeople || 1);
            setPrice(data.price || 100);
        });
    }, [id]);

    function inputHeader(text) {
        return (
            <h2 className="text-2xl mt-4">{text}</h2>
        );
    }
    function inputDescription(text) {
        return (
            <p className="text-gray-500 text-sm">{text}</p>
        );
    }
    function preInput(header, description) {
        return (
            <>
                {inputHeader(header)}
                {inputDescription(description)}
            </>
        );
    }
    async function savePlace(ev) {
        ev.preventDefault();
        const placeData = {
            title, address, addedPhotos, description, perks, 
            extraInfo, checkIn, checkOut, maxPeople, price,
        };
        if(id) {
            // update
            await axios.put('/api/places', {
                id, ...placeData    
            });
            setRedirect(true);
        } else {
            await axios.post('/api/places', placeData);
            setRedirect(true);
        }
    }

    if (redirect) {
        return <Navigate to="/account/places" />;
    }

    return(
        <div className="mx-16"> {/* Added margin from both sides */}
            <AccountNav/>
            <form onSubmit={savePlace}>
                {preInput('Title', 'add title for your place')}
                <input type="text"
                        value={title || ''} onChange={ev => setTitle(ev.target.value)}
                        placeholder="e.g. Cozy Coastal Cottage Steps from the Sand"
                        className="w-full border my-1 py-2 px-3 rounded-2xl" />
                {preInput('Address', 'add address of your place')}
                <input type="text" value={address || ''} onChange={ev => setAddress(ev.target.value)}
                        placeholder="address"
                        className="w-full border my-1 py-2 px-3 rounded-2xl" />
                {preInput('Photos', 'add photos of the place')}
                    <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos}/>
                {preInput('Description', 'add description of the place')}
                    <textarea
                        value={description || ''} onChange={ev => setDescription(ev.target.value)}
                        className="w-full border my-1 py-2 rounded-2xl" placeholder="add description of the place" 
                        style={{ height: '140px' }} // Added inline style for height
                    />
                {preInput('Perks', 'select perks of your place')}
                    <div className="grid gap-2 grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
                <Perks selected={perks} onChange={setPerks} />
                    </div>
                        {preInput('Extra info', 'add rules to be followed at your place')}
                    <textarea
                        value={extraInfo || ''} onChange={ev => setExtraInfo(ev.target.value)}
                        className="w-full border my-1 py-2 rounded-2xl" placeholder="add description of the place" 
                        style={{ height: '140px' }} // Added inline style for height
                    />
                        {preInput('Check in & out', 'max people')}
                        <div className="grid gap-2 grid-cols-2 md:grid-cols-4 lg:grid-cols-4">
                            <div>
                                <h3 className="mt-2 -mb-1">Check in time</h3>
                                <input type="text"
                                    value={checkIn || ''} onChange={ev => setCheckIn(ev.target.value)}
                                    className="mt-1 border p-1 rounded-xl" placeholder="12:00 pm" />
                            </div>
                            <div>
                                <h3>Check out time</h3>
                                <input type="text"
                                    value={checkOut || ''} onChange={ev => setCheckOut(ev.target.value)}
                                    className="mt-1 border p-1 rounded-xl" placeholder="12:00 pm" />
                            </div>
                            <div>
                                <h3>max people</h3>
                                <input type="number"
                                value={maxPeople || 1} onChange={ev => setMaxPeople(ev.target.value)}
                                className="mt-1 border p-1 rounded-xl" min='1' placeholder="0" />
                            </div>
                            <div>
                                <h3>Price per night</h3>
                                <input type="number"
                                value={price || 100} onChange={ev => setPrice(ev.target.value)}
                                className="mt-1 border p-1 rounded-xl" min='100' placeholder="0" />
                            </div>
                        </div>
                    <button className="bg-[#1E3A8A] p-2 my-4 w-xl justify-center text-white rounded-2xl flex items-center mx-auto cursor-pointer"
                >Save</button>
            </form>
        </div>
    )
}
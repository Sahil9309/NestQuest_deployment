import {useContext, useState} from "react";
import {UserContext} from "../UserContext.jsx";
import {Link, Navigate, useParams} from "react-router-dom";
import axios from "axios";
import PlacesPage from "./PlacesPage";
import AccountNav from "../AccountNav";

export default function ProfilePage() {
  const [redirect,setRedirect] = useState(null);
  const {ready,user,setUser} = useContext(UserContext);
  let {subpage} = useParams();
  if (subpage === undefined) {
    subpage = 'profile';
  }

  async function logout() {
    await axios.post('/api/logout');
    setRedirect('/');
    setUser(null);
  }

  if (!ready) {
    return 'Loading...';
  }

  if (ready && !user && !redirect) {
    return <Navigate to={'/login'} />
  }

  if (redirect) {
    return <Navigate to={redirect} />
  }
  
  return (
    <div>
      <AccountNav />
      {subpage === 'profile' && (
        <div className="max-w-lg mx-auto text-md mt-4">
          <strong>User Name:</strong> {user.name} <br />
          <strong>Email:</strong> {user.email} <br />
          <strong>Logged in as:</strong> {user.name} ({user.email})<br />
          <button onClick={logout} className="bg-[#1E3A8A] p-2 w-full text-white rounded-2xl cursor-pointer mt-6">Logout</button>
        </div>
      )}
      {subpage === 'places' && (
        <PlacesPage />
      )}
    </div>
  );
}
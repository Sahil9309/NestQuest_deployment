import {Link} from "react-router-dom";
import {useState} from "react";
import axios from "axios";

export default function RegisterPage() {
  const [name,setName] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  async function registerUser(ev) {
    ev.preventDefault();
    try {
      await axios.post('/api/register', {
        name,
        email,
        password,
      });
      alert('Registration successful. Now you can log in');
    } catch (e) {
      alert('Registration failed. Please try again later');
    }
  }

  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-64">
        <h1 className="text-3xl text-center mb-4">Register</h1>
        <div className="text-red-500 text-center mb-4"></div>
        <form className="max-w-md mx-auto" onSubmit={registerUser}>
          <input type="text" 
            placeholder="Name" 
            value={name} 
            onChange={ev => setName(ev.target.value)} 
            className="w-full border my-1 py-2 px-3 rounded-2xl" />
          <input type="email" 
            placeholder="email"
            value={email} 
            onChange={ev => setEmail(ev.target.value)} 
            className="w-full border my-1 py-2 px-3 rounded-2xl" />
          <input type="password" 
            placeholder="password" 
            value={password} 
            onChange={ev => setPassword(ev.target.value)} 
            className="w-full border my-1 py-2 px-3 rounded-2xl"/>
          <button className="bg-[#1E3A8A] p-2 w-full text-white rounded-2xl cursor-pointer mt-6">Register</button>
          <div className="text-center py-2 text-gray-500">
            Already a user? <Link className="underline text-black cursor-pointer" to={'/login'}>Login</Link>
          </div>
        </form>
      </div>
    </div>
  )
}
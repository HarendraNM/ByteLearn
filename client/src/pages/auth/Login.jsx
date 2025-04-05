import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { setUser } from '@/redux/authSlice'
import axios from 'axios'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

const Login = () => {
  const navigate = useNavigate();
  const dispatch=useDispatch();
  const [input, setInput] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(input);
    try {
      const res = await axios.post('http://localhost:3000/api/v1/user/login', input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        navigate('/');
        dispatch(setUser(res.data.user));
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-2">
          Welcome back!
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Login to your account
        </p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <Label className='mb-2'>Email Address</Label>
            <Input placeholder="Enter your email" type="email" name="email" value={input.email} onChange={handleChange} required />
          </div>
          <div className="mb-4">
            <Label className='mb-2'>Password</Label>
            <Input placeholder="Enter password" type="password" name="password" value={input.password} onChange={handleChange} required />
          </div>
          <Button type="submit" className='w-full bg-blue-600 hover:bg-blue-700 hover:cursor-pointer'>
            Login
          </Button>
        </form>
        <div className='flex items-center my-4'>
          <hr className='flex grow border-gray-300'/>
          <span className='mx-3 text-gray-500'>OR</span>
          <hr className='flex grow border-gray-300'/>
        </div>
        <p className="text-center mt-4">Don't have an account? <Link to='/signup' className='text-blue-600 hover:underline'>SignUp</Link></p>
      </div>
    </div>
  );
};

export default Login;

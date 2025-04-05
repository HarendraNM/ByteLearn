import React from 'react'
import { GraduationCap } from 'lucide-react'
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setUser } from '@/redux/authSlice';
import { toast } from 'sonner';


const Navbar = () => {
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const {user}=useSelector(store=>store.auth);

  const handleLogout=async (e)=>{
    try {
        const res=await axios.get('http://localhost:3000/api/v1/user/logout',{withCredentials:true});
        if(res.data.success){
            navigate('/');
            dispatch(setUser(null));
            toast.success(res.data.message);
        }
    } catch (error) {
        console.log(error);
        toast.error(error.response.data.message);
    }
  }
  return (
    <div className='bg-gray-900 z-50 w-full fixed top-0 py-3'>
      <div className='max-w-7xl mx-auto flex justify-between'>
        <Link to='/'>
            <div className='flex gap-1'>
                <GraduationCap className='text-gray-300 w-10 h-10'/>
                <h1 className='text-gray-300 text-3xl font-bold'>Logo</h1>
            </div>
        </Link>
        <nav>
            <ul className='flex gap-7 items-center text-xl font-semibold text-white'>
                <Link to='/'><li className='cursor-pointer'>Home</li></Link>
                <Link to='/courses'><li className='cursor-pointer'>Courses</li></Link>
                {
                    !user?(
                        <div className='flex gap-4'>
                            <Link to='/login'><Button className='bg-blue-500 hover:bg-blue-700 cursor-pointer'>Login</Button></    Link>
                            <Link to='/signup'><Button className='bg-gray-500 hover:bg-gray-700 cursor-pointer'>SignUp</Button></Link>
                        </div>
                    ):(
                        <div className='flex items-center gap-7'>
                            {
                                user?.role==="educator" && <Link to='/admin/dashboard'><li className='cursor-pointer'>Admin</li></Link> 
                            }
                            <Link to='/profile'>
                                <Avatar>
                                    <AvatarImage src={user?.photoUrl} />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                            </Link>
                            <Button onClick={handleLogout} className='bg-blue-500 hover:bg-blue-700'>LogOut</Button>
                        </div>
                    )
                }
            </ul>
        </nav>
      </div>
    </div>
  )
}

export default Navbar

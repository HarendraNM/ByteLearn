import React, { useState } from "react";
import userlogo from "../assets/User.jpeg";
import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "sonner";
import { setUser } from "@/redux/authSlice";
import { Loader2 } from "lucide-react";

const Profile = () => {
  const {user}=useSelector(store=>store.auth);
  const dispatch=useDispatch();

  const [input, setInput] = useState({
    name: user?.name || '',
    description: user?.description || '',
    file:user?.photoUrl || ''
  })

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const changeEventhandler=(e)=>{
    const {name,value}=e.target;
    setInput(prev=>({...prev,[name]:value}));
  } 

  const changeFilehandler=(e)=>{
    const file=e.target.files?.[0];
    setInput({
      ...input,
      file
    })
  }

  const submithandler=async(e)=>{
    e.preventDefault();
    const formdata=new FormData();
    formdata.append("name",input.name);
    formdata.append("description",input.description);
    if(input?.file){
      formdata.append("file",input?.file);
    }
    
    try {
      setLoading(true);
      const res=await axios.put('http://localhost:3000/api/v1/user/profile/update',formdata,{
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });

      if(res.data.success){
        setOpen(false);
        dispatch(setUser(res.data.user));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
    finally{
      setLoading(false);
    }
  }
  return (
    <div className="bg-gray-100 py-10 px-4 lg:px-0">
      <div className="max-w-6xl mx-auto p-8 bg-gradient-to-r bg-white shadow-xl rounded-2xl mt-10">
        <div className="flex flex-col items-center md:flex-row md:items-start space-y-8 md:space-y-0 md:space-x-10">
          <div className="h-40 w-40 rounded-full overflow-hidden border-4 border-blue-500 shadow-lg">
            <img src={user?.photoUrl || userlogo} alt="" className="w-full h-full object-cover" />
          </div>
          <div className="text-center md:text-left">
            <h1 className="text-3xl font-bold text-blue-500">{user.name || 'User'}</h1>
            <p className="text-gray-500 text-lg mt-3">
              <span className="font-bold">Email:</span> {user.email || 'Email not found'}
            </p>
            <p className="text-gray-500 my-1 capitalize">
              <span className="font-bold">Role:</span> {user?.role}
            </p>
            <p className="text-gray-700 leading-relaxed text-base mb-3">
              <span className="font-bold">Bio:</span> {user?.description || 'Add your bio'}
            </p>
            <Dialog open={open} onOpenChange={setOpen}>
              <Button onClick={() => setOpen(true)} className="bg-blue-500">Edit Profile</Button>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle className="text-center">
                    Edit Profile
                  </DialogTitle>
                  <DialogDescription className="text-center">
                    Make changes to your profile
                  </DialogDescription>
                </DialogHeader>
                <div className="grid- gap-4 py-2">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Name
                    </Label>
                    <Input
                      id="name"
                      type="text"
                      value={input.name}
                      onChange={changeEventhandler}
                      name="name"
                      className="col-span-3 text-gray-500"
                    />
                  </div>
                </div>
                <div className="grid- gap-4 py-2">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Description
                    </Label>
                    <Input
                      id="description"
                      type="text"
                      value={input.description}
                      onChange={changeEventhandler}
                      name="description"
                      className="col-span-3 text-gray-500"
                    />
                  </div>
                </div>
                <div className="grid- gap-4 py-2">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Photo
                    </Label>
                    <Input
                      id="file"
                      type="file"
                      accept="image/*"
                      onChange={changeFilehandler}
                      className="w-[277px]"
                    />
                  </div>
                </div>
                <DialogFooter>
                  {
                    loading ? <Button className='bg-blue-400'><Loader2 className="mr-2 h-4 w-4 animate-spin"/>Updating</Button> : <Button type="submit" onClick={submithandler} className='bg-blue-500'>Save Changes</Button>
                  }
                  
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

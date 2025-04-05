import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup } from "@/components/ui/radio-group";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";

const Signup = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    role: "student",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(user);
    try {
      const res = await axios.post("http://localhost:3000/api/v1/user/signup", user, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        navigate("/login");
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
          Create your account
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Join us today! It's quick and easy
        </p>
        {/* Wrap inputs inside a form */}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <Label className="mb-2">Full Name</Label>
            <Input placeholder="Enter your full name" name="name" value={user.name} type="text" onChange={handleChange} required />
          </div>
          <div className="mb-4">
            <Label className="mb-2">Email Address</Label>
            <Input placeholder="Enter your email" name="email" value={user.email} type="email" onChange={handleChange} required />
          </div>
          <div className="mb-4">
            <Label className="mb-2">Password</Label>
            <Input placeholder="Enter password" name="password" value={user.password} type="password" onChange={handleChange} required />
          </div>
          <div className="mb-4">
            <Label>Role</Label>
            <RadioGroup className="flex gap-4 mt-2">
              <div className="flex items-center space-x-2">
                <Input type="radio" value="student" name="role" id="role1" checked={user.role === "student"} onChange={handleChange} />
                <Label htmlFor="role1">Student</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input type="radio" value="educator" name="role" id="role2" checked={user.role === "educator"} onChange={handleChange} />
                <Label htmlFor="role2">Educator</Label>
              </div>
            </RadioGroup>
          </div>
          {/* Button type should be submit */}
          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 hover:cursor-pointer">
            SignUp
          </Button>
        </form>
        <p className="text-center mt-4">
          Already have an account? <Link to="/login" className="text-blue-600 hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;

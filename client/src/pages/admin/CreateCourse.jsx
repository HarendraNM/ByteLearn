import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const CreateCourse = () => {
  const [courseTitle, setCourseTitle] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate=useNavigate();

  const getselectedcategory=(value)=>{
    setCategory(value);
  }

  const createCourseHandler=async ()=>{
    try {
        setLoading(true);

        const res=await axios.post('http://localhost:3000/api/v1/course/',{courseTitle,category},
        {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true,
        });
        setLoading(false);

        if(res.data.success){
            navigate('/admin/courses');
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
    <div className="p-10 md:pr-20 h-screen">
      <h1 className="text-2xl font-bold">
        Let's Add <span className="text-blue-500">Courses</span>
      </h1>
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Mollitia
        maxime quia iure non ducimus eum quam quod aliquam. Enim, accusantium?
      </p>
      <div className="mt-10">
        <div>
          <Label className='mb-1'>Title</Label>
          <Input type="text" value={courseTitle} onChange={(e) => setCourseTitle(e.target.value)} placeholder="Course Name" className="bg-white" />
        </div>
        <div className="mt-4 mb-5">
          <Label className='mb-1'>Category</Label>
          <Select onValueChange={getselectedcategory}>
            <SelectTrigger className="w-[180px] bg-white">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Category</SelectLabel>
                <SelectItem value="C++">C++</SelectItem>
                <SelectItem value="Javascript">Javascript</SelectItem>
                <SelectItem value="Python">Python</SelectItem>
                <SelectItem value="NextJs">NextJs</SelectItem>
                <SelectItem value="MernStack">MernStack Development</SelectItem>
                <SelectItem value="Frontend">Frontend Development</SelectItem>
                <SelectItem value="Backend">Backend Development</SelectItem>
                <SelectItem value="ds">Data Science</SelectItem>
                <SelectItem value="ai">AI & ML</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="flex gap-3">
            <Button onClick={() => navigate('/admin/courses')} variant='outline' className='hover:cursor-pointer'>Cancel</Button>
            <Button disabled={loading} onClick={createCourseHandler} className='bg-blue-500 hover:bg-blue-600 hover:cursor-pointer' >
                {
                    loading? <><Loader2 className="animete-spin mr-1 h-4 w-4"/>Please wait</> : "Create Course"
                }
            </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateCourse;

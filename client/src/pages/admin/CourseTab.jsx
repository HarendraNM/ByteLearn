import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useEffect, useState } from "react";
import RichTextEditor from "../../components/RichTextEditor";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setCourse } from "@/redux/courseSlice";
import { Loader2 } from "lucide-react";

const CourseTab = () => {
  const navigate = useNavigate();
  const dispatch=useDispatch();

  const {course}=useSelector((store)=>store.course);

  const params=useParams();
  const id=params.courseId;

  const selectCourse=course.find(course=>course._id===id);

  const [selectedCourse, setSelectedCourse] = useState(selectCourse);
  const [loading, setLoading] = useState(false);

  const getCourseById=async()=>{
    try {
      const res=await axios.get(`http://localhost:3000/api/v1/course/${id}`,{withCredentials:true});

      if(res.data.success){
        setSelectedCourse(res.data.course);
        dispatch([...course,setCourse(res.data.course)]);
      }
    } catch (error) {
      console.log(error);

    }
  }

  useEffect(()=>{
    getCourseById();
  });

  const [input, setInput] = useState({
    courseTitle: selectedCourse?.courseTitle,
    subtitle: selectedCourse?.subtitle,
    description: selectedCourse?.description,
    category: selectedCourse?.category,
    courseLevel: selectedCourse?.courseLevel,
    price: selectedCourse?.price,
    file:""
  })

  const [thumbnail, setThumbnail] = useState(selectedCourse?.thumbnail);

  const changeEventhandler=(e)=>{
    const {name,value}=e.target;
    setInput({...input,[name]:value});
  } 

  const selectCategory=(value)=>{
    setInput({...input,category:value});
  }

  const selectLevel=(value)=>{
    setInput({...input,courseLevel:value});
  }

  const selectThumbnail=(e)=>{
    const file=e.target.files?.[0];

    if(file){
      setInput({...input,thumbnail:file});
      const fileReader=new FileReader();
      fileReader.onloadend=()=>{
        setThumbnail(fileReader.result);
      }
      fileReader.readAsDataURL(file);
    }
  }

  const updateCourseHandler=async(e)=>{
    setLoading(true);
    const formdata=new FormData();
    formdata.append("courseTitle",input.courseTitle);
    formdata.append("subtitle",input.subtitle);
    formdata.append("description",input.description);
    formdata.append("category",input.category);
    formdata.append("courseLevel",input.courseLevel);
    formdata.append("price",input.price);
    formdata.append("file",input.thumbnail);

    try {
      const res=await axios.put(`http://localhost:3000/api/v1/course/${id}`,formdata,{
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });

      if(res.data.success){
        navigate('lectures');
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
    <Card>
      <CardHeader className="flex md:flex-row justify-between">
        <div className="">
          <CardTitle>Basic Course Details</CardTitle>
          <CardDescription>
            Make changes to your courses here.Click save when you are done.
          </CardDescription>
        </div>
        <div className="space-x-2">
          <Button className='bg-gray-600'>Publish</Button>
          <Button variant="destructive">Remove Course</Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 mt-5">
          <div className="">
            <Label className="mb-1">Title</Label>
            <Input
              value={input.courseTitle}
              onChange={changeEventhandler}
              type="text"
              name="courseTitle"
              placeholder="Ex. Web Development"
            />
          </div>
          <div className="">
            <Label className="mb-1">Subtitle</Label>
            <Input
              value={input.subtitle}
              type="text"
              onChange={changeEventhandler}
              name="subtitle"
              placeholder="Ex. Become a web developer"
            />
          </div>
          <div className="">
            <Label className="mb-1">Description</Label>
            <RichTextEditor input={input} setInput={setInput} />
          </div>
          <div className="flex md:flex-row items-center gap-1 flex-wrap md:gap-5">
            <div>
              <Label>Category</Label>
              <Select defalutValue={input.category} onValueChange={selectCategory}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {/* <SelectLabel>Category</SelectLabel> */}
                    <SelectItem value="C++">C++</SelectItem>
                    <SelectItem value="Javascript">Javascript</SelectItem>
                    <SelectItem value="Python">Python</SelectItem>
                    <SelectItem value="NextJs">NextJs</SelectItem>
                    <SelectItem value="MernStack">
                      MernStack Development
                    </SelectItem>
                    <SelectItem value="Frontend">
                      Frontend Development
                    </SelectItem>
                    <SelectItem value="Backend">Backend Development</SelectItem>
                    <SelectItem value="ds">Data Science</SelectItem>
                    <SelectItem value="ai">AI & ML</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Course Level</Label>
              <Select defalutValue={input.courseLevel} onValueChange={selectLevel}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a course level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {/* <SelectLabel>Category</SelectLabel> */}
                    <SelectItem value="Beginner">Beginner</SelectItem>
                    <SelectItem value="Intermediate">Intermediate</SelectItem>
                    <SelectItem value="Advanced">Advanced</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Price in (INR)</Label>
              <Input
                type="number"
                name="price"
                value={input.price}
                onChange={changeEventhandler}
                placeholder="Ex. 1000"
                className="w-fit"
              />
            </div>
          </div>
          <div>
              <Label>Course Image</Label>
              <Input
                type="file"
                id="file"
                onChange={selectThumbnail}
                accept="image/*"
                className="w-fit"
              />
              {
                thumbnail && (
                  <img src={thumbnail} alt="Thumbnail" className="w-64 my-2" />
                )
              }
            </div>
            <div className="flex gap-2">
              <Button onClick={()=>navigate('/admin/courses')} variant='outline' className='hover:cursor-pointer'>Cancel</Button>
              <Button className='bg-gray-600 hover:cursor-pointer' disabled={loading} onClick={updateCourseHandler}>
                {
                  loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
                      <span>Loading...</span>
                    </>
                  ):("Save")
                }
              </Button>
            </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseTab;

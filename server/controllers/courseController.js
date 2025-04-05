import { Course } from "../models/courseModel.js";
import cloudinary  from "../utils/cloudinary.js";
import getdatauri from "../utils/dataURI.js";
import { Lecture } from "../models/lectureModel.js";

export const createCourse = async (req, res) => {
    try {
        const {courseTitle,category}=req.body;

        if(!courseTitle || !category){
            return res.status(400).json({
                success: false,
                message: "Please fill all the fields",
            });
        }

        const course = await Course.create({
            courseTitle,
            category,
            creator:req.id
        });
        return res.status(201).json({
            success: true,
            message: "Course created successfully",
            course
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Failed to create course",
        });
    }
}

export const getPublishedCourses=async(_, res)=>{
    try {
        const courses=await Course.find({isPublished:true});

        if(!courses){
            return res.status(404).json({
                success: false,
                message: "No published courses found",
            });
        }

        return res.status(200).json({
            success: true,
            courses
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Failed to get published courses",
        })
    }
}

export const getCreatorCourses=async(req, res)=>{
    try {
        const userId=req.id;
        const courses=await Course.find({creator:userId}).populate("lectures");

        if(!courses){
            return res.status(404).json({
                success: false,
                message: "No creator courses found",
                courses:[]
            });
        }

        return res.status(200).json({
            success: true,
            courses
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Failed to get creator courses",
        })
    }
}

export const updateCourse=async(req, res)=>{
    try {
        const courseId=req.params.courseId;
        const {courseTitle,subtitle,description,category,courseLevel,price}=req.body;
        const file=req.file;

        let course=await Course.findById(courseId);

        if(!course){
            return res.status(404).json({
                success: false,
                message: "Course not found",
            });
        }

        let thumbnail;
        if(file){
            const fileUri=getdatauri(file);
            thumbnail=await cloudinary.uploader.upload(fileUri);
        }

        const updateData={
            courseTitle,
            subtitle,
            description,
            category,
            courseLevel,
            price,
            thumbnail:thumbnail?.secure_url
        }
        course=await Course.findByIdAndUpdate(courseId,updateData,{new:true});

        return res.status(200).json({
            success: true,
            message: "Course updated successfully",
            course
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Failed to update course",
        })
    }
}

export const getCourseById=async(req, res)=>{
    try {
        const {courseId}=req.params;
        const course=await Course.findById(courseId);

        if(!course){
            return res.status(404).json({
                success: false,
                message: "Course not found",
            });
        }

        return res.status(200).json({
            success: true,
            course
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Failed to get course",
        })
    }
}

//lecture controllers

export const createLecture=async(req, res)=>{
    try {
        const {lectureTitle}=req.body;
        const {courseId}=req.params;

        if(!lectureTitle || !courseId){
            return res.status(400).json({
                success: false,
                message: "Please fill all the fields",
            });
        }
        const lecture=await Lecture.create({lectureTitle});

        const course=await Course.findById(courseId);
        if(course){
            course.lectures.push(lecture._id);
            await course.save();
        }
        return res.status(201).json({
            success: true,
            message: "Lecture created successfully",
            lecture
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Failed to create lecture",
        })
    }
}

export const getCourseLectures=async(req, res)=>{
    try {
        const {courseId}=req.params;
        const course=await Course.findById(courseId).populate("lectures");

        if(!course){
            return res.status(404).json({
                success: false,
                message: "Course not found",
            });
        }
        return res.status(200).json({
            success: true,
            lectures:course.lectures
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Failed to get course lectures",
        })
    }
}

export const updateLecture=async(req, res)=>{
    try {
        const {lectureTitle,videoInfo,isPreviewFree}=req.body;
        const {courseId,lectureId}=req.params;
        const lecture=await Lecture.findById(lectureId);

        if(!lecture){
            return res.status(404).json({
                success: false,
                message: "Lecture not found",
            });
        }

        if(lectureTitle){
            lecture.lectureTitle=lectureTitle;
        }
        if(videoInfo?.videoUrl){
            lecture.videoUrl=videoInfo.videoUrl;
        }
        if(videoInfo?.publicId){
            lecture.publicId=videoInfo.publicId;
        }
        lecture.isPreviewFree=isPreviewFree;

        await lecture.save();

        const course=await Course.findById(courseId);

        if(course && !course.lectures.includes(lecture._id)){
            course.lectures.push(lecture._id);
            await course.save();
        }

        return res.status(200).json({
            success: true,
            message: "Lecture updated successfully",
            lecture
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Failed to update lecture",
        })
    }
}

export const deleteLecture=async(req, res)=>{
    try {
        const {lectureId}=req.params;

        const lecture=await Lecture.findByIdAndDelete(lectureId);

        if(!lecture){
            return res.status(404).json({
                success: false,
                message: "Lecture not found",
            });
        }

        await Course.updateOne(
            {lectures:lectureId},
            {$pull:{lectures:lectureId}}
        )

        return res.status(200).json({
            success: true,
            message: "Lecture deleted successfully",
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Failed to delete lecture",
        })
    }
}
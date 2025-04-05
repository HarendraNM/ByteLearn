import express from 'express';
import { isAuthenticated } from '../middleware/isAuthenticated.js';
import { createCourse, createLecture, deleteLecture, getCourseById, getCourseLectures, getCreatorCourses, getPublishedCourses, updateCourse, updateLecture } from '../controllers/courseController.js';
import { singleupload } from '../middleware/multer.js';

const router = express.Router();

router.post('/',isAuthenticated,createCourse);
router.get('/published-courses',getPublishedCourses);
router.get('/',isAuthenticated,getCreatorCourses);
router.put('/:courseId',isAuthenticated,singleupload, updateCourse);
router.get('/:courseId',isAuthenticated,getCourseById);


router.post('/:courseId/lecture',isAuthenticated,createLecture);
router.get('/:courseId/lecture',isAuthenticated,getCourseLectures);
router.post('/:courseId/lecture/:lectureId',isAuthenticated,updateLecture);
router.delete('/lecture/:lectureId',isAuthenticated,deleteLecture);



export default router;
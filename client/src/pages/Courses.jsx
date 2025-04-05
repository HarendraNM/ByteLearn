import CourseCard from '../components/CourseCard'
import React from 'react'

export const courses=[
    {
      "id": "course-1",
      "title": "Introduction to Python Programming",
      "description": "Learn Python fundamentals with hands-on exercises and projects. Perfect for beginners.",
      "image": "/images/python-course.jpg"
    },
    {
      "id": "course-2",
      "title": "Web Development Bootcamp",
      "description": "Build responsive websites using HTML, CSS, and JavaScript from scratch.",
      "image": "/images/web-dev-course.jpg"
    },
    {
      "id": "course-3",
      "title": "Data Science Essentials",
      "description": "Master data analysis, visualization, and machine learning basics with Python.",
      "image": "/images/data-science-course.jpg"
    },
    {
      "id": "course-4",
      "title": "Mobile App Development with Flutter",
      "description": "Create cross-platform mobile apps using Flutter framework.",
      "image": "/images/flutter-course.jpg"
    },
    {
      "id": "course-5",
      "title": "Digital Marketing Fundamentals",
      "description": "Learn SEO, social media marketing, and content strategy basics.",
      "image": "/images/digital-marketing-course.jpg"
    }
]

const Courses = () => {
  return (
    <div className='bg-gray-100 pt-14'>
      <div className='min-h-screen max-w-7xl mx-auto py-10'>
        <div className='px-10'>
          <h1 className='text-4xl font-bold text-center text-gray-800 mb-4'>Courses</h1>
          <p className='text-center text-gray-600 mb-12'>Explore our wide range of courses.Whether you're a beginner or an experienced learner, we have something for everyone.</p>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
            {
              courses?.map((course)=>{
                return <CourseCard course={course}/>
              })
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Courses

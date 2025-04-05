import Hero from "@/components/Hero";
import React from "react";
import { courses } from "./Courses";
import CourseCard from "@/components/CourseCard";

const Home = () => {
  return (
    <div>
      <Hero />
      <div className="py-6">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-4">
          Courses
        </h1>
        <p className="text-center text-gray-600 mb-12">
          Explore our wide range of courses.Whether you're a beginner or an
          experienced learner, we have something for everyone.
        </p>
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {courses.slice(0, 6).map((course, index) => {
            return <CourseCard key={index} course={course} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;

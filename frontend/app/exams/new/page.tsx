import React from "react";
import { NewQuizzForm } from "@/app/exams/components/NewQuizzForm";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@radix-ui/react-select";
import { getAllEcole } from "@/modules/ecoles";
import { Ecole } from "@/modules/ecoles";
import { getAllCourses } from "@/modules/courses";
import { Course } from "@/modules/courses";
import { getAllClasses } from "@/modules/classes";
import { Class } from "@/modules/classes";



const Page = async() => {
  const ecoles =  await getAllEcole();
  const cours =  await getAllCourses();
  const classes =  await getAllClasses();
  return (
    <section>
      <h1 className="text-2xl font-bold">Create a new quizz</h1>
      <NewQuizzForm ecoles={ecoles} cours={cours} classes={classes}/>
    </section>
  );
};

export default Page;

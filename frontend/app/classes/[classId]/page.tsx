import React from "react";
import { getClassById } from "@/modules/classes";
import { getAllCourses } from "@/modules/courses";
import CoursesTable from "@/app/classes/[classId]/components/CoursesTable";

const Page = async ({ params: { classId } }: { params: { classId: string } }) => {
  const classe = getClassById(classId);
  const courses = await getAllCourses();
  return (
    <div className={"container"}>
      <header className={"pt-5 w-full flex justify-between"}>
        <h1 className={"text-4xl font-bold"}>{classe?.name}</h1>
      </header>
      <section className={"pt-5"}>
        <h2>{classe?.name}</h2>
        <CoursesTable courses={courses} />
      </section>
    </div>
  );
};

export default Page;

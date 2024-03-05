import React from "react";
import { NewCourseForm } from "@/app/courses/components/NewCourseForm";

const Page = () => {
  return (
    <section>
      <h1 className={"text-2xl font-bold"}>Create a new course</h1>
      <NewCourseForm />
    </section>
  );
};

export default Page;

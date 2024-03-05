import React from "react";
import { NewStudentForm } from "@/app/students/components/NewStudentForm";

const Page = () => {
  return (
    <section>
      <h1 className={"text-2xl font-bold"}>Create a new student</h1>
      <NewStudentForm />
    </section>
  );
};

export default Page;

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

import { getAllStudents, getCoursById } from "@/modules/courses";
import StudentsTable from "@/app/courses/[courseId]/StudentTable";

const Page = async ({
  params: { courseId },
}: {
  params: { courseId: string };
}) => {
  const course = await getCoursById(courseId);
  const students = await getAllStudents();
  console.log(students);

  const formattedStartDate = course.date_debut.toLocaleDateString();
  const formattedEndDate = course.date_fin.toLocaleDateString();

  return (
    <div className="container">
      <header className={"pt-5 w-full flex justify-between"}>
        <h1 className={"text-4xl font-bold"}>{course.matiere}</h1>
        <h4 className={"font-bold"}>
          Date du cours : {formattedStartDate} - {formattedEndDate}
        </h4>
      </header>
      <section className={"pt-5"}>
      <h1 className={"font-bold"}>Description de ce cours</h1>
        <h2 className={"pb-10"}>{course.description}</h2>
        <h1 className={"font-bold"}>Ajout d'un élève à ce cours</h1>
        <StudentsTable students={students} />
      </section>
      <Link className={"pt-5 w-full flex"} href={"/courses/new"}>
        <Button>
          <Label>Modifier</Label>
        </Button>
      </Link>
    </div>
  );
};

export default Page;

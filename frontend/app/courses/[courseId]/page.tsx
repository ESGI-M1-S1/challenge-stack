import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";

import { getAllStudents, getCoursById } from "@/modules/courses";

const Page = async ({ params: { courseId } }: { params: { courseId: string } }) => {
  const course = await getCoursById(courseId);
  const students = await getAllStudents();
  console.log(students);

  const formattedStartDate = course.date_debut.toLocaleDateString();
  const formattedEndDate = course.date_fin.toLocaleDateString();

  return (
    <div className="container">
      <header className={"pt-5 w-full flex justify-between"}>
        <h1 className={"text-4xl font-bold"}>{course.matiere}</h1>
        <h4 className={"font-bold"}>Date du cours : {formattedStartDate} - {formattedEndDate}</h4>
      </header>
      <section className={"pt-5"}>
        <h2 className={"pb-10"}>{course.description}</h2>
        
        <Table>
        <TableCaption>A list of your courses to assign</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Select</TableHead>
            <TableHead>Nom élève</TableHead>
            <TableHead>E-mail</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {students?.map((student) => {
            return (
              <TableRow key={student.id}>
                <TableCell>
                
                </TableCell>
                <TableCell>{student.nom}</TableCell>
                <TableCell>{student.email}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>


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

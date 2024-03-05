import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getAllStudents, Student } from "@/modules/students";
import { School } from "@/modules/schools";
import { AvatarIcon } from "@radix-ui/react-icons";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Class } from "@/modules/classes";

const Page = () => {
  const students = getAllStudents();
  return (
    <div className={"container"}>
      <header className={"pt-5 w-full flex justify-between"}>
        <h1 className={"text-4xl font-bold"}>Students</h1>
        <div className={"flex gap-3"}>
          <Link href={"/students/new"}>
            <Button>
              <Label>Add a student</Label>
            </Button>
          </Link>
          <Link href={"/students/new"}>
            <Button variant={"secondary"}>
              <Label>Import students</Label>
            </Button>
          </Link>
        </div>
      </header>
      <section className={"flex flex-wrap gap-3 pt-5"}>
        {students.map((student: Student) => (
          <Card className="min-w-[200px]">
            <CardHeader className={"py-3"}>
              <Avatar>
                <AvatarImage src={student.avatar} />
                <AvatarFallback>
                  <AvatarIcon />
                </AvatarFallback>
              </Avatar>
              <CardTitle>{student.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <ul>
                <li>{student.email}</li>
              </ul>
              <div className={"flex gap-3 pt-2 justify-between"}>
                <Button variant="secondary">
                  <Label>Progression</Label>
                </Button>
                <Button variant="ghost">
                  <Label>Message</Label>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </section>
    </div>
  );
};

export default Page;

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";
import { getAllCourses } from "@/modules/courses";
import { Badge } from "@/components/ui/badge";

const Page = () => {
  const courses = getAllCourses();
  return (
    <div className={"container"}>
      <header className={"pt-5 w-full flex justify-between"}>
        <h1 className={"text-4xl font-bold"}>Courses</h1>
        <Link href={"/courses/new"}>
          <Button>
            <Label>Add a course</Label>
          </Button>
        </Link>
      </header>
      <section className={"pt-5"}>
        {courses.map((course) => (
          <Card className="w-[350px]" key={course.id}>
            <CardHeader>
              <CardTitle>{course.name}</CardTitle>
              <Badge className={"max-w-fit"}>
                <Label>{course.difficulty}</Label>
              </Badge>
            </CardHeader>
            <CardContent>
              <CardDescription>{course.description}</CardDescription>
            </CardContent>
            <CardFooter className={"flex justify-center"}>
              <Link href={`/courses/${course.id}`}>
                <Button>
                  <Label>See the details</Label>
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </section>
    </div>
  );
};

export default Page;

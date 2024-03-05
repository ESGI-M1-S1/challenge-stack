import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";

const Page = () => {
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
        <Card className="w-[350px]">
          <CardHeader className={"py-5"}>
            <div className={"rounded bg-blue-600 h-48"}></div>
            <CardTitle>Symfony 7.0</CardTitle>
            <CardDescription>
              Learn the basics of Symfony 7.0 and how to build a web application
            </CardDescription>
          </CardHeader>
          <CardContent className={"flex justify-center"}>
            <Button>
              <Label>See the ressources</Label>
            </Button>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default Page;

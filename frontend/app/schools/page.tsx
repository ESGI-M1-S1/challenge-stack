import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getAllSchools } from "@/modules/schools";

const Page = () => {
  const schools = getAllSchools();
  return (
    <div className={"container"}>
      <header className={"pt-5 w-full flex justify-between"}>
        <h1 className={"text-4xl font-bold"}>Schools</h1>
        <Link href={"/schools/new"}>
          <Button>
            <Label>Add a school</Label>
          </Button>
        </Link>
      </header>
      <section className={"flex flex-wrap gap-4 pt-5"}>
        {schools.map((school) => (
          <Card className="w-[350px]" key={school.id}>
            <CardHeader className={"py-5"}>
              <div className={"rounded bg-blue-600 h-48"}></div>
              <CardTitle>{school.name}</CardTitle>
            </CardHeader>
            <CardContent className={"flex justify-center"}>
              <Button variant={"secondary"} className={"w-full"}>
                <Label>Edit</Label>
              </Button>
            </CardContent>
          </Card>
        ))}
      </section>
    </div>
  );
};

export default Page;

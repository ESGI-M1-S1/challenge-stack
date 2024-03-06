import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getAllClasses } from "@/modules/classes";
import { getAllSchools } from "@/modules/schools";

const Page = () => {
  const classes = getAllClasses();
  const schools = getAllSchools();
  return (
    <div className={"container"}>
      <header className={"pt-5 w-full flex justify-between"}>
        <h1 className={"text-4xl font-bold"}>Classes</h1>
        <Link href={"/classes/new"}>
          <Button>
            <Label>Add a class</Label>
          </Button>
        </Link>
      </header>
      <section className={"pt-5 flex flex-wrap gap-3"}>
        {classes.map((classIterator) => (
          <Card className="w-[350px]" key={classIterator.id}>
            <CardHeader className={"pt-5"}>
              <CardTitle>{classIterator.name}</CardTitle>
              <Badge className={"pt-2 w-fit"}>
                {
                  schools.find((school) => {
                    return school.id === classIterator.school;
                  })?.name
                }
              </Badge>
            </CardHeader>
            <CardFooter className={"flex justify-end"}>
              <Link href={`/classes/${classIterator.id}`}>
                <Button variant={"secondary"} className={"w-full"}>
                  <Label>See more</Label>
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

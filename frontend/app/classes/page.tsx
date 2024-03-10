import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardFooter, CardHeader, CardTitle,CardDescription } from "@/components/ui/card";
import { getAllClasses } from "@/modules/courses";
import { Badge } from "@/components/ui/badge";

const Page = async () => {
  const classes = await getAllClasses();
  return (
    <div className={"container mb-5"}>
      <header className={"pt-5 w-full flex justify-between"}>
        <h1 className={"text-4xl font-bold"}>Classes</h1>
        <Link href={"/classe/new"}>
          <Button>
            <Label>Add a class</Label>
          </Button>
        </Link>
      </header>
      <section className={"pt-5"}>
        {classes?.map((classe) => (
          <Card className="w-[300px] mb-5" key={classe.id}>
            <CardHeader>
              <CardTitle className={"mb-4"}>{classe.nom}</CardTitle>
              <Badge className={"max-w-fit"}>
                <Label>Description :</Label>
              </Badge>
              <CardDescription>{classe.logo}</CardDescription>
            </CardHeader>
            <CardFooter className={"flex justify-center"}>
              <Link href={`/courses/${classe.id}`}>
                <Button>
                  <Label>See</Label>
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

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Page = () => {
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
      <section className={"pt-5"}>
        <Card className="w-[350px]">
          <CardHeader className={"py-5"}>
            <CardTitle>M1IW</CardTitle>
            <ul>
              <li>
                <Badge>ESGI</Badge>
              </li>
            </ul>
          </CardHeader>
          <CardContent>
            <ul>
              <li>Symfony 7</li>
            </ul>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default Page;

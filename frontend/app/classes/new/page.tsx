import React from "react";
import { NewClassForm } from "@/app/classes/components/NewClassForm";

const Page = () => {
  return (
    <section>
      <h1 className={"text-2xl font-bold"}>Create a new course</h1>
      <NewClassForm />
    </section>
  );
};

export default Page;

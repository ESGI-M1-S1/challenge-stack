"use client";

import * as React from "react";

import { z } from "zod";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const formSchema = z.object({
  name: z.string().min(2).max(50),
  image: z.any().refine((file) => {
    return file instanceof File && file.type.startsWith("image/");
  }, "Invalid file type"),
});

export function NewSchoolForm({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      image: "",
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    //todo: implement form creation
    console.log(data);
    const body = {
      nom: data.name,
      logo: data.image,
    };
    fetch("/api/ecoles", {
      method: "POST",
      body: JSON.stringify(body),
    })
      .then((res) => {
        console.log(res);
        return res;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-2">
            <FormField
              control={form.control}
              name={"name"}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>School&apos;s name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name={"image"}
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      value={field.value.fileName ?? ""}
                      onChange={(event) => {
                        field.onChange(event?.target?.files?.[0]);
                      }}
                      type="file"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className={"w-full flex justify-end"}>
              <Button type={"submit"} className={"max-w-52"}>
                Create new school
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}

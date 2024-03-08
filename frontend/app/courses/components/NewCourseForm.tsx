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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
  matiere: z.string().min(2).max(50),
  description: z.string().min(2).max(500),
  date_debut: z.any(),
  date_fin: z.any(),
});

export function NewCourseForm({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      matiere: "",
      description: "",
      date_debut: new Date(),
      date_fin: new Date(),
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    console.log(data);
    const body = {
      matiere: data.matiere,
      description: data.description,
      DateDebut: new Date (data.date_debut).toISOString().split('T')[0],
      DateFin: new Date (data.date_fin).toISOString().split('T')[0],
    };
    fetch("http://localhost:8000/api/courss", {
      method: "POST",
      headers: {
        'Content-Type': 'application/ld+json'
      },
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
    <div className={cn("grid gap-8", className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-2">
            <FormField
              control={form.control}
              name={"matiere"}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title of the course</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name={"description"}
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input {...field} type="textarea" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
            control={form.control}
            name={"date_debut"}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date de début</FormLabel>
                <FormControl>
                  <Input {...field} type="date" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={"date_fin"}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date de fin</FormLabel>
                <FormControl>
                  <Input {...field} type="date" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
            <div className={"w-full flex justify-end"}>
              <Button type={"submit"} className={"max-w-52"}>
                Create new cours
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}

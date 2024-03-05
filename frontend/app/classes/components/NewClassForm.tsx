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
import { getAllStudents, Student } from "@/modules/students";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getAllSchools } from "@/modules/schools";

const formSchema = z.object({
  name: z.string().min(2).max(50),
  students: z.array(z.string()),
  school: z.string(),
});

export function NewClassForm({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const students = getAllStudents();
  const schools = getAllSchools();
  const [selectedStudents, setSelectedStudents] = useState<
    Student["id"][] | []
  >([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      school: "unassigned",
      students: [],
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    //todo: implement form creation
    const result = { ...data, students: selectedStudents };
    console.log(result);
  }

  return (
    <div className={cn("grid gap-8", className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-2">
            <FormField
              control={form.control}
              name={"name"}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name of the class</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name={"school"}
              control={form.control}
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>School</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="unassigned" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="unassigned">Unassigned</SelectItem>
                          {schools.map((school) => {
                            return (
                              <SelectItem key={school.id} value={school.id}>
                                {school.name}
                              </SelectItem>
                            );
                          })}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <ScrollArea>
              <Table>
                <TableCaption>A list of your registered students.</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>Select</TableHead>
                    <TableHead className="w-[100px]">Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Classes</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {students.map((student) => {
                    return (
                      <TableRow key={student.id}>
                        <TableCell>
                          <Checkbox
                            onCheckedChange={(checked) => {
                              if (!checked) {
                                setSelectedStudents(
                                  selectedStudents.filter(
                                    (id) => id !== student.id,
                                  ),
                                );
                                return;
                              }
                              setSelectedStudents([
                                ...selectedStudents,
                                student.id,
                              ]);
                            }}
                          />
                        </TableCell>
                        <TableCell>{student.name}</TableCell>
                        <TableCell>{student.email}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </ScrollArea>
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

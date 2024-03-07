"use client";

import React, { useEffect } from "react";
import { Courses } from "@/modules/courses";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";

const CoursesTable = ({ courses }: { courses: Courses[] }) => {
  const [selectedCourses, setSelectedCourses] = React.useState<string[]>([]);
  useEffect(() => {
    console.log("Selected courses", selectedCourses);
  }, [selectedCourses]);
  return (
    <ScrollArea>
      <Table>
        <TableCaption>A list of your courses to assign</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Select</TableHead>
            <TableHead>Matiere</TableHead>
            <TableHead>Description</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {courses?.map((course) => {
            return (
              <TableRow key={course.id}>
                <TableCell>
                  <Checkbox
                    onCheckedChange={(checked) => {
                      if (!checked) {
                        setSelectedCourses(
                          selectedCourses.filter(
                            (id) => id.toString() !== course.id,
                          ),
                        );
                        return;
                      }
                      setSelectedCourses([...selectedCourses, course.id]);
                    }}
                  />
                </TableCell>
                <TableCell>{course.matiere}</TableCell>
                <TableCell>{course.description}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </ScrollArea>
  );
};
export default CoursesTable;

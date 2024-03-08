"use client";
import React, { useEffect } from "react";
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

const StudentsTable = ({ students }: { students: any }) => {
  const [selectedStudents, setselectedStudents] = React.useState<string[]>([]);
  useEffect(() => {
    console.log("Selected courses", selectedStudents);
  }, [selectedStudents]);
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Select</TableHead>
          <TableHead>Nom élève</TableHead>
          <TableHead>E-mail</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {students?.map((student: any) => {
          return (
            <TableRow key={student.id}>
              <TableCell>
                <Checkbox
                  onCheckedChange={(checked) => {
                    if (!checked) {
                      setselectedStudents(
                        selectedStudents.filter((id) => {
                          return id !== student.id;
                        }),
                      );
                      return;
                    }
                    setselectedStudents([...selectedStudents, student.id]);
                  }}
                />
              </TableCell>
              <TableCell>{student.nom}</TableCell>
              <TableCell>{student.email}</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default StudentsTable;

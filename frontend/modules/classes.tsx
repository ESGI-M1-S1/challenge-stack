import { z } from "zod";

export const classesSchema = z.object({
  id: z.string(),
  name: z.string(),
  students: z.array(z.string()),
  school: z.string(),
});

export type Class = z.infer<typeof classesSchema>;

export function getAllClasses(): Class[] {
  return [
    {
      id: "1",
      name: "M1IW",
      students: ["1", "2"],
      school: "1",
    },
    {
      id: "2",
      name: "Sciences",
      students: ["3"],
      school: "2",
    },
  ];
}

export function getClassById(id: string): Class | undefined {
  return getAllClasses().find((c) => c.id === id);
}

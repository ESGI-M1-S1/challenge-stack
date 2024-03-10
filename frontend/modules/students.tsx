import { z } from "zod";

export const studentSchema = z.object({
  id: z.string(),
  name: z.string(),
  avatar: z.string(),
  email: z.string().email("Invalid email"),
});
export type Student = z.infer<typeof studentSchema>;

export function getAllStudents(): Student[] {
  return [
    {
      id: "2",
      name: "Côme ",
      avatar: "https://randomuser.me/api/portraits",
      email: "come.bonal@gmail.com",
    },
    {
      id: "3",
      name: "Orian",
      avatar: "https://randomuser.me/api/portraits",
      email: "orian.bonal@gmail.com",
    },
  ];
}

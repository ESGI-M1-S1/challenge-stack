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
      id: "1",
      name: "John Doe",
      avatar: "https://randomuser.me/api/portraits",
      email: "johndoe@gmail.com",
    },
    {
      id: "2",
      name: "Jane Doe",
      avatar: "https://randomuser.me/api/portraits",
      email: "jan@deo.com",
    },
    {
      id: "3",
      name: "Yapa Doe",
      avatar: "https://randomuser.me/api/portraits",
      email: "ydoe@yopmail.com",
    },
  ];
}

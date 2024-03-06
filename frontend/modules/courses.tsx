import { z } from "zod";

export const coursesSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().min(2).max(500),
  duration: z.string().min(1).max(100),
  difficulty: z.enum(["beginner", "intermediate", "advanced"]),
  students: z.array(z.string()),
  school: z.string(),
});

export type Course = z.infer<typeof coursesSchema>;

export function getAllCourses(): Course[] {
  return [
    {
      id: "1",
      name: "Symfony 7.0",
      students: ["1", "2"],
      school: "1",
      description: "Learn Symfony from scratch",
      duration: "3",
      difficulty: "beginner",
    },
  ];
}

export function getCourseById(id: string): Course | undefined {
  return getAllCourses().find((c) => c.id === id);
}

import { z } from "zod";

export const coursesSchema = z.object({
  id: z.string(),
  matiere: z.string(),
  description: z.string(),
  date_debut: z.date(),
  date_fin: z.date(),
});
export type Courses = z.infer<typeof coursesSchema>;

export async function getAllCourses(): Promise<any> {
  const data = await fetch("http://localhost:8000/api/courss")
    .then((res) => res.json())
    .catch((error) => {
      console.error("Error fetching cours", error);
      return [];
    });
  return data?.["hydra:member"]?.map((courses: any) => {
    return {
      id: courses.id,
      matiere: courses.matiere,
      description: courses.description,
      date_debut: new Date(courses.dateDebut),
      date_fin: new Date(courses.dateFin),
    };
  });
}

export async function getCoursById(id: string){
  const courses = await getAllCourses();
  return courses.find((c) => c.id == id);
}


export const studentssSchema = z.object({
  id: z.string(),
  nom: z.string(),
  email: z.string(),
});
export type Students = z.infer<typeof studentssSchema>;

export async function getAllStudents(): Promise<any> {
  const data = await fetch("http://localhost:8000/api/users")
    .then((res) => res.json())
    .catch((error) => {
      console.error("Error fetching cours", error);
      return [];
    });
  return data?.["hydra:member"]?.map((students: any) => {
    return {
      id: students.id,
      nom: students.nom,
      email: students.email,
    };
  });
}

import { z } from "zod";
import axios from "axios";

export const coursesSchema = z.object({
  id: z.string(),
  date_debut: z.string(),
  date_fin: z.string().min(2).max(500),
  matiere: z.string().min(1).max(100),
  description: z.enum(["beginner", "intermediate", "advanced"]),
  id_formateur: z.string()
});

export type Course = z.infer<typeof coursesSchema>;

export async function getAllCourses(): Promise<Course[]> {
  const response = await axios.get('http://127.0.0.1:8000/api/courss');
  
  return response.data['hydra:member'].map((cours: Course) => ({
      id: cours.id,
      date_debut: cours,
      matiere: cours.matiere,
    }));
}

export async function  getCourseById(id: string): Promise<Course[]>  {
  const response = await axios.get(`http://127.0.0.1:8000/api/courss/${id}`);
  
  return response.data['hydra:member'].map((cours: Course) => ({
      id: cours.id,
      date_debut: cours,
      matiere: cours.matiere,
    }));
}

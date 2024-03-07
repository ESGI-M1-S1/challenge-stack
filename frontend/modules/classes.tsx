import { z } from "zod";
import axios from "axios";

export const classesSchema = z.object({
  id: z.string(),
  nom: z.string(),
  logo: z.array(z.string()),
  id_ecole: z.string(),
});

export type Class = z.infer<typeof classesSchema>;

export async function getAllClasses() {
  const response = await axios.get('http://127.0.0.1:8000/api/classes');
  return response.data['hydra:member'].map((classe: Class) => ({
    id: classe.id,
    nom: classe.nom,
    logo: classe.logo,
  }));
}

export async function getClassById(id: string): Promise<Class[]>  {
  const response = await axios.get(`http://127.0.0.1:8000/api/classes/${id}`);
  
  return response.data['hydra:member'].map((classe: Class) => ({
      id: classe.id,
      nom: classe.nom,
    }));
}

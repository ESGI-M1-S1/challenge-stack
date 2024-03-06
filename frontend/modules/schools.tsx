import { z } from "zod";

export const schoolSchema = z.object({
  id: z.string(),
  name: z.string(),
  image: z.string(),
});
export type School = z.infer<typeof schoolSchema>;

export async function getAllSchools(): Promise<any> {
  const data = await fetch("http://localhost:8000/api/ecoles")
    .then((res) => res.json())
    .catch((error) => {
      console.error("Error fetching schools", error);
      return [];
    });
  const result = data["hydra:member"]?.map((school: any) => {
    return {
      id: school.id,
      name: school.nom,
      image: school.logo,
    };
  });
  return result;
}

import { z } from "zod";

export const schoolSchema = z.object({
  id: z.string(),
  name: z.string(),
  image: z.string(),
});
export type School = z.infer<typeof schoolSchema>;

export async function getAllSchools(): Promise<School[]> {
  const schools = fetch("http://localhost:8000/api/ecoles");
  return schools.then((res) => res.json());
}

import { z } from "zod";

export const schoolSchema = z.object({
  id: z.string(),
  name: z.string(),
  image: z.string(),
});
export type School = z.infer<typeof schoolSchema>;

export function getAllSchools(): School[] {
  return [
    {
      id: "1",
      name: "ESGI",
      image: "https://randomuser.me/api/portraits",
    },
    {
      id: "2",
      name: "Sciences-U Campus Lyon",
      image: "https://randomuser.me/api/portraits",
    },
  ];
}

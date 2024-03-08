import { z } from "zod";
import axios from "axios";

export const userSchema = z.object({
  id: z.string(),
  email: z.string(),
  mdp: z.string(),
  nom: z.string()
});

export type User = z.infer<typeof userSchema>;


export async function getUserById(id: string): Promise<User | null> {
  try {
    const response = await axios.get(`http://127.0.0.1:8000/api/users/${id}`);
    const userData = response.data;

    if (Array.isArray(userData)) {
      // If it's an array, assume it's a list of users and return the first user
      const user = userData[0];
      return {
        id: user.id,
        email: user.email,
        mdp: user.mdp,
        nom: user.nom,
      };
    } else {
      // If it's not an array, assume it's a single user
      return {
        id: userData.id,
        email: userData.email,
        mdp: userData.mdp,
        nom: userData.nom,
      };
    }
  } catch (error) {
    console.error(error);
    return null; // Return null if there's an error fetching the user
  }
}

import { z } from "zod";
import axios from "axios";

export const ecoleSchema = z.object({
  id: z.string(),
  nom: z.string(),
  logo: z.string(),
});

export type Ecole = z.infer<typeof ecoleSchema>;

export const getAllEcole = async () => {
  try {
    const response = await axios.get('http://127.0.0.1:8000/api/ecoles');

    return response.data['hydra:member'].map((ecole: Ecole) => ({
      id: ecole.id,
      nom: ecole.nom,
      logo: ecole.logo,
    }));
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

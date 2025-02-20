export interface ClientInterface {
  id: number | string;
  name: string;
  phone_number: string;
  sex: string;
  academy: number;
  coach: number;
  last_training: Date | null;
  birth_date: Date;
  registration_date: Date;
  created_at: Date;
  updated_at: Date;
}

export interface ClientInterface {
  id: number | string;
  name: string;
  phoneNumber: string;
  sex: string;
  academy: number;
  coach: number;
  lastTraining: Date | null;
  birthDate: Date;
  registrationDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

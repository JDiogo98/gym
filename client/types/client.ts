export interface ClientInterface {
  clientId: number | string | undefined;
  clientName: string;
  clientPhoneNumber: string;
  clientSex: string;
  academyId: number;
  coachId: number;
  clientBirthDate: Date;
  clientRegistrationDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

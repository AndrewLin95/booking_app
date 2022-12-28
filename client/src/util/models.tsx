export interface GuestsInterface {
  id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
}

export interface StaffsInterface {
  id: string;
  firstName: string;
  lastName: string;
  title: string;
}

export interface ServicesInterface {
  id: string;
  serviceHeader: string;
  serviceName: string;
  servicePrice: number;
}

export interface AppointmentsInterface {
  id: string;
  guestName: string;
  staffName: string;
  startTime: number;
  endTime: number;
  duration: number;
  serviceHeader: string;
  date: string;
  isComplete: boolean;
  isCancelled: boolean;
}

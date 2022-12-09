export interface GuestsInterface {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
}

export interface StaffsInterface {
  firstName: string;
  lastName: string;
  title: string;
}

export interface ServicesInterface {
  serviceHeader: string;
  serviceName: string;
  servicePrice: number;
}

export interface AppointmentsInterface {
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

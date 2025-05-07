
export type BloodType = 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';

export type UserRole = 'donor' | 'patient' | 'admin';

export type UrgencyLevel = 'low' | 'medium' | 'high';

export type RequestStatus = 'pending' | 'matched' | 'fulfilled';

export type MatchStatus = 'pending' | 'contacted' | 'completed' | 'canceled';

export type NgoRegistrationType = 'trust' | 'society' | 'section_8_company';

export type RegistrationStatus = 'pending' | 'approved' | 'rejected';

export interface User {
  id: string;
  email: string;
  name: string;
  phone: string;
  city: string;
  role: UserRole;
  created_at: string;
}

export interface Donor {
  id: string;
  blood_type: BloodType;
  last_donation: string | null;
  is_available: boolean;
  users?: User; // To match the Supabase join response structure
}

export interface Patient {
  id: string;
  blood_type: BloodType;
  requested_date: string | null;
  urgency: UrgencyLevel;
  request_status: RequestStatus;
  requestor_role?: string; // New field: 'patient', 'ngo', or 'hospital'
  organization_name?: string; // New field: name of organization for ngo/hospital
  organization_id?: string; // New field: id for future linking
  users?: User; // To match the Supabase join response structure
}

export interface DonationMatch {
  id: string;
  donor_id: string;
  patient_id: string;
  match_date: string;
  status: MatchStatus;
  donation_date: string | null;
  created_at: string;
  // These fields are available when we join with donors and patients tables
  donor?: Donor;
  patient?: Patient;
  donor_user?: { users: User };
  patient_user?: { users: User };
}

export interface DonorWithUser extends Donor {
  user: User;
}

export interface PatientWithUser extends Patient {
  user: User;
}

export interface MatchWithDetails extends DonationMatch {
  donor: Donor;
  patient: Patient;
  donor_user: { users: User };
  patient_user: { users: User };
}

export interface NgoRegistration {
  id: string;
  name: string;
  registration_type: NgoRegistrationType;
  registration_number: string;
  contact_person_name: string;
  contact_person_email: string;
  contact_person_phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  certificate_12a: string | null;
  certificate_80g: string | null;
  pan_number: string;
  activities_description: string;
  collaboration_plan: string;
  created_at: string;
  status: string;
}

export interface HospitalRegistration {
  id: string;
  name: string;
  registration_number: string | null;
  contact_person_name: string;
  contact_person_email: string;
  contact_person_phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  blood_bank_registration_number: string | null;
  collaboration_details: string;
  specific_requirements: string | null;
  created_at: string;
  status: string;
}


import { supabase } from "@/integrations/supabase/client";
import { BloodType, Patient, UrgencyLevel, RequestStatus } from "@/lib/types";

export const createPatient = async (
  userId: string,
  bloodType: BloodType,
  urgency: UrgencyLevel,
  requestorRole: string = 'patient',
  organizationName: string = null
): Promise<Patient | null> => {
  const { data, error } = await supabase
    .from('patients')
    .insert({
      id: userId,
      blood_type: bloodType,
      urgency,
      request_status: 'pending',
      requested_date: new Date().toISOString(),
      requestor_role: requestorRole,
      organization_name: organizationName
    })
    .select()
    .single();
  
  if (error) {
    console.error('Error creating patient:', error);
    return null;
  }
  
  return data as Patient;
};

export const getPatientById = async (id: string): Promise<Patient | null> => {
  const { data, error } = await supabase
    .from('patients')
    .select('*, users!inner(*)')
    .eq('id', id)
    .single();
  
  if (error) {
    console.error('Error getting patient by id:', error);
    return null;
  }
  
  return data as Patient;
};

export const updatePatientStatus = async (
  patientId: string, 
  status: RequestStatus
): Promise<boolean> => {
  const { error } = await supabase
    .from('patients')
    .update({ request_status: status })
    .eq('id', patientId);
  
  if (error) {
    console.error('Error updating patient status:', error);
    return false;
  }
  
  return true;
};

export const getAllPatients = async (): Promise<Patient[]> => {
  const { data, error } = await supabase
    .from('patients')
    .select(`
      *,
      users(*)
    `);
  
  if (error) {
    console.error('Error getting all patients:', error);
    return [];
  }
  
  return data as Patient[];
};


import { supabase } from "@/integrations/supabase/client";
import { HospitalRegistration } from "@/lib/types";

export const createHospitalRegistration = async (
  name: string,
  contactPersonName: string,
  contactPersonEmail: string,
  contactPersonPhone: string,
  address: string,
  city: string,
  state: string,
  pincode: string,
  collaborationDetails: string,
  registrationNumber?: string,
  bloodBankRegistrationNumber?: string,
  specificRequirements?: string
): Promise<HospitalRegistration | null> => {
  try {
    console.log('Submitting hospital registration:', {
      name,
      contactPersonName,
      contactPersonEmail,
      address,
      city
    });
    
    // Create the registration data object
    const hospitalData = {
      name,
      registration_number: registrationNumber,
      contact_person_name: contactPersonName,
      contact_person_email: contactPersonEmail,
      contact_person_phone: contactPersonPhone,
      address,
      city,
      state,
      pincode,
      blood_bank_registration_number: bloodBankRegistrationNumber,
      collaboration_details: collaborationDetails,
      specific_requirements: specificRequirements,
      status: 'pending'
    };
    
    console.log('Hospital data being submitted:', hospitalData);
    
    const { data, error } = await supabase
      .from('hospital_registrations')
      .insert(hospitalData)
      .select();
    
    if (error) {
      console.error('Error creating hospital registration:', error.message, error.details, error.hint);
      console.error('Full error object:', JSON.stringify(error));
      return null;
    }
    
    console.log('Hospital registration successful:', data[0]);
    return data[0] as HospitalRegistration;
  } catch (error) {
    console.error('Exception creating hospital registration:', error);
    return null;
  }
};

export const getAllHospitalRegistrations = async (): Promise<HospitalRegistration[]> => {
  try {
    const { data, error } = await supabase
      .from('hospital_registrations')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error getting all hospital registrations:', error);
      return [];
    }
    
    console.log("Hospital registrations fetched:", data);
    return data as HospitalRegistration[];
  } catch (error) {
    console.error('Exception getting all hospital registrations:', error);
    return [];
  }
};

export const updateHospitalRegistrationStatus = async (
  id: string,
  status: string
): Promise<boolean> => {
  try {
    console.log(`Updating hospital registration ${id} status to ${status}`);
    
    // Update the registration status
    const { error } = await supabase
      .from('hospital_registrations')
      .update({ status })
      .eq('id', id);
    
    if (error) {
      console.error('Error updating hospital registration status:', error);
      return false;
    }
    
    console.log(`Successfully updated hospital registration ${id} status to ${status}`);
    return true;
  } catch (error) {
    console.error('Exception updating hospital registration status:', error);
    return false;
  }
};

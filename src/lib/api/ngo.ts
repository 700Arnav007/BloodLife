
import { supabase } from "@/integrations/supabase/client";
import { NgoRegistration, NgoRegistrationType } from "@/lib/types";

export const createNgoRegistration = async (
  name: string,
  registrationType: NgoRegistrationType,
  registrationNumber: string,
  contactPersonName: string,
  contactPersonEmail: string,
  contactPersonPhone: string,
  address: string,
  city: string,
  state: string,
  pincode: string,
  panNumber: string,
  activitiesDescription: string,
  collaborationPlan: string,
  certificate12a?: string,
  certificate80g?: string
): Promise<NgoRegistration | null> => {
  try {
    console.log('Submitting NGO registration:', {
      name,
      registrationType,
      contactPersonName,
      contactPersonEmail,
      address,
      city
    });
    
    // Create the registration data object
    const ngoData = {
      name,
      registration_type: registrationType,
      registration_number: registrationNumber,
      contact_person_name: contactPersonName,
      contact_person_email: contactPersonEmail,
      contact_person_phone: contactPersonPhone,
      address,
      city,
      state,
      pincode,
      certificate_12a: certificate12a,
      certificate_80g: certificate80g,
      pan_number: panNumber,
      activities_description: activitiesDescription,
      collaboration_plan: collaborationPlan,
      status: 'pending'
    };
    
    console.log('NGO data being submitted:', ngoData);
    
    const { data, error } = await supabase
      .from('ngo_registrations')
      .insert(ngoData)
      .select();
    
    if (error) {
      console.error('Error creating NGO registration:', error.message, error.details, error.hint);
      console.error('Full error object:', JSON.stringify(error));
      return null;
    }
    
    console.log('NGO registration successful:', data[0]);
    return data[0] as NgoRegistration;
  } catch (error) {
    console.error('Exception creating NGO registration:', error);
    return null;
  }
};

export const getAllNgoRegistrations = async (): Promise<NgoRegistration[]> => {
  try {
    const { data, error } = await supabase
      .from('ngo_registrations')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error getting all NGO registrations:', error);
      return [];
    }
    
    console.log("NGO registrations fetched:", data);
    return data as NgoRegistration[];
  } catch (error) {
    console.error('Exception getting all NGO registrations:', error);
    return [];
  }
};

export const updateNgoRegistrationStatus = async (
  id: string,
  status: string
): Promise<boolean> => {
  try {
    console.log(`Updating NGO registration ${id} status to ${status}`);
    
    // Update the registration status
    const { error } = await supabase
      .from('ngo_registrations')
      .update({ status })
      .eq('id', id);
    
    if (error) {
      console.error('Error updating NGO registration status:', error);
      return false;
    }
    
    console.log(`Successfully updated NGO registration ${id} status to ${status}`);
    return true;
  } catch (error) {
    console.error('Exception updating NGO registration status:', error);
    return false;
  }
};

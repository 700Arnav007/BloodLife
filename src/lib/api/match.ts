
import { supabase } from "@/integrations/supabase/client";
import { DonationMatch } from "@/lib/types";
import { updateDonorAvailability } from "./donor";
import { updatePatientStatus } from "./patient";

export const createMatch = async (
  donorId: string,
  patientId: string
): Promise<DonationMatch | null> => {
  const { data, error } = await supabase
    .from('donation_matches')
    .insert({
      donor_id: donorId,
      patient_id: patientId,
      status: 'completed' // Set match status as completed when created
    })
    .select('*')
    .single();
  
  if (error) {
    console.error('Error creating match:', error);
    return null;
  }
  
  // Update donor availability (freeze for 6 months)
  await updateDonorAvailability(donorId, false);
  
  // Update patient status to fulfilled
  await updatePatientStatus(patientId, 'fulfilled');
  
  return data as DonationMatch;
};

export const getAllMatches = async (): Promise<DonationMatch[]> => {
  try {
    const { data, error } = await supabase
      .from('donation_matches')
      .select(`
        *,
        donor:donors!inner(*),
        patient:patients!inner(*),
        donor_user:donors!inner(users!inner(*)),
        patient_user:patients!inner(users!inner(*))
      `)
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error getting all matches:', error);
      return [];
    }
    
    return data as DonationMatch[];
  } catch (error) {
    console.error('Exception getting all matches:', error);
    return [];
  }
};

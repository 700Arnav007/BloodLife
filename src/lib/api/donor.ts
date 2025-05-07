
import { supabase } from "@/integrations/supabase/client";
import { BloodType, Donor } from "@/lib/types";

export const createDonor = async (
  userId: string,
  bloodType: BloodType
): Promise<Donor | null> => {
  const { data, error } = await supabase
    .from('donors')
    .insert({
      id: userId,
      blood_type: bloodType,
      is_available: true
    })
    .select()
    .single();
  
  if (error) {
    console.error('Error creating donor:', error);
    return null;
  }
  
  return data as Donor;
};

export const getDonorById = async (id: string): Promise<Donor | null> => {
  const { data, error } = await supabase
    .from('donors')
    .select('*, users!inner(*)')
    .eq('id', id)
    .single();
  
  if (error) {
    console.error('Error getting donor by id:', error);
    return null;
  }
  
  return data as Donor;
};

export const getAvailableDonorsByBloodTypeAndCity = async (
  bloodType: BloodType,
  city: string
): Promise<Donor[]> => {
  const { data, error } = await supabase
    .from('donors')
    .select('*, users!inner(*)')
    .eq('blood_type', bloodType)
    .eq('users.city', city)
    .eq('is_available', true);
  
  if (error) {
    console.error('Error getting available donors:', error);
    return [];
  }
  
  return data as Donor[];
};

export const updateDonorAvailability = async (donorId: string, isAvailable: boolean): Promise<boolean> => {
  const { error } = await supabase
    .from('donors')
    .update({ 
      is_available: isAvailable,
      last_donation: isAvailable ? null : new Date().toISOString()
    })
    .eq('id', donorId);
  
  if (error) {
    console.error('Error updating donor availability:', error);
    return false;
  }
  
  return true;
};

export const getAllDonors = async (): Promise<Donor[]> => {
  const { data, error } = await supabase
    .from('donors')
    .select(`
      *,
      users(*)
    `);
  
  if (error) {
    console.error('Error getting all donors:', error);
    return [];
  }
  
  return data as Donor[];
};


import { supabase } from "@/integrations/supabase/client";
import { User, UserRole } from "@/lib/types";

export const createUser = async (
  email: string,
  name: string,
  phone: string,
  city: string,
  role: UserRole
): Promise<User | null> => {
  const { data, error } = await supabase
    .from('users')
    .insert({
      email,
      name,
      phone,
      city,
      role
    })
    .select()
    .single();
  
  if (error) {
    console.error('Error creating user:', error);
    return null;
  }
  
  return data as User;
};

export const getUserByEmail = async (email: string): Promise<User | null> => {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('email', email)
    .single();
  
  if (error) {
    console.error('Error getting user by email:', error);
    return null;
  }
  
  return data as User;
};

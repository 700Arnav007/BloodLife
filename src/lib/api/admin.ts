
import { supabase } from "@/integrations/supabase/client";

export const checkAdminCredentials = (password: string): boolean => {
  // Use a more secure password, but still accessible for testing
  return password === 'Shashwat@226025';
};

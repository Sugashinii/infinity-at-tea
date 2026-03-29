import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const saveKit = async (userId, formData, resultData) => {
  const { data, error } = await supabase
    .from('kits')
    .insert([
      {
        user_id: userId,
        business_name: formData.businessName,
        business_type: formData.businessType,
        location: formData.location,
        phone_number: formData.phoneNumber,
        description: formData.description,
        language: formData.language,
        result_data: resultData
      }
    ])
    .select()
    .single();
    
  if (error) throw error;
  return data;
};

export const getUserKits = async (userId) => {
  const { data, error } = await supabase
    .from('kits')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
    
  if (error) throw error;
  return data;
};

export const getKitById = async (id) => {
  const { data, error } = await supabase
    .from('kits')
    .select('*')
    .eq('id', id)
    .single();
    
  if (error) throw error;
  return data;
};

export const updateProfile = async (updates) => {
  const { data, error } = await supabase.auth.updateUser({
    data: updates
  });
  if (error) throw error;
  return data;
};

export const updateEmail = async (email) => {
  const { data, error } = await supabase.auth.updateUser({
    email: email
  });
  if (error) throw error;
  return data;
};

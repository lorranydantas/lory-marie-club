import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ylhzxbzfgskcgsgowubp.supabase.co';
const supabaseAnonKey = 'sb_publishable_7-Ot-sy99CWbCa_fslP_qA_gsrGHQU8';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
// src/lib/supabase/client.js
'use client';

import { createClient } from '@supabase/supabase-js';

export const createSupabaseClient = () => {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
  );
  return supabase;
};

const supabase = typeof window !== 'undefined' ? createSupabaseClient() : null;

export default supabase;
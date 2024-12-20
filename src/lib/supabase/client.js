// src/lib/supabase/client.js
'use client';

import { createClient } from '@supabase/supabase-js';

let supabase = null;

if (typeof window !== 'undefined') {
  supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
    {
      auth: { persistSession: false }
    }
  );
}

export default supabase;
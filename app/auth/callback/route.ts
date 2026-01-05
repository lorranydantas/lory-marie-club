import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const token_hash = requestUrl.searchParams.get('token_hash');
  const type = requestUrl.searchParams.get('type');

  const supabase = createClient(
    'https://ylhzxbzfgskcgsgowubp.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlsaHp4YnpmZ3NrY2dzZ293dWJwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzYwMzg0NzYsImV4cCI6MjA1MTYxNDQ3Nn0.Q9h1FhB4CZNLMCm0W8uyPNdL1Oc3FfJZRkFkOpc6kM8'
  );

  if (token_hash && type === 'signup') {
    await supabase.auth.verifyOtp({
      token_hash,
      type: 'signup'
    });
  }

  return NextResponse.redirect(new URL('/onboarding', request.url));
}
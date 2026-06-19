import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ylcjcfqoprabglxkfohh.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlsY2pjZnFvcHJhYmdseGtmb2hoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE4NDgzMzUsImV4cCI6MjA5NzQyNDMzNX0.W203KCi1uHyv2WGvysHFooZqY5roD6JTytfuWhbhP0g';

export const supabase = createClient(supabaseUrl, supabaseKey);

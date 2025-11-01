import { createClient } from '@supabase/supabase-js';
const supabaseUrl = 'https://bxtinxxmcnpvhqoekeqd.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ4dGlueHhtY25wdmhxb2VrZXFkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE5MjgxNzIsImV4cCI6MjA3NzUwNDE3Mn0.3tVH_QW7vinsNpjaoQF17i2Z1sNCOYRRpZhqpnHXyKM';
const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase;

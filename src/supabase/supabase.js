//SUPABASE CONFIGURATION

import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://rarfyyzashlcnzzzxoql.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhcmZ5eXphc2hsY256enp4b3FsIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY4OTk2OTkzOCwiZXhwIjoyMDA1NTQ1OTM4fQ.CRfmAumcIucpo-ikasCXN4WmsstRGmDXpBmdO50XyB0";
// "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhcmZ5eXphc2hsY256enp4b3FsIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODk5Njk5MzgsImV4cCI6MjAwNTU0NTkzOH0.wMLb0alQmwMxs4ExEhWgdzSHWtN5eiER4XlWdXjll38";
const supabase = createClient(supabaseUrl, supabaseKey);

export const getAccessToken = async () => {
  const { data: user, error } = await supabase.auth.getSession();
  if (error) {
    return error;
  }

  const { access_token } = user.session;
  return access_token;
};

export default supabase;

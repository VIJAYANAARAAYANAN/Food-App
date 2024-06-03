import { createClient } from "@supabase/supabase-js";
import "react-native-url-polyfill/auto";

const supabaseUrl = "https://ykushvzlqulurcssstqi.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlrdXNodnpscXVsdXJjc3NzdHFpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTczNDYxOTAsImV4cCI6MjAzMjkyMjE5MH0.KbiYjbDB3q2ROA2SozAgz3u6huyqChgFJR6pUncUTQ0";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

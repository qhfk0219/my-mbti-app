import { createClient } from "@supabase/supabase-js";

// docs/supabase-info.md 에 기재된 프로젝트 정보를 직접 사용합니다.
const SUPABASE_PROJECT_ID = "skfwetmnnvflwbjejrkq";
const SUPABASE_URL = `https://${SUPABASE_PROJECT_ID}.supabase.co`;
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_zhtvwi4LYmUkHDd_FhA4Pw_gdmeDOoC";

export const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);

export const RESULTS_TABLE = "mbti_results";

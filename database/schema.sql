-- IT 부캐 찾기 테스트 결과 저장 테이블
-- Supabase 대시보드 > SQL Editor 에서 아래 스크립트를 실행하세요.

create table if not exists public.mbti_results (
  id uuid primary key default gen_random_uuid(),
  mbti_type text not null check (char_length(mbti_type) = 4),
  answers jsonb not null,
  created_at timestamptz not null default now()
);

alter table public.mbti_results enable row level security;

-- 누구나(anon key) 자신의 테스트 결과를 저장할 수 있도록 허용
create policy "Allow public insert" on public.mbti_results
  for insert
  to anon
  with check (true);

-- 메인 화면의 실시간 참여자 수 카운터를 위해 조회(count) 허용
create policy "Allow public read" on public.mbti_results
  for select
  to anon
  using (true);

-- 실시간 카운터 배너가 INSERT 이벤트를 구독할 수 있도록 Realtime publication 등록
alter publication supabase_realtime add table public.mbti_results;

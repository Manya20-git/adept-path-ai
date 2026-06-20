
-- ============ ROLES ============
CREATE TYPE public.app_role AS ENUM ('student','recruiter','tpo','admin');
CREATE TYPE public.application_status AS ENUM ('applied','reviewing','shortlisted','interview','offer','rejected','withdrawn');
CREATE TYPE public.job_type AS ENUM ('internship','full_time','part_time','contract');

-- ============ PROFILES ============
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  phone TEXT,
  -- student fields
  university TEXT,
  degree TEXT,
  major TEXT,
  graduation_year INT,
  cgpa NUMERIC(3,2),
  skills TEXT[],
  bio TEXT,
  linkedin_url TEXT,
  github_url TEXT,
  portfolio_url TEXT,
  -- recruiter fields
  company_name TEXT,
  company_website TEXT,
  job_title TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- ============ USER ROLES ============
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role public.app_role)
RETURNS BOOLEAN LANGUAGE SQL STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;

CREATE OR REPLACE FUNCTION public.get_primary_role(_user_id UUID)
RETURNS public.app_role LANGUAGE SQL STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT role FROM public.user_roles WHERE user_id = _user_id
  ORDER BY CASE role WHEN 'admin' THEN 1 WHEN 'tpo' THEN 2 WHEN 'recruiter' THEN 3 WHEN 'student' THEN 4 END
  LIMIT 1
$$;

-- ============ JOBS ============
CREATE TABLE public.jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  recruiter_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  company TEXT NOT NULL,
  location TEXT,
  remote BOOLEAN NOT NULL DEFAULT false,
  job_type public.job_type NOT NULL DEFAULT 'internship',
  description TEXT NOT NULL,
  requirements TEXT,
  required_skills TEXT[],
  min_cgpa NUMERIC(3,2),
  salary_min INT,
  salary_max INT,
  currency TEXT DEFAULT 'USD',
  application_deadline DATE,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.jobs TO authenticated;
GRANT ALL ON public.jobs TO service_role;
ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;

-- ============ RESUMES ============
CREATE TABLE public.resumes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  file_path TEXT NOT NULL,
  file_name TEXT NOT NULL,
  file_size INT,
  is_primary BOOLEAN NOT NULL DEFAULT true,
  ai_score INT,
  ai_strengths TEXT[],
  ai_weaknesses TEXT[],
  ai_suggestions TEXT[],
  extracted_skills TEXT[],
  analyzed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.resumes TO authenticated;
GRANT ALL ON public.resumes TO service_role;
ALTER TABLE public.resumes ENABLE ROW LEVEL SECURITY;

-- ============ APPLICATIONS ============
CREATE TABLE public.applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id UUID NOT NULL REFERENCES public.jobs(id) ON DELETE CASCADE,
  student_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  resume_id UUID REFERENCES public.resumes(id) ON DELETE SET NULL,
  cover_letter TEXT,
  status public.application_status NOT NULL DEFAULT 'applied',
  match_score INT,
  recruiter_notes TEXT,
  applied_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(job_id, student_id)
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.applications TO authenticated;
GRANT ALL ON public.applications TO service_role;
ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;

-- ============ INTERVIEWS ============
CREATE TABLE public.interviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  application_id UUID NOT NULL REFERENCES public.applications(id) ON DELETE CASCADE,
  scheduled_at TIMESTAMPTZ NOT NULL,
  duration_minutes INT NOT NULL DEFAULT 60,
  mode TEXT NOT NULL DEFAULT 'video',
  location_or_link TEXT,
  notes TEXT,
  status TEXT NOT NULL DEFAULT 'scheduled',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.interviews TO authenticated;
GRANT ALL ON public.interviews TO service_role;
ALTER TABLE public.interviews ENABLE ROW LEVEL SECURITY;

-- ============ NOTIFICATIONS ============
CREATE TABLE public.notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  link TEXT,
  type TEXT DEFAULT 'info',
  read BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.notifications TO authenticated;
GRANT ALL ON public.notifications TO service_role;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- ============ POLICIES ============
-- profiles
CREATE POLICY "profiles_select_authenticated" ON public.profiles FOR SELECT TO authenticated USING (true);
CREATE POLICY "profiles_insert_self" ON public.profiles FOR INSERT TO authenticated WITH CHECK (auth.uid() = id);
CREATE POLICY "profiles_update_self" ON public.profiles FOR UPDATE TO authenticated USING (auth.uid() = id);

-- user_roles
CREATE POLICY "roles_select_self_or_admin" ON public.user_roles FOR SELECT TO authenticated
  USING (auth.uid() = user_id OR public.has_role(auth.uid(),'admin') OR public.has_role(auth.uid(),'tpo'));

-- jobs
CREATE POLICY "jobs_select_all" ON public.jobs FOR SELECT TO authenticated USING (true);
CREATE POLICY "jobs_insert_recruiter" ON public.jobs FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = recruiter_id AND (public.has_role(auth.uid(),'recruiter') OR public.has_role(auth.uid(),'tpo') OR public.has_role(auth.uid(),'admin')));
CREATE POLICY "jobs_update_owner" ON public.jobs FOR UPDATE TO authenticated
  USING (auth.uid() = recruiter_id OR public.has_role(auth.uid(),'admin') OR public.has_role(auth.uid(),'tpo'));
CREATE POLICY "jobs_delete_owner" ON public.jobs FOR DELETE TO authenticated
  USING (auth.uid() = recruiter_id OR public.has_role(auth.uid(),'admin'));

-- resumes
CREATE POLICY "resumes_select_own_or_recruiter" ON public.resumes FOR SELECT TO authenticated
  USING (auth.uid() = user_id OR public.has_role(auth.uid(),'recruiter') OR public.has_role(auth.uid(),'tpo') OR public.has_role(auth.uid(),'admin'));
CREATE POLICY "resumes_modify_own" ON public.resumes FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "resumes_update_own" ON public.resumes FOR UPDATE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "resumes_delete_own" ON public.resumes FOR DELETE TO authenticated USING (auth.uid() = user_id);

-- applications
CREATE POLICY "apps_select_student_or_recruiter" ON public.applications FOR SELECT TO authenticated
  USING (
    auth.uid() = student_id
    OR EXISTS (SELECT 1 FROM public.jobs j WHERE j.id = job_id AND j.recruiter_id = auth.uid())
    OR public.has_role(auth.uid(),'tpo') OR public.has_role(auth.uid(),'admin')
  );
CREATE POLICY "apps_insert_student" ON public.applications FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = student_id AND public.has_role(auth.uid(),'student'));
CREATE POLICY "apps_update_student_or_recruiter" ON public.applications FOR UPDATE TO authenticated
  USING (
    auth.uid() = student_id
    OR EXISTS (SELECT 1 FROM public.jobs j WHERE j.id = job_id AND j.recruiter_id = auth.uid())
    OR public.has_role(auth.uid(),'tpo') OR public.has_role(auth.uid(),'admin')
  );

-- interviews
CREATE POLICY "interviews_select_involved" ON public.interviews FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.applications a JOIN public.jobs j ON j.id = a.job_id
      WHERE a.id = application_id AND (a.student_id = auth.uid() OR j.recruiter_id = auth.uid())
    ) OR public.has_role(auth.uid(),'tpo') OR public.has_role(auth.uid(),'admin')
  );
CREATE POLICY "interviews_modify_recruiter" ON public.interviews FOR INSERT TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.applications a JOIN public.jobs j ON j.id = a.job_id
      WHERE a.id = application_id AND j.recruiter_id = auth.uid()
    ) OR public.has_role(auth.uid(),'tpo') OR public.has_role(auth.uid(),'admin')
  );
CREATE POLICY "interviews_update_recruiter" ON public.interviews FOR UPDATE TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.applications a JOIN public.jobs j ON j.id = a.job_id
      WHERE a.id = application_id AND j.recruiter_id = auth.uid()
    ) OR public.has_role(auth.uid(),'tpo') OR public.has_role(auth.uid(),'admin')
  );

-- notifications
CREATE POLICY "notif_select_own" ON public.notifications FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "notif_update_own" ON public.notifications FOR UPDATE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "notif_insert_authenticated" ON public.notifications FOR INSERT TO authenticated WITH CHECK (true);

-- ============ TRIGGERS ============
CREATE OR REPLACE FUNCTION public.set_updated_at() RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;

CREATE TRIGGER trg_profiles_updated BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER trg_jobs_updated BEFORE UPDATE ON public.jobs FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER trg_apps_updated BEFORE UPDATE ON public.applications FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user() RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (NEW.id, NEW.email, COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', split_part(NEW.email,'@',1)));

  -- assign default role from metadata, fallback to 'student'
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, COALESCE((NEW.raw_user_meta_data->>'role')::public.app_role, 'student'))
  ON CONFLICT DO NOTHING;
  RETURN NEW;
END; $$;

CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Realtime
ALTER PUBLICATION supabase_realtime ADD TABLE public.notifications;

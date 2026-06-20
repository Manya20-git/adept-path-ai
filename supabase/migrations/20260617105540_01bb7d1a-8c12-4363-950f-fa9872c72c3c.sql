DROP POLICY IF EXISTS "notif_insert_authenticated" ON public.notifications;

CREATE POLICY "notif_insert_self_or_staff"
ON public.notifications
FOR INSERT
TO authenticated
WITH CHECK (
  auth.uid() = user_id
  OR public.has_role(auth.uid(), 'recruiter')
  OR public.has_role(auth.uid(), 'tpo')
  OR public.has_role(auth.uid(), 'admin')
);
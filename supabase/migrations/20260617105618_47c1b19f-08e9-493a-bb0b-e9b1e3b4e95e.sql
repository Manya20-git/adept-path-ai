REVOKE EXECUTE ON FUNCTION public.get_primary_role(uuid) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.get_primary_role(uuid) TO service_role;
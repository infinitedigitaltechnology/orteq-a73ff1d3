
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.set_updated_at() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.log_quote_status() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.log_ticket_status() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.grant_dealer_role_on_approval() FROM PUBLIC, anon, authenticated;

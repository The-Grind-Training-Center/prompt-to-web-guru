CREATE POLICY "No client access to app_settings"
ON public.app_settings
FOR ALL
TO anon, authenticated
USING (false)
WITH CHECK (false);
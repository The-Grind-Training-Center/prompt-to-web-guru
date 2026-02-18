
-- Add explicit deny policies for INSERT/UPDATE/DELETE on storage.objects for 'images' bucket
-- Only service role (used in edge functions) can write; anon/authenticated users cannot

CREATE POLICY "Block public uploads to images bucket"
  ON storage.objects FOR INSERT
  TO anon, authenticated
  WITH CHECK (bucket_id != 'images');

CREATE POLICY "Block public updates to images bucket"
  ON storage.objects FOR UPDATE
  TO anon, authenticated
  USING (bucket_id != 'images');

CREATE POLICY "Block public deletes from images bucket"
  ON storage.objects FOR DELETE
  TO anon, authenticated
  USING (bucket_id != 'images');

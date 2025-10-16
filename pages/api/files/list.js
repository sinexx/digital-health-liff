import { getSupabaseServer } from '@/lib/supabaseServer';

// Lists public files from the 'public-files' storage bucket
export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).end();
  try {
    const supabase = getSupabaseServer();
    const bucket = 'public-files';
    const { data, error } = await supabase.storage.from(bucket).list('', {
      limit: 200,
      sortBy: { column: 'name', order: 'desc' },
    });
    if (error) return res.status(500).json({ error: 'storage_list_error' });

    // Build public URLs (requires the bucket to be set to public in Supabase)
    const files = (data || [])
      .filter(f => f?.name)
      .map(f => ({
        name: f.name,
        path: f.name,
        url: supabase.storage.from(bucket).getPublicUrl(f.name).data.publicUrl,
        size: f.metadata?.size ?? null,
        updated_at: f.updated_at || null,
      }));
    return res.status(200).json({ files });
  } catch (e) {
    console.error('files list error', e);
    return res.status(500).json({ error: 'server_error' });
  }
}

const SUPABASE_URL = "https://YOUR-PROJECT.supabase.co";
const SUPABASE_ANON_KEY = "YOUR_ANON_KEY";
const supabase = supabaseJs.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function loadMetrics() {
  // total pageviews
  const { count: pvCount } = await supabase
    .from('events')
    .select('id', { count: 'exact', head: false })
    .eq('event_type', 'pageview');

  const { count: clickCount } = await supabase
    .from('events')
    .select('id', { count: 'exact', head: false })
    .eq('event_type', 'click')
    .eq('event_name', 'get_started');

  document.getElementById('pageviews').textContent = pvCount ?? 0;
  document.getElementById('clicks').textContent = clickCount ?? 0;

  // recent events
  const { data: recent } = await supabase
    .from('events')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(10);

  const list = document.getElementById('recent');
  list.innerHTML = recent.map(ev =>
    `<li>[${new Date(ev.created_at).toLocaleString()}] ${ev.event_type} / ${ev.event_name} — ${JSON.stringify(ev.metadata)}</li>`
  ).join('');
}

loadMetrics();

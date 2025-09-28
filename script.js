// script.js (example)
const SUPABASE_URL = "https://YOUR-PROJECT.supabase.co";
const SUPABASE_ANON_KEY = "YOUR_ANON_KEY"; // okay for client usage (not service_role)

const supabase = supabaseJs.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// basic event logger
async function logEvent(event_type, event_name, metadata = {}) {
  try {
    await supabase
      .from('events')
      .insert([{
        event_type,
        event_name,
        metadata
      }]);
  } catch (err) {
    console.error("Event log failed:", err);
  }
}

// call on page load
window.addEventListener('load', () => {
  logEvent('pageview', 'landing_page', {
    path: location.pathname,
    referrer: document.referrer,
    userAgent: navigator.userAgent
  });
});

function getStarted() {
  logEvent('click', 'get_started', {});
  alert("Welcome to Pet Trader! Backend features coming soon...");
}

from supabase import create_client, Client
from .config import SUPABASE_URL, SUPABASE_SERVICE_KEY

if not SUPABASE_URL or not SUPABASE_SERVICE_KEY:
    raise RuntimeError(
        "Missing required environment variables: SUPABASE_URL and SUPABASE_SERVICE_KEY must be set."
    )

supabase: Client = create_client(SUPABASE_URL, SUPABASE_SERVICE_KEY)

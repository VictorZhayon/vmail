from fastapi import APIRouter, HTTPException, Depends
from ..auth import get_current_user_id
from ..database import supabase

router = APIRouter(prefix="/account", tags=["account"])


@router.delete("", status_code=204)
async def delete_account(user_id: str = Depends(get_current_user_id)):
    try:
        supabase.auth.admin.delete_user(user_id)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to delete account: {str(e)}")

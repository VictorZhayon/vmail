from fastapi import APIRouter, HTTPException, Depends
from ..models import TransactionCreate
from ..database import supabase
from ..auth import get_current_user_id

router = APIRouter(prefix="/transactions", tags=["transactions"])


@router.post("", response_model=dict, status_code=201)
async def create_transaction(
    transaction: TransactionCreate,
    user_id: str = Depends(get_current_user_id),
):
    payload = transaction.model_dump()
    payload["amount"] = str(payload["amount"])
    payload["transaction_date"] = str(payload["transaction_date"])
    payload["user_id"] = user_id

    result = supabase.table("transactions").insert(payload).execute()
    if not result.data:
        raise HTTPException(status_code=500, detail="Failed to save transaction")
    return result.data[0]


@router.get("", response_model=list)
async def get_transactions(user_id: str = Depends(get_current_user_id)):
    result = (
        supabase.table("transactions")
        .select("*")
        .eq("user_id", user_id)
        .order("created_at", desc=True)
        .execute()
    )
    return result.data

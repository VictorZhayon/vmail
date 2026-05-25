from fastapi import APIRouter, HTTPException
from ..models import TransactionCreate
from ..database import supabase

router = APIRouter(prefix="/transactions", tags=["transactions"])


@router.post("", response_model=dict, status_code=201)
async def create_transaction(transaction: TransactionCreate):
    payload = transaction.model_dump()
    payload["amount"] = str(payload["amount"])
    payload["transaction_date"] = str(payload["transaction_date"])

    result = supabase.table("transactions").insert(payload).execute()
    if not result.data:
        raise HTTPException(status_code=500, detail="Failed to save transaction")
    return result.data[0]


@router.get("", response_model=list)
async def get_transactions():
    result = (
        supabase.table("transactions")
        .select("*")
        .order("created_at", desc=True)
        .execute()
    )
    return result.data

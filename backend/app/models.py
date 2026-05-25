from pydantic import BaseModel
from decimal import Decimal
from datetime import date
from typing import Optional


class TransactionCreate(BaseModel):
    amount: Decimal
    type: str
    category: str
    note: Optional[str] = None
    customer_name: Optional[str] = None
    transaction_date: date

    model_config = {"json_schema_extra": {"example": {
        "amount": 15000,
        "type": "income",
        "category": "Sales",
        "customer_name": "Chioma Obi",
        "transaction_date": "2026-05-25",
    }}}

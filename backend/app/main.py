from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routers import transactions

app = FastAPI(title="AI Voice Ledger API", version="0.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(transactions.router)


@app.get("/health")
async def health_check():
    return {"status": "ok"}

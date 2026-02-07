from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from app.services.web3_service import web3_service
from app.api.endpoints import wallet, chat, portfolio

app = FastAPI(title="ChainSpeak API", version="0.1.0")

# CORS Configuration
origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include Routers
app.include_router(wallet.router, prefix="/api/wallet", tags=["wallet"])
app.include_router(chat.router, prefix="/api/chat", tags=["chat"])
app.include_router(portfolio.router, prefix="/api/portfolio", tags=["portfolio"])

@app.on_event("startup")
async def startup_event():
    if web3_service.is_connected():
        print(f"✅ Connected to Sepolia Testnet. Current Block: {web3_service.get_block_number()}")
    else:
        print("❌ Failed to connect to Sepolia Testnet.")

@app.get("/")
def read_root():
    return {"message": "Welcome to ChainSpeak API", "status": "running"}

@app.get("/health")
def health_check():
    connected = web3_service.is_connected()
    return {
        "status": "ok",
        "web3_connected": connected,
        "block_number": web3_service.get_block_number() if connected else None
    }

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)

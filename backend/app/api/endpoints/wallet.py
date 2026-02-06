from fastapi import APIRouter, HTTPException
from app.models.wallet import WalletCreate, WalletImport, WalletResponse, BalanceResponse
from app.services.wallet_service import wallet_service

router = APIRouter()

@router.post("/create", response_model=WalletResponse)
def create_wallet(wallet_in: WalletCreate):
    try:
        # For simplicity, we just return the encrypted key. In a real app, we'd store it.
        result = wallet_service.create_wallet(wallet_in.password)
        return WalletResponse(
            address=result["address"],
            encrypted_key=result["encrypted_key"]
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/import", response_model=WalletResponse)
def import_wallet(wallet_in: WalletImport):
    try:
        result = wallet_service.import_wallet(wallet_in.private_key, wallet_in.password)
        return WalletResponse(
            address=result["address"],
            encrypted_key=result["encrypted_key"]
        )
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.get("/balance/{address}", response_model=BalanceResponse)
def get_balance(address: str):
    try:
        result = wallet_service.get_balance(address)
        return BalanceResponse(**result)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

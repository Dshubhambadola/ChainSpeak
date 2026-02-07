from fastapi import APIRouter, HTTPException
from app.services.portfolio_service import portfolio_service

router = APIRouter()

@router.get("/{address}")
async def get_portfolio(address: str):
    try:
        data = portfolio_service.get_portfolio_summary(address)
        return data
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

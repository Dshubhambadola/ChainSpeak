from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.services.agent_service import agent_service

router = APIRouter()

class ChatRequest(BaseModel):
    message: str

class ChatResponse(BaseModel):
    response: str

@router.post("/", response_model=ChatResponse)
async def chat(request: ChatRequest):
    try:
        ai_response = await agent_service.process_command(request.message)
        return ChatResponse(response=ai_response)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

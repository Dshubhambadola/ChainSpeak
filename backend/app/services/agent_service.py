from langchain_groq import ChatGroq
from langchain_core.tools import tool
from langchain_core.messages import SystemMessage
from langgraph.prebuilt import create_react_agent
from app.core.config import settings
from app.services.wallet_service import wallet_service

# Initialize LLM
llm = ChatGroq(
    temperature=0, 
    groq_api_key=settings.GROQ_API_KEY, 
    model_name="llama-3.3-70b-versatile"
)

# Define Tools
@tool
def get_wallet_balance(address: str) -> str:
    """Check the ETH balance of a specific wallet address on Sepolia testnet."""
    try:
        balance_data = wallet_service.get_balance(address)
        return f"Balance for {address}: {balance_data['balance_eth']} ETH"
    except Exception as e:
        return f"Error fetching balance: {str(e)}"

tools = [get_wallet_balance]

# Create Agent
# Removing modifier args to ensure compatibility with installed langgraph version
agent_executor = create_react_agent(llm, tools)

class AgentService:
    async def process_command(self, user_input: str):
        # Manually prepend the system prompt
        messages = [
            SystemMessage(content="You are ChainSpeak, an AI assistant for blockchain interaction. You can check wallet balances on Sepolia testnet. Always be concise and helpful."),
            ("user", user_input)
        ]
        response = await agent_executor.ainvoke({"messages": messages})
        return response["messages"][-1].content

agent_service = AgentService()

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

@tool
def prepare_eth_transfer(to_address: str, amount: str) -> str:
    """Prepare an Ethereum transfer transaction. Use this when the user wants to send ETH."""
    # Build the proposal string
    clean_amount = str(amount).replace("ETH", "").strip()
    return f"TRANSACTION_PROPOSAL: {{\"type\": \"transfer\", \"to\": \"{to_address}\", \"amount\": \"{clean_amount}\", \"token\": \"ETH\"}}"

@tool
def swap_tokens(token_in: str, token_out: str, amount: str) -> str:
    """Prepare a swap transaction between two tokens.
    Use this when the user wants to swap, trade, or exchange tokens.
    Common tokens: 
    - ETH: native
    - WETH: 0xfFf9976782d46CC05630D1f6eBAb18b2324d6B14
    - USDC: 0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238
    """
    from app.services.uniswap_service import uniswap_service
    try:
        clean_amount = str(amount).replace("ETH", "").replace("USDC", "").strip()
        amount_float = float(clean_amount)
        
        # Get Quote
        quote = uniswap_service.get_quote(token_in, token_out, amount_float)
        
        return f"TRANSACTION_PROPOSAL: {{\"type\": \"swap\", \"tokenIn\": \"{token_in}\", \"tokenOut\": \"{token_out}\", \"amountIn\": \"{amount_float}\", \"amountOutMin\": \"{quote['estimated_amount_out']}\"}}"
    except Exception as e:
        return f"Error preparing swap: {str(e)}"

@tool
def lend_asset(asset_name: str, amount: str) -> str:
    """Prepare a transaction to lend/supply an asset to Aave V3.
    Use this when the user wants to lend, supply, or deposit assets for interest.
    Common tokens:
    - USDC: 0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238
    - DAI: 0x... (Check Sepolia addresses if needed)
    """
    # Map common names to Sepolia addresses if needed, or rely on Agent's knowledge/inputs
    # For MVP, let's assume USDC is the main demo asset
    token_address = "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238" 
    
    if asset_name.upper() == "USDC":
        token_address = "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238"
    else:
        # Fallback or error, but let's just default to USDC for the demo script
        token_address = "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238"

    try:
        clean_amount = str(amount).replace("USDC", "").strip()
        amount_float = float(clean_amount)
        
        return f"TRANSACTION_PROPOSAL: {{\"type\": \"supply\", \"token\": \"{asset_name}\", \"tokenAddress\": \"{token_address}\", \"amount\": \"{amount_float}\"}}"
    except Exception as e:
        return f"Error preparing supply: {str(e)}"

tools = [get_wallet_balance, prepare_eth_transfer, swap_tokens, lend_asset]

# Create Agent
# Removing modifier args to ensure compatibility with installed langgraph version
agent_executor = create_react_agent(llm, tools)

class AgentService:
    async def process_command(self, user_input: str):
        # Manually prepend the system prompt
        messages = [
            SystemMessage(content="You are ChainSpeak, an AI assistant for blockchain interaction. \n\nCAPABILITIES:\n1. Check balances using `get_wallet_balance`.\n2. Prepare ETH transactions using `prepare_eth_transfer`.\n3. Swap tokens using `swap_tokens`.\n4. Lend/Supply assets using `lend_asset`.\n\nRULES:\n- If the user asks to send, transfer, or move ETH, you MUST use the `prepare_eth_transfer` tool.\n- If the user asks to swap, trade, or exchange tokens, you MUST use `swap_tokens`.\n- If the user asks to lend, supply, or deposit assets, you MUST use `lend_asset`.\n- Do NOT just answer with text if the user wants to transact. Invoke the tool.\n- Always be concise."),
            ("user", user_input)
        ]
        response = await agent_executor.ainvoke({"messages": messages})
        return response["messages"][-1].content

agent_service = AgentService()

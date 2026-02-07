from web3 import Web3
from app.core.config import settings
from app.services.wallet_service import wallet_service
import json
import os

UNISWAP_V3_ROUTER_ADDRESS = "0x3bFA4769FB09eefC5a80d6E87c3B9C650f7Ae48E"
WETH_ADDRESS = "0xfFf9976782d46CC05630D1f6eBAb18b2324d6B14" # Sepolia WETH
USDC_ADDRESS = "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238" # Sepolia USDC

class UniswapService:
    def __init__(self):
        self.web3 = wallet_service.web3
        self.router_address = UNISWAP_V3_ROUTER_ADDRESS
        self._load_abi()

    def _load_abi(self):
        abi_path = os.path.join(os.path.dirname(__file__), "../abi/UniswapV3Router.json")
        with open(abi_path, "r") as f:
            self.router_abi = json.load(f)
        self.router_contract = self.web3.eth.contract(address=self.router_address, abi=self.router_abi)

        erc20_abi_path = os.path.join(os.path.dirname(__file__), "../abi/ERC20.json")
        with open(erc20_abi_path, "r") as f:
            self.erc20_abi = json.load(f)

    def get_token_contract(self, token_address):
        return self.web3.eth.contract(address=token_address, abi=self.erc20_abi)

    def get_quote(self, token_in: str, token_out: str, amount_in: float, fee: int = 3000) -> dict:
        """
        Get a quote for swapping token_in for token_out.
        For V3, exact output quoting is complex without the Quoter contract. 
        For this MVP, we will simulate a quote or use a simplistic estimation if Quoter is not available.
        """
        # TODO: Implement proper Quoter contract interaction for accurate quotes.
        # For now, simplistic mock or rough estimation.
        # Returning a mock structure for the frontend to consume.
        return {
            "token_in": token_in,
            "token_out": token_out,
            "amount_in": amount_in,
            "estimated_amount_out": amount_in * 1800 if token_in == WETH_ADDRESS else amount_in / 1800, # Mock price
            "fee_tier": fee
        }

    def build_swap_transaction(self, wallet_address: str, token_in: str, token_out: str, amount_in_wei: int, amount_out_min: int, fee: int = 3000):
        """
        Builds the Uniswap V3 exactInputSingle transaction data.
        """
        params = (
            token_in,
            token_out,
            fee,
            wallet_address, # recipient
            amount_in_wei,
            amount_out_min,
            0 # sqrtPriceLimitX96
        )

        txn = self.router_contract.functions.exactInputSingle(params).build_transaction({
            'from': wallet_address,
            'gas': 200000,
            'gasPrice': self.web3.eth.gas_price,
            'nonce': self.web3.eth.get_transaction_count(wallet_address),
        })
        return txn

uniswap_service = UniswapService()

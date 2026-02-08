from web3 import Web3
from app.services.wallet_service import wallet_service
import json
import os

# Sepolia Proxy for Lido
LIDO_PROXY_ADDRESS = "0x3e3FE7dBc6B4C189E7128855dD526361c49b40Af"

class LidoService:
    def __init__(self):
        self.web3 = wallet_service.web3
        self.contract_address = LIDO_PROXY_ADDRESS
        self._load_abi()

    def _load_abi(self):
        abi_path = os.path.join(os.path.dirname(__file__), "../abi/Lido.json")
        with open(abi_path, "r") as f:
            self.abi = json.load(f)
        self.contract = self.web3.eth.contract(address=self.contract_address, abi=self.abi)

    def build_stake_transaction(self, wallet_address: str, amount_wei: int, referral_address: str = "0x0000000000000000000000000000000000000000"):
        """
        Builds the Lido stake (submit) transaction.
        """
        tx = self.contract.functions.submit(referral_address).build_transaction({
            'from': wallet_address,
            'value': amount_wei,
            'gas': 200000,
            'gasPrice': self.web3.eth.gas_price,
            'nonce': self.web3.eth.get_transaction_count(wallet_address),
            'chainId': 11155111 # Sepolia
        })
        return tx

lido_service = LidoService()

from web3 import Web3
from app.core.config import settings
from app.services.wallet_service import wallet_service
import json
import os

POOL_ADDRESSES_PROVIDER_ADDRESS = "0x012bAC54348C0E635dCAc9D5FB99f06F24136C9A" # Sepolia

class AaveService:
    def __init__(self):
        self.web3 = wallet_service.web3
        self.pap_address = POOL_ADDRESSES_PROVIDER_ADDRESS
        self._load_abis()

    def _load_abis(self):
        pap_abi_path = os.path.join(os.path.dirname(__file__), "../abi/PoolAddressesProvider.json")
        with open(pap_abi_path, "r") as f:
            self.pap_abi = json.load(f)
        
        self.pap_contract = self.web3.eth.contract(address=self.pap_address, abi=self.pap_abi)

        pool_abi_path = os.path.join(os.path.dirname(__file__), "../abi/Pool.json")
        with open(pool_abi_path, "r") as f:
            self.pool_abi = json.load(f)

    def get_pool_address(self) -> str:
        return self.pap_contract.functions.getPool().call()

    def get_pool_contract(self):
        pool_address = self.get_pool_address()
        return self.web3.eth.contract(address=pool_address, abi=self.pool_abi)

    def build_supply_transaction(self, wallet_address: str, asset: str, amount_wei: int, referral_code: int = 0):
        """
        Builds the Aave V3 supply transaction data.
        """
        pool_contract = self.get_pool_contract()
        
        tx = pool_contract.functions.supply(
            asset,
            amount_wei,
            wallet_address, # onBehalfOf
            referral_code
        ).build_transaction({
            'from': wallet_address,
            'gas': 300000, # Supply interacts with pool logic, giving some buffer
            'gasPrice': self.web3.eth.gas_price,
            'nonce': self.web3.eth.get_transaction_count(wallet_address),
            'chainId': 11155111
        })
        return tx

aave_service = AaveService()

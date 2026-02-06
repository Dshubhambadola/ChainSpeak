from eth_account import Account
from app.core.config import settings
from app.services.web3_service import web3_service
import json

class WalletService:
    def create_wallet(self, password: str):
        # Create a new account
        account = Account.create()
        
        # Encrypt the private key
        encrypted_key = account.encrypt(password)
        
        return {
            "address": account.address,
            "private_key": account.key.hex(), # BE CAREFUL: In production, never return this directly!
            "encrypted_key": json.dumps(encrypted_key)
        }

    def import_wallet(self, private_key: str, password: str):
        account = Account.from_key(private_key)
        encrypted_key = account.encrypt(password)
        
        return {
            "address": account.address,
            "encrypted_key": json.dumps(encrypted_key)
        }

    def get_balance(self, address: str):
        if not web3_service.is_connected():
            raise Exception("Web3 not connected")
        
        # Get balance in Wei
        balance_wei = web3_service.w3.eth.get_balance(address)
        
        # Convert to Ether
        balance_eth = web3_service.w3.from_wei(balance_wei, 'ether')
        
        return {
            "address": address,
            "balance_wei": balance_wei,
            "balance_eth": str(balance_eth)
        }

wallet_service = WalletService()

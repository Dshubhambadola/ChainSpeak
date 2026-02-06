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

    def transfer_eth(self, encrypted_key: str, password: str, to_address: str, amount_eth: float):
        if not web3_service.is_connected():
            raise Exception("Web3 not connected")
        
        # Decrypt private key
        # Note: encrypted_key string needs to be parsed to JSON if it was dumped, 
        # but eth_account.decrypt usually expects the dict/json object. 
        # Our create/import returns json.dumps string.
        key_data = json.loads(encrypted_key)
        private_key = Account.decrypt(key_data, password)
        
        account = Account.from_key(private_key)
        nonce = web3_service.w3.eth.get_transaction_count(account.address)
        
        # Build transaction
        tx = {
            'nonce': nonce,
            'to': to_address,
            'value': web3_service.w3.to_wei(amount_eth, 'ether'),
            'gas': 21000,
            'gasPrice': web3_service.w3.eth.gas_price,
            'chainId': web3_service.w3.eth.chain_id
        }
        
        # Sign transaction
        signed_tx = web3_service.w3.eth.account.sign_transaction(tx, private_key)
        
        # Send transaction
        tx_hash = web3_service.w3.eth.send_raw_transaction(signed_tx.rawTransaction)
        
        return {
            "tx_hash": web3_service.w3.to_hex(tx_hash),
            "from": account.address,
            "to": to_address,
            "amount": amount_eth
        }

wallet_service = WalletService()

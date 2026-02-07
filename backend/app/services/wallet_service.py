from eth_account import Account
from app.core.config import settings
from app.services.web3_service import web3_service
import os
import json

class WalletService:
    def __init__(self):
        self.web3 = web3_service.w3
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
        
        # Build transaction
        tx = {
            'nonce': self.web3.eth.get_transaction_count(account.address),
            'to': to_address,
            'value': self.web3.to_wei(amount_eth, 'ether'),
            'gas': 21000,
            'gasPrice': self.web3.eth.gas_price,
            'chainId': 11155111 # Sepolia
        }
        
        # Sign transaction
        signed_tx = self.web3.eth.account.sign_transaction(tx, private_key)
        
        # Send transaction
        tx_hash = self.web3.eth.send_raw_transaction(signed_tx.rawTransaction)
        
        return {
            "tx_hash": self.web3.to_hex(tx_hash),
            "from": account.address,
            "to": to_address,
            "amount": amount_eth
        }

    def approve_token(self, encrypted_key: str, password: str, token_address: str, spender_address: str, amount_wei: int):
        if not web3_service.is_connected():
            raise Exception("Web3 not connected")

        key_data = json.loads(encrypted_key)
        private_key = Account.decrypt(key_data, password)
        account = Account.from_key(private_key)
        
        # Load simplistic ERC20 ABI (just approve function needed technically, but better to load full if avail)
        # Using a minimal ABI here to avoid circular dependency or file read issues inside WalletService if possible, 
        # but loading from file is cleaner if we standardized ABI handling. 
        # For valid implementation, let's load the ABI file we created.
        abi_path = os.path.join(os.path.dirname(__file__), "../abi/ERC20.json")
        with open(abi_path, "r") as f:
            erc20_abi = json.load(f)

        token_contract = self.web3.eth.contract(address=token_address, abi=erc20_abi)
        
        tx = token_contract.functions.approve(spender_address, amount_wei).build_transaction({
            'from': account.address,
            'gas': 60000, # Approval is cheaper than transfer usually
            'gasPrice': self.web3.eth.gas_price,
            'nonce': self.web3.eth.get_transaction_count(account.address),
            'chainId': 11155111
        })
        
        signed_tx = self.web3.eth.account.sign_transaction(tx, private_key)
        tx_hash = self.web3.eth.send_raw_transaction(signed_tx.rawTransaction)
        
        return {"tx_hash": self.web3.to_hex(tx_hash)}

wallet_service = WalletService()

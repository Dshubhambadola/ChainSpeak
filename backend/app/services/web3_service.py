from web3 import Web3
from app.core.config import settings

class Web3Service:
    def __init__(self):
        self.w3 = Web3(Web3.HTTPProvider(settings.SEPOLIA_RPC_URL))

    def is_connected(self) -> bool:
        return self.w3.is_connected()

    def get_block_number(self) -> int:
        if self.is_connected():
            return self.w3.eth.block_number
        return 0

web3_service = Web3Service()

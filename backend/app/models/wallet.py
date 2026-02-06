from pydantic import BaseModel

class WalletBase(BaseModel):
    address: str

class WalletCreate(BaseModel):
    password: str

class WalletImport(BaseModel):
    private_key: str
    password: str

class WalletResponse(WalletBase):
    encrypted_key: str

class BalanceResponse(BaseModel):
    address: str
    balance_eth: str
    balance_wei: int

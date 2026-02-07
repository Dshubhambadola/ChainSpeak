from app.services.wallet_service import wallet_service
from app.services.aave_service import aave_service
from web3 import Web3

class PortfolioService:
    def __init__(self):
        self.web3 = wallet_service.web3

    def get_portfolio_summary(self, address: str):
        # 1. Get ETH Balance
        eth_balance_wei = self.web3.eth.get_balance(address)
        eth_balance = float(self.web3.from_wei(eth_balance_wei, 'ether'))

        # 2. Get Aave Data
        # Returns: (totalCollateralBase, totalDebtBase, availableBorrowsBase, currentLiquidationThreshold, ltv, healthFactor)
        # Base currency is usually USD (8 decimals) for Aave V3 mainnet, but let's assume it's normalized 
        # For Sepolia, Aave V3 base might be USD.
        try:
            user_data = aave_service.get_user_account_data(address)
            total_collateral_base = user_data[0]
            total_debt_base = user_data[1]
            health_factor_raw = user_data[5]
            
            # Aave reports base currency in 8 decimals (usually USD)
            total_collateral_usd = total_collateral_base / 10**8
            total_debt_usd = total_debt_base / 10**8
            
            health_factor = float(health_factor_raw) / 10**18
            if health_factor > 100: # Cap roughly
                health_factor = 100.0
        except Exception as e:
            print(f"Error fetching Aave data: {e}")
            total_collateral_usd = 0.0
            total_debt_usd = 0.0
            health_factor = 0.0

        # 3. Calculate Net Worth (Approximate in USD)
        # Assuming ETH price is mocked or roughly $2500 for calculation if needed, 
        # But for MVP let's return ETH balance and Aave USD values separately.
        # Ideally we'd fetch prices. For now, we will return the raw values and frontend can label them.
        
        return {
            "eth_balance": eth_balance,
            "total_collateral_usd": total_collateral_usd,
            "total_debt_usd": total_debt_usd,
            "net_worth_usd": (eth_balance * 2500) + (total_collateral_usd - total_debt_usd), # Mock ETH Price $2500
            "health_factor": health_factor
        }

portfolio_service = PortfolioService()

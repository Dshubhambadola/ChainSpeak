import React from 'react';

interface PortfolioData {
    eth_balance: number;
    total_collateral_usd: number;
    total_debt_usd: number;
    net_worth_usd: number;
    health_factor: number;
}

interface PortfolioSummaryProps {
    data: PortfolioData | null;
    isLoading: boolean;
}

const MetricCard = ({ label, value, subValue, icon, colorClass }: { label: string, value: string, subValue?: string, icon: string, colorClass: string }) => (
    <div className="bg-[#13141b] border border-white/5 rounded-xl p-4 flex items-center gap-4 relative overflow-hidden group">
        <div className={`absolute -right-4 -top-4 w-24 h-24 rounded-full ${colorClass} opacity-5 blur-2xl group-hover:opacity-10 transition-opacity`}></div>
        <div className={`w-12 h-12 rounded-full ${colorClass} bg-opacity-20 flex items-center justify-center shrink-0`}>
            <span className={`material-icons text-xl ${colorClass.replace('bg-', 'text-')}`}>{icon}</span>
        </div>
        <div>
            <p className="text-gray-400 text-xs font-medium uppercase tracking-wider">{label}</p>
            <p className="text-white text-xl font-bold mt-0.5">{value}</p>
            {subValue && <p className="text-gray-500 text-xs mt-0.5">{subValue}</p>}
        </div>
    </div>
);

export default function PortfolioSummary({ data, isLoading }: PortfolioSummaryProps) {
    if (isLoading) {
        return (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6 animate-pulse">
                {[...Array(4)].map((_, i) => (
                    <div key={i} className="h-24 bg-[#13141b] rounded-xl border border-white/5"></div>
                ))}
            </div>
        );
    }

    if (!data) return null;

    const formatCurrency = (val: number) =>
        new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val);

    const formatEth = (val: number) =>
        `${val.toFixed(4)} ETH`;

    // Determine Health Factor Color
    let hfColor = "text-green-500";
    if (data.health_factor < 1.5) hfColor = "text-red-500";
    else if (data.health_factor < 2.5) hfColor = "text-yellow-500";

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 animate-in fade-in slide-in-from-top-4 duration-500">
            <MetricCard
                label="Net Worth (Est)"
                value={formatCurrency(data.net_worth_usd)}
                subValue="Combined Assets"
                icon="account_balance_wallet"
                colorClass="bg-indigo-500"
            />
            <MetricCard
                label="Wallet Balance"
                value={formatEth(data.eth_balance)}
                subValue={`~${formatCurrency(data.eth_balance * 2500)}`}
                icon="account_balance"
                colorClass="bg-blue-500"
            />
            <MetricCard
                label="Aave Collateral"
                value={formatCurrency(data.total_collateral_usd)}
                subValue={`Debt: ${formatCurrency(data.total_debt_usd)}`}
                icon="savings"
                colorClass="bg-purple-500"
            />
            <MetricCard
                label="Health Factor"
                value={data.health_factor > 99 ? "∞" : data.health_factor.toFixed(2)}
                subValue={data.health_factor < 1.1 ? "Liquidation Risk!" : "Safe"}
                icon="health_and_safety"
                colorClass={data.health_factor < 1.5 ? "bg-red-500 shadow-red-500/20" : "bg-emerald-500"}
            />
        </div>
    );
}

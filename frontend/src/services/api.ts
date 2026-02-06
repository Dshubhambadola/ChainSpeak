const API_BASE_URL = "http://localhost:8000/api";

export async function sendMessageToAI(message: string): Promise<string> {
    try {
        const response = await fetch(`${API_BASE_URL}/chat/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ message }),
        });

        if (!response.ok) {
            throw new Error(`API Error: ${response.statusText}`);
        }

        const data = await response.json();
        return data.response;
    } catch (error) {
        console.error("Failed to send message:", error);
        throw error;
    }
}

export async function createWallet(password: string) {
    const response = await fetch(`${API_BASE_URL}/wallet/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
    });
    if (!response.ok) throw new Error("Failed to create wallet");
    return response.json();
}

export async function importWallet(private_key: string, password: string) {
    const response = await fetch(`${API_BASE_URL}/wallet/import`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ private_key, password }),
    });
    if (!response.ok) throw new Error("Failed to import wallet");
    return response.json();
}

export async function getWalletBalance(address: string) {
    const response = await fetch(`${API_BASE_URL}/wallet/balance/${address}`);
    if (!response.ok) throw new Error("Failed to fetch balance");
    return response.json();
}

export async function transferEth(encrypted_key: string, password: string, to_address: string, amount: string) {
    const response = await fetch(`${API_BASE_URL}/wallet/transfer`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            encrypted_key,
            password,
            to_address,
            amount: parseFloat(amount)
        }),
    });
    if (!response.ok) {
        const err = await response.json();
        throw new Error(err.detail || "Failed to transfer ETH");
    }
    return response.json();
}

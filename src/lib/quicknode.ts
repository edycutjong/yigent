export class QuicknodeClient {
  private rpcUrl: string;

  constructor() {
    this.rpcUrl = process.env.NEXT_PUBLIC_QUICKNODE_RPC || "https://api.mainnet-beta.solana.com";
  }

  async getLatestBlockhash(): Promise<string> {
    try {
      const response = await fetch(this.rpcUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jsonrpc: "2.0",
          id: 1,
          method: "getLatestBlockhash",
          params: [{ commitment: "processed" }]
        })
      });
      const data = await response.json();
      return data.result.value.blockhash;
    } catch (e) {
      console.warn("[Quicknode] RPC unreachable, using mock blockhash");
      return "mock_blockhash_123456789";
    }
  }
}

export class BirdeyeClient {
  private apiKey: string;

  constructor() {
    this.apiKey = process.env.BIRDEYE_API_KEY || "";
  }

  async getPrice(tokenAddress: string): Promise<number> {
    if (!this.apiKey) {
      console.warn("[Birdeye] No API key, using simulated price for", tokenAddress);
      await new Promise(res => setTimeout(res, 142)); // Simulating latency
      return tokenAddress === 'SOL' ? 184.22 : 1.0;
    }
    
    try {
      const response = await fetch(`https://public-api.birdeye.so/public/price?address=${tokenAddress}`, {
        headers: { "X-API-KEY": this.apiKey }
      });
      const data = await response.json();
      return data.data.value;
    } catch {
      console.warn("[Birdeye] API fetch failed, simulating price");
      return 184.22;
    }
  }
}

export class EitherwayService {
  private apiUrl: string;
  private initialized = false;

  constructor() {
    this.apiUrl = process.env.NEXT_PUBLIC_EITHERWAY_API_URL || "http://localhost:3001/api";
  }

  init() {
    if (this.initialized) return;
    console.log("[Eitherway SDK] Initializing Intent Engine");
    this.initialized = true;
  }

  async parseIntent(intent: string): Promise<{ action: string, input: string, target: string, strategy: string, plan: string }> {
    this.init();
    console.log(`[Eitherway SDK] Analyzing intent: ${intent}`);
    
    try {
      const response = await fetch(`${this.apiUrl}/parse`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ intent })
      });
      if (!response.ok) throw new Error("Backend offline");
      return await response.json();
    } catch (e) {
      console.warn("[Eitherway SDK] Node backend unreachable, falling back to local simulation");
      // Simulate AI parsing and pathfinding
      await new Promise(res => setTimeout(res, 800));
      
      return {
        action: "SWAP_AND_STAKE",
        input: "50 USDC",
        target: "SOL",
        strategy: "Lowest Risk Yield",
        plan: `> Analyzing intent...\n> Identified action: SWAP_AND_STAKE\n> Input: 50 USDC\n> Target Asset: SOL\n> Target Strategy: Lowest Risk Yield`
      };
    }
  }
}

export const eitherwayService = new EitherwayService();

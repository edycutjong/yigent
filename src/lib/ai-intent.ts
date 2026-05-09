export class AIIntentParser {
  private apiKey: string;

  constructor() {
    this.apiKey = process.env.OPENAI_API_KEY || "";
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async parse(_intent: string): Promise<{ action: string, input: string, target: string, strategy: string, plan: string }> {
    if (!this.apiKey) {
      console.warn("[AI Intent] No OpenAI API key, using simulated parse");
      await new Promise(res => setTimeout(res, 800));
      return {
        action: "SWAP_AND_STAKE",
        input: "50 USDC",
        target: "SOL",
        strategy: "Lowest Risk Yield",
        plan: `> Analyzing intent...\n> Identified action: SWAP_AND_STAKE\n> Input: 50 USDC\n> Target Asset: SOL\n> Target Strategy: Lowest Risk Yield`
      };
    }
    
    // In a real scenario, this would call OpenAI API to parse the natural language intent.
    // For now, we simulate success since we're just making sure the architecture is in place.
    return {
      action: "SWAP_AND_STAKE",
      input: "50 USDC",
      target: "SOL",
      strategy: "Lowest Risk Yield",
      plan: `> Analyzing intent...\n> Identified action: SWAP_AND_STAKE\n> Input: 50 USDC\n> Target Asset: SOL\n> Target Strategy: Lowest Risk Yield`
    };
  }
}

import { AIIntentParser } from './ai-intent';
import { QuicknodeClient } from './quicknode';
import { BirdeyeClient } from './birdeye';
import { DFlowClient } from './dflow';
import { KaminoClient } from './kamino';

export class EitherwayService {
  private aiParser: AIIntentParser;
  private quicknode: QuicknodeClient;
  private birdeye: BirdeyeClient;
  private dflow: DFlowClient;
  private kamino: KaminoClient;
  private initialized = false;

  constructor() {
    this.aiParser = new AIIntentParser();
    this.quicknode = new QuicknodeClient();
    this.birdeye = new BirdeyeClient();
    this.dflow = new DFlowClient();
    this.kamino = new KaminoClient();
  }

  init() {
    if (this.initialized) return;
    console.log("[Eitherway SDK] Initializing Intent Engine & Partner SDKs");
    this.initialized = true;
  }

  async parseIntent(intent: string) {
    this.init();
    console.log(`[Eitherway SDK] Analyzing intent: ${intent}`);
    return await this.aiParser.parse(intent);
  }
  
  async getQuicknodeBlockhash() {
    return await this.quicknode.getLatestBlockhash();
  }

  async getBirdeyePrice(token: string) {
    return await this.birdeye.getPrice(token);
  }

  async getDFlowRoute(amount: number, inToken: string, outToken: string) {
    return await this.dflow.getOptimalRoute(amount, inToken, outToken);
  }

  async getKaminoVault(asset: string) {
    return await this.kamino.getHighestApyVault(asset);
  }
}

export const eitherwayService = new EitherwayService();

import { describe, it, expect } from 'vitest';
import { GET } from './route';

describe('Health API', () => {
  it('should return 200 OK', async () => {
    const response = await GET();
    const data = await response.json();
    
    expect(response.status).toBe(200);
    expect(data).toEqual({ 
      status: 'ok', 
      timestamp: expect.any(String),
      uptime: expect.any(Number),
      environment: expect.any(String)
    });
  });
});

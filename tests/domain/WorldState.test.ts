// tests/domain/WorldState.test.ts
import { describe, expect, it } from 'vitest';
import { WorldState } from '../../src/lib/domain/world/WorldState';

describe('WorldState', () => {
  it('starts idle', () => {
    const state = new WorldState();

    expect(state.status).toBe('idle');
    expect(state.frameCount).toBe(0);
  });

  it('counts frames only while running', () => {
    const state = new WorldState();

    state.tick();
    expect(state.frameCount).toBe(0);

    state.start();
    state.tick();
    state.tick();

    expect(state.frameCount).toBe(2);
  });

  it('cannot restart after disposal', () => {
    const state = new WorldState();

    state.start();
    state.dispose();

    expect(() => state.start()).toThrow('WorldState cannot be restarted after disposal.');
  });
});

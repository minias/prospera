// src/lib/domain/world/WorldState.ts

export type WorldStatus = 'idle' | 'running' | 'disposed';

export class WorldState {
  private _status: WorldStatus = 'idle';
  private _frameCount = 0;

  get status(): WorldStatus {
    return this._status;
  }

  get frameCount(): number {
    return this._frameCount;
  }

  start(): void {
    if (this._status === 'disposed') {
      throw new Error('WorldState cannot be restarted after disposal.');
    }

    this._status = 'running';
  }

  tick(): void {
    if (this._status === 'running') {
      this._frameCount += 1;
    }
  }

  dispose(): void {
    this._status = 'disposed';
  }
}

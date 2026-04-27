// Ambulance Simulator - Simulates ambulance movement along route

export interface AmbulanceState {
  isRunning: boolean;
  currentPosition: { lat: number; lng: number };
  progress: number; // 0-100
  eta: number; // seconds remaining
  speed: number; // km/h
}

export class AmbulanceSimulator {
  private route: Array<{ lat: number; lng: number }>;
  private totalDistance: number;
  private totalTime: number;
  private startTime: number = 0;
  private isRunning: boolean = false;
  private speed: number = 50; // km/h

  constructor(route: Array<{ lat: number; lng: number }>, totalDistance: number, totalTime: number) {
    this.route = route;
    this.totalDistance = totalDistance;
    this.totalTime = totalTime;
  }

  start(): void {
    this.startTime = Date.now();
    this.isRunning = true;
  }

  stop(): void {
    this.isRunning = false;
  }

  getPosition(): { lat: number; lng: number } {
    if (!this.isRunning || this.route.length < 2) {
      return this.route[0];
    }

    const elapsed = (Date.now() - this.startTime) / 1000; // in seconds
    const progress = Math.min(elapsed / this.totalTime, 1); // 0-1

    if (progress >= 1) {
      this.isRunning = false;
      return this.route[this.route.length - 1];
    }

    // Find current segment
    const distanceTraveled = this.totalDistance * progress;
    let currentDistance = 0;

    for (let i = 0; i < this.route.length - 1; i++) {
      const p1 = this.route[i];
      const p2 = this.route[i + 1];
      const segmentDistance = this.calculateDistance(p1, p2);

      if (currentDistance + segmentDistance >= distanceTraveled) {
        // Interpolate within this segment
        const segmentProgress = (distanceTraveled - currentDistance) / segmentDistance;
        return {
          lat: p1.lat + (p2.lat - p1.lat) * segmentProgress,
          lng: p1.lng + (p2.lng - p1.lng) * segmentProgress,
        };
      }

      currentDistance += segmentDistance;
    }

    return this.route[this.route.length - 1];
  }

  getProgress(): number {
    if (!this.isRunning) return 0;
    const elapsed = (Date.now() - this.startTime) / 1000;
    return Math.min((elapsed / this.totalTime) * 100, 100);
  }

  getETA(): number {
    if (!this.isRunning) return 0;
    const elapsed = (Date.now() - this.startTime) / 1000;
    return Math.max(this.totalTime - elapsed, 0);
  }

  isComplete(): boolean {
    return !this.isRunning && this.getProgress() >= 100;
  }

  private calculateDistance(p1: { lat: number; lng: number }, p2: { lat: number; lng: number }): number {
    const dLat = p2.lat - p1.lat;
    const dLng = p2.lng - p1.lng;
    return Math.sqrt(dLat * dLat + dLng * dLng) * 111; // Convert to km
  }

  getState(): AmbulanceState {
    return {
      isRunning: this.isRunning,
      currentPosition: this.getPosition(),
      progress: this.getProgress(),
      eta: this.getETA(),
      speed: this.speed,
    };
  }
}

// A* Pathfinding Service - Optimal route calculation

export interface Node {
  lat: number;
  lng: number;
  gCost: number; // Cost from start
  hCost: number; // Heuristic cost to goal
  fCost: number; // g + h
  parent?: Node;
}

// Euclidean distance heuristic
const heuristic = (current: { lat: number; lng: number }, goal: { lat: number; lng: number }): number => {
  const dLat = goal.lat - current.lat;
  const dLng = goal.lng - current.lng;
  return Math.sqrt(dLat * dLat + dLng * dLng) * 111; // Convert to km (1 degree ≈ 111 km)
};

// Calculate distance between two points
const distance = (p1: { lat: number; lng: number }, p2: { lat: number; lng: number }): number => {
  const dLat = p2.lat - p1.lat;
  const dLng = p2.lng - p1.lng;
  return Math.sqrt(dLat * dLat + dLng * dLng) * 111; // Convert to km
};

// A* algorithm to find optimal route
export const calculateRoute = (
  start: { lat: number; lng: number },
  end: { lat: number; lng: number }
): { path: Array<{ lat: number; lng: number }>; distance: number; eta: number } => {
  const openSet: Node[] = [];
  const closedSet: Node[] = [];

  const startNode: Node = {
    lat: start.lat,
    lng: start.lng,
    gCost: 0,
    hCost: heuristic(start, end),
    fCost: heuristic(start, end),
  };

  openSet.push(startNode);

  let iterations = 0;
  const maxIterations = 1000;

  while (openSet.length > 0 && iterations < maxIterations) {
    iterations++;

    // Find node with lowest f-cost
    let lowestIndex = 0;
    for (let i = 1; i < openSet.length; i++) {
      if (openSet[i].fCost < openSet[lowestIndex].fCost) {
        lowestIndex = i;
      }
    }

    const current = openSet[lowestIndex];

    // Check if we reached the goal
    if (distance(current, end) < 0.1) {
      // Reconstruct path
      const path: Array<{ lat: number; lng: number }> = [];
      let node: Node | undefined = current;
      while (node) {
        path.unshift({ lat: node.lat, lng: node.lng });
        node = node.parent;
      }
      path.push(end);

      // Calculate total distance
      let totalDistance = 0;
      for (let i = 0; i < path.length - 1; i++) {
        totalDistance += distance(path[i], path[i + 1]);
      }

      // Calculate ETA (assuming average speed of 40 km/h in city)
      const eta = Math.round((totalDistance / 40) * 60); // in seconds

      return { path, distance: totalDistance, eta };
    }

    openSet.splice(lowestIndex, 1);
    closedSet.push(current);

    // Generate neighbors (simplified: direct line to goal with intermediate points)
    const neighbors: Node[] = [];

    // Create intermediate waypoints
    const steps = 5;
    for (let i = 1; i <= steps; i++) {
      const ratio = i / steps;
      const neighborLat = current.lat + (end.lat - current.lat) * ratio;
      const neighborLng = current.lng + (end.lng - current.lng) * ratio;

      const gCost = current.gCost + distance(current, { lat: neighborLat, lng: neighborLng });
      const hCost = heuristic({ lat: neighborLat, lng: neighborLng }, end);
      const fCost = gCost + hCost;

      neighbors.push({
        lat: neighborLat,
        lng: neighborLng,
        gCost,
        hCost,
        fCost,
        parent: current,
      });
    }

    // Process neighbors
    for (const neighbor of neighbors) {
      // Check if in closed set
      if (closedSet.some(n => distance(n, neighbor) < 0.01)) {
        continue;
      }

      // Check if in open set
      const existingNode = openSet.find(n => distance(n, neighbor) < 0.01);
      if (existingNode && neighbor.gCost >= existingNode.gCost) {
        continue;
      }

      if (existingNode) {
        openSet.splice(openSet.indexOf(existingNode), 1);
      }

      openSet.push(neighbor);
    }
  }

  // Fallback: direct line if A* doesn't converge
  const directDistance = distance(start, end);
  const directEta = Math.round((directDistance / 40) * 60);

  return {
    path: [start, end],
    distance: directDistance,
    eta: directEta,
  };
};

// Calculate ETA based on distance and traffic factor
export const calculateETA = (distanceKm: number, trafficFactor: number = 1.0): number => {
  const averageSpeed = 40; // km/h in city
  const adjustedDistance = distanceKm * trafficFactor;
  return Math.round((adjustedDistance / averageSpeed) * 60); // in seconds
};

// Format ETA to readable string
export const formatETA = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  if (minutes === 0) return `${secs}s`;
  return `${minutes}m ${secs}s`;
};

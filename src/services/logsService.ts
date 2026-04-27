// Operational Logs Service - Manages emergency event logging

export interface OperationalLog {
  timestamp: Date;
  event: string;
  details?: string;
  icon?: string;
  status: 'pending' | 'completed' | 'active';
}

export class LogsService {
  private logs: OperationalLog[] = [];

  addLog(event: string, details?: string, icon?: string, status: 'pending' | 'completed' | 'active' = 'completed'): void {
    this.logs.push({
      timestamp: new Date(),
      event,
      details,
      icon,
      status,
    });
  }

  getLogs(): OperationalLog[] {
    return [...this.logs].sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
  }

  getLatestLogs(count: number = 10): OperationalLog[] {
    return this.getLogs().slice(-count);
  }

  clearLogs(): void {
    this.logs = [];
  }

  formatLog(log: OperationalLog): string {
    const time = log.timestamp.toLocaleTimeString();
    return `[${time}] ${log.event}${log.details ? ` - ${log.details}` : ''}`;
  }

  getAllFormattedLogs(): string[] {
    return this.getLogs().map(log => this.formatLog(log));
  }
}

// Create singleton instance
export const logsService = new LogsService();

// Helper functions
export const addLog = (event: string, details?: string, icon?: string): void => {
  logsService.addLog(event, details, icon);
};

export const getLogs = (): OperationalLog[] => {
  return logsService.getLogs();
};

export const clearLogs = (): void => {
  logsService.clearLogs();
};

export const formatLogs = (): string[] => {
  return logsService.getAllFormattedLogs();
};

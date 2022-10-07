export interface INotification {
  id: string;
  action: string;
  body: { [k: string]: string };
  data: { logId?: string; route?: string };
  isUrgent?: boolean; // if urgent, sends notification to all devices and if not opened in time (timeToLive) sms will be sent
  priority?: "high";
  restrictedPackageName: string;
  timeToLive?: number; // notification lifespan in seconds, max 2419200
  title: { [k: string]: string };
}

export interface INotificationLog {
  id: string;
  caller: string;
  status: "DONE" | "SENDING";
  tag: string;
  date: Date;
  data: { [key: string]: string } | null;
  userId: string;
  isOpened: boolean;
  isUrgent: boolean;
  message: string;
  stack: any;

  groupedClientOrderIds?: string[];
}

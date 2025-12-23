
export enum StreamStatus {
  ONLINE = 'ONLINE',
  OFFLINE = 'OFFLINE',
  SCHEDULED = 'SCHEDULED',
  ERROR = 'ERROR'
}

export interface VideoFile {
  id: string;
  name: string;
  duration: string;
  size: string;
  path: string;
  thumbnail: string;
  uploadedAt: string;
}

export interface FfmpegScript {
  id: string;
  title: string;
  videoId: string;
  videoName: string;
  streamKey: string;
  loopCount: number;
  resolution: string;
  bitrate: string;
  fps: number;
  audioCodec: string;
  createdAt: string;
}

export interface ScheduledStream {
  id: string;
  name: string;
  scriptId: string;
  scriptTitle: string;
  scheduledTime: string;
  platform: 'YouTube' | 'Custom';
  status: StreamStatus;
  pid?: number;
  uptime?: string;
}

export interface StreamHistory {
  id: string;
  name: string;
  platform: string;
  startTime: string;
  stopTime: string;
  duration: string;
  status: StreamStatus;
}

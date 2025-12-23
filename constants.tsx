
import React from 'react';
import { 
  LayoutDashboard, 
  Image as GalleryIcon, 
  Terminal, 
  ListMusic, 
  CalendarClock, 
  History, 
  FileText,
  User,
  BookOpen
} from 'lucide-react';
import { FfmpegScript, ScheduledStream, StreamHistory, StreamStatus } from './types';

export const NAV_ITEMS = [
  { label: 'Overview', icon: <LayoutDashboard size={20} />, path: '/overview' },
  { label: 'Gallery', icon: <GalleryIcon size={20} />, path: '/gallery' },
  { label: 'Script Maker', icon: <Terminal size={20} />, path: '/script-maker' },
  { label: 'Playlist Manager', icon: <ListMusic size={20} />, path: '/playlist' },
  { label: 'Action Schedule', icon: <CalendarClock size={20} />, path: '/schedule' },
  { label: 'History Stream', icon: <History size={20} />, path: '/history' },
  { label: 'Logs', icon: <FileText size={20} />, path: '/logs' },
  { label: 'Profile', icon: <User size={20} />, path: '/profile' },
  { label: 'Installation Guide', icon: <BookOpen size={20} />, path: '/guide' },
];

export const MOCK_VIDEOS = [
  { id: '1', name: 'Nature Relax 4K.mp4', duration: '00:15:30', size: '1.2 GB', thumbnail: 'https://picsum.photos/seed/nature/300/200', uploadedAt: '2023-10-15' },
  { id: '2', name: 'Lofi Girl Loop.mp4', duration: '04:00:00', size: '4.5 GB', thumbnail: 'https://picsum.photos/seed/lofi/300/200', uploadedAt: '2023-11-01' },
  { id: '3', name: 'Product Promo.mov', duration: '00:01:00', size: '150 MB', thumbnail: 'https://picsum.photos/seed/promo/300/200', uploadedAt: '2023-12-05' },
];

export const MOCK_SCRIPTS: FfmpegScript[] = [
  { 
    id: 's1', 
    title: 'YouTube 24/7 Nature', 
    videoId: '1', 
    videoName: 'Nature Relax 4K.mp4',
    streamKey: 'xxxx-yyyy-zzzz', 
    loopCount: -1, 
    resolution: '1080p', 
    bitrate: '6000k', 
    fps: 30, 
    audioCodec: 'aac', 
    createdAt: '2023-12-20' 
  },
  { 
    id: 's2', 
    title: 'Lofi Music Background', 
    videoId: '2', 
    videoName: 'Lofi Girl Loop.mp4',
    streamKey: 'aaaa-bbbb-cccc', 
    loopCount: -1, 
    resolution: '720p', 
    bitrate: '3500k', 
    fps: 30, 
    audioCodec: 'aac', 
    createdAt: '2023-12-22' 
  }
];

export const MOCK_SCHEDULES: ScheduledStream[] = [
  { id: 'sc1', name: 'Project Nature Morning', scriptId: 's1', scriptTitle: 'YouTube 24/7 Nature', scheduledTime: '2023-12-25 08:00:00', platform: 'YouTube', status: StreamStatus.ONLINE, pid: 14205, uptime: '02:45:10' },
  { id: 'sc2', name: 'Flash Sale Promo', scriptId: 's2', scriptTitle: 'Lofi Music Background', scheduledTime: '2023-12-26 13:00:00', platform: 'Custom', status: StreamStatus.SCHEDULED },
];

export const MOCK_HISTORY: StreamHistory[] = [
  { id: 'h1', name: 'Gaming Night Event', platform: 'YouTube', startTime: '2023-12-20 18:00:00', stopTime: '2023-12-20 22:00:00', duration: '04:00:00', status: StreamStatus.OFFLINE },
  { id: 'h2', name: 'Product Launch Live', platform: 'YouTube', startTime: '2023-12-21 10:00:00', stopTime: '2023-12-21 11:30:00', duration: '01:30:00', status: StreamStatus.ERROR },
];

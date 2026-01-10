export type Vertical = 'Operations' | 'PR' | 'Design' | 'Tech' | 'Marketing' | 'Social Media' | 'Content';

export type TaskStatus = 'Allocated' | 'Working' | 'Completed' | 'Under Review' | 'Revision Required' | 'Overdue';

export type Priority = 'Low' | 'Medium' | 'High';

export interface Member {
  id: string;
  name: string;
  avatar: string;
  role: string;
  vertical: Vertical;
  lastSeen: string;
  lastSeenDate: Date;
  assignedTasks: number;
  rating: number;
  completedTasks: number;
  email: string;
  joinDate: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  vertical: Vertical | 'Overall Club';
  assignedTo: string | null;
  assignedToName?: string;
  status: TaskStatus;
  priority: Priority;
  deadline: string;
  deadlineDate: Date;
  estimatedTime: string;
  createdAt: string;
  attachments: number;
  progress: number;
  feedback?: string;
  rating?: number;
}

export interface Activity {
  id: string;
  type: 'submission' | 'started' | 'overdue' | 'completed' | 'assigned';
  memberName: string;
  memberAvatar: string;
  TaskTitle: string;
  vertical: Vertical;
  timestamp: string;
}

export const getStatusColor = (status: TaskStatus): string => {
  const colors: Record<TaskStatus, string> = {
    'Allocated': 'bg-gray-100 text-gray-700 border-gray-200',
    'Working': 'bg-blue-50 text-[#4285F4] border-blue-200',
    'Completed': 'bg-green-50 text-[#34A853] border-green-200',
    'Under Review': 'bg-purple-50 text-[#9C27B0] border-purple-200',
    'Revision Required': 'bg-orange-50 text-[#FF9800] border-orange-200',
    'Overdue': 'bg-red-50 text-[#EA4335] border-red-200'
  };
  return colors[status];
};

export const getPriorityColor = (priority: Priority): string => {
  const colors: Record<Priority, string> = {
    'Low': 'bg-green-50 text-[#34A853] border-green-200',
    'Medium': 'bg-yellow-50 text-[#FBBC04] border-yellow-200',
    'High': 'bg-red-50 text-[#EA4335] border-red-200'
  };
  return colors[priority];
};

export interface MemberTask {
  username: string;
  vertical: Vertical;
  taskTitle: string;
  description: string;
}

export const verticals: Vertical[] = [
  'Operations',
  'PR',
  'Design',
  'Tech',
  'Marketing',
  'Social Media',
  'Content'
];
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
  taskTitle: string;
  vertical: Vertical;
  timestamp: string;
}

export const members: Member[] = [
  {
    id: '1',
    name: 'Riya Sharma',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=riya',
    role: 'Senior Designer',
    vertical: 'Design',
    lastSeen: '5 mins ago',
    lastSeenDate: new Date(Date.now() - 5 * 60000),
    assignedTasks: 3,
    rating: 4.8,
    completedTasks: 24,
    email: 'riya@gdg.dev',
    joinDate: 'Aug 2024'
  },
  {
    id: '2',
    name: 'Ayush Patel',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ayush',
    role: 'PR Lead',
    vertical: 'PR',
    lastSeen: '1 hour ago',
    lastSeenDate: new Date(Date.now() - 60 * 60000),
    assignedTasks: 2,
    rating: 4.5,
    completedTasks: 18,
    email: 'ayush@gdg.dev',
    joinDate: 'Sep 2024'
  },
  {
    id: '3',
    name: 'Priya Verma',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=priya',
    role: 'Tech Developer',
    vertical: 'Tech',
    lastSeen: '30 mins ago',
    lastSeenDate: new Date(Date.now() - 30 * 60000),
    assignedTasks: 4,
    rating: 4.9,
    completedTasks: 31,
    email: 'priya@gdg.dev',
    joinDate: 'Jul 2024'
  },
  {
    id: '4',
    name: 'Karan Singh',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=karan',
    role: 'Marketing Specialist',
    vertical: 'Marketing',
    lastSeen: 'Yesterday',
    lastSeenDate: new Date(Date.now() - 24 * 60 * 60000),
    assignedTasks: 1,
    rating: 4.2,
    completedTasks: 12,
    email: 'karan@gdg.dev',
    joinDate: 'Oct 2024'
  },
  {
    id: '5',
    name: 'Sneha Gupta',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sneha',
    role: 'Content Writer',
    vertical: 'Content',
    lastSeen: '2 hours ago',
    lastSeenDate: new Date(Date.now() - 2 * 60 * 60000),
    assignedTasks: 2,
    rating: 4.6,
    completedTasks: 20,
    email: 'sneha@gdg.dev',
    joinDate: 'Aug 2024'
  },
  {
    id: '6',
    name: 'Rahul Joshi',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=rahul',
    role: 'Social Media Manager',
    vertical: 'Social Media',
    lastSeen: '15 mins ago',
    lastSeenDate: new Date(Date.now() - 15 * 60000),
    assignedTasks: 5,
    rating: 4.4,
    completedTasks: 28,
    email: 'rahul@gdg.dev',
    joinDate: 'Jul 2024'
  },
  {
    id: '7',
    name: 'Ananya Reddy',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ananya',
    role: 'Operations Coordinator',
    vertical: 'Operations',
    lastSeen: '3 hours ago',
    lastSeenDate: new Date(Date.now() - 3 * 60 * 60000),
    assignedTasks: 3,
    rating: 4.7,
    completedTasks: 22,
    email: 'ananya@gdg.dev',
    joinDate: 'Sep 2024'
  },
  {
    id: '8',
    name: 'Vikram Rao',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=vikram',
    role: 'Junior Designer',
    vertical: 'Design',
    lastSeen: '45 mins ago',
    lastSeenDate: new Date(Date.now() - 45 * 60000),
    assignedTasks: 2,
    rating: 4.1,
    completedTasks: 8,
    email: 'vikram@gdg.dev',
    joinDate: 'Nov 2024'
  },
  {
    id: '9',
    name: 'Meera Iyer',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=meera',
    role: 'Junior PR Member',
    vertical: 'PR',
    lastSeen: '10 mins ago',
    lastSeenDate: new Date(Date.now() - 10 * 60000),
    assignedTasks: 1,
    rating: 4.3,
    completedTasks: 6,
    email: 'meera@gdg.dev',
    joinDate: 'Nov 2024'
  },
  {
    id: '10',
    name: 'Arjun Kumar',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=arjun',
    role: 'Full Stack Developer',
    vertical: 'Tech',
    lastSeen: '20 mins ago',
    lastSeenDate: new Date(Date.now() - 20 * 60000),
    assignedTasks: 4,
    rating: 4.8,
    completedTasks: 35,
    email: 'arjun@gdg.dev',
    joinDate: 'Jun 2024'
  },
  {
    id: '11',
    name: 'Divya Nair',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=divya',
    role: 'Content Strategist',
    vertical: 'Content',
    lastSeen: '4 hours ago',
    lastSeenDate: new Date(Date.now() - 4 * 60 * 60000),
    assignedTasks: 2,
    rating: 3.9,
    completedTasks: 14,
    email: 'divya@gdg.dev',
    joinDate: 'Oct 2024'
  },
  {
    id: '12',
    name: 'Rohan Mehta',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=rohan',
    role: 'Marketing Intern',
    vertical: 'Marketing',
    lastSeen: '6 hours ago',
    lastSeenDate: new Date(Date.now() - 6 * 60 * 60000),
    assignedTasks: 1,
    rating: 3.5,
    completedTasks: 4,
    email: 'rohan@gdg.dev',
    joinDate: 'Dec 2024'
  }
];

export const tasks: Task[] = [
  {
    id: '1',
    title: 'Design Event Banner for DevFest 2024',
    description: 'Create a stunning banner for our upcoming DevFest event with Google brand colors.',
    vertical: 'Design',
    assignedTo: '1',
    assignedToName: 'Riya Sharma',
    status: 'Working',
    priority: 'High',
    deadline: 'Dec 15, 2024',
    deadlineDate: new Date('2024-12-15'),
    estimatedTime: '4 hours',
    createdAt: 'Dec 8, 2024',
    attachments: 2,
    progress: 65
  },
  {
    id: '2',
    title: 'Social Media Post Batch 3',
    description: 'Create and schedule 10 posts for the next week across all platforms.',
    vertical: 'Social Media',
    assignedTo: '6',
    assignedToName: 'Rahul Joshi',
    status: 'Overdue',
    priority: 'High',
    deadline: 'Dec 10, 2024',
    deadlineDate: new Date('2024-12-10'),
    estimatedTime: '6 hours',
    createdAt: 'Dec 5, 2024',
    attachments: 5,
    progress: 40
  },
  {
    id: '3',
    title: 'Write Blog Post on ML Workshop',
    description: 'Document the recent ML workshop with key takeaways and code snippets.',
    vertical: 'Content',
    assignedTo: '5',
    assignedToName: 'Sneha Gupta',
    status: 'Under Review',
    priority: 'Medium',
    deadline: 'Dec 18, 2024',
    deadlineDate: new Date('2024-12-18'),
    estimatedTime: '3 hours',
    createdAt: 'Dec 9, 2024',
    attachments: 1,
    progress: 100
  },
  {
    id: '4',
    title: 'Build Event Registration Portal',
    description: 'Develop a registration system for upcoming tech events with payment integration.',
    vertical: 'Tech',
    assignedTo: '3',
    assignedToName: 'Priya Verma',
    status: 'Working',
    priority: 'High',
    deadline: 'Dec 20, 2024',
    deadlineDate: new Date('2024-12-20'),
    estimatedTime: '12 hours',
    createdAt: 'Dec 1, 2024',
    attachments: 3,
    progress: 45
  },
  {
    id: '5',
    title: 'PR Outreach for DevFest',
    description: 'Contact local tech media and influencers for DevFest coverage.',
    vertical: 'PR',
    assignedTo: '2',
    assignedToName: 'Ayush Patel',
    status: 'Completed',
    priority: 'Medium',
    deadline: 'Dec 12, 2024',
    deadlineDate: new Date('2024-12-12'),
    estimatedTime: '5 hours',
    createdAt: 'Dec 6, 2024',
    attachments: 4,
    progress: 100,
    feedback: 'Excellent outreach! Great connections made.',
    rating: 5
  },
  {
    id: '6',
    title: 'Venue Coordination for Hackathon',
    description: 'Finalize venue logistics, equipment, and refreshments for the hackathon.',
    vertical: 'Operations',
    assignedTo: '7',
    assignedToName: 'Ananya Reddy',
    status: 'Working',
    priority: 'High',
    deadline: 'Dec 22, 2024',
    deadlineDate: new Date('2024-12-22'),
    estimatedTime: '8 hours',
    createdAt: 'Dec 10, 2024',
    attachments: 2,
    progress: 30
  },
  {
    id: '7',
    title: 'Email Campaign for Newsletter',
    description: 'Design and send monthly newsletter to all subscribers.',
    vertical: 'Marketing',
    assignedTo: '4',
    assignedToName: 'Karan Singh',
    status: 'Allocated',
    priority: 'Low',
    deadline: 'Dec 25, 2024',
    deadlineDate: new Date('2024-12-25'),
    estimatedTime: '2 hours',
    createdAt: 'Dec 11, 2024',
    attachments: 0,
    progress: 0
  },
  {
    id: '8',
    title: 'UI Kit for Club Projects',
    description: 'Create a reusable UI component kit for all GDG projects.',
    vertical: 'Design',
    assignedTo: '8',
    assignedToName: 'Vikram Rao',
    status: 'Revision Required',
    priority: 'Medium',
    deadline: 'Dec 16, 2024',
    deadlineDate: new Date('2024-12-16'),
    estimatedTime: '6 hours',
    createdAt: 'Dec 7, 2024',
    attachments: 1,
    progress: 80,
    feedback: 'Good start, but needs dark mode variants.'
  },
  {
    id: '9',
    title: 'Sponsor Pitch Deck',
    description: 'Update the sponsorship deck with latest achievements and metrics.',
    vertical: 'PR',
    assignedTo: '9',
    assignedToName: 'Meera Iyer',
    status: 'Working',
    priority: 'Medium',
    deadline: 'Dec 17, 2024',
    deadlineDate: new Date('2024-12-17'),
    estimatedTime: '4 hours',
    createdAt: 'Dec 9, 2024',
    attachments: 2,
    progress: 55
  },
  {
    id: '10',
    title: 'API Integration for Leaderboard',
    description: 'Integrate gaming leaderboard API for the coding competition.',
    vertical: 'Tech',
    assignedTo: '10',
    assignedToName: 'Arjun Kumar',
    status: 'Under Review',
    priority: 'High',
    deadline: 'Dec 14, 2024',
    deadlineDate: new Date('2024-12-14'),
    estimatedTime: '8 hours',
    createdAt: 'Dec 4, 2024',
    attachments: 1,
    progress: 100
  },
  {
    id: '11',
    title: 'Video Script for YouTube',
    description: 'Write script for the upcoming "What is GDG" introduction video.',
    vertical: 'Content',
    assignedTo: '11',
    assignedToName: 'Divya Nair',
    status: 'Allocated',
    priority: 'Low',
    deadline: 'Dec 28, 2024',
    deadlineDate: new Date('2024-12-28'),
    estimatedTime: '3 hours',
    createdAt: 'Dec 11, 2024',
    attachments: 0,
    progress: 0
  },
  {
    id: '12',
    title: 'Instagram Reels Planning',
    description: 'Plan 5 short-form video ideas for Instagram engagement.',
    vertical: 'Social Media',
    assignedTo: null,
    status: 'Allocated',
    priority: 'Medium',
    deadline: 'Dec 19, 2024',
    deadlineDate: new Date('2024-12-19'),
    estimatedTime: '2 hours',
    createdAt: 'Dec 10, 2024',
    attachments: 0,
    progress: 0
  },
  {
    id: '13',
    title: 'Club Merchandise Design',
    description: 'Design t-shirts and stickers for club merchandise.',
    vertical: 'Overall Club',
    assignedTo: '1',
    assignedToName: 'Riya Sharma',
    status: 'Completed',
    priority: 'Medium',
    deadline: 'Dec 8, 2024',
    deadlineDate: new Date('2024-12-08'),
    estimatedTime: '5 hours',
    createdAt: 'Dec 1, 2024',
    attachments: 6,
    progress: 100,
    feedback: 'Loved the designs! Perfect execution.',
    rating: 5
  },
  {
    id: '14',
    title: 'Speaker Coordination for Tech Talk',
    description: 'Coordinate with industry speakers for the upcoming tech talk series.',
    vertical: 'Operations',
    assignedTo: '7',
    assignedToName: 'Ananya Reddy',
    status: 'Working',
    priority: 'High',
    deadline: 'Dec 13, 2024',
    deadlineDate: new Date('2024-12-13'),
    estimatedTime: '4 hours',
    createdAt: 'Dec 8, 2024',
    attachments: 3,
    progress: 70
  },
  {
    id: '15',
    title: 'Campus Poster Campaign',
    description: 'Design and distribute posters across campus for DevFest.',
    vertical: 'Marketing',
    assignedTo: '12',
    assignedToName: 'Rohan Mehta',
    status: 'Working',
    priority: 'Medium',
    deadline: 'Dec 14, 2024',
    deadlineDate: new Date('2024-12-14'),
    estimatedTime: '3 hours',
    createdAt: 'Dec 9, 2024',
    attachments: 2,
    progress: 25
  }
];

export const activities: Activity[] = [
  {
    id: '1',
    type: 'submission',
    memberName: 'Riya Sharma',
    memberAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=riya',
    taskTitle: 'Design Event Banner for DevFest 2024',
    vertical: 'Design',
    timestamp: '2 mins ago'
  },
  {
    id: '2',
    type: 'started',
    memberName: 'Ayush Patel',
    memberAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ayush',
    taskTitle: 'PR Outreach for DevFest',
    vertical: 'PR',
    timestamp: '15 mins ago'
  },
  {
    id: '3',
    type: 'overdue',
    memberName: 'Rahul Joshi',
    memberAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=rahul',
    taskTitle: 'Social Media Post Batch 3',
    vertical: 'Social Media',
    timestamp: '1 hour ago'
  },
  {
    id: '4',
    type: 'completed',
    memberName: 'Sneha Gupta',
    memberAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sneha',
    taskTitle: 'Write Blog Post on ML Workshop',
    vertical: 'Content',
    timestamp: '2 hours ago'
  },
  {
    id: '5',
    type: 'assigned',
    memberName: 'Priya Verma',
    memberAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=priya',
    taskTitle: 'Build Event Registration Portal',
    vertical: 'Tech',
    timestamp: '3 hours ago'
  },
  {
    id: '6',
    type: 'submission',
    memberName: 'Arjun Kumar',
    memberAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=arjun',
    taskTitle: 'API Integration for Leaderboard',
    vertical: 'Tech',
    timestamp: '4 hours ago'
  }
];

export const verticals: Vertical[] = [
  'Operations',
  'PR',
  'Design',
  'Tech',
  'Marketing',
  'Social Media',
  'Content'
];

export const getStatusColor = (status: TaskStatus): string => {
  const colors: Record<TaskStatus, string> = {
    'Allocated': 'bg-gray-100 text-gray-700 border-gray-300',
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

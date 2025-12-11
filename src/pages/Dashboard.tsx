import { useState } from 'react';
import { Users, ClipboardList, Clock, CheckCircle2, TrendingUp, Activity } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { members, tasks, activities } from '@/data/dummyData';
import { StatCard } from '@/components/cards/StatCard';
import { ActivityCard } from '@/components/cards/ActivityCard';
import { TaskCard } from '@/components/cards/TaskCard';
import { FeedbackDialog } from '@/components/dialogs/FeedbackDialog';
import { Task } from '@/data/dummyData';

const completionData = [
  { name: 'Week 1', completed: 8, assigned: 12 },
  { name: 'Week 2', completed: 15, assigned: 18 },
  { name: 'Week 3', completed: 12, assigned: 14 },
  { name: 'Week 4', completed: 22, assigned: 25 },
];

const performanceData = [
  { name: 'Excellent', value: 35, color: 'hsl(var(--google-green))' },
  { name: 'Good', value: 40, color: 'hsl(var(--google-blue))' },
  { name: 'Average', value: 20, color: 'hsl(var(--google-yellow))' },
  { name: 'Needs Improvement', value: 5, color: 'hsl(var(--google-red))' },
];

const Dashboard = () => {
  const [feedbackTask, setFeedbackTask] = useState<Task | null>(null);
  const [feedbackOpen, setFeedbackOpen] = useState(false);

  const totalMembers = members.length;
  const tasksAssigned = tasks.length;
  const tasksPending = tasks.filter(t => t.status === 'Allocated' || t.status === 'Working').length;
  const tasksCompleted = tasks.filter(t => t.status === 'Completed').length;

  const recentTasks = tasks.slice(0, 4);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-display font-bold text-foreground">
          Welcome back, <span className="text-gradient">Aditya</span>
        </h1>
        <p className="text-muted-foreground mt-1">
          Here's what's happening in your vertical today
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Members"
          value={totalMembers}
          icon={Users}
          color="blue"
        />
        <StatCard
          title="Tasks Assigned"
          value={tasksAssigned}
          icon={ClipboardList}
          color="primary"
        />
        <StatCard
          title="Tasks Pending"
          value={tasksPending}
          icon={Clock}
          color="yellow"
        />
        <StatCard
          title="Tasks Completed"
          value={tasksCompleted}
          icon={CheckCircle2}
          color="green"
          trend={{ value: 15, isPositive: true }}
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Completion Chart */}
        <div className="lg:col-span-2 glass-card p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold text-foreground">Task Completion Over Time</h2>
              <p className="text-sm text-muted-foreground">Weekly progress tracking</p>
            </div>
            <TrendingUp className="w-5 h-5 text-primary" />
          </div>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={completionData}>
                <defs>
                  <linearGradient id="colorCompleted" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--neon-green))" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(var(--neon-green))" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorAssigned" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--neon-blue))" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(var(--neon-blue))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="completed"
                  stroke="hsl(var(--neon-green))"
                  fillOpacity={1}
                  fill="url(#colorCompleted)"
                  strokeWidth={2}
                />
                <Area
                  type="monotone"
                  dataKey="assigned"
                  stroke="hsl(var(--neon-blue))"
                  fillOpacity={1}
                  fill="url(#colorAssigned)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Performance Distribution */}
        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold text-foreground">Performance</h2>
              <p className="text-sm text-muted-foreground">Distribution</p>
            </div>
          </div>

          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={performanceData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {performanceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-2 mt-4">
            {performanceData.map((item) => (
              <div key={item.name} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-muted-foreground">{item.name}</span>
                </div>
                <span className="font-medium text-foreground">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity & Tasks */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-primary" />
              <h2 className="text-lg font-semibold text-foreground">Recent Activity</h2>
            </div>
          </div>

          <div className="space-y-1">
            {activities.map((activity) => (
              <ActivityCard key={activity.id} activity={activity} />
            ))}
          </div>
        </div>

        {/* Recent Tasks */}
        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <ClipboardList className="w-5 h-5 text-primary" />
              <h2 className="text-lg font-semibold text-foreground">Recent Tasks</h2>
            </div>
          </div>

          <div className="space-y-4">
            {recentTasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onFeedback={(t) => {
                  setFeedbackTask(t);
                  setFeedbackOpen(true);
                }}
              />
            ))}
          </div>
        </div>
      </div>

      <FeedbackDialog
        task={feedbackTask}
        open={feedbackOpen}
        onOpenChange={setFeedbackOpen}
      />
    </div>
  );
};

export default Dashboard;

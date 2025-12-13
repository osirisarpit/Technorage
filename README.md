# GDG Task Spark

A modern task management application for Google Developer Groups (GDG) communities, built with React, TypeScript, and Tailwind CSS.

## 🚀 Features

### Role-Based Access Control
- **Lead Role**: Full access to dashboard, task creation, member management, and assigned tasks
- **Member Role**: Access to dashboard and assigned tasks only

### Task Management
- Create tasks with detailed information (title, description, vertical, deadline, estimated time)
- Assign tasks to specific verticals or mark as "Overall Club"
- Multiple rating selection (1-5 stars) for task prioritization
- View all tasks, unassigned tasks, or assigned tasks
- Task submission with document attachments
- Task feedback system

### Dashboard
- **Open Opportunities**: Displays unassigned tasks and "Overall Club" tasks
- **Vertical Tracks**: Tasks organized by department (Operations, Marketing, Social Media, Creative, Design)
- Personalized welcome message based on user role
- Real-time task updates

### User Interface
- Modern, Google-themed design with animated backgrounds
- Responsive layout for all screen sizes
- Dark mode support (Tasks page)
- Smooth animations and transitions
- Intuitive navigation with sidebar

### Authentication
- Secure login system with role-based access
- Session persistence using localStorage
- Protected routes for authenticated users

## 📋 Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- Modern web browser

## 🛠️ Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd gdg-task-spark
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open your browser and navigate to `http://localhost:8080`

## 🏗️ Build for Production

```bash
npm run build
# or
yarn build
# or
pnpm build
```

The production build will be in the `dist` directory.

Preview the production build:
```bash
npm run preview
# or
yarn preview
# or
pnpm preview
```

## 📁 Project Structure

```
gdg-task-spark/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── cards/           # Card components (TaskCard, MemberCard, etc.)
│   │   ├── dialogs/         # Dialog components (FeedbackDialog, TaskSubmissionDialog, etc.)
│   │   ├── layout/          # Layout components (Header, Sidebar, DashboardLayout)
│   │   └── ui/              # shadcn/ui components
│   ├── contexts/            # React Context providers (AuthContext, TasksContext)
│   ├── data/                # Mock data and TypeScript interfaces
│   ├── hooks/               # Custom React hooks
│   ├── lib/                 # Utility functions
│   ├── pages/               # Page components
│   │   ├── Dashboard.tsx
│   │   ├── CreateTask.tsx
│   │   ├── Tasks.tsx
│   │   ├── AssignedTasks.tsx
│   │   ├── Login.tsx
│   │   └── ...
│   ├── App.tsx              # Main application component with routing
│   └── main.tsx             # Application entry point
├── public/                   # Static assets
├── package.json
├── tailwind.config.ts        # Tailwind CSS configuration
├── tsconfig.json             # TypeScript configuration
└── vite.config.ts            # Vite configuration
```

## 🎨 Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **React Router DOM** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - UI component library
- **Radix UI** - Accessible component primitives
- **Lucide React** - Icon library
- **React Query** - Data fetching and state management
- **Zod** - Schema validation

## 🔐 Authentication

The application uses a simple authentication system with localStorage for session persistence. 

### Default Login Credentials

**Lead:**
- Email: `lead@gdg.dev`
- Password: `lead123`

**Member:**
- Email: `member@gdg.dev`
- Password: `member123`

*Note: These are demo credentials. In production, implement proper authentication with a backend service.*

## 📝 Usage

### Creating a Task (Lead Only)

1. Navigate to "Create Task" from the sidebar
2. Fill in the task details:
   - Task Title (required)
   - Description
   - Assign To (vertical selection, required)
   - Rating (optional, multiple selection)
   - Deadline (required)
   - Estimated Time (optional)
3. Click "Create Task"
4. The task will appear in the Tasks page as unassigned

### Viewing Tasks

- **All Tasks**: View all tasks regardless of assignment status
- **Unassigned**: View tasks that haven't been assigned to anyone
- **Assigned**: View tasks assigned to members

### Submitting a Task (Members)

1. Navigate to "Assigned Tasks"
2. Click on a task card
3. Fill in submission details and attach documents
4. Click "Submit Task" or "Done Task"

## 🧪 Development

### Linting

```bash
npm run lint
```

### Type Checking

TypeScript type checking is done automatically by the IDE and during build.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Built for Google Developer Groups communities
- UI inspired by Google's Material Design
- Uses shadcn/ui for beautiful, accessible components

## 📧 Support

For issues, questions, or contributions, please open an issue on the repository.

---

Made with ❤️ for the GDG community

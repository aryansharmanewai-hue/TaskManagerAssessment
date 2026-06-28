# 🚀 TaskFlow – Smart Task & Project Manager

> A full-stack MERN application for intelligent task and project management with AI-powered effort estimation.

## 📋 Project Overview

TaskFlow is an evolved version of a Trello clone, transformed into a sophisticated task management system. It combines the visual organization of Kanban boards with advanced task tracking features including priority management, effort estimation, and AI-powered suggestions.

### Key Features

✨ **Smart Task Management**
- Create, organize, and track tasks efficiently
- Drag-and-drop task organization (Kanban-style)
- Real-time collaboration and team coordination

🎯 **Priority & Status Tracking**
- Four priority levels: Low, Medium, High, Urgent
- Five task statuses: To Do, In Progress, In Review, Completed, Blocked
- Visual priority badges and status indicators

🤖 **AI-Powered Effort Estimation**
- Smart effort estimation based on task description
- Automatic due date suggestions
- Complexity analysis using NLP patterns
- Learn as you log actual vs. estimated effort

📊 **Project Analytics**
- Real-time completion rate tracking
- Effort estimation vs. actual tracking
- Task distribution and workload visibility
- Team productivity insights

🏷️ **Flexible Tagging System**
- Organize tasks with custom tags
- Quick filtering by tags
- Category-based task grouping

👥 **Team Collaboration**
- Assign tasks to team members
- Add watchers and comments
- Activity logs for transparency
- Member roles and permissions

---

## 🏗️ Architecture

### Technology Stack

**Frontend:**
- React 17.0.2
- Redux Toolkit (State Management)
- Styled Components (CSS-in-JS)
- React Beautiful DnD (Drag & Drop)
- Axios (HTTP Client)
- Material-UI (UI Components)

**Backend:**
- Node.js & Express.js
- MongoDB (NoSQL Database)
- Mongoose ODM
- JWT (Authentication)
- bcryptjs (Password Hashing)

### Folder Structure

```
.
├── client/
│   └── src/
│       ├── Components/
│       │   ├── Modals/EditCardModal/Features/
│       │   │   ├── PriorityBadge.js       (Task priority selector)
│       │   │   ├── TaskStatus.js          (Status management)
│       │   │   ├── EffortEstimator.js     (AI effort estimation)
│       │   │   ├── TaskTags.js            (Tag management)
│       │   │   └── TaskOverview.js        (Project analytics)
│       │   ├── Pages/
│       │   ├── Drawers/
│       │   └── ...
│       └── Redux/
│           └── Slices/
│               ├── cardSlice.js           (Enhanced with TaskFlow fields)
│               ├── boardSlice.js          (With completion tracking)
│               └── ...
└── server/
    ├── Models/
    │   ├── cardModel.js                   (Updated with new fields)
    │   ├── boardModel.js                  (With project metrics)
    │   └── ...
    ├── Services/
    │   ├── aiEstimationService.js         (New: AI estimation logic)
    │   ├── cardService.js                 (Updated)
    │   └── ...
    ├── Routes/
    │   └── cardRoute.js                   (New: /estimate-task endpoints)
    ├── Controllers/
    │   └── cardController.js              (New: estimation handlers)
    └── server.js
```

---

## 📦 New Database Schema

### Card Model Enhancements

```javascript
{
  // Existing fields...
  title: String,
  description: String,
  
  // NEW TaskFlow Fields
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium'
  },
  status: {
    type: String,
    enum: ['todo', 'in-progress', 'in-review', 'completed', 'blocked'],
    default: 'todo'
  },
  effort: {
    estimated: Number,        // AI-generated or manual
    actual: Number,           // Logged by users
    unit: String,             // 'hours', 'days', 'points'
    aiGenerated: Boolean      // Track AI suggestions
  },
  tags: [String]             // Custom categorization
}
```

### Board Model Enhancements

```javascript
{
  // Existing fields...
  taskCount: Number,               // Total tasks on board
  completedTaskCount: Number,      // Completed tasks
  totalEffortEstimated: Number,    // Sum of estimated efforts
  totalEffortActual: Number        // Sum of actual efforts
}
```

---

## 🔌 API Endpoints

### Card Estimation (NEW)

**POST** `/api/card/estimate-task`
- Request: `{ description: string, title?: string }`
- Response: `{ success: true, estimate: { estimatedEffort, priority, suggestedDueDate, complexity, confidence } }`

**POST** `/api/card/estimate-batch`
- Request: `{ tasks: [{ description, title }] }`
- Response: `{ success: true, estimates: [...] }`

### Card Operations (UPDATED)

**PUT** `/api/card/:boardId/:listId/:cardId`
- Now supports: `{ priority, status, effort, tags }`

---

## 🚀 Getting Started

### Prerequisites
- Node.js 14+
- MongoDB
- npm or yarn

### Installation

1. **Install Backend Dependencies**
```bash
cd server
npm install
```

2. **Install Frontend Dependencies**
```bash
cd client
npm install
```

3. **Environment Variables** (server/.env)
```
MONGODB_URI=mongodb://localhost/taskflow
JWT_SECRET=your_jwt_secret
PORT=5000
```

4. **Start the Application**

Backend:
```bash
cd server
npm start
```

Frontend:
```bash
cd client
npm start
```

---

## 🎯 Features Breakdown

### 1. Priority Management
- **Urgent (🔥)**: Critical issues, blockers
- **High (⬆️)**: Important, significant effort
- **Medium (➡️)**: Standard tasks
- **Low (⬇️)**: Nice-to-have, minor fixes

### 2. Status Workflow
```
📝 To Do → 🚀 In Progress → 👀 In Review → ✅ Completed
                ↓
            🚫 Blocked
```

### 3. AI Estimation Algorithm

The AI estimation service analyzes task descriptions for:
- **Complexity Keywords**: Identifies high, medium, low complexity indicators
- **Priority Signals**: Urgency keywords for auto-priority assignment
- **Effort Calculation**: Maps complexity to hours (2h baseline, up to 8h)
- **Due Date Suggestion**: Calculates working days needed
- **Confidence Score**: Indicates estimation reliability

Example complexity scoring:
```
"refactor database optimization"    → 6 points → 8 hours → High complexity
"fix typo in documentation"         → 1 point  → 2 hours → Low complexity
"implement user authentication"     → 3 points → 5 hours → Medium complexity
```

### 4. Effort Tracking

Users can:
- Set estimated effort (AI-suggested or manual)
- Choose unit: Hours, Days, Points
- Log actual effort as work progresses
- View variance: Actual vs. Estimated

**Example:**
- Estimated: 5 hours (AI-suggested)
- Actual: 7 hours (logged by developer)
- Variance: +40% (useful for estimation accuracy)

### 5. Task Tags

Flexible categorization:
- `backend`, `frontend`, `database`
- `bug-fix`, `feature`, `refactor`
- `urgent`, `review-needed`
- Custom per organization

### 6. Project Analytics Dashboard

Track across entire project:
- 📊 **Completion Rate**: % of completed tasks
- 📈 **Effort Metrics**: Estimated vs. Actual hours
- 📋 **Task Distribution**: By priority, status, assignee
- 🎯 **Velocity**: Tasks completed per sprint/week

---

## 🔄 Redux State Management

### Card Slice (Updated)

**New Actions:**
- `updatePriority(priority)` - Set task priority
- `updateStatus(status)` - Change task status
- `updateEffort(effort)` - Update effort tracking
- `updateTags(tags)` - Replace all tags
- `addTag(tag)` - Add single tag
- `removeTag(tag)` - Remove single tag

### Board Slice (Updated)

**New Fields:**
- `taskCount` - Total tasks on board
- `completedTaskCount` - Completed tasks
- `totalEffortEstimated` - Sum of estimates
- `totalEffortActual` - Sum of actuals

---

## 💡 Usage Examples

### Creating a Task with AI Estimate

```javascript
// 1. Create task
const taskData = {
  title: "Implement OAuth2 authentication",
  description: "Add secure OAuth2 authentication with Google and GitHub providers",
  listId: "todo-list-id",
  boardId: "board-id"
};

// 2. Request AI estimate
const response = await axios.post('/api/card/estimate-task', {
  description: taskData.description,
  title: taskData.title
});

// Response includes:
// - estimatedEffort: 8 (hours)
// - priority: "high"
// - suggestedDueDate: "2024-01-15"
// - complexity: "high"
// - confidence: 92

// 3. Create task with estimate
const cardWithEstimate = {
  ...taskData,
  priority: "high",
  status: "todo",
  effort: {
    estimated: 8,
    unit: "hours",
    aiGenerated: true
  }
};
```

### Updating Task Status

```javascript
// Move task to "In Progress" and log actual effort
await axios.put(`/api/card/${boardId}/${listId}/${cardId}`, {
  status: "in-progress",
  effort: {
    estimated: 8,
    actual: 3,  // Worked 3 hours so far
    unit: "hours"
  }
});
```

### Adding Tags

```javascript
// Tag task for organization
await axios.put(`/api/card/${boardId}/${listId}/${cardId}`, {
  tags: ["backend", "authentication", "urgent"]
});
```

---

## 🎨 UI Components

### PriorityBadge
Visual priority indicator with dropdown selector
```jsx
<PriorityBadge 
  priority="high" 
  onChange={(newPriority) => updateTask(newPriority)}
/>
```

### TaskStatus
Status selector with emoji indicators
```jsx
<TaskStatus 
  status="in-progress" 
  onChange={(newStatus) => updateTask(newStatus)}
/>
```

### EffortEstimator
AI-powered effort estimation interface
```jsx
<EffortEstimator 
  estimatedEffort={5}
  actualEffort={3}
  unit="hours"
  description={taskDescription}
  onUpdateEffort={handleEffortUpdate}
  onRequestAIEstimate={requestEstimate}
/>
```

### TaskTags
Tag management interface
```jsx
<TaskTags 
  tags={["backend", "bug"]}
  onTagsChange={handleTagsChange}
/>
```

### TaskOverview
Project analytics dashboard
```jsx
<TaskOverview 
  taskCount={25}
  completedTaskCount={18}
  totalEffortEstimated={120}
  totalEffortActual={95}
/>
```

---

## 🔐 Authentication & Security

- JWT-based authentication
- Password hashing with bcryptjs
- Role-based access control (owner, member)
- Secure token management
- Request validation

---

## 📊 Future Enhancements

1. **Advanced AI Integration**
   - OpenAI/Claude API integration for better estimates
   - ML model for personalized estimation
   - Predictive analytics

2. **Real-time Features**
   - WebSocket for live collaboration
   - Real-time task updates
   - Notification system

3. **Integrations**
   - GitHub issue tracking
   - Slack notifications
   - Calendar sync

4. **Reporting**
   - Sprint reports
   - Team velocity charts
   - Budget tracking

5. **Mobile App**
   - React Native version
   - Offline support

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

---

## 📄 License

MIT License - Feel free to use this project!

---

## 📞 Support

For issues or questions:
- Open an issue on GitHub
- Contact the development team
- Check documentation

---

## 🎉 Thank You!

Thank you for using TaskFlow! We hope it helps your team stay organized and productive.

**Happy task managing! 🚀**

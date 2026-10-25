// Online Learning Platform - Data Layer
const STORAGE = {
  users: 'lp_users',
  currentUser: 'lp_current_user',
  enrollments: 'lp_enrollments',
  progress: 'lp_progress',
  forumPosts: 'lp_forum_posts',
};

const DEFAULT_COURSES = [
  { id: '1', title: 'Web Development Fundamentals', instructor: 'Dr. Sarah Chen', duration: '8 weeks', lessons: 24, level: 'Beginner', icon: '🌐' },
  { id: '2', title: 'Data Science with Python', instructor: 'Prof. James Wilson', duration: '12 weeks', lessons: 36, level: 'Intermediate', icon: '🐍' },
  { id: '3', title: 'Mobile App Development', instructor: 'Emily Rodriguez', duration: '10 weeks', lessons: 30, level: 'Intermediate', icon: '📱' },
  { id: '4', title: 'Cloud Computing & AWS', instructor: 'Michael Thompson', duration: '6 weeks', lessons: 18, level: 'Advanced', icon: '☁️' },
  { id: '5', title: 'Machine Learning Basics', instructor: 'Dr. Priya Sharma', duration: '10 weeks', lessons: 28, level: 'Intermediate', icon: '🤖' },
];

const COURSE_CONTENT = {
  '1': {
    lectures: [
      { id: 'l1', title: 'Introduction to HTML', duration: '15 min', videoUrl: '#' },
      { id: 'l2', title: 'CSS Fundamentals', duration: '20 min', videoUrl: '#' },
      { id: 'l3', title: 'JavaScript Basics', duration: '25 min', videoUrl: '#' },
    ],
    quizzes: [
      { id: 'q1', title: 'HTML Quiz', questions: [
        { q: 'What does HTML stand for?', options: ['Hyper Text Markup Language', 'High Tech Modern Language', 'Home Tool Markup Language'], correct: 0 },
        { q: 'Which tag is used for the largest heading?', options: ['<h6>', '<h1>', '<head>'], correct: 1 },
      ]},
    ],
    assignments: [
      { id: 'a1', title: 'Build a Portfolio Page', dueDate: '2025-04-15', description: 'Create a simple portfolio page using HTML and CSS.' },
    ],
  },
  '2': {
    lectures: [
      { id: 'l1', title: 'Python for Data Analysis', duration: '30 min', videoUrl: '#' },
      { id: 'l2', title: 'Pandas & NumPy', duration: '35 min', videoUrl: '#' },
    ],
    quizzes: [{ id: 'q1', title: 'Python Basics', questions: [{ q: 'What is a DataFrame?', options: ['A 2D data structure', 'A type of loop', 'A function'], correct: 0 }] }],
    assignments: [{ id: 'a1', title: 'Data Analysis Project', dueDate: '2025-04-20', description: 'Analyze a dataset using Pandas.' }],
  },
  '3': {
    lectures: [
      { id: 'l1', title: 'React Native Introduction', duration: '25 min', videoUrl: '#' },
      { id: 'l2', title: 'Building Your First App', duration: '40 min', videoUrl: '#' },
    ],
    quizzes: [{ id: 'q1', title: 'Mobile Dev Quiz', questions: [{ q: 'React Native uses:', options: ['Native components', 'Web views only', 'Java'], correct: 0 }] }],
    assignments: [{ id: 'a1', title: 'Todo App', dueDate: '2025-04-25', description: 'Build a cross-platform todo app.' }],
  },
  '4': {
    lectures: [
      { id: 'l1', title: 'AWS Overview', duration: '20 min', videoUrl: '#' },
      { id: 'l2', title: 'EC2 & S3', duration: '30 min', videoUrl: '#' },
    ],
    quizzes: [{ id: 'q1', title: 'Cloud Quiz', questions: [{ q: 'S3 is used for:', options: ['Compute', 'Object storage', 'Database'], correct: 1 }] }],
    assignments: [{ id: 'a1', title: 'Deploy a Static Site', dueDate: '2025-04-30', description: 'Host a website on S3.' }],
  },
  '5': {
    lectures: [
      { id: 'l1', title: 'Introduction to ML', duration: '25 min', videoUrl: '#' },
      { id: 'l2', title: 'Linear Regression', duration: '35 min', videoUrl: '#' },
    ],
    quizzes: [{ id: 'q1', title: 'ML Quiz', questions: [{ q: 'Supervised learning uses:', options: ['Labeled data', 'No data', 'Random data'], correct: 0 }] }],
    assignments: [{ id: 'a1', title: 'Regression Project', dueDate: '2025-05-01', description: 'Build a linear regression model.' }],
  },
};

function getUsers() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE.users) || '[]');
  } catch {
    return [];
  }
}

function saveUser(user) {
  const users = getUsers();
  const idx = users.findIndex(u => u.email === user.email);
  if (idx >= 0) users[idx] = { ...users[idx], ...user };
  else users.push({ ...user, id: Date.now().toString() });
  localStorage.setItem(STORAGE.users, JSON.stringify(users));
}

function getCurrentUser() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE.currentUser) || 'null');
  } catch {
    return null;
  }
}

function setCurrentUser(user) {
  if (user) {
    saveUser(user);
    localStorage.setItem(STORAGE.currentUser, JSON.stringify(user));
  } else {
    localStorage.removeItem(STORAGE.currentUser);
  }
}

function getEnrollments() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE.enrollments) || '{}');
  } catch {
    return {};
  }
}

function enrollUser(userId, courseId) {
  const e = getEnrollments();
  if (!e[userId]) e[userId] = [];
  if (!e[userId].includes(courseId)) e[userId].push(courseId);
  localStorage.setItem(STORAGE.enrollments, JSON.stringify(e));
}

function isEnrolled(userId, courseId) {
  const e = getEnrollments();
  return e[userId] && e[userId].includes(courseId);
}

function getProgress() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE.progress) || '{}');
  } catch {
    return {};
  }
}

function updateProgress(userId, courseId, type, id) {
  const p = getProgress();
  const key = `${userId}_${courseId}`;
  if (!p[key]) p[key] = { lectures: [], quizzes: {}, assignments: [] };
  if (type === 'lecture' && !p[key].lectures.includes(id)) p[key].lectures.push(id);
  if (type === 'quiz') p[key].quizzes[id] = true;
  if (type === 'assignment' && !p[key].assignments.includes(id)) p[key].assignments.push(id);
  localStorage.setItem(STORAGE.progress, JSON.stringify(p));
}

function getCourseProgress(userId, courseId) {
  const p = getProgress();
  const key = `${userId}_${courseId}`;
  const data = p[key] || { lectures: [], quizzes: {}, assignments: [] };
  const content = COURSE_CONTENT[courseId] || { lectures: [], quizzes: [], assignments: [] };
  const totalL = content.lectures?.length || 0;
  const totalQ = content.quizzes?.length || 0;
  const totalA = content.assignments?.length || 0;
  const doneL = data.lectures?.length || 0;
  const doneQ = Object.keys(data.quizzes || {}).length || 0;
  const doneA = data.assignments?.length || 0;
  const total = totalL + totalQ + totalA;
  const done = doneL + doneQ + doneA;
  return { done, total, percent: total ? Math.round((done / total) * 100) : 0 };
}

function getForumPosts(courseId) {
  try {
    const all = JSON.parse(localStorage.getItem(STORAGE.forumPosts) || '{}');
    return all[courseId] || [];
  } catch {
    return [];
  }
}

function addForumPost(courseId, post) {
  const all = JSON.parse(localStorage.getItem(STORAGE.forumPosts) || '{}');
  if (!all[courseId]) all[courseId] = [];
  all[courseId].unshift({ ...post, id: Date.now().toString(), date: new Date().toISOString() });
  localStorage.setItem(STORAGE.forumPosts, JSON.stringify(all));
}

function getCourses() {
  return DEFAULT_COURSES;
}

function getCourse(id) {
  return DEFAULT_COURSES.find(c => c.id === id);
}

function getCourseContent(courseId) {
  return COURSE_CONTENT[courseId] || { lectures: [], quizzes: [], assignments: [] };
}

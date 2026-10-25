# LearnHub - Online Learning Platform
## Project Report

---

## 1. Overview

**LearnHub** is an online learning platform that enables users to access courses, lectures, quizzes, and assignments. It includes user profiles, course enrollment, progress tracking, and discussion forums.

---

## 2. Platform Architecture

### 2.1 High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      Frontend (Browser)                      │
├─────────────────────────────────────────────────────────────┤
│  index.html  │  dashboard.html  │  courses.html  │  course.html  │  profile.html  │
├─────────────────────────────────────────────────────────────┤
│                      js/data.js (Data Layer)                 │
├─────────────────────────────────────────────────────────────┤
│                 localStorage (Persistence)                   │
└─────────────────────────────────────────────────────────────┘
```

### 2.2 Component Structure

| Component | Purpose |
|-----------|---------|
| **index.html** | Landing page, authentication (login/signup) |
| **dashboard.html** | User dashboard with enrolled courses and progress |
| **courses.html** | Course catalog and enrollment |
| **course.html** | Course content: lectures, quizzes, assignments, forum |
| **profile.html** | User profile and learning stats |
| **data.js** | Centralized data access and localStorage logic |

---

## 3. Database Schema (Logical)

The platform uses **localStorage** with the following logical structure:

### Users
```
users: [
  { id, name, email, password }
]
```

### Enrollments
```
enrollments: {
  [userId]: [courseId1, courseId2, ...]
}
```

### Progress
```
progress: {
  [userId_courseId]: {
    lectures: [lectureId1, ...],
    quizzes: { [quizId]: true },
    assignments: [assignmentId1, ...]
  }
}
```

### Forum Posts
```
forumPosts: {
  [courseId]: [
    { id, author, content, date }
  ]
}
```

### Courses (Static)
```
courses: [
  { id, title, instructor, duration, lessons, level, icon }
]
```

### Course Content (Static)
```
courseContent: {
  [courseId]: {
    lectures: [...],
    quizzes: [...],
    assignments: [...]
  }
}
```

---

## 4. Multimedia Content Integration

| Content Type | Implementation |
|--------------|----------------|
| **Lectures** | Placeholder for video URLs; supports duration, title; mark-as-complete |
| **Quizzes** | Interactive MCQ format; immediate scoring |
| **Assignments** | Text-based; due dates; mark complete |
| **Forum** | Text posts; author; timestamp |

**Scalability for multimedia:**  
For production, lectures would link to video hosts (YouTube, Vimeo, custom CDN). The current structure supports adding `videoUrl`, `thumbnailUrl`, and embedding iframes.

---

## 5. User Engagement Metrics

The platform tracks:

1. **Course enrollment** – Number of courses per user
2. **Lecture completion** – Completed vs total lectures per course
3. **Quiz completion** – Completed quizzes and scores
4. **Assignment completion** – Submitted assignments
5. **Overall progress** – Percentage per course: `(lectures + quizzes + assignments completed) / total`
6. **Forum activity** – Posts per course

These metrics are used for:
- Progress bars on course cards
- Dashboard “continue learning” view
- Profile learning stats

---

## 6. Scalability Considerations

### Current Limitations (localStorage)
- Data stored per browser/device
- Limited to ~5–10MB per origin
- No real-time sync
- No server-side validation

### Production Scalability

| Aspect | Recommendation |
|--------|----------------|
| **Database** | PostgreSQL/MySQL for users, enrollments, progress; Redis for caching |
| **API** | REST or GraphQL backend (Node.js, Python, etc.) |
| **Auth** | JWT or OAuth (e.g., Google, GitHub) |
| **Video** | CDN + streaming (HLS/DASH) |
| **File storage** | S3/GCS for uploads and media |
| **Caching** | CDN for static assets; Redis for sessions |
| **Horizontal scaling** | Stateless API servers; load balancer |

---

## 7. Security Considerations

- Passwords are stored in plain text in localStorage (demo only)
- Production: hash passwords (bcrypt/Argon2)
- Use HTTPS and secure cookies for sessions
- Sanitize forum content to prevent XSS
- Implement rate limiting and CSRF protection

---

## 8. Future Enhancements

- Real backend API and database
- Video playback for lectures
- File uploads for assignments
- Notifications and email reminders
- Certificates on course completion
- Search and filters for courses
- Instructor dashboard and analytics

---

## 9. Conclusion

LearnHub provides a functional learning platform with user profiles, course enrollment, lectures, quizzes, assignments, progress tracking, and discussion forums. The design supports later migration to a full backend and multimedia integration while keeping the current client-side implementation simple and runnable without a server.

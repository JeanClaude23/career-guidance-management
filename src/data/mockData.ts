export interface Student {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  careerInterest: string;
  dateJoined: string;
  phone?: string;
  address?: string;
  status: 'Active' | 'Inactive' | 'Graduated';
}

export interface CounselingSession {
  id: string;
  studentId: string;
  counselorName: string;
  sessionDate: string;
  notes: string;
  duration: number; // in minutes
  sessionType: 'Individual' | 'Group' | 'Workshop';
  status: 'Scheduled' | 'Completed' | 'Cancelled';
}

export const mockStudents: Student[] = [
  {
    id: '1',
    firstName: 'Sarah',
    lastName: 'Johnson',
    email: 'sarah.johnson@email.com',
    careerInterest: 'Software Development',
    dateJoined: '2024-01-15',
    phone: '+1 (555) 123-4567',
    address: '123 Main St, City, State',
    status: 'Active'
  },
  {
    id: '2',
    firstName: 'Michael',
    lastName: 'Chen',
    email: 'michael.chen@email.com',
    careerInterest: 'Data Science',
    dateJoined: '2024-01-20',
    phone: '+1 (555) 234-5678',
    address: '456 Oak Ave, City, State',
    status: 'Active'
  },
  {
    id: '3',
    firstName: 'Emily',
    lastName: 'Davis',
    email: 'emily.davis@email.com',
    careerInterest: 'Healthcare',
    dateJoined: '2024-02-01',
    phone: '+1 (555) 345-6789',
    address: '789 Pine St, City, State',
    status: 'Active'
  },
  {
    id: '4',
    firstName: 'James',
    lastName: 'Wilson',
    email: 'james.wilson@email.com',
    careerInterest: 'Business Administration',
    dateJoined: '2024-02-10',
    phone: '+1 (555) 456-7890',
    address: '321 Elm St, City, State',
    status: 'Active'
  },
  {
    id: '5',
    firstName: 'Maria',
    lastName: 'Rodriguez',
    email: 'maria.rodriguez@email.com',
    careerInterest: 'Engineering',
    dateJoined: '2024-02-15',
    phone: '+1 (555) 567-8901',
    address: '654 Maple Dr, City, State',
    status: 'Active'
  },
  {
    id: '6',
    firstName: 'David',
    lastName: 'Thompson',
    email: 'david.thompson@email.com',
    careerInterest: 'Education',
    dateJoined: '2024-01-05',
    phone: '+1 (555) 678-9012',
    address: '987 Cedar Ln, City, State',
    status: 'Graduated'
  },
  {
    id: '7',
    firstName: 'Lisa',
    lastName: 'Anderson',
    email: 'lisa.anderson@email.com',
    careerInterest: 'Marketing',
    dateJoined: '2024-03-01',
    phone: '+1 (555) 789-0123',
    address: '147 Birch Rd, City, State',
    status: 'Active'
  },
  {
    id: '8',
    firstName: 'Robert',
    lastName: 'Garcia',
    email: 'robert.garcia@email.com',
    careerInterest: 'Software Development',
    dateJoined: '2024-03-05',
    phone: '+1 (555) 890-1234',
    address: '258 Willow St, City, State',
    status: 'Active'
  }
];

export const mockSessions: CounselingSession[] = [
  {
    id: '1',
    studentId: '1',
    counselorName: 'Dr. Patricia Williams',
    sessionDate: '2024-03-15',
    notes: 'Discussed career goals in software development. Student showed strong interest in full-stack development. Recommended JavaScript and React learning path.',
    duration: 60,
    sessionType: 'Individual',
    status: 'Completed'
  },
  {
    id: '2',
    studentId: '1',
    counselorName: 'Dr. Patricia Williams',
    sessionDate: '2024-04-01',
    notes: 'Follow-up session. Student has made good progress with JavaScript fundamentals. Discussed internship opportunities.',
    duration: 45,
    sessionType: 'Individual',
    status: 'Completed'
  },
  {
    id: '3',
    studentId: '2',
    counselorName: 'Prof. Mark Johnson',
    sessionDate: '2024-03-20',
    notes: 'Initial assessment for data science path. Student has strong mathematical background. Recommended Python and statistics courses.',
    duration: 60,
    sessionType: 'Individual',
    status: 'Completed'
  },
  {
    id: '4',
    studentId: '3',
    counselorName: 'Dr. Susan Lee',
    sessionDate: '2024-03-25',
    notes: 'Career exploration in healthcare. Discussed various healthcare roles and education requirements.',
    duration: 50,
    sessionType: 'Individual',
    status: 'Completed'
  },
  {
    id: '5',
    studentId: '4',
    counselorName: 'Ms. Jennifer Brown',
    sessionDate: '2024-04-05',
    notes: 'Business administration career planning. Discussed MBA programs and business internships.',
    duration: 55,
    sessionType: 'Individual',
    status: 'Completed'
  },
  {
    id: '6',
    studentId: '5',
    counselorName: 'Dr. Robert Martinez',
    sessionDate: '2024-04-08',
    notes: 'Engineering career paths discussion. Student interested in mechanical engineering. Reviewed university programs.',
    duration: 60,
    sessionType: 'Individual',
    status: 'Completed'
  },
  {
    id: '7',
    studentId: '2',
    counselorName: 'Prof. Mark Johnson',
    sessionDate: '2024-04-12',
    notes: 'Data science workshop attendance follow-up. Student completed first Python project successfully.',
    duration: 30,
    sessionType: 'Individual',
    status: 'Completed'
  },
  {
    id: '8',
    studentId: '7',
    counselorName: 'Ms. Jennifer Brown',
    sessionDate: '2024-04-15',
    notes: 'Marketing career exploration. Discussed digital marketing trends and certification programs.',
    duration: 45,
    sessionType: 'Individual',
    status: 'Completed'
  },
  {
    id: '9',
    studentId: '8',
    counselorName: 'Dr. Patricia Williams',
    sessionDate: '2024-04-18',
    notes: 'Software development career guidance. Student has previous experience with Python, exploring web development.',
    duration: 60,
    sessionType: 'Individual',
    status: 'Completed'
  },
  {
    id: '10',
    studentId: '1',
    counselorName: 'Dr. Patricia Williams',
    sessionDate: '2024-04-25',
    notes: 'Upcoming session to review portfolio development and job application strategies.',
    duration: 60,
    sessionType: 'Individual',
    status: 'Scheduled'
  }
];

export const careerInterests = [
  'Software Development',
  'Data Science',
  'Healthcare',
  'Business Administration',
  'Engineering',
  'Education',
  'Marketing',
  'Finance',
  'Design',
  'Law',
  'Psychology',
  'Social Work'
];

export const counselors = [
  'Dr. Patricia Williams',
  'Prof. Mark Johnson',
  'Dr. Susan Lee',
  'Ms. Jennifer Brown',
  'Dr. Robert Martinez',
  'Ms. Angela Davis',
  'Dr. Thomas Wilson'
];

// Analytics data
export const getStudentsByCareerInterest = () => {
  const counts: Record<string, number> = {};
  mockStudents.forEach(student => {
    counts[student.careerInterest] = (counts[student.careerInterest] || 0) + 1;
  });
  return Object.entries(counts).map(([name, value]) => ({ name, value }));
};

export const getSessionsByCounselor = () => {
  const counts: Record<string, number> = {};
  mockSessions.forEach(session => {
    counts[session.counselorName] = (counts[session.counselorName] || 0) + 1;
  });
  return Object.entries(counts).map(([name, value]) => ({ name, value }));
};

export const getMonthlySessionsData = () => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  const data = months.map(month => ({
    month,
    sessions: Math.floor(Math.random() * 20) + 10
  }));
  return data;
};
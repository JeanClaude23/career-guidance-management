// Example: How to use the API proxy configuration in your components
// This file shows examples of how to consume your local API through the Vite proxy

import { useState, useEffect } from 'react';
import { cgmisApi, api } from '@/lib/api';

// Example 1: Using the CGMIS API helpers
export function StudentsExample() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        // This will make a request to: http://localhost:8080/api/students
        // Which gets proxied to: http://localhost:3000/students
        const data = await cgmisApi.students.getAll();
        setStudents(data);
      } catch (error) {
        console.error('Failed to fetch students:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  const handleAddStudent = async (studentData: any) => {
    try {
      const newStudent = await cgmisApi.students.create(studentData);
      setStudents(prev => [...prev, newStudent]);
    } catch (error) {
      console.error('Failed to add student:', error);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h2>Students</h2>
      {students.map((student: any) => (
        <div key={student.id}>{student.name}</div>
      ))}
    </div>
  );
}

// Example 2: Using direct API calls
export function DirectApiExample() {
  const [data, setData] = useState(null);

  const fetchData = async () => {
    try {
      // Direct API call using the generic api helper
      const response = await api.get('/some-endpoint');
      setData(response);
    } catch (error) {
      console.error('API call failed:', error);
    }
  };

  return (
    <div>
      <button onClick={fetchData}>Fetch Data</button>
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </div>
  );
}

// Example 3: Database operations
export function DatabaseExample() {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      // This will make a request to: http://localhost:8080/db/query
      // Which gets proxied to: http://localhost:5432/query
      const result = await api.db.query(
        'SELECT * FROM users WHERE active = ?',
        [true]
      );
      setUsers(result);
    } catch (error) {
      console.error('Database query failed:', error);
    }
  };

  return (
    <div>
      <button onClick={fetchUsers}>Fetch Users from DB</button>
      {users.map((user: any) => (
        <div key={user.id}>{user.name}</div>
      ))}
    </div>
  );
}

// Example 4: Authentication
export function AuthExample() {
  const handleLogin = async (email: string, password: string) => {
    try {
      // This will make a request to: http://localhost:8080/auth/login
      // Which gets proxied to: http://localhost:3000/login
      const response = await api.auth.login({ email, password });
      console.log('Login successful:', response);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div>
      <button onClick={() => handleLogin('user@example.com', 'password')}>
        Login
      </button>
    </div>
  );
}
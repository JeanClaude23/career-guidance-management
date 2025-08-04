import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Users, Calendar, TrendingUp, Award } from "lucide-react";
import { mockStudents, mockSessions, getStudentsByCareerInterest, getSessionsByCounselor, getMonthlySessionsData } from "@/data/mockData";

const Dashboard = () => {
  const totalStudents = mockStudents.length;
  const totalSessions = mockSessions.length;
  const activeStudents = mockStudents.filter(s => s.status === 'Active').length;
  const completedSessions = mockSessions.filter(s => s.status === 'Completed').length;

  const careerInterestData = getStudentsByCareerInterest();
  const counselorData = getSessionsByCounselor();
  const monthlyData = getMonthlySessionsData();

  const COLORS = ['#10b981', '#3b82f6', '#8b5cf6', '#f59e0b', '#ef4444', '#06b6d4', '#84cc16'];

  const StatCard = ({ title, value, icon: Icon, description, trend }: {
    title: string;
    value: string | number;
    icon: any;
    description: string;
    trend?: string;
  }) => (
    <Card className="relative overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-foreground">{value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
        {trend && (
          <div className="flex items-center mt-1">
            <TrendingUp className="h-3 w-3 text-success mr-1" />
            <span className="text-xs text-success">{trend}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">
          Overview of the Career Guidance Management System
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Students"
          value={totalStudents}
          icon={Users}
          description="Registered in the system"
          trend="+12% from last month"
        />
        <StatCard
          title="Active Students"
          value={activeStudents}
          icon={Award}
          description="Currently enrolled"
          trend="+8% from last month"
        />
        <StatCard
          title="Total Sessions"
          value={totalSessions}
          icon={Calendar}
          description="Counseling sessions held"
          trend="+15% from last month"
        />
        <StatCard
          title="Completed Sessions"
          value={completedSessions}
          icon={TrendingUp}
          description="Successfully completed"
          trend="+18% from last month"
        />
      </div>

      {/* Charts Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Career Interests Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Students by Career Interest</CardTitle>
            <p className="text-sm text-muted-foreground">
              Distribution of students across different career paths
            </p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={careerInterestData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {careerInterestData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Sessions by Counselor */}
        <Card>
          <CardHeader>
            <CardTitle>Sessions by Counselor</CardTitle>
            <p className="text-sm text-muted-foreground">
              Number of sessions conducted by each counselor
            </p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={counselorData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="name" 
                  angle={-45}
                  textAnchor="end"
                  height={80}
                  fontSize={12}
                />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Monthly Trends */}
      <Card>
        <CardHeader>
          <CardTitle>Monthly Session Trends</CardTitle>
          <p className="text-sm text-muted-foreground">
            Number of counseling sessions conducted each month
          </p>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="sessions" 
                stroke="#10b981" 
                strokeWidth={2}
                dot={{ fill: '#10b981' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <p className="text-sm text-muted-foreground">
            Latest updates in the system
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockSessions.slice(-5).reverse().map((session) => {
              const student = mockStudents.find(s => s.id === session.studentId);
              return (
                <div key={session.id} className="flex items-center space-x-3 p-3 bg-accent/50 rounded-lg">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">
                      Session with {student?.firstName} {student?.lastName}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Counselor: {session.counselorName} • {session.sessionDate}
                    </p>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    session.status === 'Completed' 
                      ? 'bg-success/10 text-success' 
                      : 'bg-warning/10 text-warning'
                  }`}>
                    {session.status}
                  </span>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
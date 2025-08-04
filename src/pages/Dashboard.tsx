import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, AreaChart, Area } from 'recharts';
import { Users, Calendar, TrendingUp, Award, Plus, BookOpen, Clock, Target, ArrowUpRight, Bell, Activity } from "lucide-react";
import { mockStudents, mockSessions, getStudentsByCareerInterest, getSessionsByCounselor, getMonthlySessionsData } from "@/data/mockData";
import { useAuth } from "@/hooks/useAuth";

const Dashboard = () => {
  const { user } = useAuth();
  const totalStudents = mockStudents.length;
  const totalSessions = mockSessions.length;
  const activeStudents = mockStudents.filter(s => s.status === 'Active').length;
  const completedSessions = mockSessions.filter(s => s.status === 'Completed').length;
  const graduatedStudents = mockStudents.filter(s => s.status === 'Graduated').length;
  const inactiveStudents = mockStudents.filter(s => s.status === 'Inactive').length;

  const careerInterestData = getStudentsByCareerInterest();
  const counselorData = getSessionsByCounselor();
  const monthlyData = getMonthlySessionsData();

  const COLORS = ['#10b981', '#3b82f6', '#8b5cf6', '#f59e0b', '#ef4444', '#06b6d4', '#84cc16'];
  
  // Get time-based greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const StatCard = ({ title, value, icon: Icon, description, trend, gradient, percentage }: {
    title: string;
    value: string | number;
    icon: any;
    description: string;
    trend?: string;
    gradient?: string;
    percentage?: number;
  }) => (
    <Card className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient || 'from-blue-500/10 to-blue-600/10'}`} />
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div className={`p-2 rounded-lg bg-gradient-to-br ${gradient || 'from-blue-500 to-blue-600'}`}>
          <Icon className="h-5 w-5 text-white" />
        </div>
      </CardHeader>
      <CardContent className="relative z-10">
        <div className="text-3xl font-bold text-foreground mb-1">{value}</div>
        <p className="text-sm text-muted-foreground mb-2">{description}</p>
        {percentage && (
          <div className="w-full bg-muted rounded-full h-2 mb-2">
            <div 
              className={`h-2 rounded-full bg-gradient-to-r ${gradient || 'from-blue-500 to-blue-600'}`}
              style={{ width: `${percentage}%` }}
            />
          </div>
        )}
        {trend && (
          <div className="flex items-center">
            <ArrowUpRight className="h-4 w-4 text-emerald-500 mr-1" />
            <span className="text-sm font-medium text-emerald-500">{trend}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-8">
      {/* Enhanced Header */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent rounded-xl" />
        <div className="relative p-6 rounded-xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-2">
                {getGreeting()}, {user?.name || user?.email?.split('@')[0] || 'Administrator'}! 👋
              </h1>
              <p className="text-lg text-muted-foreground">
                Here's what's happening in your Career Guidance Management System today
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary text-white shadow-lg">
                <Plus className="h-4 w-4 mr-2" />
                Add Student
              </Button>
              <Button variant="outline" className="border-primary/20 hover:bg-primary/5">
                <Calendar className="h-4 w-4 mr-2" />
                Schedule Session
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Stats Cards */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total Students"
          value={totalStudents}
          icon={Users}
          description="Registered in the system"
          trend="+12% from last month"
          gradient="from-blue-500 to-blue-600"
          percentage={85}
        />
        <StatCard
          title="Active Students"
          value={activeStudents}
          icon={Target}
          description="Currently receiving guidance"
          trend="+8% from last month"
          gradient="from-emerald-500 to-emerald-600"
          percentage={Math.round((activeStudents / totalStudents) * 100)}
        />
        <StatCard
          title="Total Sessions"
          value={totalSessions}
          icon={Calendar}
          description="Counseling sessions conducted"
          trend="+15% from last month"
          gradient="from-purple-500 to-purple-600"
          percentage={92}
        />
        <StatCard
          title="Success Rate"
          value={`${Math.round((completedSessions / totalSessions) * 100)}%`}
          icon={Award}
          description="Sessions completed successfully"
          trend="+18% from last month"
          gradient="from-orange-500 to-orange-600"
          percentage={Math.round((completedSessions / totalSessions) * 100)}
        />
      </div>

      {/* Quick Stats Overview */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-emerald-200 bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-emerald-500 rounded-full">
                <Activity className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-emerald-700 dark:text-emerald-300">Active Students</p>
                <p className="text-2xl font-bold text-emerald-900 dark:text-emerald-100">{activeStudents}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-500 rounded-full">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-blue-700 dark:text-blue-300">Graduated</p>
                <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">{graduatedStudents}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-orange-200 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-orange-500 rounded-full">
                <Clock className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-orange-700 dark:text-orange-300">Pending Sessions</p>
                <p className="text-2xl font-bold text-orange-900 dark:text-orange-100">{totalSessions - completedSessions}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Enhanced Charts Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Career Interests Distribution */}
        <Card className="shadow-lg border-0">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg">
                <Target className="h-5 w-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-xl">Career Interest Distribution</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Student preferences across career paths
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <PieChart>
                <Pie
                  data={careerInterestData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  strokeWidth={2}
                  stroke="#fff"
                >
                  {careerInterestData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'hsl(var(--background))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Sessions by Counselor */}
        <Card className="shadow-lg border-0">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-lg">
                <Users className="h-5 w-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-xl">Counselor Performance</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Sessions conducted by each counselor
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={counselorData} margin={{ bottom: 80 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted))" />
                <XAxis 
                  dataKey="name" 
                  angle={-45}
                  textAnchor="end"
                  height={80}
                  fontSize={12}
                  stroke="hsl(var(--muted-foreground))"
                />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'hsl(var(--background))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Bar 
                  dataKey="value" 
                  fill="url(#colorGradient)"
                  radius={[4, 4, 0, 0]}
                />
                <defs>
                  <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10b981" />
                    <stop offset="100%" stopColor="#059669" />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Enhanced Monthly Trends */}
      <Card className="shadow-lg border-0">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg">
                <TrendingUp className="h-5 w-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-xl">Session Trends & Analytics</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Monthly counseling session activity with growth indicators
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"></div>
                Sessions
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <AreaChart data={monthlyData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorSessions" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.05}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted))" />
              <XAxis 
                dataKey="month" 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'hsl(var(--background))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Area
                type="monotone"
                dataKey="sessions"
                stroke="#3b82f6"
                strokeWidth={3}
                fill="url(#colorSessions)"
                dot={{ fill: '#3b82f6', strokeWidth: 2, r: 6 }}
                activeDot={{ r: 8, stroke: '#3b82f6', strokeWidth: 2 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Enhanced Recent Activity */}
      <Card className="shadow-lg border-0">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg">
                <Bell className="h-5 w-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-xl">Recent Activity</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Latest updates and session activities
                </p>
              </div>
            </div>
            <Button variant="ghost" size="sm" className="text-primary hover:text-primary">
              View All
              <ArrowUpRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockSessions.slice(-5).reverse().map((session, index) => {
              const student = mockStudents.find(s => s.id === session.studentId);
              return (
                <div key={session.id} className="flex items-center space-x-4 p-4 bg-gradient-to-r from-accent/50 to-accent/30 rounded-xl border border-accent hover:shadow-md transition-all duration-200">
                  <div className="relative">
                    <div className={`w-3 h-3 rounded-full ${
                      session.status === 'Completed' ? 'bg-emerald-500' : 'bg-orange-500'
                    }`}></div>
                    {index === 0 && (
                      <div className="absolute -inset-1 w-5 h-5 bg-primary/20 rounded-full animate-ping"></div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-foreground">
                      Session with {student?.firstName} {student?.lastName}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      <span className="font-medium">Counselor:</span> {session.counselorName} • 
                      <span className="font-medium"> Date:</span> {session.sessionDate}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                      session.status === 'Completed' 
                        ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300' 
                        : 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300'
                    }`}>
                      {session.status}
                    </span>
                    {index === 0 && (
                      <span className="px-2 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full">
                        New
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-6 p-4 bg-gradient-to-r from-primary/5 to-primary/10 rounded-xl border border-primary/10">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">System Status</p>
                <p className="text-xs text-muted-foreground">All systems operational</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                <span className="text-xs font-medium text-emerald-600">Online</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  PieChart, 
  Pie, 
  Cell, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  AreaChart, 
  Area,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ComposedChart
} from 'recharts';
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Target, 
  Calendar, 
  Award,
  Download,
  RefreshCw,
  BarChart3,
  Activity,
  Clock,
  CheckCircle,
  AlertCircle,
  Star,
  Briefcase,
  GraduationCap,
  Coffee
} from "lucide-react";
import { mockStudents, mockSessions } from "@/data/mockData";

const Analytics = () => {
  // Calculate advanced metrics
  const totalStudents = mockStudents.length;
  const activeStudents = mockStudents.filter(s => s.status === 'Active').length;
  const graduatedStudents = mockStudents.filter(s => s.status === 'Graduated').length;
  const totalSessions = mockSessions.length;
  const completedSessions = mockSessions.filter(s => s.status === 'Completed').length;
  const successRate = Math.round((completedSessions / totalSessions) * 100);
  const avgSessionsPerStudent = Math.round(totalSessions / totalStudents * 10) / 10;

  // Advanced analytics data
  const satisfactionData = [
    { name: 'Excellent', value: 45, color: '#10b981' },
    { name: 'Good', value: 35, color: '#3b82f6' },
    { name: 'Average', value: 15, color: '#f59e0b' },
    { name: 'Poor', value: 5, color: '#ef4444' }
  ];

  const outcomeData = [
    { name: 'Job Placement', value: 40, color: '#10b981' },
    { name: 'Further Education', value: 30, color: '#3b82f6' },
    { name: 'Entrepreneurship', value: 20, color: '#8b5cf6' },
    { name: 'Still Searching', value: 10, color: '#f59e0b' }
  ];

  const skillsData = [
    { skill: 'Communication', A: 85, B: 90, fullMark: 100 },
    { skill: 'Leadership', A: 75, B: 80, fullMark: 100 },
    { skill: 'Technical', A: 90, B: 85, fullMark: 100 },
    { skill: 'Problem Solving', A: 80, B: 88, fullMark: 100 },
    { skill: 'Teamwork', A: 88, B: 92, fullMark: 100 },
    { skill: 'Creativity', A: 70, B: 75, fullMark: 100 }
  ];

  const trendsData = [
    { month: 'Jan', students: 15, sessions: 45, placements: 8 },
    { month: 'Feb', students: 20, sessions: 60, placements: 12 },
    { month: 'Mar', students: 18, sessions: 54, placements: 10 },
    { month: 'Apr', students: 25, sessions: 75, placements: 15 },
    { month: 'May', students: 22, sessions: 66, placements: 13 },
    { month: 'Jun', students: 28, sessions: 84, placements: 18 }
  ];

  const counselorPerformance = [
    { name: 'Dr. Sarah Johnson', sessions: 45, satisfaction: 4.8, placements: 12 },
    { name: 'Prof. Michael Chen', sessions: 38, satisfaction: 4.6, placements: 10 },
    { name: 'Ms. Emily Davis', sessions: 42, satisfaction: 4.9, placements: 14 },
    { name: 'Dr. James Wilson', sessions: 35, satisfaction: 4.7, placements: 9 }
  ];

  const MetricCard = ({ title, value, change, icon: Icon, color, subtitle }: any) => (
    <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-3xl font-bold text-foreground">{value}</p>
            {subtitle && <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>}
          </div>
          <div className={`p-3 rounded-full bg-gradient-to-r ${color}`}>
            <Icon className="h-6 w-6 text-white" />
          </div>
        </div>
        {change && (
          <div className="flex items-center mt-4">
            {change > 0 ? (
              <TrendingUp className="h-4 w-4 text-emerald-500 mr-1" />
            ) : (
              <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
            )}
            <span className={`text-sm font-medium ${change > 0 ? 'text-emerald-500' : 'text-red-500'}`}>
              {Math.abs(change)}% from last month
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-8">
      {/* Enhanced Header */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-emerald-500/10 rounded-xl" />
        <div className="relative p-6 rounded-xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-2">
                📊 Advanced Analytics
              </h1>
              <p className="text-lg text-muted-foreground">
                Comprehensive insights and performance metrics for your Career Guidance Management System
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg">
                <Download className="h-4 w-4 mr-2" />
                Export Report
              </Button>
              <Button variant="outline" className="border-blue-200 hover:bg-blue-50">
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh Data
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Key Performance Indicators */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          title="Total Students"
          value={totalStudents}
          change={12}
          icon={Users}
          color="from-blue-500 to-blue-600"
          subtitle="Registered students"
        />
        <MetricCard
          title="Success Rate"
          value={`${successRate}%`}
          change={8}
          icon={Target}
          color="from-emerald-500 to-emerald-600"
          subtitle="Completed sessions"
        />
        <MetricCard
          title="Active Sessions"
          value={totalSessions - completedSessions}
          change={-5}
          icon={Calendar}
          color="from-purple-500 to-purple-600"
          subtitle="Ongoing guidance"
        />
        <MetricCard
          title="Placements"
          value={graduatedStudents}
          change={15}
          icon={Award}
          color="from-orange-500 to-orange-600"
          subtitle="Successful placements"
        />
      </div>

      {/* Analytics Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5 lg:w-auto lg:grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="students">Students</TabsTrigger>
          <TabsTrigger value="sessions">Sessions</TabsTrigger>
          <TabsTrigger value="counselors">Counselors</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Student Satisfaction */}
            <Card className="shadow-lg border-0">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-lg">
                    <Star className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <CardTitle>Student Satisfaction</CardTitle>
                    <p className="text-sm text-muted-foreground">Feedback ratings distribution</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={satisfactionData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {satisfactionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Career Outcomes */}
            <Card className="shadow-lg border-0">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg">
                    <Briefcase className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <CardTitle>Career Outcomes</CardTitle>
                    <p className="text-sm text-muted-foreground">Post-guidance career paths</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={outcomeData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {outcomeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Skills Development Radar */}
          <Card className="shadow-lg border-0">
            <CardHeader>
              <div className="flex items-center gap-2">
                <div className="p-2 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg">
                  <Activity className="h-5 w-5 text-white" />
                </div>
                <div>
                  <CardTitle>Skills Development Analysis</CardTitle>
                  <p className="text-sm text-muted-foreground">Before vs After guidance comparison</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <RadarChart data={skillsData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="skill" />
                  <PolarRadiusAxis domain={[0, 100]} />
                  <Radar name="Before" dataKey="A" stroke="#ef4444" fill="#ef4444" fillOpacity={0.1} />
                  <Radar name="After" dataKey="B" stroke="#10b981" fill="#10b981" fillOpacity={0.2} />
                  <Tooltip />
                </RadarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="students" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-3">
            <Card className="lg:col-span-2 shadow-lg border-0">
              <CardHeader>
                <CardTitle>Student Progress Tracking</CardTitle>
                <p className="text-sm text-muted-foreground">Monthly enrollment and graduation trends</p>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <ComposedChart data={trendsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="students" fill="#3b82f6" name="New Students" />
                    <Line type="monotone" dataKey="placements" stroke="#10b981" strokeWidth={3} name="Placements" />
                  </ComposedChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle>Student Statistics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Active Students</span>
                    <span className="font-medium">{activeStudents}</span>
                  </div>
                  <Progress value={(activeStudents / totalStudents) * 100} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Graduated</span>
                    <span className="font-medium">{graduatedStudents}</span>
                  </div>
                  <Progress value={(graduatedStudents / totalStudents) * 100} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Success Rate</span>
                    <span className="font-medium">{successRate}%</span>
                  </div>
                  <Progress value={successRate} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="sessions" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card className="shadow-lg border-0">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg">
                    <Clock className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <CardTitle>Session Analytics</CardTitle>
                    <p className="text-sm text-muted-foreground">Session completion and effectiveness</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
                      <CheckCircle className="h-8 w-8 text-emerald-500 mx-auto mb-2" />
                      <p className="text-2xl font-bold text-emerald-600">{completedSessions}</p>
                      <p className="text-sm text-muted-foreground">Completed</p>
                    </div>
                    <div className="text-center p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                      <AlertCircle className="h-8 w-8 text-orange-500 mx-auto mb-2" />
                      <p className="text-2xl font-bold text-orange-600">{totalSessions - completedSessions}</p>
                      <p className="text-sm text-muted-foreground">Ongoing</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Average Sessions/Student</span>
                      <Badge variant="secondary">{avgSessionsPerStudent}</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Completion Rate</span>
                      <Badge className="bg-emerald-500">{successRate}%</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle>Session Types Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: 'Career Planning', value: 35, color: 'bg-blue-500' },
                    { name: 'Skill Assessment', value: 25, color: 'bg-emerald-500' },
                    { name: 'Resume Review', value: 20, color: 'bg-purple-500' },
                    { name: 'Interview Prep', value: 20, color: 'bg-orange-500' }
                  ].map((item, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">{item.name}</span>
                        <span className="text-sm text-muted-foreground">{item.value}%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div className={`${item.color} h-2 rounded-full`} style={{ width: `${item.value}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="counselors" className="space-y-6">
          <Card className="shadow-lg border-0">
            <CardHeader>
              <div className="flex items-center gap-2">
                <div className="p-2 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-lg">
                  <GraduationCap className="h-5 w-5 text-white" />
                </div>
                <div>
                  <CardTitle>Counselor Performance Dashboard</CardTitle>
                  <p className="text-sm text-muted-foreground">Individual counselor metrics and achievements</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {counselorPerformance.map((counselor, index) => (
                  <div key={index} className="p-4 border rounded-lg hover:bg-accent/50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center">
                          <span className="text-white font-medium text-sm">
                            {counselor.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium">{counselor.name}</p>
                          <p className="text-sm text-muted-foreground">{counselor.sessions} sessions conducted</p>
                        </div>
                      </div>
                      <div className="text-right space-y-1">
                        <div className="flex items-center gap-2">
                          <Star className="h-4 w-4 text-yellow-500" />
                          <span className="text-sm font-medium">{counselor.satisfaction}/5.0</span>
                        </div>
                        <Badge className="bg-emerald-500">{counselor.placements} placements</Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends" className="space-y-6">
          <Card className="shadow-lg border-0">
            <CardHeader>
              <div className="flex items-center gap-2">
                <div className="p-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg">
                  <BarChart3 className="h-5 w-5 text-white" />
                </div>
                <div>
                  <CardTitle>Growth Trends & Forecasting</CardTitle>
                  <p className="text-sm text-muted-foreground">Historical data and future projections</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <AreaChart data={trendsData}>
                  <defs>
                    <linearGradient id="colorStudents" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
                    </linearGradient>
                    <linearGradient id="colorSessions" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Area type="monotone" dataKey="students" stackId="1" stroke="#3b82f6" fill="url(#colorStudents)" />
                  <Area type="monotone" dataKey="sessions" stackId="2" stroke="#10b981" fill="url(#colorSessions)" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Quick Insights */}
      <Card className="shadow-lg border-0 bg-gradient-to-r from-blue-50 to-emerald-50 dark:from-blue-900/20 dark:to-emerald-900/20">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Coffee className="h-5 w-5 text-blue-600" />
            <CardTitle className="text-blue-900 dark:text-blue-100">Quick Insights</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="text-center p-4">
              <p className="text-2xl font-bold text-emerald-600">{avgSessionsPerStudent}</p>
              <p className="text-sm text-muted-foreground">Average sessions per student</p>
            </div>
            <div className="text-center p-4">
              <p className="text-2xl font-bold text-blue-600">4.7</p>
              <p className="text-sm text-muted-foreground">Average satisfaction rating</p>
            </div>
            <div className="text-center p-4">
              <p className="text-2xl font-bold text-purple-600">85%</p>
              <p className="text-sm text-muted-foreground">Goal achievement rate</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Analytics;
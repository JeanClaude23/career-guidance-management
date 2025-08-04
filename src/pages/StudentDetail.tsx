import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  ArrowLeft, 
  Edit, 
  Calendar, 
  Mail, 
  Phone, 
  MapPin, 
  Clock,
  User,
  FileText,
  Plus
} from "lucide-react";
import { mockStudents, mockSessions } from "@/data/mockData";
import AddSessionDialog from "@/components/AddSessionDialog";

const StudentDetail = () => {
  const { id } = useParams();
  const [isAddSessionOpen, setIsAddSessionOpen] = useState(false);
  
  const student = mockStudents.find(s => s.id === id);
  const studentSessions = mockSessions.filter(s => s.studentId === id);

  if (!student) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-2">Student Not Found</h2>
          <p className="text-muted-foreground mb-4">
            The student you're looking for doesn't exist.
          </p>
          <Button asChild>
            <Link to="/students">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Students
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-success/10 text-success border-success/20';
      case 'Inactive':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'Graduated':
        return 'bg-info/10 text-info border-info/20';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getSessionStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-success/10 text-success';
      case 'Scheduled':
        return 'bg-info/10 text-info';
      case 'Cancelled':
        return 'bg-destructive/10 text-destructive';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="sm" asChild>
            <Link to="/students">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Students
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              {student.firstName} {student.lastName}
            </h1>
            <p className="text-muted-foreground">Student ID: {student.id}</p>
          </div>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <Edit className="w-4 h-4 mr-2" />
            Edit Profile
          </Button>
          <Button onClick={() => setIsAddSessionOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Add Session
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Student Information */}
        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="w-5 h-5 mr-2" />
                Student Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-center">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="text-2xl font-bold text-primary">
                    {student.firstName[0]}{student.lastName[0]}
                  </span>
                </div>
              </div>
              
              <div className="text-center">
                <h3 className="font-semibold text-lg">
                  {student.firstName} {student.lastName}
                </h3>
                <Badge className={getStatusColor(student.status)}>
                  {student.status}
                </Badge>
              </div>

              <Separator />

              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">{student.email}</span>
                </div>
                
                {student.phone && (
                  <div className="flex items-center space-x-2">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">{student.phone}</span>
                  </div>
                )}
                
                {student.address && (
                  <div className="flex items-start space-x-2">
                    <MapPin className="w-4 h-4 text-muted-foreground mt-0.5" />
                    <span className="text-sm">{student.address}</span>
                  </div>
                )}
                
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">
                    Joined: {new Date(student.dateJoined).toLocaleDateString()}
                  </span>
                </div>
              </div>

              <Separator />

              <div>
                <h4 className="font-medium mb-2">Career Interest</h4>
                <Badge variant="secondary" className="bg-accent/50">
                  {student.careerInterest}
                </Badge>
              </div>

              <div>
                <h4 className="font-medium mb-2">Progress Summary</h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="text-center p-2 bg-accent/30 rounded">
                    <div className="font-bold text-lg">{studentSessions.length}</div>
                    <div className="text-muted-foreground">Total Sessions</div>
                  </div>
                  <div className="text-center p-2 bg-success/10 rounded">
                    <div className="font-bold text-lg text-success">
                      {studentSessions.filter(s => s.status === 'Completed').length}
                    </div>
                    <div className="text-muted-foreground">Completed</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Session History */}
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center">
                  <FileText className="w-5 h-5 mr-2" />
                  Session History
                </div>
                <Badge variant="outline">
                  {studentSessions.length} Sessions
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {studentSessions.length === 0 ? (
                <div className="text-center py-8">
                  <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-medium mb-2">No Sessions Yet</h3>
                  <p className="text-muted-foreground mb-4">
                    This student hasn't had any counseling sessions yet.
                  </p>
                  <Button onClick={() => setIsAddSessionOpen(true)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Schedule First Session
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {studentSessions
                    .sort((a, b) => new Date(b.sessionDate).getTime() - new Date(a.sessionDate).getTime())
                    .map((session) => (
                    <div key={session.id} className="border rounded-lg p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Calendar className="w-4 h-4 text-muted-foreground" />
                          <span className="font-medium">
                            {new Date(session.sessionDate).toLocaleDateString()}
                          </span>
                          <Badge className={getSessionStatusColor(session.status)}>
                            {session.status}
                          </Badge>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <Clock className="w-3 h-3" />
                          {session.duration} min
                        </div>
                      </div>
                      
                      <div>
                        <p className="font-medium text-sm">Counselor: {session.counselorName}</p>
                        <p className="text-sm text-muted-foreground">
                          Type: {session.sessionType}
                        </p>
                      </div>
                      
                      {session.notes && (
                        <div className="bg-accent/30 rounded p-3">
                          <h4 className="font-medium text-sm mb-1">Session Notes:</h4>
                          <p className="text-sm text-muted-foreground">
                            {session.notes}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      <AddSessionDialog 
        open={isAddSessionOpen}
        onOpenChange={setIsAddSessionOpen}
        studentId={student.id}
        studentName={`${student.firstName} ${student.lastName}`}
      />
    </div>
  );
};

export default StudentDetail;
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { counselors } from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";

interface AddSessionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  studentId: string;
  studentName: string;
}

const AddSessionDialog = ({ open, onOpenChange, studentId, studentName }: AddSessionDialogProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    counselorName: "",
    sessionDate: "",
    sessionType: "",
    duration: "",
    notes: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.counselorName || !formData.sessionDate || !formData.sessionType) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    console.log("Creating session:", { ...formData, studentId });
    
    toast({
      title: "Success",
      description: "Session has been scheduled successfully.",
    });

    setFormData({
      counselorName: "",
      sessionDate: "",
      sessionType: "",
      duration: "",
      notes: "",
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add Counseling Session</DialogTitle>
          <DialogDescription>
            Schedule a new counseling session for {studentName}.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="counselor">Counselor *</Label>
            <Select value={formData.counselorName} onValueChange={(value) => setFormData(prev => ({ ...prev, counselorName: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Select counselor" />
              </SelectTrigger>
              <SelectContent>
                {counselors.map((counselor) => (
                  <SelectItem key={counselor} value={counselor}>
                    {counselor}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="sessionDate">Session Date *</Label>
              <Input
                id="sessionDate"
                type="date"
                value={formData.sessionDate}
                onChange={(e) => setFormData(prev => ({ ...prev, sessionDate: e.target.value }))}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="duration">Duration (minutes)</Label>
              <Input
                id="duration"
                type="number"
                value={formData.duration}
                onChange={(e) => setFormData(prev => ({ ...prev, duration: e.target.value }))}
                placeholder="60"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="sessionType">Session Type *</Label>
            <Select value={formData.sessionType} onValueChange={(value) => setFormData(prev => ({ ...prev, sessionType: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Select session type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Individual">Individual</SelectItem>
                <SelectItem value="Group">Group</SelectItem>
                <SelectItem value="Workshop">Workshop</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Session Notes</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
              placeholder="Add any notes or objectives for this session..."
              rows={3}
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Schedule Session</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddSessionDialog;

import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, X, Eye } from "lucide-react";
import { HospitalRegistration } from "@/lib/types";
import { updateHospitalRegistrationStatus } from "@/lib/api";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";

interface HospitalRegistrationItemProps {
  registration: HospitalRegistration;
  onUpdate: () => void;
}

const HospitalRegistrationItem = ({ registration, onUpdate }: HospitalRegistrationItemProps) => {
  const { toast } = useToast();
  const [isUpdating, setIsUpdating] = useState(false);
  const [currentStatus, setCurrentStatus] = useState(registration.status);
  
  const handleStatusUpdate = async (status: string) => {
    setIsUpdating(true);
    
    try {
      console.log(`Updating hospital registration ${registration.id} status to ${status}`);
      await updateHospitalRegistrationStatus(registration.id, status);
      
      // Update the local state to reflect the change
      setCurrentStatus(status);
      toast({
        title: "Status Updated",
        description: `Hospital registration has been ${status === 'approved' ? 'approved' : 'rejected'}.`,
      });
      
      // Update the parent component data
      onUpdate();
    } catch (error) {
      console.error("Error updating hospital status:", error);
      toast({
        title: "Update Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsUpdating(false);
    }
  };
  
  return (
    <tr>
      <td className="px-4 py-3">{registration.name}</td>
      <td className="px-4 py-3">{registration.contact_person_name}</td>
      <td className="px-4 py-3">{registration.contact_person_email}</td>
      <td className="px-4 py-3">{registration.city}, {registration.state}</td>
      <td className="px-4 py-3">
        {currentStatus !== 'pending' ? (
          currentStatus === 'approved' ? (
            <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300 flex items-center gap-1">
              <Check size={14} /> Approved
            </Badge>
          ) : (
            <Badge variant="outline" className="bg-red-100 text-red-800 border-red-300 flex items-center gap-1">
              <X size={14} /> Rejected
            </Badge>
          )
        ) : (
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              className="bg-green-100 text-green-800 border-green-300 hover:bg-green-200 hover:text-green-900"
              onClick={() => handleStatusUpdate("approved")}
              disabled={isUpdating}
            >
              {isUpdating ? "Processing..." : "Approve"}
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="bg-red-100 text-red-800 border-red-300 hover:bg-red-200 hover:text-red-900"
              onClick={() => handleStatusUpdate("rejected")}
              disabled={isUpdating}
            >
              {isUpdating ? "Processing..." : "Reject"}
            </Button>
          </div>
        )}
      </td>
      <td className="px-4 py-3">
        <Dialog>
          <DialogTrigger asChild>
            <Button size="sm" variant="ghost">
              <Eye size={16} className="mr-1" /> Details
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Hospital Registration Details</DialogTitle>
              <DialogDescription>
                Complete information for {registration.name}
              </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4 py-4">
              {registration.registration_number && (
                <div>
                  <h4 className="font-medium text-sm">Registration Number</h4>
                  <p>{registration.registration_number}</p>
                </div>
              )}
              <div>
                <h4 className="font-medium text-sm">Contact Person</h4>
                <p>{registration.contact_person_name}</p>
              </div>
              <div>
                <h4 className="font-medium text-sm">Contact Email</h4>
                <p>{registration.contact_person_email}</p>
              </div>
              <div>
                <h4 className="font-medium text-sm">Contact Phone</h4>
                <p>{registration.contact_person_phone}</p>
              </div>
              <div>
                <h4 className="font-medium text-sm">Address</h4>
                <p>{registration.address}</p>
              </div>
              <div>
                <h4 className="font-medium text-sm">Location</h4>
                <p>{registration.city}, {registration.state}, {registration.pincode}</p>
              </div>
              {registration.blood_bank_registration_number && (
                <div>
                  <h4 className="font-medium text-sm">Blood Bank Registration No.</h4>
                  <p>{registration.blood_bank_registration_number}</p>
                </div>
              )}
              <div className="col-span-2">
                <h4 className="font-medium text-sm">Collaboration Details</h4>
                <p className="whitespace-pre-wrap">{registration.collaboration_details}</p>
              </div>
              {registration.specific_requirements && (
                <div className="col-span-2">
                  <h4 className="font-medium text-sm">Specific Requirements</h4>
                  <p className="whitespace-pre-wrap">{registration.specific_requirements}</p>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </td>
    </tr>
  );
};

export default HospitalRegistrationItem;

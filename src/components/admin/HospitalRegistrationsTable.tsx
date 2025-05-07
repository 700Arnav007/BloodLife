
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { HospitalRegistration } from "@/lib/types";
import HospitalRegistrationItem from "./HospitalRegistrationItem";

interface HospitalRegistrationsTableProps {
  registrations: HospitalRegistration[];
  onStatusUpdate: () => void;
}

const HospitalRegistrationsTable = ({ registrations, onStatusUpdate }: HospitalRegistrationsTableProps) => {
  return (
    <div className="rounded-md border overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Hospital Name</TableHead>
            <TableHead>Contact Person</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {registrations.length === 0 ? (
            <TableRow>
              <td colSpan={6} className="text-center py-4 text-muted-foreground">
                No hospital registrations found
              </td>
            </TableRow>
          ) : (
            registrations.map((registration) => (
              <HospitalRegistrationItem
                key={registration.id}
                registration={registration}
                onUpdate={onStatusUpdate}
              />
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default HospitalRegistrationsTable;

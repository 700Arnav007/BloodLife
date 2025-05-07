
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { NgoRegistration } from "@/lib/types";
import NgoRegistrationItem from "./NgoRegistrationItem";

interface NgoRegistrationsTableProps {
  registrations: NgoRegistration[];
  onStatusUpdate: () => void;
}

const NgoRegistrationsTable = ({ registrations, onStatusUpdate }: NgoRegistrationsTableProps) => {
  return (
    <div className="rounded-md border overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>NGO Name</TableHead>
            <TableHead>Registration Type</TableHead>
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
              <td colSpan={7} className="text-center py-4 text-muted-foreground">
                No NGO registrations found
              </td>
            </TableRow>
          ) : (
            registrations.map((registration) => (
              <NgoRegistrationItem
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

export default NgoRegistrationsTable;

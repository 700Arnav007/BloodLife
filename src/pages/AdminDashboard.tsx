
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { 
  getAllDonors, 
  getAllPatients, 
  getAllMatches, 
  getAllNgoRegistrations,
  getAllHospitalRegistrations
} from "@/lib/api";
import { 
  Donor, 
  Patient, 
  DonationMatch, 
  NgoRegistration,
  HospitalRegistration
} from "@/lib/types";
import AppLayout from "@/components/layout/AppLayout";
import NgoRegistrationsTable from "@/components/admin/NgoRegistrationsTable";
import HospitalRegistrationsTable from "@/components/admin/HospitalRegistrationsTable";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  LogOut, 
  Users, 
  UserRound, 
  Droplet, 
  Building2,
  Building,
  AlertTriangle 
} from "lucide-react";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [donors, setDonors] = useState<Donor[]>([]);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [matches, setMatches] = useState<DonationMatch[]>([]);
  const [ngoRegistrations, setNgoRegistrations] = useState<NgoRegistration[]>([]);
  const [hospitalRegistrations, setHospitalRegistrations] = useState<HospitalRegistration[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdmin") === "true";
    if (!isAdmin) {
      toast({
        title: "Access Denied",
        description: "You must be an admin to view this page.",
        variant: "destructive"
      });
      navigate('/admin-login');
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      try {
        const [donorsData, patientsData, matchesData, ngoData, hospitalData] = await Promise.all([
          getAllDonors(),
          getAllPatients(),
          getAllMatches(),
          getAllNgoRegistrations(),
          getAllHospitalRegistrations()
        ]);
        
        setDonors(donorsData);
        setPatients(patientsData);
        setMatches(matchesData);
        setNgoRegistrations(ngoData);
        setHospitalRegistrations(hospitalData);
        
        console.log("Donors fetched:", donorsData);
        console.log("Patients fetched:", patientsData);
        console.log("Matches fetched:", matchesData);
        console.log("NGO registrations fetched:", ngoData);
        console.log("Hospital registrations fetched:", hospitalData);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast({
          title: "Error",
          description: "Failed to fetch data. Please try again.",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate, toast]);

  const handleRefreshRegistrations = async () => {
    try {
      console.log("Refreshing registration data...");
      const [ngoData, hospitalData] = await Promise.all([
        getAllNgoRegistrations(),
        getAllHospitalRegistrations()
      ]);
      
      console.log("Refreshed NGO data:", ngoData);
      console.log("Refreshed Hospital data:", hospitalData);
      
      setNgoRegistrations(ngoData);
      setHospitalRegistrations(hospitalData);
      toast({
        title: "Data Refreshed",
        description: "Registration data has been updated.",
      });
    } catch (error) {
      console.error("Error refreshing registrations:", error);
      toast({
        title: "Error",
        description: "Failed to refresh data. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    toast({
      title: "Logged Out",
      description: "You have been logged out of the admin dashboard.",
    });
    navigate('/');
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'fulfilled':
      case 'completed':
        return <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">Completed</Badge>;
      case 'pending':
      default:
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-300">Pending</Badge>;
    }
  };

  const getUrgencyBadge = (urgency: string) => {
    switch (urgency) {
      case 'low':
        return <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">Low</Badge>;
      case 'medium':
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-300">Medium</Badge>;
      case 'high':
        return <Badge variant="outline" className="bg-red-100 text-red-800 border-red-300">High</Badge>;
      default:
        return <Badge variant="outline">{urgency}</Badge>;
    }
  };

  const pendingNgoCount = ngoRegistrations.filter(r => r.status === 'pending').length;
  const pendingHospitalCount = hospitalRegistrations.filter(r => r.status === 'pending').length;
  const totalPendingRegistrations = pendingNgoCount + pendingHospitalCount;

  return (
    <AppLayout>
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-primary">Admin Dashboard</h1>
          <Button variant="destructive" size="sm" onClick={handleLogout}>
            <LogOut size={16} className="mr-2" />
            Logout
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium flex items-center">
                <Users size={18} className="mr-2 text-primary" />
                Total Donors
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{donors.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium flex items-center">
                <UserRound size={18} className="mr-2 text-primary" />
                Total Patients
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{patients.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium flex items-center">
                <Droplet size={18} className="mr-2 text-primary" />
                Total Matches
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{matches.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium flex items-center">
                <Building2 size={18} className="mr-2 text-primary" />
                NGO Partners
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{ngoRegistrations.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium flex items-center">
                <Building size={18} className="mr-2 text-primary" />
                Hospital Partners
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{hospitalRegistrations.length}</div>
            </CardContent>
          </Card>
        </div>

        {loading ? (
          <div className="text-center py-10">
            <div className="blood-drop mx-auto h-16 w-16 text-primary animate-pulse">
              <AlertTriangle size={64} />
            </div>
            <p className="mt-4 text-gray-600">Loading data...</p>
          </div>
        ) : (
          <Tabs defaultValue="matches">
            <TabsList className="grid w-full grid-cols-5 mb-8">
              <TabsTrigger value="matches">Donation Matches</TabsTrigger>
              <TabsTrigger value="donors">Donors</TabsTrigger>
              <TabsTrigger value="patients">Patients</TabsTrigger>
              <TabsTrigger value="ngos" className="relative">
                NGO Partners
                {pendingNgoCount > 0 ? (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    {pendingNgoCount}
                  </span>
                ) : (
                  <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300 ml-2">
                    All Processed
                  </Badge>
                )}
              </TabsTrigger>
              <TabsTrigger value="hospitals" className="relative">
                Hospital Partners
                {pendingHospitalCount > 0 ? (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    {pendingHospitalCount}
                  </span>
                ) : (
                  <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300 ml-2">
                    All Processed
                  </Badge>
                )}
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="matches">
              <Card>
                <CardHeader>
                  <CardTitle>Donation Matches</CardTitle>
                  <CardDescription>
                    Complete list of all blood donation matches in the system
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Match Date</TableHead>
                          <TableHead>Donor Name</TableHead>
                          <TableHead>Blood Type</TableHead>
                          <TableHead>Patient Name</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Donation Date</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {matches.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={6} className="text-center py-4 text-muted-foreground">
                              No donation matches found
                            </TableCell>
                          </TableRow>
                        ) : (
                          matches.map((match) => (
                            <TableRow key={match.id}>
                              <TableCell>
                                {new Date(match.match_date).toLocaleDateString()}
                              </TableCell>
                              <TableCell>
                                {match.donor_user?.users?.name}
                              </TableCell>
                              <TableCell>
                                <Badge variant="outline" className="font-semibold">
                                  {match.donor?.blood_type}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                {match.patient_user?.users?.name}
                              </TableCell>
                              <TableCell>
                                <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">
                                  Completed
                                </Badge>
                              </TableCell>
                              <TableCell>
                                {match.donation_date ? new Date(match.donation_date).toLocaleDateString() : 'N/A'}
                              </TableCell>
                            </TableRow>
                          ))
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="donors">
              <Card>
                <CardHeader>
                  <CardTitle>Registered Donors</CardTitle>
                  <CardDescription>
                    Complete list of all registered blood donors
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Phone</TableHead>
                          <TableHead>City</TableHead>
                          <TableHead>Blood Type</TableHead>
                          <TableHead>Last Donation</TableHead>
                          <TableHead>Available</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {donors.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={7} className="text-center py-4 text-muted-foreground">
                              No donors found
                            </TableCell>
                          </TableRow>
                        ) : (
                          donors.map((donor) => (
                            <TableRow key={donor.id}>
                              <TableCell>{donor.users?.name}</TableCell>
                              <TableCell>{donor.users?.email}</TableCell>
                              <TableCell>{donor.users?.phone}</TableCell>
                              <TableCell>{donor.users?.city}</TableCell>
                              <TableCell>
                                <Badge variant="outline" className="font-semibold">
                                  {donor.blood_type}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                {donor.last_donation ? new Date(donor.last_donation).toLocaleDateString() : 'Never'}
                              </TableCell>
                              <TableCell>
                                {donor.is_available ? (
                                  <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">
                                    Available
                                  </Badge>
                                ) : (
                                  <Badge variant="outline" className="bg-red-100 text-red-800 border-red-300">
                                    Unavailable
                                  </Badge>
                                )}
                              </TableCell>
                            </TableRow>
                          ))
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="patients">
              <Card>
                <CardHeader>
                  <CardTitle>Patient Requests</CardTitle>
                  <CardDescription>
                    Complete list of all patient blood requests
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Phone</TableHead>
                          <TableHead>City</TableHead>
                          <TableHead>Blood Type</TableHead>
                          <TableHead>Requested Date</TableHead>
                          <TableHead>Urgency</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {patients.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={8} className="text-center py-4 text-muted-foreground">
                              No patient requests found
                            </TableCell>
                          </TableRow>
                        ) : (
                          patients.map((patient) => (
                            <TableRow key={patient.id}>
                              <TableCell>{patient.users?.name}</TableCell>
                              <TableCell>{patient.users?.email}</TableCell>
                              <TableCell>{patient.users?.phone}</TableCell>
                              <TableCell>{patient.users?.city}</TableCell>
                              <TableCell>
                                <Badge variant="outline" className="font-semibold">
                                  {patient.blood_type}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                {patient.requested_date ? new Date(patient.requested_date).toLocaleDateString() : 'N/A'}
                              </TableCell>
                              <TableCell>
                                {getUrgencyBadge(patient.urgency)}
                              </TableCell>
                              <TableCell>
                                {getStatusBadge(patient.request_status)}
                              </TableCell>
                            </TableRow>
                          ))
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="ngos">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>NGO Partner Registrations</CardTitle>
                    <CardDescription>
                      Manage NGO registration applications
                    </CardDescription>
                  </div>
                  {pendingNgoCount > 0 ? (
                    <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-300 ml-2">
                      {pendingNgoCount} Pending
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300 ml-2">
                      All Processed
                    </Badge>
                  )}
                </CardHeader>
                <CardContent>
                  <NgoRegistrationsTable 
                    registrations={ngoRegistrations} 
                    onStatusUpdate={handleRefreshRegistrations} 
                  />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="hospitals">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Hospital Partner Registrations</CardTitle>
                    <CardDescription>
                      Manage hospital registration applications
                    </CardDescription>
                  </div>
                  {pendingHospitalCount > 0 ? (
                    <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-300 ml-2">
                      {pendingHospitalCount} Pending
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300 ml-2">
                      All Processed
                    </Badge>
                  )}
                </CardHeader>
                <CardContent>
                  <HospitalRegistrationsTable 
                    registrations={hospitalRegistrations} 
                    onStatusUpdate={handleRefreshRegistrations} 
                  />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        )}
      </div>
    </AppLayout>
  );
};

export default AdminDashboard;

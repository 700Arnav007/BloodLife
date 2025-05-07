
import AppLayout from "@/components/layout/AppLayout";
import NgoRegistrationForm from "@/components/partner/NgoRegistrationForm";

const NgoRegister = () => {
  return (
    <AppLayout>
      <div className="container mx-auto py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-primary">NGO Registration</h1>
          <p className="mb-8 text-gray-600">
            Join our platform as an NGO partner to collaborate in blood donation drives and community health initiatives.
          </p>
          <NgoRegistrationForm />
        </div>
      </div>
    </AppLayout>
  );
};

export default NgoRegister;

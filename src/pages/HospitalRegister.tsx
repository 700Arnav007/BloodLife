
import AppLayout from "@/components/layout/AppLayout";
import HospitalRegistrationForm from "@/components/partner/HospitalRegistrationForm";

const HospitalRegister = () => {
  return (
    <AppLayout>
      <div className="container mx-auto py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-primary">Hospital Registration</h1>
          <p className="mb-8 text-gray-600">
            Partner with us to streamline blood donation requirements and improve patient care through our platform.
          </p>
          <HospitalRegistrationForm />
        </div>
      </div>
    </AppLayout>
  );
};

export default HospitalRegister;

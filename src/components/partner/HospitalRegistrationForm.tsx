
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { createHospitalRegistration } from "@/lib/api";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const formSchema = z.object({
  name: z.string().min(3, { message: "Hospital name must be at least 3 characters" }),
  registrationNumber: z.string().optional(),
  contactPersonName: z.string().min(3, { message: "Contact person name is required" }),
  contactPersonEmail: z.string().email({ message: "Please provide a valid email address" }),
  contactPersonPhone: z.string().min(10, { message: "Please provide a valid phone number" }),
  address: z.string().min(5, { message: "Address is required" }),
  city: z.string().min(2, { message: "City is required" }),
  state: z.string().min(2, { message: "State is required" }),
  pincode: z.string().min(5, { message: "Valid pincode is required" }),
  bloodBankRegistrationNumber: z.string().optional(),
  collaborationDetails: z.string().min(10, { message: "Please describe how you plan to use our platform" }),
  specificRequirements: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const HospitalRegistrationForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      registrationNumber: "",
      contactPersonName: "",
      contactPersonEmail: "",
      contactPersonPhone: "",
      address: "",
      city: "",
      state: "",
      pincode: "",
      bloodBankRegistrationNumber: "",
      collaborationDetails: "",
      specificRequirements: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    try {
      const result = await createHospitalRegistration(
        data.name,
        data.contactPersonName,
        data.contactPersonEmail,
        data.contactPersonPhone,
        data.address,
        data.city,
        data.state,
        data.pincode,
        data.collaborationDetails,
        data.registrationNumber,
        data.bloodBankRegistrationNumber,
        data.specificRequirements
      );

      if (result) {
        setIsSuccess(true);
        toast.success("Hospital registration submitted successfully");
        form.reset();
      } else {
        toast.error("Failed to submit registration");
      }
    } catch (error) {
      console.error("Error submitting hospital registration:", error);
      toast.error("An error occurred while submitting your registration");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl text-primary">Hospital Registration</CardTitle>
        <CardDescription>
          Register your hospital to collaborate with us for blood donation services
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isSuccess ? (
          <div className="py-6 text-center">
            <h3 className="text-lg font-semibold text-green-600 mb-2">Registration Submitted!</h3>
            <p className="mb-4">Thank you for registering your hospital. We will review your application and contact you soon.</p>
            <Button onClick={() => setIsSuccess(false)}>Register Another Hospital</Button>
          </div>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Hospital Details</h3>
                
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Hospital Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter hospital name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="registrationNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Registration Number (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter registration number if applicable" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Contact Person Details</h3>
                
                <FormField
                  control={form.control}
                  name="contactPersonName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contact Person's Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter contact person's name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="contactPersonEmail"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Contact Person's Email</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="Enter email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="contactPersonPhone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Contact Person's Phone</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter phone number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Address Details</h3>
                
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter address" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>City</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter city" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="state"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>State</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter state" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="pincode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Pincode</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter pincode" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Blood Bank Information</h3>
                
                <FormField
                  control={form.control}
                  name="bloodBankRegistrationNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Blood Bank Registration Number (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter blood bank registration number if applicable" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Collaboration Details</h3>
                
                <FormField
                  control={form.control}
                  name="collaborationDetails"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>How do you plan to use our platform?</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Describe how you plan to collaborate" 
                          className="min-h-[100px]" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="specificRequirements"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Any specific requirements or needs (Optional)</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Describe any specific requirements" 
                          className="min-h-[100px]" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit Registration"}
              </Button>
            </form>
          </Form>
        )}
      </CardContent>
    </Card>
  );
};

export default HospitalRegistrationForm;

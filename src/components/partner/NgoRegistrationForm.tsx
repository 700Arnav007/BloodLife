
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { createNgoRegistration } from "@/lib/api";
import { NgoRegistrationType } from "@/lib/types";

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const formSchema = z.object({
  name: z.string().min(3, { message: "Organization name must be at least 3 characters" }),
  registrationType: z.enum(["trust", "society", "section_8_company"], {
    required_error: "Please select a registration type",
  }),
  registrationNumber: z.string().min(3, { message: "Registration number is required" }),
  contactPersonName: z.string().min(3, { message: "Contact person name is required" }),
  contactPersonEmail: z.string().email({ message: "Please provide a valid email address" }),
  contactPersonPhone: z.string().min(10, { message: "Please provide a valid phone number" }),
  address: z.string().min(5, { message: "Address is required" }),
  city: z.string().min(2, { message: "City is required" }),
  state: z.string().min(2, { message: "State is required" }),
  pincode: z.string().min(5, { message: "Valid pincode is required" }),
  certificate12a: z.string().optional(),
  certificate80g: z.string().optional(),
  panNumber: z.string().min(10, { message: "Valid PAN number is required" }),
  activitiesDescription: z.string().min(10, { message: "Please describe your NGO's activities" }),
  collaborationPlan: z.string().min(10, { message: "Please describe how you plan to collaborate" }),
});

type FormValues = z.infer<typeof formSchema>;

const NgoRegistrationForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      registrationType: undefined,
      registrationNumber: "",
      contactPersonName: "",
      contactPersonEmail: "",
      contactPersonPhone: "",
      address: "",
      city: "",
      state: "",
      pincode: "",
      certificate12a: "",
      certificate80g: "",
      panNumber: "",
      activitiesDescription: "",
      collaborationPlan: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    try {
      const result = await createNgoRegistration(
        data.name,
        data.registrationType as NgoRegistrationType,
        data.registrationNumber,
        data.contactPersonName,
        data.contactPersonEmail,
        data.contactPersonPhone,
        data.address,
        data.city,
        data.state,
        data.pincode,
        data.panNumber,
        data.activitiesDescription,
        data.collaborationPlan,
        data.certificate12a,
        data.certificate80g
      );

      if (result) {
        setIsSuccess(true);
        toast.success("NGO registration submitted successfully");
        form.reset();
      } else {
        toast.error("Failed to submit registration");
      }
    } catch (error) {
      console.error("Error submitting NGO registration:", error);
      toast.error("An error occurred while submitting your registration");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl text-primary">NGO Registration</CardTitle>
        <CardDescription>
          Register your NGO to collaborate with us for blood donation events
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isSuccess ? (
          <div className="py-6 text-center">
            <h3 className="text-lg font-semibold text-green-600 mb-2">Registration Submitted!</h3>
            <p className="mb-4">Thank you for registering your NGO. We will review your application and contact you soon.</p>
            <Button onClick={() => setIsSuccess(false)}>Register Another NGO</Button>
          </div>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Organization Details</h3>
                
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>NGO Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter NGO name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="registrationType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Registration Type</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select registration type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="trust">Trust</SelectItem>
                            <SelectItem value="society">Society</SelectItem>
                            <SelectItem value="section_8_company">Section 8 Company</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="registrationNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Registration Number</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter registration number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
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
                <h3 className="text-lg font-semibold">Certifications and Compliance</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="certificate12a"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>12A Certificate Number (Optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter 12A certificate" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="certificate80g"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>80G Certificate Number (Optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter 80G certificate" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="panNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>PAN Number</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter PAN number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Purpose and Activities</h3>
                
                <FormField
                  control={form.control}
                  name="activitiesDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Brief Description of NGO's Activities</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Describe your NGO's activities" 
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
                  name="collaborationPlan"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>How do you plan to collaborate with our platform?</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Describe your collaboration plans" 
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

export default NgoRegistrationForm;

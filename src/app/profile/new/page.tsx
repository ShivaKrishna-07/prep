"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useUser } from "@clerk/nextjs";
import { ArrowLeft, GraduationCap, Mail, MonitorSmartphone, User } from "lucide-react";
import Loader from "@/components/ui/Loader";

export default function NewProfilePage() {
  const router = useRouter();
  const { user, isLoaded } = useUser();
  
  const [formData, setFormData] = useState({
    collegeName: "Vignana Bharathi Institute of technology",
    collegeOther: "",
    year: "1st year",
    department: "CSE"
  });
  
  const [isOtherCollege, setIsOtherCollege] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name === "collegeName" && value === "other") {
      setIsOtherCollege(true);
      setFormData(prev => ({ ...prev, [name]: value }));
    } else if (name === "collegeName" && value !== "other") {
      setIsOtherCollege(false);
      setFormData(prev => ({ ...prev, [name]: value, collegeOther: "" }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    try {
      // Determine the actual college name to save
      const collegeNameToSave = formData.collegeName === "other" ? formData.collegeOther : formData.collegeName;
      
      if (formData.collegeName === "other" && !formData.collegeOther.trim()) {
        throw new Error("Please enter your college name");
      }
      
      const response = await fetch('/api/profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          collegeName: collegeNameToSave,
          year: formData.year,
          department: formData.department
        })
      });
      
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Something went wrong');
      }
      
      router.push('/profile');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save profile');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 space-y-6">
      {/* Top header with title and back button */}
      <div className="flex items-center w-full gap-3">
        <button
          onClick={() => router.push("/")}
          className="md:hidden p-2 rounded-md border border-border cursor-pointer transition"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-2xl w-full mr-10 md:mr-0 text-center font-semibold">
          Complete Your Profile
        </h1>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="flex flex-col md:flex-row gap-6 h-full">
          {/* Left - Profile Info */}
          <div className="w-full md:w-1/3 rounded-lg shadow-custom dark:border dark:border-border p-6 flex justify-center items-center">
            <div className="flex flex-col items-center gap-4">
              <Image
                alt="user"
                src={user?.imageUrl ?? "/user.webp"}
                width={100}
                height={100}
                className="w-24 h-24 rounded-full"
              />
              <h2 className="text-xl capitalize text-center">{user?.fullName}</h2>
            </div>
          </div>

          {/* Right - Info Card */}
          <div className="w-full md:w-2/3 md:shadow-custom dark:md:border dark:md:border-borderrounded-lg flex flex-col rounded-lg justify-between">
            <div className="rounded-lg shadow-custom md:shadow-none md:border-none dark:border dark:border-border p-6 h-full">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <InfoField
                  label="Name"
                  icon={<User className="w-5 h-5 text-muted" />}
                  value={user?.fullName ?? ""}
                  readOnly={true}
                />
                <InfoField
                  label="Email"
                  icon={<Mail className="w-5 h-5 text-muted" />}
                  value={user?.emailAddresses?.[0]?.emailAddress ?? ""}
                  readOnly={true}
                />
                
                <div>
                  <label className="text-sm text-muted block mb-1">College Name</label>
                  <div className="flex items-center gap-2 bg-primary-bg rounded-md px-3 py-2 border border-border">
                    <GraduationCap className="w-5 h-5 text-muted" />
                    <select
                      name="collegeName"
                      value={formData.collegeName}
                      onChange={handleChange}
                      className="w-full bg-transparent border-none outline-none"
                    >
                      <option value="Vignana Bharathi Institute of technology">Vignana Bharathi Institute of technology</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
                
                {isOtherCollege && (
                  <div>
                    <label className="text-sm text-muted block mb-1">Other College Name</label>
                    <div className="flex items-center gap-2 bg-primary-bg rounded-md px-3 py-2 border border-border">
                      <GraduationCap className="w-5 h-5 text-muted" />
                      <input
                        type="text"
                        name="collegeOther"
                        value={formData.collegeOther}
                        onChange={handleChange}
                        placeholder="Enter your college name"
                        className="w-full bg-transparent border-none outline-none"
                        required={isOtherCollege}
                      />
                    </div>
                  </div>
                )}
                
                <div>
                  <label className="text-sm text-muted block mb-1">Department</label>
                  <div className="flex items-center gap-2 bg-primary-bg rounded-md px-3 py-2 border border-border">
                    <MonitorSmartphone className="w-5 h-5 text-muted" />
                    <select
                      name="department"
                      value={formData.department}
                      onChange={handleChange}
                      className="w-full bg-transparent border-none outline-none"
                    >
                      <option value="CSE">CSE</option>
                      <option value="IT">IT</option>
                      <option value="CSD">CSD</option>
                      <option value="CSM">CSM</option>
                      <option value="CSC">CSC</option>
                      <option value="Civil">Civil</option>
                      <option value="Mechanical">Mechanical</option>
                      <option value="ECE">ECE</option>
                      <option value="EEE">EEE</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="text-sm text-muted block mb-1">Year</label>
                  <div className="flex items-center gap-2 bg-primary-bg rounded-md px-3 py-2 border border-border">
                    <GraduationCap className="w-5 h-5 text-muted" />
                    <select
                      name="year"
                      value={formData.year}
                      onChange={handleChange}
                      className="w-full bg-transparent border-none outline-none"
                    >
                      <option value="1st year">1st year</option>
                      <option value="2nd year">2nd year</option>
                      <option value="3rd year">3rd year</option>
                      <option value="4th year">4th year</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end gap-4 mt-4 md:mb-4 md:mr-6">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-blue-600 text-white px-6 py-2 rounded-md flex items-center justify-center gap-2 hover:bg-blue-700 transition disabled:opacity-50"
              >
                {isSubmitting ? 'Saving...' : 'Save Profile'}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

const InfoField = ({
  label,
  icon,
  value,
  readOnly = false,
}: {
  label: string;
  icon: React.ReactNode;
  value: string;
  readOnly?: boolean;
}) => (
  <div>
    <label className="text-sm text-muted block mb-1">{label}</label>
    <div className="flex items-center gap-2 bg-primary-bg rounded-md px-3 py-2 border border-border">
      {icon}
      <input
        type="text"
        value={value}
        className="w-full bg-transparent border-none outline-none"
        readOnly={readOnly}
      />
    </div>
  </div>
);
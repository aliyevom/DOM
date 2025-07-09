"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { PlusCircle, MinusCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useHome } from "@/hooks/use-home"
import emailjs from '@emailjs/browser'
import { useRouter } from "next/navigation"

interface ChildInfo {
  name: string
  age: string
  interests: string
  school: string
  selectedCourse?: string
}

interface FormErrors {
  fullName?: string
  phone?: string
  email?: string
  address?: string
  children?: { name?: string; age?: string }[]
  schedule?: string
  selectedTimeSlot?: string
  selectedCourse?: string
  selectedPlan?: string
}

interface PackageDetails {
  name: string;
  sessions: string;
  price: string;
}

interface Application {
  studentName: string;
  studentAge: number;
  course: string;
  preferredTime: string;
  experience: string;
  specialNeeds: string;
  parentName: string;
  email: string;
  phone: string;
  emergencyContact: {
    name: string;
    relation: string;
    phone: string;
  };
  package: PackageDetails;
  id: string;
  status: string;
  createdAt: string;
}

interface TimeSlot {
  id: string;
  label: string;
}

interface ScheduleOption {
  id: string;
  label: string;
  timeSlots?: TimeSlot[];
  icon?: React.ReactNode;
  description?: string;
}

interface SelectedSchedule {
  scheduleId: string;
  timeSlots: string[];
}

export default function ApplicationSection() {
  const { toast } = useToast()
  const { stats } = useHome()
  const [parentType, setParentType] = useState("mom")
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [address, setAddress] = useState("")
  const [children, setChildren] = useState<ChildInfo[]>([{ name: "", age: "", interests: "", school: "" }])
  const [selectedSchedules, setSelectedSchedules] = useState<SelectedSchedule[]>([])
  const [selectedCourse, setSelectedCourse] = useState("")
  const [selectedPlan, setSelectedPlan] = useState("")
  const [agreement, setAgreement] = useState(false)
  const [confirmation, setConfirmation] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<FormErrors>({})
  const [mounted, setMounted] = useState(false)
  const router = useRouter()
  const [courseAssignments, setCourseAssignments] = useState<{[key: string]: string}>({})

  const scheduleOptions: ScheduleOption[] = [
    { 
      id: "weekday-early", 
      label: "Weekday Early",
      description: "Perfect for after-school learning",
      timeSlots: [
        { id: "3pm-4pm", label: "3:00 PM - 4:00 PM" },
        { id: "4pm-5pm", label: "4:00 PM - 5:00 PM" }
      ]
    },
    { 
      id: "weekday-late", 
      label: "Weekday Late",
      description: "Ideal for evening study sessions",
      timeSlots: [
        { id: "5pm-6pm", label: "5:00 PM - 6:00 PM" },
        { id: "6pm-7pm", label: "6:00 PM - 7:00 PM" }
      ]
    },
    { 
      id: "saturday-morning", 
      label: "Saturday Morning",
      description: "Start your weekend with learning",
      timeSlots: [
        { id: "10am-11am", label: "10:00 AM - 11:00 AM" },
        { id: "11am-12pm", label: "11:00 AM - 12:00 PM" }
      ]
    },
    { 
      id: "saturday-afternoon", 
      label: "Saturday Afternoon",
      description: "Flexible weekend learning option",
      timeSlots: [
        { id: "12pm-1pm", label: "12:00 PM - 1:00 PM" },
        { id: "1pm-2pm", label: "1:00 PM - 2:00 PM" },
        { id: "2pm-3pm", label: "2:00 PM - 3:00 PM" }
      ]
    }
  ];

  useEffect(() => {
    setMounted(true)
  }, [])

  const addChild = () => {
    setChildren([...children, { name: "", age: "", interests: "", school: "" }])
  }

  const removeChild = (index: number) => {
    if (children.length > 1) {
      const newChildren = [...children]
      newChildren.splice(index, 1)
      setChildren(newChildren)
    }
  }

  const updateChild = (index: number, field: keyof ChildInfo, value: string) => {
    const newChildren = [...children]
    newChildren[index] = { ...newChildren[index], [field]: value }
    setChildren(newChildren)
  }

  const handleScheduleSelect = (scheduleId: string) => {
    setSelectedSchedules(prev => {
      const isSelected = prev.some(s => s.scheduleId === scheduleId);
      if (isSelected) {
        // Remove the schedule if it's already selected
        return prev.filter(s => s.scheduleId !== scheduleId);
      } else {
        // Add the schedule with empty time slots
        return [...prev, { scheduleId, timeSlots: [] }];
      }
    });
  };

  const handleTimeSlotSelect = (scheduleId: string, timeSlotId: string) => {
    setSelectedSchedules(prev => {
      return prev.map(schedule => {
        if (schedule.scheduleId === scheduleId) {
          const hasTimeSlot = schedule.timeSlots.includes(timeSlotId);
          const updatedTimeSlots = hasTimeSlot
            ? schedule.timeSlots.filter(id => id !== timeSlotId)
            : [...schedule.timeSlots, timeSlotId];
          return { ...schedule, timeSlots: updatedTimeSlots };
        }
        return schedule;
      });
    });
  };

  const isScheduleSelected = (scheduleId: string) => {
    return selectedSchedules.some(s => s.scheduleId === scheduleId);
  };

  const isTimeSlotSelected = (scheduleId: string, timeSlotId: string) => {
    const schedule = selectedSchedules.find(s => s.scheduleId === scheduleId);
    return schedule?.timeSlots.includes(timeSlotId) || false;
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    // Validate full name
    if (!fullName.trim()) {
      newErrors.fullName = "Full name is required"
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email.trim()) {
      newErrors.email = "Email is required"
    } else if (!emailRegex.test(email)) {
      newErrors.email = "Invalid email format"
    }

    // Validate phone
    const phoneRegex = /^\+?[1-9]\d{9,14}$/
    if (!phone.trim()) {
      newErrors.phone = "Phone number is required"
    } else if (!phoneRegex.test(phone.replace(/\D/g, ''))) {
      newErrors.phone = "Invalid phone number format"
    }

    // Validate address
    if (!address.trim()) {
      newErrors.address = "Address is required"
    }

    // Validate children
    const childrenErrors: { name?: string; age?: string }[] = []
    let hasChildErrors = false
    children.forEach((child, index) => {
      const childError: { name?: string; age?: string } = {}
      if (!child.name.trim()) {
        childError.name = "Child's name is required"
        hasChildErrors = true
      }
      if (!child.age.trim()) {
        childError.age = "Child's age is required"
        hasChildErrors = true
      } else if (isNaN(Number(child.age)) || Number(child.age) < 6 || Number(child.age) > 16) {
        childError.age = "Sorry, our student's age must be between 6-16"
        hasChildErrors = true
      }
      childrenErrors[index] = childError
    })
    if (hasChildErrors) {
      newErrors.children = childrenErrors
    }

    // Validate course selections
    const unassignedChildren = children.filter(child => !courseAssignments[child.name]);
    if (unassignedChildren.length > 0) {
      newErrors.selectedCourse = `Please select courses for: ${unassignedChildren.map(child => child.name || 'unnamed child').join(', ')}`;
    }

    // Validate schedule selections
    if (selectedSchedules.length === 0) {
      newErrors.schedule = "Please select at least one schedule";
    } else {
      const hasTimeSlots = selectedSchedules.every(schedule => schedule.timeSlots.length > 0);
      if (!hasTimeSlots) {
        newErrors.schedule = "Please select at least one time slot for each selected schedule";
      }
    }

    // Validate plan selection
    if (!selectedPlan) {
      newErrors.selectedPlan = "Please select a course package"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      toast({
        title: "Form Validation Error",
        description: "Please check all required fields and correct any errors.",
        variant: "destructive",
      });
      return;
    }

    if (!agreement || !confirmation) {
      toast({
        title: "Agreement Required",
        description: "Please accept both agreements to continue.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Verify environment variables
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
      const adminTemplateId = process.env.NEXT_PUBLIC_EMAILJS_ADMIN_TEMPLATE_ID;
      const userTemplateId = process.env.NEXT_PUBLIC_EMAILJS_USER_TEMPLATE_ID;

      if (!publicKey || !serviceId || !adminTemplateId || !userTemplateId) {
        throw new Error("EmailJS configuration is incomplete. Please check environment variables.");
      }

      // Initialize EmailJS
      try {
        emailjs.init(publicKey);
        console.log('EmailJS initialized successfully');
      } catch (initError: any) {
        console.error('EmailJS initialization error:', initError);
        throw new Error(`Failed to initialize EmailJS: ${initError.message}`);
      }

      // Get package details
      const packageDetails = {
        entry: { name: "DOM: Entry Vision", sessions: "2x/Week", price: "$289" },
        mid: { name: "DOM: Mid Vision", sessions: "3x/Week", price: "$389" },
        fast: { name: "DOM: Fast Vision", sessions: "4x/Week", price: "$489" }
      }[selectedPlan] as PackageDetails;

      if (!packageDetails) {
        throw new Error("Invalid package selection");
      }

      // Build students table
      const studentsTable = `
        <table style="width:100%; border-collapse: collapse; margin-bottom: 15px;">
          <tr style="background-color: #f8f9fa;">
            <th style="border:1px solid #ccc; padding:8px;">Name</th>
            <th style="border:1px solid #ccc; padding:8px;">Age</th>
            <th style="border:1px solid #ccc; padding:8px;">Selected Course</th>
            <th style="border:1px solid #ccc; padding:8px;">Interests</th>
            <th style="border:1px solid #ccc; padding:8px;">School</th>
          </tr>
          ${children.map(child => `
            <tr>
              <td style="border:1px solid #ccc; padding:8px;">${child.name || 'N/A'}</td>
              <td style="border:1px solid #ccc; padding:8px;">${child.age || 'N/A'}</td>
              <td style="border:1px solid #ccc; padding:8px;">${courseAssignments[child.name] || 'Not selected'}</td>
              <td style="border:1px solid #ccc; padding:8px;">${child.interests || 'N/A'}</td>
              <td style="border:1px solid #ccc; padding:8px;">${child.school || 'N/A'}</td>
            </tr>
          `).join('')}
        </table>
      `.trim();

      // Format schedules
      const formattedSchedules = selectedSchedules.map(schedule => {
        const scheduleOption = scheduleOptions.find(opt => opt.id === schedule.scheduleId);
        const timeSlots = schedule.timeSlots.map(slotId => {
          const slot = scheduleOption?.timeSlots?.find(ts => ts.id === slotId);
          return slot?.label || '';
        });
        return {
          main_schedule: scheduleOption?.label || '',
          specific_times: timeSlots,
        };
      });

      // Build schedules table
      const schedulesTable = `
        <table style="width:100%; border-collapse: collapse; margin-bottom: 15px;">
          <tr style="background-color: #f8f9fa;">
            <th style="border:1px solid #ccc; padding:8px;">Schedule</th>
            <th style="border:1px solid #ccc; padding:8px;">Time Slots</th>
          </tr>
          ${formattedSchedules.map(schedule => `
            <tr>
              <td style="border:1px solid #ccc; padding:8px;">${schedule.main_schedule}</td>
              <td style="border:1px solid #ccc; padding:8px;">${schedule.specific_times.join(', ')}</td>
            </tr>
          `).join('')}
        </table>
      `.trim();

      // Calculate pricing
      const numStudents = children.length;
      const pricePerStudent = Number(packageDetails.price.replace(/[^0-9.]/g, ""));
      const totalPrice = pricePerStudent * numStudents;
      const totalPriceFormatted = `$${totalPrice}`;

      // Generate application ID
      const applicationId = Math.floor(100000 + Math.random() * 900000).toString();

      // Prepare email template data
      const formatScheduleSpan = (text: string) => 
        `<span style="background-color: #dbeafe; color: #1d4ed8; padding: 4px 8px; border-radius: 9999px; font-size: 14px;">${text}</span>`;

      const formatTimeSpan = (text: string) =>
        `<span style="background-color: #e0e7ff; color: #4338ca; padding: 4px 8px; border-radius: 9999px; font-size: 14px;">${text}</span>`;

      // Format schedules summary HTML
      const schedulesSummaryHtml = `
        <div style="margin-top: 15px; padding: 10px; background-color: #fff; border-radius: 6px; border: 1px solid #e5e7eb;">
          <p style="margin: 0 0 8px 0;"><strong>Schedule Summary:</strong></p>
          <div style="display: flex; flex-wrap: wrap; gap: 8px;">
            ${formattedSchedules.map(s => formatScheduleSpan(s.main_schedule)).join('')}
          </div>
          
          <p style="margin: 8px 0;"><strong>Time Slots:</strong></p>
          <div style="display: flex; flex-wrap: wrap; gap: 8px;">
            ${formattedSchedules.flatMap(s => s.specific_times.map(formatTimeSpan)).join('')}
          </div>
        </div>
      `;

      const emailTemplateData = {
        // Basic Information
        to_name: fullName || 'N/A',
        from_name: "DOM Tech Academy",
        reply_to: email || 'N/A',
        email: email || 'N/A',
        
        // Parent/Guardian Information
        parent_name: fullName || 'N/A',
        parent_email: email || 'N/A',
        parent_phone: phone || 'N/A',
        parent_type: parentType || 'N/A',
        
        // Emergency Contact
        emergency_name: fullName || 'N/A',
        emergency_relation: parentType || 'N/A',
        emergency_phone: phone || 'N/A',
        
        // Package Information
        package_name: packageDetails?.name || 'N/A',
        package_sessions: packageDetails?.sessions || 'N/A',
        package_price: packageDetails?.price || 'N/A',
        
        // Student Information
        num_students: String(numStudents),
        total_price: totalPriceFormatted,
        
        // Application Details
        application_id: applicationId,
        status: "Pending",
        submitted_date: new Date().toLocaleString(),
        
        // Tables and HTML content
        students_table: studentsTable,
        schedules_table: schedulesTable,
        schedules_summary: schedulesSummaryHtml,
        
        // Schedule Information (as plain text)
        main_schedules: formattedSchedules.map(s => s.main_schedule).join(', ') || 'No schedules selected',
        specific_times: formattedSchedules.map(s => s.specific_times.join(', ')).join('; ') || 'No time slots selected',
        
        // Course Information
        selected_courses: Object.entries(courseAssignments)
          .map(([student, course]) => `${student}: ${course}`)
          .join('\n') || 'No courses selected',

        // Arrays as strings (for template compatibility)
        main_schedules_array: JSON.stringify(formattedSchedules.map(s => s.main_schedule)),
        specific_times_array: JSON.stringify(formattedSchedules.flatMap(s => s.specific_times))
      };

      // Log sanitized template data for debugging
      console.log('Email template data:', {
        ...emailTemplateData,
        students_table: '[HTML Content]',
        schedules_table: '[HTML Content]',
        schedules_summary: '[HTML Content]'
      });

      // Send admin notification
      try {
        const adminResponse = await emailjs.send(
          serviceId,
          adminTemplateId,
          {
            ...emailTemplateData,
            template_type: 'admin'
          }
        );
        console.log('Admin email sent successfully:', adminResponse);
      } catch (adminError: any) {
        console.error('Admin email sending failed:', {
          error: adminError,
          template: 'admin',
          templateId: adminTemplateId,
          data: emailTemplateData
        });
        throw new Error(`Failed to send admin notification: ${adminError.message}`);
      }

      // Send user confirmation
      try {
        const userResponse = await emailjs.send(
          serviceId,
          userTemplateId,
          {
            ...emailTemplateData,
            template_type: 'user'
          }
        );
        console.log('User email sent successfully:', userResponse);
      } catch (userError: any) {
        console.error('User email sending failed:', {
          error: userError,
          template: 'user',
          templateId: userTemplateId,
          data: emailTemplateData
        });
        throw new Error(`Failed to send user confirmation: ${userError.message}`);
      }

      // Show success message
      toast({
        title: "Success",
        description: "Your application has been submitted successfully!",
        variant: "default",
      });

      // Redirect after success
      setTimeout(() => {
        window.location.href = `/application-submitted?id=${applicationId}&name=${encodeURIComponent(fullName)}`;
      }, 1500);

    } catch (error: any) {
      console.error('Application submission error:', {
        error,
        message: error.message,
        stack: error.stack,
        name: error.name,
        text: error.text
      });

      // Show more specific error message
      toast({
        title: "Error",
        description: error.message || "Failed to submit application. Please try again or contact support.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCourseSelection = (childName: string, courseName: string) => {
    setCourseAssignments(prev => ({
      ...prev,
      [childName]: courseName
    }));
  };

  const getCourseStatusText = (courseName: string) => {
    const assignedChildren = Object.entries(courseAssignments)
      .filter(([_, course]) => course === courseName)
      .map(([childName]) => childName);
    
    if (assignedChildren.length > 0) {
      return `Selected for: ${assignedChildren.join(", ")}`;
    }
    return "";
  };

  return (
    <div className="flex flex-col min-h-screen p-4 pb-24 sm:pb-4 relative">
      {/* Background gradient - visible on all screens */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50/80 via-indigo-50/40 to-white/60"></div>

      {/* Background shapes - only render when mounted and on desktop */}
      {mounted && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none hidden md:block">
          {/* Larger soft cloud-like shapes with subtle animations */}
          <motion.div
            className="absolute rounded-full bg-blue-200/50 backdrop-blur-3xl"
            style={{ width: "50%", height: "50%", left: "-15%", top: "-15%" }}
            animate={{
              x: [0, 15, 0],
              y: [0, 10, 0],
              scale: [1, 1.05, 1],
              opacity: [0.5, 0.6, 0.5],
            }}
            transition={{
              duration: 20,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          />

          {/* Top right cloud */}
          <motion.div
            className="absolute rounded-full bg-indigo-200/40 backdrop-blur-3xl"
            style={{ width: "45%", height: "45%", right: "-10%", top: "0%" }}
            animate={{
              x: [0, -20, 0],
              y: [0, 15, 0],
              scale: [1, 1.05, 1],
              opacity: [0.4, 0.5, 0.4],
            }}
            transition={{
              duration: 25,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          />
        </div>
      )}

      {/* Content wrapper */}
      <div className="w-full max-w-6xl mx-auto relative z-10">
        <div className="text-center my-8">
          <h2 className="text-2xl font-bold text-primary">Application Form</h2>
          <p className="text-gray-600 mt-2">Join DOM Tech Academy today</p>
        </div>

        <Card className="w-full max-w-4xl mx-auto">
          <CardHeader>
            
            <CardDescription>Please fill out all the required information below</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <Card className="bg-white shadow-sm">
                <CardHeader>
                  <CardTitle>Parent Information</CardTitle>
                  <CardDescription>Please provide your contact details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="parentType">Parent Type</Label>
                    <RadioGroup
                      value={parentType}
                      onValueChange={setParentType}
                      className="flex space-x-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="mom" id="mom" />
                        <Label htmlFor="mom">Mom</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="dad" id="dad" />
                        <Label htmlFor="dad">Dad</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="guardian" id="guardian" />
                        <Label htmlFor="guardian">Guardian</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name *</Label>
                    <Input
                      id="fullName"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className={errors.fullName ? "border-red-500" : ""}
                    />
                    {errors.fullName && (
                      <p className="text-sm text-red-500">{errors.fullName}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={errors.email ? "border-red-500" : ""}
                    />
                    {errors.email && (
                      <p className="text-sm text-red-500">{errors.email}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="(123) 345-6789"
                      className={errors.phone ? "border-red-500" : ""}
                    />
                    {errors.phone && (
                      <p className="text-sm text-red-500">{errors.phone}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Address *</Label>
                    <Textarea
                      id="address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className={errors.address ? "border-red-500" : ""}
                    />
                    {errors.address && (
                      <p className="text-sm text-red-500">{errors.address}</p>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-sm">
                <CardHeader>
                  <CardTitle>Children Information</CardTitle>
                  <CardDescription>Please provide details about your children</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {children.map((child, index) => (
                    <div key={index} className="p-4 border rounded-lg space-y-4">
                      <div className="flex justify-between items-center">
                        <h4 className="font-medium">Child {index + 1}</h4>
                        {children.length > 1 && (
                          <Button type="button" variant="ghost" size="sm" onClick={() => removeChild(index)}>
                            <MinusCircle className="h-4 w-4 mr-1" />
                            Remove
                          </Button>
                        )}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor={`child-name-${index}`}>Name</Label>
                          <Input
                            id={`child-name-${index}`}
                            value={child.name}
                            onChange={(e) => updateChild(index, "name", e.target.value)}
                            placeholder="Child's name"
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor={`child-age-${index}`}>Age</Label>
                          <Input
                            id={`child-age-${index}`}
                            value={child.age}
                            onChange={(e) => updateChild(index, "age", e.target.value)}
                            placeholder="Child's age"
                            required
                            type="number"
                            min="6"
                            max="16"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor={`child-interests-${index}`}>Daily Interests (3-4 words)</Label>
                          <Input
                            id={`child-interests-${index}`}
                            value={child.interests}
                            onChange={(e) => updateChild(index, "interests", e.target.value)}
                            placeholder="e.g. Math, Coding, Art"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor={`child-school-${index}`}>Current School</Label>
                          <Input
                            id={`child-school-${index}`}
                            value={child.school}
                            onChange={(e) => updateChild(index, "school", e.target.value)}
                            placeholder="School name"
                          />
                        </div>
                      </div>
                    </div>
                  ))}

                  <Button type="button" variant="outline" onClick={addChild} className="w-full">
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Add Another Child
                  </Button>
                </CardContent>
              </Card>

              {/* Course Selection */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Course Selection</h3>
                <p className="text-sm text-gray-500">Choose courses for each child</p>
                
                {/* Course Assignment Summary */}
                <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
                  <h4 className="text-sm font-semibold text-blue-800 mb-2">Course Assignments</h4>
                  <div className="space-y-2">
                    {children.map((child, index) => (
                      <div key={index} className="flex flex-col space-y-2">
                        <p className="text-sm font-medium text-blue-700">{child.name || `Child ${index + 1}`}</p>
                        <div className="flex flex-wrap gap-2">
                          {stats?.upcomingCourses.map((course) => (
                            <button
                              key={`${index}-${course.id}`}
                              onClick={() => handleCourseSelection(child.name, course.name)}
                              className={`px-3 py-1.5 text-xs rounded-full transition-all ${
                                courseAssignments[child.name] === course.name
                                  ? "bg-blue-600 text-white"
                                  : "bg-white border border-blue-200 text-blue-600 hover:bg-blue-50"
                              }`}
                            >
                              {course.name.split(" (")[0]}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Available Courses */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {stats?.upcomingCourses.map((course) => (
                    <div
                      key={course.id}
                      className="relative rounded-lg border p-4 bg-white"
                    >
                      <div className="flex items-center gap-2">
                        <div>
                          <span className="font-medium">{course.name.split(" (")[0]}</span>
                          <span className="ml-2 inline-flex items-center rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-700">
                            {course.name.split(" (")[1]?.replace(")", "")}
                          </span>
                        </div>
                      </div>
                      <p className="text-sm text-blue-600 mt-2">{course.availableSeats} seats available</p>
                      {getCourseStatusText(course.name) && (
                        <p className="text-sm text-green-600 mt-1">
                          {getCourseStatusText(course.name)}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Schedule Selection */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Schedule Selection</h3>
                <p className="text-sm text-gray-500">Choose your preferred schedules and time slots (you can select multiple)</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {scheduleOptions.map((option) => (
                    <div key={option.id} className="relative">
                      <div
                        className={`
                          relative rounded-xl border-2 p-6 cursor-pointer transition-all
                          ${isScheduleSelected(option.id)
                            ? "border-blue-600 bg-blue-50/50"
                            : "border-gray-200 hover:border-blue-200 hover:bg-gray-50/50"
                          }
                        `}
                        onClick={() => handleScheduleSelect(option.id)}
                      >
                        {/* Header */}
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h4 className="font-semibold text-gray-900">{option.label}</h4>
                            <p className="text-sm text-gray-500 mt-1">{option.description}</p>
                          </div>
                          <div
                            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center
                              ${isScheduleSelected(option.id) ? "border-blue-600 bg-blue-600" : "border-gray-300"}
                            `}
                          >
                            {isScheduleSelected(option.id) && (
                              <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                            )}
                          </div>
                        </div>

                        {/* Time Slots */}
                        {isScheduleSelected(option.id) && option.timeSlots && (
                          <div className="mt-4 space-y-2 animate-in fade-in slide-in-from-top-4 duration-300">
                            <p className="text-sm font-medium text-gray-700 mb-2">Select Time Slots (multiple allowed):</p>
                            <div className="grid grid-cols-2 gap-2">
                              {option.timeSlots.map((slot) => (
                                <div
                                  key={slot.id}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleTimeSlotSelect(option.id, slot.id);
                                  }}
                                  className={`
                                    p-3 rounded-lg border transition-all cursor-pointer
                                    ${isTimeSlotSelected(option.id, slot.id)
                                      ? "border-blue-600 bg-blue-100 text-blue-700"
                                      : "border-gray-200 hover:border-blue-200 hover:bg-blue-50"
                                    }
                                  `}
                                >
                                  <div className="flex items-center gap-2">
                                    <div
                                      className={`w-3 h-3 rounded-full border flex items-center justify-center
                                        ${isTimeSlotSelected(option.id, slot.id) ? "border-blue-600 bg-blue-600" : "border-gray-300"}
                                      `}
                                    >
                                      {isTimeSlotSelected(option.id, slot.id) && (
                                        <div className="w-1.5 h-1.5 rounded-full bg-white" />
                                      )}
                                    </div>
                                    <span className="text-sm font-medium">{slot.label}</span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Selection indicator */}
                        {isScheduleSelected(option.id) && (
                          <div className="absolute -top-2 -right-2">
                            <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg">
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                {errors.schedule && (
                  <p className="text-sm text-red-500 mt-1">{errors.schedule}</p>
                )}

                {/* Selected Schedules Summary */}
                {selectedSchedules.length > 0 && (
                  <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <h4 className="text-sm font-semibold text-gray-900 mb-2">Selected Schedules:</h4>
                    <div className="space-y-2">
                      {selectedSchedules.map((selected) => {
                        const scheduleOption = scheduleOptions.find(opt => opt.id === selected.scheduleId);
                        return (
                          <div key={selected.scheduleId} className="flex flex-col">
                            <span className="text-sm font-medium text-gray-700">{scheduleOption?.label}</span>
                            <span className="text-sm text-gray-500">
                              {selected.timeSlots.map(slotId => 
                                scheduleOption?.timeSlots?.find(ts => ts.id === slotId)?.label
                              ).join(', ') || 'No time slots selected'}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* Pricing Selection */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Course Package Selection</h3>
                <p className="text-sm text-gray-500">Choose your preferred course package</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { id: "entry", name: "DOM: Entry Vision", price: 289, sessions: "2x/Week", color: "from-blue-500 to-blue-600" },
                    { id: "mid", name: "DOM: Mid Vision", price: 389, sessions: "3x/Week", color: "from-indigo-500 to-indigo-600" },
                    { id: "fast", name: "DOM: Fast Vision", price: 489, sessions: "4x/Week", color: "from-violet-500 to-violet-600" }
                  ].map((plan) => (
                    <div
                      key={plan.id}
                      className="group relative"
                      onClick={() => setSelectedPlan(plan.id)}
                    >
                      {/* Connection line effect */}
                      <div className="absolute bottom-0 left-1/2 w-0.5 h-8 bg-gradient-to-b from-transparent to-blue-500/20 transform -translate-x-1/2 translate-y-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      
                      {/* Floating schedule badge */}
                      <div className="absolute -top-2.5 left-4 z-20">
                        <div className={`px-3 py-1 rounded-full bg-gradient-to-r ${plan.color} shadow-lg`}>
                          <p className="text-xs tracking-wider font-medium text-white">{plan.sessions}</p>
                        </div>
                      </div>

                      {/* Main card */}
                      <div 
                        className={`relative bg-white rounded-2xl overflow-hidden cursor-pointer transition-all ${
                          selectedPlan === plan.id 
                            ? "border-2 border-blue-600 shadow-lg" 
                            : "border border-gray-200 hover:border-blue-200"
                        }`}
                      >
                        {/* Top gradient bar */}
                        <div className={`h-1.5 bg-gradient-to-r ${plan.color}`} />
                        
                        <div className="p-5">
                          <div className="md:block flex items-center justify-between w-full">
                            {/* Course name */}
                            <h3 className="text-[15px] md:text-xl tracking-tight font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent whitespace-nowrap">
                              {plan.name}
                            </h3>

                            {/* Price with animated background */}
                            <div className="md:mt-3 relative flex items-baseline">
                              <span className="text-xl md:text-4xl tracking-tight font-extrabold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                                ${plan.price}
                              </span>
                              <span className="ml-1 md:ml-2 text-xs md:text-sm font-medium text-gray-500 tracking-wide">/monthly</span>
                            </div>
                          </div>
                        </div>

                        {/* Selection indicator */}
                        {selectedPlan === plan.id && (
                          <div className="absolute top-2 right-2">
                            <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center">
                              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Hover effect */}
                      <div className={`absolute inset-0 bg-gradient-to-r ${plan.color} rounded-2xl opacity-0 
                        group-hover:opacity-5 transition-opacity duration-300 pointer-events-none`} />
                    </div>
                  ))}
                </div>
                {errors.selectedPlan && (
                  <p className="text-sm text-red-500 mt-1">{errors.selectedPlan}</p>
                )}
              </div>

              <Card>
                <CardContent className="pt-6 space-y-4">
                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="agreement"
                      checked={agreement}
                      onCheckedChange={(checked) => setAgreement(checked as boolean)}
                    />
                    <div className="grid gap-1.5 leading-none">
                      <Label
                        htmlFor="agreement"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        I agree to the terms and conditions
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        By checking this box, you agree to our Terms of Service and Privacy Policy.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="confirmation"
                      checked={confirmation}
                      onCheckedChange={(checked) => setConfirmation(checked as boolean)}
                    />
                    <div className="grid gap-1.5 leading-none">
                      <Label
                        htmlFor="confirmation"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Information provided is correct
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        I confirm that all the information provided in this form is accurate and complete.
                      </p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? "Submitting..." : "Submit Application"}
                  </Button>
                </CardFooter>
              </Card>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}


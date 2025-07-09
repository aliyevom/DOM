"use client"

import { CourseScheduleTable } from "./course-schedule-table"

type CourseLevel = "Beginner" | "Intermediate" | "Advanced";

interface CourseWeek {
  week: number;
  title: string;
  description: string;
  level: CourseLevel;
}

const preCodingData: CourseWeek[] = [
  {
    week: 1,
    title: "Meet LEGO EV3 & Build a Simple Bot",
    description: "Introduction to robotics and first build",
    level: "Beginner" as CourseLevel,
  },
  {
    week: 2,
    title: "First Moves: Forward & Backward",
    description: "Basic movement programming",
    level: "Beginner" as CourseLevel,
  },
  {
    week: 3,
    title: "Turning Left/Right",
    description: "Directional control and navigation",
    level: "Beginner" as CourseLevel,
  },
  {
    week: 4,
    title: "Loops: Repeat Movements",
    description: "Introduction to programming loops",
    level: "Beginner" as CourseLevel,
  },
  {
    week: 5,
    title: "Touch Sensor: React to Collisions",
    description: "Basic sensor integration",
    level: "Beginner" as CourseLevel,
  },
  {
    week: 6,
    title: "Color Sensor: Follow a Line",
    description: "Advanced sensor usage",
    level: "Intermediate" as CourseLevel,
  },
  {
    week: 7,
    title: "Sound & Light Effects",
    description: "Multi-sensor programming",
    level: "Intermediate" as CourseLevel,
  },
  {
    week: 8,
    title: "Mini-Challenge: Dance Robot",
    description: "Combining movements and sensors",
    level: "Intermediate" as CourseLevel,
  },
  {
    week: 9,
    title: "Obstacle Course: Step-by-Step Code",
    description: "Complex navigation programming",
    level: "Advanced" as CourseLevel,
  },
  {
    week: 10,
    title: "Team Project: Relay Race Robots",
    description: "Collaborative robotics challenge",
    level: "Advanced" as CourseLevel,
  },
  {
    week: 11,
    title: "Debugging Robot Errors",
    description: "Problem-solving and optimization",
    level: "Advanced" as CourseLevel,
  },
  {
    week: 12,
    title: "Final Showcase: Robot Talent Show",
    description: "Project presentation and demonstration",
    level: "Advanced" as CourseLevel,
  },
]

const pythonData: CourseWeek[] = [
  {
    week: 1,
    title: "Python Basics: Syntax & Variables",
    description: "Introduction to Python programming",
    level: "Beginner" as CourseLevel,
  },
  {
    week: 2,
    title: "User Input & Simple Calculations",
    description: "Basic input/output operations",
    level: "Beginner" as CourseLevel,
  },
  {
    week: 3,
    title: "Conditional Statements (If/Else)",
    description: "Decision making in programming",
    level: "Beginner" as CourseLevel,
  },
  {
    week: 4,
    title: "Loops: For & While",
    description: "Iteration and control flow",
    level: "Intermediate" as CourseLevel,
  },
  {
    week: 5,
    title: "Functions: Reusable Code",
    description: "Creating modular programs",
    level: "Intermediate" as CourseLevel,
  },
  {
    week: 6,
    title: "Lists and Data Collections",
    description: "Working with data structures",
    level: "Intermediate" as CourseLevel,
  },
  {
    week: 7,
    title: "Basic EV3 Robotics Setup",
    description: "Connecting Python with EV3",
    level: "Intermediate" as CourseLevel,
  },
  {
    week: 8,
    title: "Sensors & Feedback (EV3)",
    description: "Robot sensor programming",
    level: "Advanced" as CourseLevel,
  },
  {
    week: 9,
    title: "Loop Integration with EV3 Movements",
    description: "Advanced robot control",
    level: "Advanced" as CourseLevel,
  },
  {
    week: 10,
    title: "Conditional Robotics (Obstacle Avoidance)",
    description: "Smart robot behavior",
    level: "Advanced" as CourseLevel,
  },
  {
    week: 11,
    title: "Functions for Modular Robotics Code",
    description: "Building complex robot programs",
    level: "Advanced" as CourseLevel,
  },
  {
    week: 12,
    title: "Final Project: EV3 Maze Solver",
    description: "Comprehensive robot challenge",
    level: "Advanced" as CourseLevel,
  },
]

const arduinoData: CourseWeek[] = [
  {
    week: 1,
    title: "Arduino Basics: Setup & Blink LED",
    description: "Introduction to Arduino",
    level: "Beginner" as CourseLevel,
  },
  {
    week: 2,
    title: "Digital Input: Buttons & Switches",
    description: "Basic input handling",
    level: "Beginner" as CourseLevel,
  },
  {
    week: 3,
    title: "Analog Sensors: Potentiometers",
    description: "Working with analog signals",
    level: "Intermediate" as CourseLevel,
  },
  {
    week: 4,
    title: "PWM: Fading LEDs & Motor Control",
    description: "Pulse width modulation",
    level: "Intermediate" as CourseLevel,
  },
  {
    week: 5,
    title: "Servo Motors: Angle Control",
    description: "Precise motor control",
    level: "Intermediate" as CourseLevel,
  },
  {
    week: 6,
    title: "Ultrasonic Sensor: Distance Detection",
    description: "Advanced sensor integration",
    level: "Advanced" as CourseLevel,
  },
  {
    week: 7,
    title: "LCD Display: Output Messages",
    description: "Working with displays",
    level: "Advanced" as CourseLevel,
  },
  {
    week: 8,
    title: "Temperature Sensor Project",
    description: "Environmental monitoring",
    level: "Advanced" as CourseLevel,
  },
  {
    week: 9,
    title: "Bluetooth Module: Wireless Control",
    description: "Remote device control",
    level: "Advanced" as CourseLevel,
  },
  {
    week: 10,
    title: "Build a Smart Fan System",
    description: "Automated control systems",
    level: "Advanced" as CourseLevel,
  },
  {
    week: 11,
    title: "Security System Project",
    description: "Complex system integration",
    level: "Advanced" as CourseLevel,
  },
  {
    week: 12,
    title: "Final Project: Arduino Smart Car",
    description: "Comprehensive project",
    level: "Advanced" as CourseLevel,
  },
]

const midRoboticsData: CourseWeek[] = [
  {
    week: 1,
    title: "Meet LEGO EV3: Build a Simple Bot",
    description: "Intro to EV3 parts, basic assembly",
    level: "Beginner" as CourseLevel,
  },
  {
    week: 2,
    title: "First Moves: Forward & Backward",
    description: "Motor programming basics",
    level: "Beginner" as CourseLevel,
  },
  {
    week: 3,
    title: "Turning Left/Right",
    description: "Adjusting motor power for turns",
    level: "Beginner" as CourseLevel,
  },
  {
    week: 4,
    title: "Loops: Repeat Movements",
    description: "Using loops for repetitive actions",
    level: "Beginner" as CourseLevel,
  },
  {
    week: 5,
    title: "Touch Sensor: React to Collisions",
    description: "Sensor integration, basic triggers",
    level: "Beginner" as CourseLevel,
  },
  {
    week: 6,
    title: "Color Sensor: Follow a Line",
    description: "Detecting colors for path-following",
    level: "Intermediate" as CourseLevel,
  },
  {
    week: 7,
    title: "Sound & Light Effects",
    description: "Programming sounds/LEDs",
    level: "Intermediate" as CourseLevel,
  },
  {
    week: 8,
    title: "Mini-Challenge: Dance Robot",
    description: "Combine movement, sounds, loops",
    level: "Intermediate" as CourseLevel,
  },
  {
    week: 9,
    title: "Obstacle Course: Step-by-Step Code",
    description: "Sequencing commands for challenges",
    level: "Advanced" as CourseLevel,
  },
  {
    week: 10,
    title: "Team Project: Relay Race Robots",
    description: "Collaborative coding & testing",
    level: "Advanced" as CourseLevel,
  },
  {
    week: 11,
    title: "Debugging Robot Errors",
    description: "Identifying and fixing code issues",
    level: "Advanced" as CourseLevel,
  },
  {
    week: 12,
    title: "Final Showcase: Robot Talent Show",
    description: "Creative robot demonstrations",
    level: "Advanced" as CourseLevel,
  },
]

interface CourseSchedulesProps {
  selectedCourse: string;
}

export function CourseSchedules({ selectedCourse }: CourseSchedulesProps) {
  // Filter and show only the selected course data
  const getCourseData = () => {
    switch (selectedCourse) {
      case 'pre-coding':
        return { data: preCodingData, title: "Pre-Coding: Ages 6-10" };
      case 'python-ev3':
        return { data: pythonData, title: "Python with EV3: Ages 11-16" };
      case 'mid-robotics':
        return { data: midRoboticsData, title: "Mid-Robotics: Ages 6-10" };
      case 'arduino':
        return { data: arduinoData, title: "Arduino Coding: Ages 11-16" };
      default:
        return { data: [], title: "" };
    }
  };

  const { data, title } = getCourseData();

  return (
    <div className="w-full">
      <CourseScheduleTable data={data} title={title} />
    </div>
  );
} 
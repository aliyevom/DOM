"use client"

import React from "react"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { CourseSchedules } from "@/components/course-schedules"
import { useIsMobile } from "@/hooks/use-mobile"

interface BaseItem {
  id: string | number;
  title: string | React.ReactNode;
  description: string;
  image: string;
  tags: string[];
  fullContent?: string;
}

interface CurriculumItem extends BaseItem {
  id: string;
  additionalImages?: string[];
}

interface NewsItem extends BaseItem {
  fullContent: string;
}

const catalogItems = [
  {
    id: "recently",
    title: "Recently",
    items: [
      {
        id: 1,
        title: "Summer Robotics Camp 2024",
        description:
          "Join our immersive summer robotics program designed for kids ages 6-16. Build, program, and compete with LEGO EV3 and Arduino robots!",
        image: "https://i.pinimg.com/736x/62/32/33/623233fe19ed1259648c5aebde8f996d.jpg",
        tags: ["Summer", "Robotics"],
        fullContent:
          "Our Summer Robotics Camp 2024 offers an exciting opportunity for young minds to dive into the world of robotics and coding. Over the course of two weeks, participants will learn to build and program robots using LEGO EV3 and Arduino platforms. The camp is divided into age-appropriate groups (5-10 and 11-17) to ensure each child receives the right level of challenge and support. Activities include robot building challenges, coding competitions, and a final showcase where students demonstrate their creations to family and friends. Early registration discount available until April 30th!",
      },
      {
        id: 2,
        title: "New Yahboom Module Kit Available",
        description:
          "Introducing our newest addition: Yahboom World of Module Programmable sensor Kit with 20+ building block models compatible with Micro:bit V2/V1.5 board.",
        image: "https://www.tryreason.com/wp-content/uploads/2023/02/coding.jpeg",
        tags: ["New", "Equipment"],
        fullContent:
          "We're excited to announce that our classrooms will now feature the Yahboom World of Module Programmable sensor Kit! This advanced kit includes over 20 building block models compatible with Micro:bit V2/V1.5 boards, allowing students to create sophisticated robotic projects. The kit includes various sensors, motors, and structural components that integrate seamlessly with our curriculum. Students will be able to build everything from simple wheeled robots to complex automated systems with multiple sensors and outputs. This equipment upgrade represents our commitment to providing cutting-edge tools that prepare students for future careers in robotics and programming.",
      },
      {
        id: 9,
        title: "Opening Soon: Waltham Location",
        description:
          "Our new state-of-the-art facility in Waltham is opening May 5, 2025. Early registration is now available with special founding member benefits.",
        image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&auto=format&fit=crop&q=60",
        tags: ["Announcement", "Facility"],
        fullContent:
          "We're thrilled to announce that our brand new facility at 303 Wyman St Suite 300, Waltham, MA 02451 will be opening on May 5, 2025! This state-of-the-art learning center features dedicated robotics labs, coding stations, and collaborative workspaces designed specifically for young learners. Our new location will offer expanded class times, weekend workshops, and special events throughout the year. Early registration is now open with special founding member benefits including priority class selection, exclusive workshops, and a welcome kit with DOM Tech Academy merchandise. Join us for our grand opening celebration on May 5th featuring robot demonstrations, coding challenges, and refreshments!",
      },
      {
        id: 10,
        title: "BC-81 Smart Science Kits Now in Curriculum",
        description:
          "Introducing BC-81 Smart Science Electronic Building Education Toy for logical training and programming fundamentals.",
        image:
          "https://cdn.shopify.com/s/files/1/0070/5901/3716/files/PC_Coding_is_as_Easy_as_Blocks_Building_2f499be7-0df9-4aad-964b-bab712a49b49.webp?v=1724292399",
        tags: ["New", "Equipment"],
        fullContent:
          "We're enhancing our pre-coding curriculum with the addition of BC-81 Smart Science Electronic Building Education Toys! These innovative kits provide hands-on learning experiences that develop logical thinking, problem-solving skills, and programming fundamentals. Perfect for our younger students (ages 5-10), these kits allow children to build working electronic circuits and simple programmable devices without requiring advanced coding knowledge. The modular design encourages experimentation and creativity while teaching core concepts that will prepare them for more complex programming later. These kits will be integrated into our Pre-Coding curriculum starting next month.",
      },
      {
        id: 11,
        title: "New Partnership with MIT Media Lab",
        description: "Exciting collaboration bringing cutting-edge educational technology and research to our programs.",
        image: "https://i.pinimg.com/736x/9d/33/f0/9d33f0bec455f8c79bb6986e1e7c73c8.jpg",
        tags: ["Partnership", "Innovation"],
        fullContent: "We're thrilled to announce our new partnership with the MIT Media Lab, bringing cutting-edge educational technology and research directly to our students. This collaboration will enhance our curriculum with innovative learning tools, advanced robotics platforms, and creative computing projects developed by MIT researchers. Our students will have unique opportunities to participate in pilot programs and provide feedback on new educational technologies before they're released to the broader public."
      },
      {
        id: 12,
        title: "Virtual Reality Lab Launch",
        description: "Experience our new state-of-the-art VR lab featuring the latest Meta Quest Pro headsets and Unity development tools.",
        image: "https://i.pinimg.com/736x/8f/b1/b3/8fb1b34fc46cad9acec17fd810c86317.jpg",
        tags: ["New", "Technology"],
        fullContent: "Step into the future in our new Virtual Reality Lab! Equipped with the latest Meta Quest Pro headsets and powerful development workstations, students can create and experience immersive virtual worlds. The lab features dedicated spaces for VR development, testing, and collaboration, making it perfect for both individual projects and team-based learning."
      },
      {
        id: 13,
        title: "AI Programming Competition Success",
        description: "Our students secured top positions in the National AI Programming Challenge 2024.",
        image: "https://i.pinimg.com/736x/f4/9e/c3/f49ec3797d046773ffaa182615f00720.jpg",
        tags: ["Achievement", "AI"],
        fullContent: "Congratulations to our talented students who dominated the National AI Programming Challenge 2024! Our teams secured first place in the junior division and second place in the senior division, showcasing their exceptional skills in machine learning and artificial intelligence development. Their winning projects included an AI-powered environmental monitoring system and a natural language processing application for educational assistance."
      },
    ],
  },
  {
    id: "curriculum",
    title: (
      <div className="relative inline-flex items-center">
        Curriculum
        <motion.div
          initial={{ scale: 1, opacity: 0.9 }}
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0.9, 1, 0.9],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute -top-2 -right-12 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full transform rotate-12 hidden md:block"
          style={{
            boxShadow: "0 2px 4px rgba(239, 68, 68, 0.3)",
            textShadow: "0 1px 1px rgba(0, 0, 0, 0.2)"
          }}
        >
          HOT
        </motion.div>
      </div>
    ),
    items: [
      {
        id: "pre-coding",
        title: "Pre-Coding",
        description: "Our foundational program introduces young children to computational thinking through LEGO EV3 robotics and visual programming.",
        image: "https://i.pinimg.com/736x/97/9b/fa/979bfa147caa951b840fe5f55bd1e33b.jpg",
        additionalImages: [
          "https://i.pinimg.com/736x/8f/12/2a/8f122ab396ad1d168cfb45069cf8210d.jpg",
          "https://i.pinimg.com/736x/38/4a/d9/384ad92dd9e11a2bef83e9389d37fcae.jpg",
          "https://i.pinimg.com/736x/f4/f3/d2/f4f3d2f2696c30f1af570a87afca5208.jpg"
        ],
        tags: ["Ages 6-10", "Entry", "STEM-Coding"],
      },
      {
        id: "python-ev3",
        title: "Python with EV3",
        description: "Intermediate program teaching Python programming fundamentals combined with LEGO EV3 robotics for practical application.",
        image: "https://i.pinimg.com/736x/0f/54/93/0f5493192314025289c356701ee3b2ca.jpg",
        additionalImages: [
          "https://i.pinimg.com/736x/d9/bf/ec/d9bfecf8471bd4ff2b67dd417d41846d.jpg"
        ],
        tags: ["Ages 6-10", "Basic", "Lego-oriented"],
      },
      {
        id: "mid-robotics",
        title: "Mid-Robotics",
        description: "Advanced program focusing on complex LEGO EV3 projects and robotics concepts.",
        image: "https://images.unsplash.com/photo-1561557944-6e7860d1a7eb?w=800&auto=format&fit=crop&q=60",
        tags: ["Ages 11-16", "Intermediate", "Sensor"],
      },
      {
        id: "arduino",
        title: "Arduino Coding",
        description: "Advanced program teaching C++ programming with Arduino microcontrollers for creating interactive electronic projects.",
        image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&auto=format&fit=crop&q=60",
        tags: ["Ages 11-16", "Advanced", "IoT"],
      }
    ] as CurriculumItem[],
  },
  {
    id: "benefits",
    title: "Benefits",
    items: [
      {
        id: 5,
        title: "Early Coding Benefits",
        description:
          "Research shows that learning to code at an early age develops critical thinking, problem-solving, and mathematical reasoning skills.",
        image: "https://i.pinimg.com/736x/bb/f8/cf/bbf8cfbc6e16edd9ca451e148d5d9e09.jpg",
        additionalImages: [
          "https://i.pinimg.com/736x/be/2f/5d/be2f5da1076357cd4c5f2a00a40bbd45.jpg"
        ],
        tags: ["Research", "Development"],
        fullContent:
          "Learning to code at an early age offers numerous cognitive and developmental benefits that extend far beyond computer skills. Research from MIT and Stanford shows that children who learn coding before age 10 demonstrate enhanced critical thinking abilities and are better equipped to break down complex problems into manageable parts. The logical thinking required in programming strengthens neural pathways associated with mathematical reasoning, leading to improved performance in math and science. Additionally, coding teaches persistence and resilience as children learn to debug their programs and overcome challenges. The iterative nature of coding—writing, testing, and refining—instills a growth mindset that benefits children across all academic areas. Perhaps most importantly, early exposure to coding helps children see themselves as creators rather than just consumers of technology, empowering them to shape the digital world around them.",
      },
      {
        id: 6,
        title: "Mathematics in Coding",
        description:
          "Discover how our curriculum integrates mathematical concepts into coding projects, reinforcing classroom learning through practical application.",
        image: "https://i.pinimg.com/736x/e1/e7/03/e1e703bd9a0f27be2f5a7ffa34e9d576.jpg",
        additionalImages: [
          "https://i.pinimg.com/736x/14/56/d9/1456d9c6eb2f4310de4b269d0ae3d9ed.jpg"
        ],
        tags: ["Math", "Integration"],
        fullContent:
          "Our curriculum thoughtfully integrates mathematical concepts into coding projects, creating a powerful synergy that reinforces classroom learning through practical application. For younger students (ages 5-10), programming robots to move specific distances and make precise turns introduces them to measurement, geometry, and spatial reasoning. As they progress, they encounter variables and basic arithmetic operations when calculating sensor values and motor power. For older students (ages 11-16), more advanced mathematical concepts come into play: coordinate systems for robot navigation, algebraic expressions in conditional statements, and geometry for calculating distances and angles. When working with Arduino projects, students apply concepts like ratios and proportions when scaling sensor readings, and use trigonometry for servo motor positioning. This integration helps students see mathematics not as an abstract subject but as a practical tool for solving real-world problems. Many parents report improved math grades and increased mathematical confidence after their children participate in our programs.",
      },
      {
        id: 13,
        title: "University Path Motivation",
        description:
          "How our programs prepare students for admission to elite institutions like MIT, Harvard, and other top engineering schools.",
        image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&auto=format&fit=crop&q=60",
        tags: ["University", "Future"],
        fullContent:
          "Our advanced curriculum is specifically designed to prepare students for admission to elite institutions like MIT, Harvard, and other top engineering schools. We've developed our programs in consultation with university admissions officers and STEM faculty to ensure we're building the exact skills and experiences these institutions value most. Students develop impressive portfolios of coding and robotics projects that demonstrate technical proficiency, creativity, and problem-solving abilities—all crucial elements in competitive college applications. Our curriculum emphasizes real-world challenges that mirror the rigorous problem-solving expected at top universities. Students participate in prestigious competitions like FIRST Robotics and the International Science and Engineering Fair, which are highly regarded by admissions committees. We guide students through the documentation and presentation of their work, teaching them to articulate complex technical concepts—a skill essential for college interviews and application essays. Our program also provides guidance on scholarship opportunities, helping students secure financial support for their education. Many of our graduates have received full scholarships to prestigious institutions, citing their DOM Tech Academy portfolio as a decisive factor in both admission and financial aid decisions. We don't just teach coding; we help build the foundation for academic excellence that opens doors to the world's most selective universities.",
      },
      {
        id: 14,
        title: "Career-Focused Learning",
        description:
          "How our curriculum aligns with future career paths in robotics, AI, software development, and engineering.",
        image: "https://images.unsplash.com/photo-1573164713988-8665fc963095?w=800&auto=format&fit=crop&q=60",
        tags: ["Career", "Future"],
        fullContent:
          "Our curriculum is thoughtfully designed to align with lucrative future career paths in robotics, artificial intelligence, software development, and engineering. Each program component is developed with input from industry professionals to ensure we're teaching relevant, in-demand skills. For younger students, we focus on building a strong foundation in computational thinking and problem-solving—universal skills valued across all technical fields. As students progress, they're introduced to professional-grade tools and languages used in industry, like Python and C++ (Arduino). Our project-based approach mirrors real-world development environments, teaching students not just to code, but to plan, document, test, and refine their work—essential workplace skills. We regularly incorporate emerging technologies like machine learning and IoT (Internet of Things) into our advanced curricula, keeping students at the cutting edge. Beyond technical skills, we emphasize collaboration, communication, and project management—soft skills crucial for career advancement. Many of our graduates have gone on to secure internships at technology companies while still in high school, giving them a significant advantage in college applications and early career opportunities.",
      },
      {
        id: 15,
        title: "Critical Thinking Development",
        description: "How coding education enhances problem-solving abilities and analytical thinking in young minds.",
        image: "https://i.pinimg.com/736x/fa/75/e1/fa75e103b4139e7030d48a333c91d4b7.jpg",
        tags: ["Development", "Education"],
        fullContent: "Research consistently shows that learning to code significantly improves critical thinking and problem-solving abilities in children. Through coding, students develop systematic approaches to breaking down complex problems, identifying patterns, and creating efficient solutions. This analytical mindset transfers to other academic subjects and real-world challenges."
      },
      {
        id: 16,
        title: "Social Skills Enhancement",
        description: "Collaborative coding projects foster teamwork, communication, and leadership skills.",
        image: "https://i.pinimg.com/736x/be/2f/5d/be2f5da1076357cd4c5f2a00a40bbd45.jpg",
        tags: ["Social", "Development"],
        fullContent: "Our collaborative coding projects do more than teach technical skills - they develop essential social and emotional capabilities. Students learn to work effectively in teams, communicate complex ideas clearly, and take on leadership roles. These experiences build confidence and prepare them for future academic and professional success."
      },
      {
        id: 17,
        title: "Creative Expression",
        description: "Coding as a medium for artistic and creative expression in the digital age.",
        image: "https://i.pinimg.com/736x/14/56/d9/1456d9c6eb2f4310de4b269d0ae3d9ed.jpg",
        tags: ["Creativity", "Technology"],
        fullContent: "Programming isn't just about logic and mathematics - it's a powerful tool for creative expression. Our students use code to create digital art, interactive stories, and multimedia experiences. This fusion of technology and creativity helps develop both analytical and artistic thinking skills."
      },
      {
        id: 18,
        title: "Future-Ready Skills",
        description: "Building the foundation for success in the rapidly evolving digital economy.",
        image: "https://i.pinimg.com/736x/da/e1/73/dae173068008ea21c428910307599554.jpg",
        tags: ["Career", "Future"],
        fullContent: "In today's digital world, coding literacy is becoming as fundamental as reading and writing. Our program equips students with the technical skills, problem-solving abilities, and adaptive mindset needed to thrive in the rapidly evolving job market. Students learn not just to use technology, but to create and shape it."
      },
    ],
  },
  {
    id: "equipment",
    title: "Equipment",
    items: [
      {
        id: 7,
        title: "LEGO EV3 Robotics Kits",
        description:
          "Our classrooms feature the latest LEGO EV3 Education Core Sets and expansion packs for hands-on robotics learning.",
        image: "/images/robotics/lego-ev3-kit.png",
        tags: ["Equipment", "Robotics"],
        fullContent:
          "Our classrooms are equipped with the latest LEGO EV3 Education Core Sets and expansion packs, providing students with everything they need for hands-on robotics learning. Each EV3 kit includes the intelligent brick (the programmable brain of the robot), a variety of sensors (touch, color, ultrasonic, and gyro), servo motors, and hundreds of LEGO Technic building elements. These professional-grade educational kits are specifically designed for classroom use, with durable components and organized storage solutions. The EV3 platform offers both a visual programming interface ideal for beginners and a text-based programming option using Python for more advanced students. This versatility allows us to use the same physical platform across multiple age groups and skill levels. Our EV3 kits are supplemented with additional sensors, building elements, and challenge mats that enable students to create increasingly sophisticated robots as they progress through our curriculum. The hands-on nature of LEGO robotics makes abstract programming concepts tangible and engaging, especially for younger learners.",
      },
      {
        id: 8,
        title: "Arduino-Based Robotics Platforms",
        description:
          "Advanced students work with Arduino microcontrollers and various sensors to build sophisticated programmable robots.",
        image: "https://images.unsplash.com/photo-1555255707-c07966088b7b?w=800&auto=format&fit=crop&q=60",
        tags: ["Equipment", "Advanced"],
        fullContent:
          "Our advanced students work with industry-standard Arduino microcontrollers and a comprehensive array of sensors and actuators to build sophisticated programmable robots. Each student workstation includes an Arduino Uno or Mega board, breadboards for prototyping, and a carefully curated selection of components including LEDs, buttons, potentiometers, servo motors, DC motors with drivers, ultrasonic sensors, temperature sensors, and Bluetooth modules. For robotics projects, we provide chassis kits with wheels, motors, and battery packs that integrate seamlessly with Arduino control systems. Students learn to read schematics, build circuits, and write C++ code to control their creations. This hands-on experience with electronics and programming provides excellent preparation for engineering courses at the university level. The Arduino platform is particularly valuable because it's widely used in both educational and professional settings, allowing students to develop skills that transfer directly to real-world applications. Many of our students continue working with Arduino at home, expanding their projects and deepening their understanding of electronics and programming concepts.",
      },
      {
        id: 15,
        title: "Yahboom Programmable Sensor Kits",
        description:
          "Explore our new Yahboom World of Module Programmable sensor Kit with 20+ building block models for Micro:bit.",
        image: "/images/robotics/yahboom-kit.png",
        tags: ["Equipment", "New"],
        fullContent:
          "We're excited to introduce the Yahboom World of Module Programmable sensor Kit to our equipment lineup! This innovative kit features over 20 building block models compatible with Micro:bit V2/V1.5 boards, offering students an incredible range of project possibilities. The kit includes an impressive array of sensors (light, sound, temperature, humidity, motion), actuators (motors, servos, LEDs), and structural components that snap together easily without requiring soldering or complex wiring. The modular design allows students to quickly prototype and test different configurations, encouraging experimentation and iterative design. Programming is done using a block-based interface similar to Scratch, making it accessible to beginners while still offering advanced capabilities for experienced students. The Yahboom kit bridges the gap between simple introductory platforms and more complex Arduino-based systems, making it perfect for our intermediate students. Projects created with these kits range from environmental monitoring stations to automated sorting systems to interactive games, all programmable through an intuitive interface that helps students develop computational thinking skills.",
      },
      {
        id: 16,
        title: "BC-81 Smart Science Electronic Building Kits",
        description:
          "Learn about our BC-81 Smart Science Electronic Building Education Toys for logical training and early electronics education.",
        image:
          "https://cdn.shopify.com/s/files/1/0070/5901/3716/files/PC_Coding_is_as_Easy_as_Blocks_Building_2f499be7-0df9-4aad-964b-bab712a49b49.webp?v=1724292399",
        tags: ["Equipment", "Beginner"],
        fullContent:
          "Our BC-81 Smart Science Electronic Building Kits provide an excellent introduction to electronics and logical thinking for our youngest students. These educational toys feature snap-together electronic components that are color-coded and designed specifically for small hands, with no soldering or tools required. Each kit includes over 80 different projects that progressively introduce concepts like circuits, switches, resistors, capacitors, and simple logic gates. The projects range from basic light and sound circuits to more complex systems like alarms, timers, and simple games. What makes these kits particularly valuable for early education is their focus on cause-and-effect relationships and logical sequences—foundational concepts for programming. Students learn to follow diagrams, troubleshoot when circuits don't work as expected, and modify designs to achieve different outcomes. The hands-on nature of these kits makes abstract electronic concepts tangible and engaging for young learners. These experiences build confidence and curiosity about how electronic devices work, preparing students for more advanced programming and robotics work in our later courses.",
      },
      {
        id: 19,
        title: "Raspberry Pi Advanced Computing Kit",
        description: "New Raspberry Pi 5 kits for advanced computing and IoT projects.",
        image: "https://i.pinimg.com/736x/dc/c9/5d/dcc95d75de7491e2f3a7fda29fbcf8f5.jpg",
        tags: ["Equipment", "Advanced"],
        fullContent: "Our new Raspberry Pi 5 kits provide students with powerful, versatile computing platforms for advanced projects. Each kit includes sensors, displays, and components for creating sophisticated IoT devices and embedded systems."
      },
      {
        id: 20,
        title: "3D Printing Lab",
        description: "State-of-the-art 3D printing facilities for prototyping and creative projects.",
        image: "https://i.pinimg.com/736x/14/d9/c4/14d9c45ccc85b0536bfe3d5e55a39905.jpg",
        tags: ["Equipment", "Innovation"],
        fullContent: "Our 3D printing lab features multiple high-precision printers, allowing students to bring their digital designs to life. The facility includes various materials and tools for creating custom robot parts, project enclosures, and creative sculptures."
      },
      {
        id: 21,
        title: "AI Development Workstations",
        description: "High-performance computers equipped for machine learning and AI development.",
        image: "https://i.pinimg.com/736x/ef/c3/7c/efc37c52370be41bfc2131f8ccf3b300.jpg",
        tags: ["Equipment", "AI"],
        fullContent: "Our AI development workstations feature powerful GPUs and specialized software tools for machine learning projects. Students can train complex neural networks and develop sophisticated AI applications efficiently."
      },
      {
        id: 22,
        title: "Drone Programming Kit",
        description: "Professional-grade programmable drones for advanced aerial robotics projects.",
        image: "https://i.pinimg.com/736x/e5/00/43/e50043ef837cc69531df6cac69990dd2.jpg",
        tags: ["Equipment", "Robotics"],
        fullContent: "Our drone programming kits enable students to explore aerial robotics and autonomous flight. Each kit includes a programmable drone, sensors, and development tools for creating custom flight patterns and automated missions."
      },
      {
        id: 23,
        title: "Virtual Reality Development Kit",
        description: "Complete VR development setup with latest headsets and motion controllers.",
        image: "https://i.pinimg.com/736x/c2/ac/12/c2ac12de1f1e648141fabcc43bce77c8.jpg",
        tags: ["Equipment", "VR"],
        fullContent: "Our VR development kits provide everything needed for creating immersive virtual experiences. Each station includes a high-end VR headset, motion controllers, and development software for building interactive VR applications."
      }
    ],
  },
  {
    id: "social",
    title: "Social Media",
    items: [
      {
        id: 17,
        title: "Student Spotlight: Robotics Competition Winners",
        description:
          "Congratulations to our student team who took first place at the Regional Robotics Challenge with their innovative sorting robot!",
        image: "https://i.pinimg.com/736x/e9/a2/ae/e9a2ae35109f821477cc872c2a6dc9c6.jpg",
        additionalImages: [
          "https://i.pinimg.com/736x/ea/df/ce/eadfce5fb57dfe7abe96eefe741fbb8e.jpg"
        ],
        tags: ["Achievement", "Competition"],
        fullContent:
          "We're incredibly proud to announce that our student team 'TechTitans' took first place at the Regional Robotics Challenge last weekend! The team of four students (ages 12-15) designed and programmed an innovative sorting robot that could identify, categorize, and sort objects by color, size, and shape with remarkable accuracy. Their creation outperformed 27 other teams from across the state, impressing judges with both its technical sophistication and elegant design. The team spent over two months designing, building, testing, and refining their robot, demonstrating extraordinary dedication and teamwork. This victory qualifies them for the National Robotics Championship in Chicago this summer. Special thanks to instructor Ms. Rodriguez for her guidance and to the parents who supported late-night practice sessions and weekend workshops. This achievement showcases what our students can accomplish with determination, creativity, and the right educational foundation. Congratulations TechTitans - we can't wait to see what you'll create next!",
      },
      {
        id: 18,
        title: "From DOM Tech to MIT: Alumni Success Stories",
        description:
          "How our comprehensive program prepares students for admission to elite institutions with scholarship opportunities.",
        image: "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?w=800&auto=format&fit=crop&q=60",
        tags: ["Success", "University"],
        fullContent:
          "Our comprehensive program has consistently helped students secure admissions to elite institutions like MIT, Stanford, and Harvard, often with substantial scholarship packages. The journey begins with our rigorous curriculum that emphasizes not just coding skills, but the problem-solving mindset that top universities seek. Students develop impressive technical portfolios through increasingly challenging projects that demonstrate creativity, persistence, and technical mastery. We integrate real-world challenges and competitive elements that mirror the demands of prestigious university programs. Our students regularly participate in national and international competitions, gaining valuable experience presenting their work to judges and peers. This competition experience proves invaluable during university interviews and scholarship applications. We provide structured guidance on documenting projects, creating compelling portfolios, and articulating technical concepts clearly—skills that set our students apart in the application process. Our college preparation workshops help students identify scholarship opportunities and craft applications that highlight their unique strengths. Many of our alumni have received full-ride scholarships based on their technical achievements and the compelling way they've documented their journey. The DOM Tech Academy experience doesn't just teach coding; it builds the comprehensive skill set and confidence needed to succeed at the world's most selective institutions.",
      },
      {
        id: 19,
        title: "Parent Testimonial: Math Grades Improved",
        description:
          "How DOM Tech Academy's coding programs helped 9-year-old Jason improve his math performance and confidence.",
        image: "https://images.unsplash.com/photo-1544717305-2782549b5136?w=800&auto=format&fit=crop&q=60",
        tags: ["Testimonial", "Results"],
        fullContent:
          "\"When my son Jason started at DOM Tech Academy, he was struggling with math and lacked confidence in his academic abilities. After just one semester in the Pre-Coding program, we noticed a remarkable transformation. His math teacher contacted us specifically to ask what had changed, as Jason's performance and participation had improved dramatically. The logical thinking and problem-solving skills he developed through coding transferred directly to his math work. Concepts like variables and functions, which seemed abstract in math class, became concrete through programming robots. Jason now approaches math problems with the same methodical, step-by-step thinking he uses when debugging his code. Beyond the academic improvements, the biggest change has been in his confidence. Successfully programming a robot to complete challenges has shown him that he can tackle difficult problems if he breaks them down and persists. He's gone from saying 'I'm not good at math' to 'I haven't figured it out yet'—a fundamental shift in mindset that has affected all areas of his learning. We're incredibly grateful to DOM Tech Academy for this transformation!\" - Michelle K., parent of Jason (age 9)",
      },
      {
        id: 20,
        title: "Weekend Workshop: Build Your Own Smart Home Devices",
        description:
          "Join our special weekend workshop where students will create their own IoT devices using Arduino and sensors.",
        image: "https://i.pinimg.com/736x/dc/c9/5d/dcc95d75de7491e2f3a7fda29fbcf8f5.jpg",
        tags: ["Workshop", "IoT"],
        fullContent:
          "Join us for an exciting weekend workshop where students will design and build their own Internet of Things (IoT) smart home devices using Arduino microcontrollers and various sensors! This two-day intensive workshop is perfect for students ages 12-17 who have some basic coding experience and are interested in creating technology that interacts with the physical world. Day 1 will focus on the fundamentals of IoT, setting up the Arduino environment, and building basic sensor circuits. Students will learn to collect data from temperature, humidity, and light sensors, and display this information on an LCD screen. Day 2 will advance to connecting these devices to the internet using ESP8266 WiFi modules, allowing students to monitor and control their creations remotely through a simple web interface. By the end of the workshop, each participant will have created a functional smart home device such as an automated plant watering system, a security monitor, or a climate control prototype. All materials are provided, and students will take home their completed projects. Space is limited to 12 participants to ensure personalized instruction, so register early to secure your spot!",
      },
      {
        id: 25,
        title: "Creative Coding Art Gallery",
        description: "Students showcase their artistic creations made through coding, combining technology with creativity.",
        image: "https://i.pinimg.com/736x/8f/12/2a/8f122ab396ad1d168cfb45069cf8210d.jpg",
        tags: ["Art", "Coding"],
        fullContent: "Our Creative Coding Art Gallery event celebrates the intersection of technology and artistic expression. Students use Python and specialized art libraries to create stunning digital artwork, animations, and interactive installations. This unique program helps develop both technical skills and creative thinking, showing that coding can be a form of artistic expression. The gallery showcases works ranging from generative art to interactive music visualizations, demonstrating how coding can be used to create beautiful and meaningful artistic experiences."
      },
      {
        id: 26,
        title: "Game Development Workshop",
        description: "Learn to create your own video games while mastering programming concepts in a fun, engaging environment.",
        image: "https://i.pinimg.com/736x/38/4a/d9/384ad92dd9e11a2bef83e9389d37fcae.jpg",
        tags: ["Games", "Programming"],
        fullContent: "Our Game Development Workshop makes learning to code exciting and engaging by teaching students to create their own video games. Using platforms like Pygame and Scratch, students learn fundamental programming concepts while building increasingly complex games. The workshop covers everything from simple arcade-style games to more advanced projects with physics engines and AI opponents. Students learn about game design principles, user interface development, and the importance of user testing and iteration in software development."
      },
      {
        id: 27,
        title: "STEM Innovation Challenge",
        description: "Monthly challenges that combine coding, robotics, and creative problem-solving in exciting competitive events.",
        image: "https://i.pinimg.com/736x/f4/f3/d2/f4f3d2f2696c30f1af570a87afca5208.jpg",
        tags: ["Competition", "Innovation"],
        fullContent: "The STEM Innovation Challenge is our monthly competition series that pushes students to think creatively and solve real-world problems using technology. Each month features a different challenge, from designing environmentally friendly smart devices to creating automated solutions for everyday problems. Students work in teams, applying their coding and robotics skills while developing crucial collaboration and project management abilities. The challenges are designed to be both educational and entertaining, with prizes awarded for creativity, technical excellence, and teamwork."
      }
    ],
  },
  {
    id: "events",
    title: "Events",
    items: [
      {
        id: 21,
        title: "Grand Opening: Waltham Location",
        description:
          "Join us on May 5, 2025 for the grand opening of our new Waltham facility featuring robot demonstrations, coding challenges, and refreshments.",
        image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop&q=60",
        tags: ["Event", "Opening"],
        fullContent:
          "Mark your calendars for the grand opening celebration of our new Waltham facility on May 5, 2025! This family-friendly event will showcase our state-of-the-art learning spaces and give prospective students a taste of the DOM Tech Academy experience. The day will feature continuous robot demonstrations by current students, hands-on coding activities for visitors of all ages, facility tours, and the opportunity to meet our instructors and staff. Special activities include a robot obstacle course challenge, a virtual reality coding experience, and a 'build your first circuit' station for younger children. Light refreshments will be served, and all attendees will receive a DOM Tech Academy swag bag with exclusive merchandise. We'll also be offering special enrollment incentives for families who register during the event, including waived registration fees and complimentary starter kits. The celebration runs from 10:00 AM to 4:00 PM at our new location: 303 Wyman St Suite 300, Waltham, MA 02451. Free parking is available on-site. This event is open to the public, but pre-registration is recommended to help us plan accordingly. We can't wait to welcome you to our new home!",
      },
      {
        id: 22,
        title: "Summer Coding Bootcamp Registration Open",
        description:
          "Intensive two-week summer bootcamps now open for registration. Four age groups available with focus on robotics and programming.",
        image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&auto=format&fit=crop&q=60",
        tags: ["Summer", "Registration"],
        fullContent:
          "Registration is now open for our popular Summer Coding Bootcamps! These intensive two-week programs offer an accelerated introduction to coding and robotics—perfect for beginners or students looking to advance their skills quickly. We're offering four distinct bootcamps tailored to two age groups. For ages 6–10, our Junior Coders program offers a playful introduction to computational thinking through screen-free activities and simple programmable robots. For ages 11–16, we offer three exciting tracks. Beginner Robotics introduces students to LEGO EV3 robotics using visual programming, exploring movement, sensors, and engaging challenges. Python Fundamentals provides an engaging dive into Python programming, focusing on game development and data visualization. Advanced Robotics & IoT allows students to build Arduino-based projects that combine hardware and software to create real-world Internet of Things (IoT) devices. Each bootcamp runs Monday through Friday from 3:00 PM to 7:00 PM, and Saturday from 10:00 AM to 3:00 PM, with optional extended care available. All necessary equipment is provided, and students will showcase their projects to family and friends on the final day. Space is limited to 12 students per bootcamp to ensure personalized instruction. Early bird pricing is available until April 15th.",
      },
      {
        id: 23,
        title: "Parent-Child Robotics Workshop",
        description:
          "Bond with your child while learning to build and program a robot together in this special weekend workshop.",
        image: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=800&auto=format&fit=crop&q=60",
        tags: ["Workshop", "Family"],
        fullContent:
          "Our popular Parent-Child Robotics Workshops are back by popular demand! These special weekend sessions offer a unique opportunity for parents and children to learn, build, and code together in a supportive environment. No prior experience is necessary—our instructors will guide you through the process step by step. During this four-hour workshop, each parent-child team will build a fully functional robot using LEGO EV3 components and learn to program it to navigate challenges, respond to sensors, and perform entertaining routines. The workshop emphasizes collaboration and communication, strengthening family bonds while introducing fundamental STEM concepts. Parents often report that these workshops give them valuable insight into how their children approach problems and learn new skills. They also provide a shared vocabulary and experience that can support continued learning at home. We offer separate workshops for different age groups: ages 5-8 on Saturday mornings and ages 9-12 on Saturday afternoons. All materials are provided, and each team will receive a take-home guide with additional activities to continue the learning experience. Space is limited to 8 parent-child teams per session, so early registration is recommended.",
      },
      {
        id: 24,
        title: "Robotics Competition Prep Workshop",
        description:
          "Specialized training for students interested in participating in regional and national robotics competitions.",
        image: "/images/robotics/coding.jpeg",
        tags: ["Competition", "Advanced"],
        fullContent:
          "Is your child interested in taking their robotics skills to the competitive level? Our Robotics Competition Prep Workshop is designed to prepare students for success in regional and national robotics competitions like FIRST LEGO League and VEX Robotics Competition. This intensive eight-week program meets once weekly for three hours and covers all aspects of competitive robotics: advanced building techniques for sturdy, efficient robots; sophisticated programming strategies including sensor fusion and autonomous navigation; effective teamwork and time management under pressure; and presentation skills for the project portion of competitions. Participants will work with competition-standard equipment and practice with actual competition challenges from previous years. Our instructors include former competition judges and winning team coaches who provide insider perspectives on what makes a successful team. This workshop is ideal for students ages 10-16 who have completed at least one of our intermediate robotics courses and are looking for a new challenge. Many of our past workshop participants have gone on to win regional competitions and qualify for national events. The skills developed in competitive robotics—strategic thinking, collaborative problem-solving, grace under pressure—benefit students far beyond the competition floor.",
      },
      {
        id: 28,
        title: "Robotics Exhibition",
        description: "Showcase of advanced robotics projects and demonstrations.",
        image: "https://i.pinimg.com/736x/e9/a2/ae/e9a2ae35109f821477cc872c2a6dc9c6.jpg",
        tags: ["Event", "Robotics"],
        fullContent: "Experience the excitement of robotics at our annual exhibition. Watch live demonstrations of student-built robots, participate in interactive workshops, and learn about the latest advances in robotics technology."
      },
      {
        id: 29,
        title: "Game Development Jam",
        description: "48-hour game creation challenge for aspiring developers.",
        image: "https://i.pinimg.com/736x/38/4a/d9/384ad92dd9e11a2bef83e9389d37fcae.jpg",
        tags: ["Event", "Gaming"],
        fullContent: "Put your game development skills to the test in our intensive 48-hour Game Jam. Work in teams to create original games, receive mentorship from industry professionals, and compete for exciting prizes."
      }
    ],
  },
]

const getTagColor = (tag: string) => {
  const colors: Record<string, string> = {
    Discounts: "bg-green-100 text-green-800",
    Summer: "bg-yellow-100 text-yellow-800",
    New: "bg-blue-100 text-blue-800",
    Coding: "bg-purple-100 text-purple-800",
    STEM: "bg-red-100 text-red-800",
    Education: "bg-indigo-100 text-indigo-800",
    Math: "bg-pink-100 text-pink-800",
    Advanced: "bg-orange-100 text-orange-800",
    Social: "bg-teal-100 text-teal-800",
    Updates: "bg-cyan-100 text-cyan-800",
    Community: "bg-lime-100 text-lime-800",
    Connect: "bg-emerald-100 text-emerald-800",
    Innovation: "bg-violet-100 text-violet-800",
    Technology: "bg-fuchsia-100 text-fuchsia-800",
    AI: "bg-rose-100 text-rose-800",
    Future: "bg-amber-100 text-amber-800",
    Gaming: "bg-purple-200 text-purple-800",
    Development: "bg-blue-200 text-blue-800",
    Design: "bg-pink-200 text-pink-800",
    "UI/UX": "bg-indigo-200 text-indigo-800",
    Mobile: "bg-cyan-200 text-cyan-800",
    Apps: "bg-teal-200 text-teal-800",
    Cloud: "bg-sky-200 text-sky-800",
    DevOps: "bg-slate-200 text-slate-800",
    Conference: "bg-emerald-200 text-emerald-800",
    Hackathon: "bg-violet-200 text-violet-800",
    Diversity: "bg-rose-200 text-rose-800",
    Network: "bg-lime-200 text-lime-800",
    Career: "bg-amber-200 text-amber-800",
    Networking: "bg-orange-200 text-orange-800",
    Skills: "bg-green-200 text-green-800",
    Leadership: "bg-red-200 text-red-800",
    Freelance: "bg-fuchsia-200 text-fuchsia-800",
    Business: "bg-yellow-200 text-yellow-800",
    Robotics: "bg-blue-100 text-blue-800",
    Equipment: "bg-purple-100 text-purple-800",
    Beginner: "bg-green-100 text-green-800",
    Intermediate: "bg-yellow-100 text-yellow-800",
    Research: "bg-indigo-100 text-indigo-800",
    Integration: "bg-teal-100 text-teal-800",
    University: "bg-red-100 text-red-800",
    Achievement: "bg-emerald-200 text-emerald-800",
    Success: "bg-green-200 text-green-800",
    Testimonial: "bg-blue-200 text-blue-800",
    Results: "bg-indigo-200 text-indigo-800",
    Workshop: "bg-purple-200 text-purple-800",
    IoT: "bg-cyan-200 text-cyan-800",
    Event: "bg-orange-200 text-orange-800",
    Opening: "bg-red-200 text-red-800",
    Registration: "bg-amber-200 text-amber-800",
    Family: "bg-pink-200 text-pink-800",
    Competition: "bg-violet-200 text-violet-800",
    Announcement: "bg-blue-100 text-blue-800",
    Facility: "bg-indigo-100 text-indigo-800",
    "Ages 5-10": "bg-green-100 text-green-800",
    "Ages 11-16": "bg-yellow-100 text-yellow-800",
  }

  return colors[tag] || "bg-gray-100 text-gray-800"
}

export default function NewsSection() {
  const [activeCatalog, setActiveCatalog] = useState("recently")
  const [selectedItem, setSelectedItem] = useState<string | null>(null)
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [scrollPosition, setScrollPosition] = useState(0)
  const [showLeftArrow, setShowLeftArrow] = useState(false)
  const [showRightArrow, setShowRightArrow] = useState(false)
  const isMobile = useIsMobile()
  const [mounted, setMounted] = useState(false)

  // Effect to handle URL parameters
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const section = params.get('section');
      const course = params.get('course');
      
      if (section && catalogItems.some(item => item.id === section)) {
        setActiveCatalog(section);
        
        // If course parameter exists, set it as selected course after a small delay
        if (course) {
          setTimeout(() => {
            setSelectedCourse(course);
          }, 100); // Small delay to ensure the section change happens first
        }
      }
    }
  }, []);

  // Effect to control bottom menu visibility
  useEffect(() => {
    if (isMobile === undefined) return;
    
    const bottomNav = document.querySelector('.fixed.bottom-0.left-0.right-0.z-50');
    if (bottomNav) {
      if (selectedItem || selectedCourse) {
        bottomNav.classList.add('md:block', 'hidden');
      } else {
        bottomNav.classList.remove('md:block', 'hidden');
      }
    }
    return () => {
      const bottomNav = document.querySelector('.fixed.bottom-0.left-0.right-0.z-50');
      if (bottomNav) {
        bottomNav.classList.remove('md:block', 'hidden');
      }
    };
  }, [selectedItem, selectedCourse, isMobile]);

  useEffect(() => {
    const container = document.getElementById("catalog-container")
    if (!container || isMobile === undefined) return;
    
    const updateArrows = () => {
      setShowLeftArrow(container.scrollLeft > 0)
      setShowRightArrow(container.scrollLeft < container.scrollWidth - container.clientWidth)
    }

    updateArrows()
    container.addEventListener("scroll", updateArrows)
    window.addEventListener("resize", updateArrows)

    return () => {
      container.removeEventListener("scroll", updateArrows)
      window.removeEventListener("resize", updateArrows)
    }
  }, [isMobile])

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleItemClick = (itemId: string | number) => {
    setSelectedItem(selectedItem === itemId.toString() ? null : itemId.toString())
  }

  const handleScroll = (direction: "left" | "right") => {
    const container = document.getElementById("catalog-container")
    if (container) {
      const scrollAmount = 200
      const newPosition =
        direction === "left" ? container.scrollLeft - scrollAmount : container.scrollLeft + scrollAmount

      container.scrollTo({
        left: newPosition,
        behavior: "smooth",
      })
    }
  }

  const handleCourseClick = (courseId: string) => {
    if (selectedCourse === courseId) {
      // When closing the course schedule, update URL to keep curriculum section
      if (typeof window !== 'undefined') {
        window.history.pushState({}, '', '/news?section=curriculum');
      }
      setSelectedCourse(null);
    } else {
      // When opening a course schedule
      if (typeof window !== 'undefined') {
        window.history.pushState({}, '', `/news?section=curriculum&course=${courseId}`);
      }
      setSelectedCourse(courseId);
    }
  }

  const handleSectionChange = (sectionId: string) => {
    if (sectionId !== 'curriculum') {
      // When switching to non-curriculum sections, go back to base URL
      if (typeof window !== 'undefined') {
        window.history.pushState({}, '', '/news');
      }
      setSelectedCourse(null);
    } else {
      // When switching to curriculum section
      if (typeof window !== 'undefined') {
        window.history.pushState({}, '', '/news?section=curriculum');
      }
    }
    setActiveCatalog(sectionId);
  }

  // Early return after all hooks are declared
  if (isMobile === undefined) {
    return null;
  }

  return (
    <div className="flex flex-col min-h-screen p-2 sm:p-4 pb-20 relative">
      {/* Background shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute rounded-full bg-blue-200/20 backdrop-blur-sm md:backdrop-blur-2xl hidden md:block"
          style={{ width: "50%", height: "50%", left: "-15%", top: "-15%" }}
          animate={{
            x: [0, 15, 0],
            y: [0, 10, 0],
            scale: [1, 1.02, 1],
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{
            duration: 25,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute rounded-full bg-indigo-300/15 backdrop-blur-sm md:backdrop-blur-2xl hidden md:block"
          style={{ width: "45%", height: "45%", right: "-10%", top: "0%" }}
          animate={{
            x: [0, -20, 0],
            y: [0, 15, 0],
            scale: [1, 1.02, 1],
            opacity: [0.1, 0.12, 0.1],
          }}
          transition={{
            duration: 30,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute rounded-full bg-purple-300/10 backdrop-blur-sm md:backdrop-blur-2xl hidden md:block"
          style={{ width: "55%", height: "55%", left: "-20%", bottom: "-10%" }}
          animate={{
            x: [0, 25, 0],
            y: [0, -15, 0],
            scale: [1, 1.02, 1],
            opacity: [0.08, 0.1, 0.08],
          }}
          transition={{
            duration: 35,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10">
        <div className="text-center my-4 sm:my-8">
          <h2 className="text-xl sm:text-2xl font-bold text-primary">News & Updates</h2>
        </div>

        <div className="relative flex justify-center mb-4 sm:mb-6">
          {showLeftArrow && (
            <button
              onClick={() => handleScroll("left")}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-gray-50 rounded-full p-2 sm:p-3 shadow-lg border border-gray-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 sm:h-8 sm:w-8 text-primary"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}

          <div
            id="catalog-container"
            className="flex overflow-x-auto no-scrollbar scroll-smooth px-4 sm:px-8 max-w-full bg-gray-50/80 rounded-full shadow-inner"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            <div className="flex space-x-3 sm:space-x-6 min-w-max py-2">
              {catalogItems.map((catalog) => (
                <button
                  key={catalog.id}
                  className={`px-4 sm:px-8 py-2 sm:py-3 rounded-full text-sm sm:text-base font-medium transition-all transform hover:scale-105 ${
                    activeCatalog === catalog.id
                      ? "bg-primary text-white shadow-lg"
                      : "bg-white text-gray-700 hover:bg-gray-100 shadow-sm"
                  }`}
                  onClick={() => handleSectionChange(catalog.id)}
                >
                  {catalog.title}
                </button>
              ))}
            </div>
          </div>

          {showRightArrow && (
            <button
              onClick={() => handleScroll("right")}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-gray-50 rounded-full p-2 sm:p-3 shadow-lg border border-gray-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 sm:h-8 sm:w-8 text-primary"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}
        </div>

        <AnimatePresence mode="wait">
          <motion.div 
            key={activeCatalog}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-8 relative z-10"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {catalogItems.find(cat => cat.id === activeCatalog)?.items.map((item, index) => (
                <motion.div 
                  key={item.id.toString()}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.3,
                    delay: index * 0.1,
                    ease: "easeOut"
                  }}
                  className="relative h-full"
                >
                  <Card 
                    className={`cursor-pointer transform transition-all hover:scale-105 bg-white/80 backdrop-blur-sm h-full flex flex-col ${
                      (activeCatalog === "curriculum" ? selectedCourse : selectedItem) === item.id.toString() 
                        ? 'ring-2 ring-primary' 
                        : ''
                    }`}
                    onClick={() => 
                      activeCatalog === "curriculum" 
                        ? handleCourseClick(item.id.toString())
                        : handleItemClick(item.id.toString())
                    }
                  >
                    <div className="relative h-32 sm:h-48 w-full">
                      <Image
                        src={item.image}
                        alt={typeof item.title === 'string' ? item.title : 'Course image'}
                        fill
                        className="object-cover rounded-t-lg"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <h3 className="absolute bottom-2 left-2 text-white font-semibold text-lg">{item.title}</h3>
                    </div>
                    <CardContent className="p-3 flex-grow">
                      <div className="flex flex-wrap gap-1.5 mb-2">
                        {item.tags.map((tag) => {
                          // Custom colors for curriculum course tags
                          if (activeCatalog === "curriculum") {
                            if (item.id === "pre-coding" && tag.includes("Entry")) {
                              return (
                                <Badge key={tag} variant="outline" className="bg-gray-100 text-gray-800 text-xs">
                                  {tag}
                                </Badge>
                              );
                            }
                            if (item.id === "python-ev3" && tag.includes("Basic")) {
                              return (
                                <Badge key={tag} variant="outline" className="bg-[#fdfbf7] text-gray-800 text-xs">
                                  {tag}
                                </Badge>
                              );
                            }
                            if (item.id === "mid-robotics" && tag.includes("Intermediate")) {
                              return (
                                <Badge key={tag} variant="outline" className="bg-[#fef9c3] text-gray-800 text-xs">
                                  {tag}
                                </Badge>
                              );
                            }
                            if (item.id === "arduino" && tag.includes("Advanced")) {
                              return (
                                <Badge key={tag} variant="outline" className="bg-[#ffedd5] text-gray-800 text-xs">
                                  {tag}
                                </Badge>
                              );
                            }
                          }
                          return (
                            <Badge key={tag} variant="outline" className={`${getTagColor(tag)} text-xs`}>
                              {tag}
                            </Badge>
                          );
                        })}
                      </div>
                      <p className="text-sm text-gray-600 line-clamp-2">{item.description}</p>
                    </CardContent>
                  </Card>

                  {/* Modal for non-curriculum items */}
                  {activeCatalog !== "curriculum" && selectedItem === item.id.toString() && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-start justify-center pt-20 px-4"
                    >
                      <motion.div 
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg w-full max-w-4xl relative"
                      >
                        <div className="sticky top-0 bg-white rounded-t-lg border-b border-gray-200 p-4 flex justify-between items-center">
                          <h3 className="text-xl font-semibold text-primary">{item.title}</h3>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleItemClick(item.id)}
                            className="hover:bg-gray-100/10"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-6 w-6"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                          </Button>
                        </div>
                        <div className="p-6 max-h-[70vh] overflow-y-auto">
                          <div className="prose prose-sm max-w-none">
                            {/* Show image only on desktop */}
                            <div className="hidden md:block relative h-64 w-full mb-6">
                              <Image
                                src={item.image}
                                alt={typeof item.title === 'string' ? item.title : 'Course image'}
                                fill
                                className="object-cover rounded-lg"
                              />
                            </div>
                            <div className="flex flex-wrap gap-2 mb-4">
                              {item.tags.map((tag) => (
                                <Badge key={tag} variant="outline" className={`${getTagColor(tag)}`}>
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                            <p className="whitespace-pre-wrap">{item.fullContent || item.description}</p>
                          </div>
                        </div>
                      </motion.div>
                    </motion.div>
                  )}

                  {/* Course Schedule Modal */}
                  <AnimatePresence mode="wait">
                    {activeCatalog === "curriculum" && selectedCourse === item.id.toString() && (
                      <>
                        <motion.div
                          key="backdrop"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.15 }}
                          className="fixed inset-0 z-50 bg-black/50"
                        />
                        <motion.div
                          key="modal-container"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.15 }}
                          className="fixed inset-0 z-50 flex items-center justify-center"
                        >
                          <motion.div 
                            key="modal"
                            initial={{ 
                              opacity: 0,
                              x: typeof window !== 'undefined' ? -window.innerWidth : -500,
                              scale: 0.95
                            }}
                            animate={{ 
                              opacity: 1,
                              x: 0,
                              scale: 1,
                              transition: {
                                type: "spring",
                                stiffness: 300,
                                damping: 30,
                                mass: 1,
                                opacity: { duration: 0.15 }
                              }
                            }}
                            exit={{ 
                              opacity: 0,
                              x: typeof window !== 'undefined' ? window.innerWidth : 500,
                              transition: {
                                type: "spring",
                                stiffness: 300,
                                damping: 30,
                                mass: 1,
                                opacity: { duration: 0.15 }
                              }
                            }}
                            className="bg-white rounded-lg shadow-lg w-full max-w-4xl relative mx-4 my-4 overflow-y-auto max-h-[90vh]"
                          >
                            <div className="sticky top-0 bg-white rounded-t-lg border-b border-gray-200 p-4 flex justify-between items-center z-10">
                              <h3 className="text-xl font-semibold text-primary">{item.title}</h3>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleCourseClick(item.id.toString())}
                                className="hover:bg-gray-100"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-6 w-6"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                  />
                                </svg>
                              </Button>
                            </div>
                            <div className="p-6">
                              <CourseSchedules selectedCourse={item.id.toString()} />
                            </div>
                          </motion.div>
                        </motion.div>
                      </>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}


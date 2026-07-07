export const site = {
  name: "Henry Chen",
  title: "Henry Chen",
  description:
    "Henry Chen — Robotics Engineer and Entrepreneur at UPenn. Building autonomous machines, quantitative finance research, and hardware ventures.",
  url: "https://henrychen.com",
  // Contact address is the personal Gmail, kept per the plan.
  email: "henwchen@gmail.com",
  gmailCompose:
    "https://mail.google.com/mail/?view=cm&fs=1&to=henwchen@gmail.com&su=",
  linkedin: "https://linkedin.com/in/henry-w-chen",
};

export const hero = {
  greeting: "Hi, I'm Henry!",
  subtitle: "Robotics Engineer & Entrepreneur",
  description:
    "I'm a Varsity Student-Athlete at the University of Pennsylvania, studying Electrical Engineering with a concentration in Controls and Robotics.",
  cta: "My Projects",
};

export type ExperienceEntry = {
  role: string;
  org: string;
  period: string;
  description: string;
};

export const experience: ExperienceEntry[] = [
  {
    role: "Robotics Intern",
    org: "Parametric (YC F25)",
    period: "May 2026 - Present",
    description:
      "Design custom YAM end-effectors. Develop GELLO teleoperation system. Teleoperate bimanual robots to improve deployment-specific model performance.",
  },
  {
    role: "Business Operations + Fluid Systems Engineer",
    org: "Penn Hyperloop",
    period: "September 2025 - Present",
    description:
      "Ran fluids calculations to model, identify, and characterize tolerances for slurry management and muck retrieval systems aboard TBM to optimize performance in the Not-a-Boring Competition.",
  },
  {
    role: "Mechanical Engineering Intern",
    org: "Elytra Robotics",
    period: "May 2025 - August 2025",
    description:
      "Designed custom swerve drivetrain for an industrial rover capable of indoor and outdoor operation, along with a custom onboard trash compression mechanism optimized for tight packaging.",
  },
  {
    role: "Student",
    org: "Jerome Fisher Management and Technology Program (M&T)",
    period: "June 2024 - July 2024",
    description:
      "M&TSI is a three-week for-credit course (EAS 00280). Co-Founder and Mechanical Lead for FitBox — a revolutionary portable workout solution. Designed GTM strategy and built MVP.",
  },
];

// Home gap-section CAD assembly link
export const assemblyLink =
  "https://cad.onshape.com/documents/e64e9adb0ff9466627b47f67/w/74a34c291195daf66dba9b40/e/efd1feba32d209e2a89099f3";

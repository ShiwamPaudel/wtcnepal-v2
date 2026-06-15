export type Division = 'diagnostics' | 'disinfection' | 'care';

export interface DivisionInfo {
  id: Division;
  name: string;
  color: string;
  bgColor: string;
  textColor: string;
  lightBg: string;
  tagline: string;
  description: string;
  longDescription: string;
  offerings: string[];
  benefits: { title: string; description: string }[];
  faq: { question: string; answer: string }[];
  icon: string;
  heroImage: string;
  categories?: { name: string; partner: string }[];
}

export const divisions: DivisionInfo[] = [
  {
    id: 'diagnostics',
    name: 'Diagnostics',
    color: '#004aad',
    bgColor: '#004aad',
    textColor: '#004aad',
    lightBg: '#e8f0fc',
    tagline: 'In-Vitro Diagnostic Solutions',
    icon: '',
    heroImage: '/images/diagnostics-hero.jpg',
    description:
      'In-Vitro Diagnostic solutions for hospitals, laboratories, and clinics across Nepal.',
    longDescription:
      "Diagnostics Division has Analyzers, Reagents, Point-of-care Testing Devices, Laboratory Consumables & Accessories, Software System and Many More.",
    offerings: [
      'Biochemistry Analyzer & Reagents',
      'Immunofluorescence (IFA)',
      'Chemiluminescence Immunoassay Analyzers (CLIA)',
      'Hematology Analyzer & Reagents',
      'Blood Glucometers & Continuous Glucose Monitoring Systems',
      'HbA1c & Electrolyte Analyzers',
      'Liquid, Sample & Cell Handling',
      'Molecular Diagnostic System for Oncology',
    ],
    categories: [
      { name: 'Biochemistry Analyzer & Reagents', partner: 'BioSystems S.A' },
      { name: 'Immunofluorescence (IFA)', partner: 'BioSystems' },
      { name: 'Chemiluminescence Immunoassay Analyzers (CLIA)', partner: 'Diasorin' },
      { name: 'Hematology Analyzer & Reagents', partner: 'Nihon Kohden' },
      { name: 'Blood Glucometers & Continuous Glucose Monitoring Systems', partner: 'i-SENS' },
      { name: 'HbA1c & Electrolyte Analyzers', partner: 'i-SENS' },
      { name: 'Liquid, Sample & Cell Handling', partner: 'Eppendorf' },
      { name: 'Molecular Diagnostic System for Oncology', partner: 'Biocartis' },
    ],
    benefits: [
      // {
      //   title: 'TOP BRANDS FROM OVER THE WORLD',
      //   description: 'Systems selected for traceable, reproducible results and practical laboratory use.',
      // },
    ],
    faq: [
      {
        question: 'What diagnostic equipment does WTC Nepal supply?',
        answer:
          'WTC Nepal supplies IVD equipment including clinical chemistry analyzers, hematology systems, immunoassay platforms, point-of-care devices, reagents, and consumables.',
      },
      {
        question: 'Do you provide installation and after-sales support?',
        answer:
          'Yes. WTC Nepal provides installation coordination, user training, preventive maintenance, and corrective service support.',
      },
      {
        question: 'Can WTC Nepal supply reagents and consumables regularly?',
        answer:
          'Yes. The team can coordinate recurring supply plans for reagents, controls, calibrators, and consumables.',
      },
    ],
  },
  {
    id: 'disinfection',
    name: 'Disinfection',
    color: '#ffbd59',
    bgColor: '#ffbd59',
    textColor: '#ffbd59',
    lightBg: '#fff4df',
    tagline: 'Disinfection and Sterilization Solutions',
    icon: '',
    heroImage: '/images/disinfection-hero.jpg',
    description:
      'Hospital-grade disinfection, sterilization, hygiene, and waste treatment solutions.',
    longDescription:
      "WTC Nepal's Disinfection division supports infection prevention and control workflows for healthcare facilities. The portfolio includes sterilization systems, surface and air hygiene products, healthcare waste treatment technology, and validation support for safer clinical environments.",
    offerings: [
      'Cleaning & Scrubbing Automations',
      'Chemicals, Mops, Tools & Accessories',
      'Solid Waste Treatment with Continuous Microwave Technology',
      'Liquid Waste Treatment Plant',
      'Solid Waste Treatment with Frictional Heat Technology',
      'Macerator Systems (Bed Pan, Sanitary Pads, Diapers etc.)',
      'Plasma Sterilizer, Steam Sterilizer & Washer Disinfectors',
    ],
    categories: [
      { name: 'Cleaning & Scrubbing Automations', partner: 'Taski' },
      { name: 'Chemicals, Mops, Tools & Accessories', partner: 'Diversey' },
      { name: 'Solid Waste Sterilizer with Continuous Microwave Technology', partner: 'Ecosteryl' },
      { name: 'Liquid Waste Treatment Plant', partner: 'Hakerman' },
      { name: 'Solid Waste Sterilizer with Frictional Heat Technology', partner: 'Newster' },
      { name: 'Plasma Sterilizer, Steam Sterilizer & Washer Disinfectors', partner: 'Sterilmed' },
    ],
    benefits: [
      {
        title: 'Hospital-grade quality',
        description: 'Solutions designed for practical infection prevention and control programs.',
      },
      {
        title: 'Regulatory awareness',
        description: 'Support for documentation, operator training, and validation planning.',
      },
      {
        title: 'Nationwide supply',
        description: 'Product and service coordination for healthcare providers across Nepal.',
      },
      {
        title: 'Expert validation',
        description: 'Support for installation qualification, operational checks, and performance review.',
      },
    ],
    faq: [
      {
        question: 'What sterilization equipment does WTC Nepal provide?',
        answer:
          'WTC Nepal can support autoclaves, low-temperature sterilization systems, washer-disinfectors, waste treatment systems, and related consumables.',
      },
      {
        question: 'Do you supply chemical disinfectants as well as equipment?',
        answer:
          'Yes. The disinfection portfolio includes equipment and associated consumables for surface hygiene, hand hygiene, and high-level disinfection workflows.',
      },
      {
        question: 'Can you support validation and training?',
        answer:
          'Yes. WTC Nepal can help with user training, validation planning, and preventive service schedules.',
      },
    ],
  },
  {
    id: 'care',
    name: 'Care',
    color: '#38b6ff',
    bgColor: '#38b6ff',
    textColor: '#38b6ff',
    lightBg: '#e9f7ff',
    tagline: 'Dermatology, Aesthetic, and Critical Care',
    icon: '',
    heroImage: '/images/care-hero.jpg',
    description:
      '',
    longDescription:
      "WTC Nepal's Care division connects healthcare providers with technology for dermatology, aesthetic care, ICU monitoring, respiratory support, and clinical treatment workflows. The team supports product selection, demonstrations, user training, and ongoing service needs.",
    offerings: [
      'Ventilator System',
      'Arterial Blood Gas (ABG) Analyzers',
      'Diode, Q-Switched Nd:YAG, ER: YAG & Pico/Nano Lasers',
      'Fractional Co2 Laser & Comfort-focused Microneedling',
      'Dermatology Instruments, Units & Accessories',
      'Non-Invasive Neuromodulation Technology',
      ],
    categories: [
      { name: 'Ventilator systems', partner: 'Nihon Kohden' },
      { name: 'Non-invasive neuromodulation systems', partner: 'Nesa World' },
      { name: 'High laser systems', partner: 'Asclepion' },
      { name: 'Fractional CO2 laser', partner: 'Bison' },
      { name: 'Dermatology setup and accessories', partner: 'DermaIndia' },
    ],
    benefits: [
      {
        title: 'Advanced technology',
        description: 'Portfolio options for specialist clinics, hospitals, and critical care teams.',
      },
      {
        title: 'Patient-centered support',
        description: 'Training and service support focused on safe and consistent equipment use.',
      },
      {
        title: 'Clinical workflow fit',
        description: 'Practical guidance for matching devices to facility needs and user readiness.',
      },
      {
        title: 'Expert support',
        description: 'Application training, demonstration coordination, and post-sales service support.',
      },
    ],
    faq: [
      {
        question: 'What dermatology and aesthetic equipment does WTC Nepal supply?',
        answer:
          'WTC Nepal can support laser systems, aesthetic platforms, dermatology accessories, and care technology through partner brands.',
      },
      {
        question: 'Does WTC Nepal supply critical care equipment?',
        answer:
          'Yes. The Care division includes ICU monitoring, respiratory support, infusion systems, and related critical care equipment.',
      },
      {
        question: 'Do you provide training for device operators?',
        answer:
          'Yes. WTC Nepal can coordinate user training, demonstrations, and ongoing application support.',
      },
    ],
  },
];

export function getDivision(id: Division): DivisionInfo {
  return divisions.find((division) => division.id === id)!;
}

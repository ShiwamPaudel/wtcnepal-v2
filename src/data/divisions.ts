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
    tagline: 'In-Vitro Diagnostics Solutions',
    icon: '',
    heroImage: '/images/diagnostics-hero.jpg',
    description:
      'In-Vitro Diagnostics solutions for hospitals, laboratories, and clinics across Nepal.',
    longDescription:
      "WTC Nepal's Diagnostics division supplies analyzers, reagents, point-of-care testing devices, and laboratory workflow systems sourced from global manufacturers. The portfolio supports clinical biochemistry, hematology, immunology, microbiology, and molecular diagnostics so healthcare providers can deliver faster and more reliable patient results.",
    offerings: [
      'Clinical chemistry and biochemistry analyzers',
      'Hematology and coagulation systems',
      'Immunoassay and ELISA platforms',
      'Point-of-care testing devices',
      'Microbiology and molecular diagnostics',
      'Laboratory reagents and consumables',
      'Laboratory automation and workflow support',
    ],
    categories: [
      { name: 'Biochemistry instruments and reagents', partner: 'BioSystems' },
      { name: 'Blood glucometer systems', partner: 'i-SENS' },
      { name: 'Electrolyte and POCT analyzers', partner: 'i-SENS' },
      { name: 'Immunoassay analyzers', partner: 'Diasorin' },
      { name: 'Liquid, sample, and cell handling', partner: 'Eppendorf' },
      { name: 'Oncology systems', partner: 'Biocartis' },
      { name: 'Blood gas analyzers', partner: 'i-SENS' },
    ],
    benefits: [
      {
        title: 'Clinical accuracy',
        description: 'Systems selected for traceable, reproducible results and practical laboratory use.',
      },
      {
        title: 'Speed and efficiency',
        description: 'High-throughput workflows that can reduce turnaround time and manual effort.',
      },
      {
        title: 'Global standards',
        description: 'Portfolio options from internationally recognized healthcare technology brands.',
      },
      {
        title: 'Full support',
        description: 'Installation, calibration, training, and preventive maintenance support.',
      },
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
    color: '#0f8f61',
    bgColor: '#0f8f61',
    textColor: '#0f8f61',
    lightBg: '#ecfdf5',
    tagline: 'Disinfection and Sterilization Solutions',
    icon: '',
    heroImage: '/images/disinfection-hero.jpg',
    description:
      'Hospital-grade disinfection, sterilization, hygiene, and waste treatment solutions.',
    longDescription:
      "WTC Nepal's Disinfection division supports infection prevention and control workflows for healthcare facilities. The portfolio includes sterilization systems, surface and air hygiene products, healthcare waste treatment technology, and validation support for safer clinical environments.",
    offerings: [
      'Steam autoclaves and sterilization systems',
      'Low-temperature sterilization systems',
      'Surface and air disinfection equipment',
      'Endoscope reprocessing workflows',
      'Sterilization monitoring and validation products',
      'Chemical disinfectants and antiseptics',
      'Healthcare waste treatment solutions',
    ],
    categories: [
      { name: 'Floor scrubbing automation', partner: 'Diversey Taski' },
      { name: 'Disinfectants and housekeeping solutions', partner: 'Diversey Taski' },
      { name: 'Sterilizers for solid waste', partner: 'Newster and Ecosteryl' },
      { name: 'Sterilizers for liquid waste', partner: 'Hakerman' },
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
    color: '#0284c7',
    bgColor: '#0284c7',
    textColor: '#0284c7',
    lightBg: '#e0f2fe',
    tagline: 'Dermatology, Aesthetic, and Critical Care',
    icon: '',
    heroImage: '/images/care-hero.jpg',
    description:
      'Dermatology, aesthetic care, and medical critical care equipment for healthcare providers.',
    longDescription:
      "WTC Nepal's Care division connects healthcare providers with technology for dermatology, aesthetic care, ICU monitoring, respiratory support, and clinical treatment workflows. The team supports product selection, demonstrations, user training, and ongoing service needs.",
    offerings: [
      'Laser and light therapy systems',
      'Aesthetic and skin rejuvenation equipment',
      'Body contouring and non-invasive aesthetic devices',
      'ICU patient monitors and vital signs systems',
      'Ventilators and respiratory support equipment',
      'Infusion pumps and syringe drivers',
      'Critical care and emergency room equipment',
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

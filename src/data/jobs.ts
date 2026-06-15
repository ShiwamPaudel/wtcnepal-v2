export interface JobOpening {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  summary: string;
  responsibilities: string[];
  requirements: string[];
  published?: boolean;
}

export const jobs: JobOpening[] = [
  {
    id: 'field-service-engineer',
    title: 'Field Service Engineer',
    department: 'Technical support and maintenance',
    location: 'Kathmandu with travel',
    type: 'Full-time',
    summary:
      'Support medical equipment installation, preventive maintenance, troubleshooting, and user training for healthcare providers.',
    responsibilities: [
      'Install, inspect, and maintain medical equipment.',
      'Support customers with troubleshooting and operator guidance.',
      'Coordinate service reports, spare parts, and follow-up visits.',
    ],
    requirements: [
      'Biomedical engineering, electronics, or related technical training.',
      'Hands-on experience with medical equipment service workflows.',
      'Clear communication and willingness to travel for field support.',
    ],
    published: true,
  },
];

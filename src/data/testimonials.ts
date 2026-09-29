// src/data/testimonials.ts
export interface Testimonial {
  name: string;
  designation: string;
  institution: string;
  institutionLogo: string;
  image: string;
  quote: string;
  youtube: string;
}

export const partnerTestimonials: Testimonial[] = [
  {
    name: 'Dr. Pau Vila Casas',
    designation: 'CEO',
    institution: 'BioSystems',
    institutionLogo: '/images/Testimonials/logos/biosystems.png',
    image: '/images/Testimonials/pau.jpg',
    quote: 'Its a privilege to be your partner.',
    youtube: 'https://www.youtube.com/watch?v=qH1A2mk3OCI',
  },
  {
    name: 'Mr. David Ahn',
    designation: 'Vice President & CCO',
    institution: 'i-SENS',
    institutionLogo: '/images/Testimonials/logos/isens.png',
    image: '/images/Testimonials/david.png',
    quote: 'International Standard Technologies are accessible in Nepal. Thanks to WTC.',
    youtube: 'https://www.youtube.com/embed/NFaEz9CsSpU',
  },
  {
    name: 'Mr. Aitaro Seikai',
    designation: 'CEO, Nesa World',
    institution: 'Nesa World',
    institutionLogo: '/images/Testimonials/logos/nesa-world.png',
    image: '/images/Testimonials/aitaro_seikai.jpg',
    quote: 'We will work during the next 25 years together, more energy, more enthusiasm.',
    youtube: 'https://youtu.be/fr1fm1RpBeA',
  },
];

export const customerTestimonials: Testimonial[] = [
  {
    name: 'Dr. Manisha Singh Basukala',
    designation: 'President - SODVELON, HOD | MD - Dermatology - Dhulikhel Hospital',
    institution: 'Dhulikhel Hospital',
    institutionLogo: '/images/Customers/dhulikhel-hospital.png',
    image: '/images/Testimonials/manisha.jpg',
    quote: 'Contribution of WTC in establishing the first Dermatology Setup in Nepal is commendable.',
    youtube: 'https://www.youtube.com/watch?v=MR5LdkJlPv8',
  },
  {
    name: 'Prof. Dr. Dharmendra Karn',
    designation: 'MD MBBS',
    institution: 'Cutis Care',
    institutionLogo: '/images/Testimonials/logos/cutis-care.png',
    image: '/images/Testimonials/dharmendra.png',
    quote: 'Quality After-sales service is the hallmark of WTC',
    youtube: 'https://www.youtube.com/watch?v=iOtMm4n5_IU',
  },
];

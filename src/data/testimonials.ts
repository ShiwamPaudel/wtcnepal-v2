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
    institution: '',
    institutionLogo: '/images/Partners/BioSystems.png',
    image: '/images/Testimonials/pau.jpg',
    quote: 'Its a privilege to be your partner.',
    youtube: '',
  },
  {
    name: 'Mr. David Ahn',
    designation: 'Vice President & CCO',
    institution: '',
    institutionLogo: '/images/Partners/iSens.png',
    image: '/images/Testimonials/david.png',
    quote: 'International Standard Technologies are accessible in Nepal. Thanks to WTC.',
    youtube: 'https://www.youtube.com/embed/NFaEz9CsSpU',
  },
];

export const customerTestimonials: Testimonial[] = [
  {
    name: 'Dr. Manisha Singh Basukala',
    designation: 'President - SODVELON, HOD | MD - Dermatology - Dhulikhel Hospital',
    institution: '',
    institutionLogo: '/images/Customers/dhulikhel-hospital.png',
    image: '/images/Testimonials/manisha.jpg',
    quote: 'Contribution of WTC in establishing the first Dermatology Setup in Nepal is commendable.',
    youtube: 'https://www.youtube.com/watch?v=MR5LdkJlPv8',
  },
  {
    name: 'Prof. Dr. Dharmendra Karn',
    designation: 'MD MBBS',
    institution: '',
    institutionLogo: '/images/Customers/cutis-care.jpg',
    image: '/images/Testimonials/dharmendra.png',
    quote: 'Quality After-sales service is the hallmark of WTC',
    youtube: 'https://www.youtube.com/watch?v=iOtMm4n5_IU',
  },
];

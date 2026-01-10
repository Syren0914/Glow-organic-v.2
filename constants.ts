import { Service, Testimonial, NavLink } from './types';
import { Leaf, Droplets, Sun, Sparkles, Zap, Wind, Waves } from 'lucide-react';

export const NAVIGATION_LINKS = [
  { label: 'Home', href: `#${NavLink.HOME}` },
  { label: 'Menu', href: `#${NavLink.SERVICES}` },
  { label: 'Technology', href: '#technology' },
  { label: 'Philosophy', href: `#${NavLink.ABOUT}` },
  { label: 'Contact', href: `#${NavLink.CONTACT}` },
];

export const SERVICE_CATEGORIES = [
  {
    title: "Signature Facials",
    description: "Holistic treatments for immediate glow and deep cleansing.",
    items: [
      {
        id: 'f1',
        title: 'Silk Peel Hydro Facial',
        description: 'Diamond Glow Hydro Dermabrasion simultaneously exfoliates, extracts debris, and infuses up to three serums. Includes mild extraction, massage, and mask for rejuvenated, hydrated, and voluminous skin.',
        price: '$143.00',
        duration: '1 hr 15 min'
      },
      {
        id: 'f2',
        title: 'Deep Cleaning Facial',
        description: 'Concentrates on congested pores and oily dehydrated skin. Includes exfoliation, manual extractions, Hydro Derm suction cleansing, oxygen infusion, and mask. Reduces inflammation and detoxifies.',
        price: '$95.00',
        duration: '55 min'
      },
      {
        id: 'f3',
        title: 'Express Facial',
        description: 'Created for the person on the go. Formulated to refresh, renew and revitalize – working with all skin types to reveal more youthful, healthy skin in minimum time.',
        price: '$55.00',
        duration: '30 min'
      },
       {
        id: 'f4',
        title: 'Facial Massage',
        description: 'A dedicated massage session designed to stimulate blood flow, relieve tension, and promote lymphatic drainage.',
        price: '$65.00',
        duration: '45 min'
      }
    ]
  },
  {
    title: "Clinical Rejuvenation",
    description: "Advanced modalities for structural lifting and resurfacing.",
    items: [
      
      {
        id: 'c1',
        title: 'PRX-PLUS',
        description: 'Advanced Topical Biostimulator for mature or photoaged skin. Targets deeper signs of aging to smooth wrinkles and visibly correct hyperpigmentation with enhanced collagen activation.',
        price: '$359.00',
        duration: 'Consult'
      },
      {
        id: 'c2',
        title: 'PRX',
        description: 'Advanced Topical Biostimulator for mature or photoaged skin. Targets deeper signs of aging to smooth wrinkles and visibly correct hyperpigmentation with enhanced collagen activation.',
        price: '$250.00',
        duration: 'Consult'
      },
      {
        id: 'c3',
        title: 'PRX°C Radiance',
        description: 'Topical Biostimulator with the antioxidant power of Vitamin C. Boosts collagen synthesis and neutralizes free radicals for a radiant complexion.',
        price: '$300.00',
        duration: 'Consult'
      },
       {
        id: 'c4',
        title: 'Radio Frequency Toning',
        description: 'Uses controlled RF energy to heat deeper skin layers. Stimulates collagen and elastic fiber production to improve elasticity, tone, and reduce wrinkles and sagging.',
        price: '$180.00',
        duration: '1 hr'
      },
      {
        id: 'c5',
        title: 'Chemical Peel',
        description: 'Uses a chemical solution to exfoliate and remove dead skin cells. Promotes cellular turnover for a smoother, brighter complexion.',
        price: '$100.00',
        duration: '30 min'
      }
    ]
  },
  {
    title: "Body & Enhancements",
    description: "Targeted treatments for body sculpting and finishing touches.",
    items: [
      {
        id: 'b1',
        title: 'Body Detox & Slimming',
        description: 'Targets stubborn curves (waist, hips, arms, legs). Promotes fat reduction, cellulite reduction, enhanced circulation, and metabolism boost using natural potent ingredients.',
        price: '$150.00',
        duration: '1 hr 30 min'
      },
      {
        id: 'e1',
        title: 'Dermaplaning',
        description: 'Manual exfoliation method that removes dead skin cells and vellus hair for an ultra-smooth finish.',
        price: '$40.00',
        duration: '15 min'
      }
    ]
  }
];

export const SERVICES: Service[] = []; 

export const MACHINES = [
  {
    id: 'm1',
    name: 'Celluma PRO',
    type: 'LED Light Therapy',
    description: 'NASA-developed light energy to treat acne, inflammation, and fine lines.',
    icon: Sun
  },
  {
    id: 'm2',
    name: 'Bio-Therapeutic Platinum',
    type: 'Microcurrent',
    description: 'True microcurrent technology that re-educates facial muscles for an instant lift.',
    icon: Zap
  },
  {
    id: 'm3',
    name: 'OxyLight® Ionix',
    type: 'Oxygen Infusion',
    description: 'Delivers 98% pure oxygen and negative ions to revitalize cellular health.',
    icon: Wind
  },
  {
    id: 'm4',
    name: 'DiamondTome™',
    type: 'Microdermabrasion',
    description: 'Crystal-free exfoliation wand for smooth, polished skin texture.',
    icon: Sparkles
  }
];

export const FEATURES = [
  {
    icon: Leaf,
    title: '100% Organic',
    description: 'We use only the finest plant-based ingredients sourced from sustainable farms.'
  },
  {
    icon: Droplets,
    title: 'Hydration Focused',
    description: 'Our treatments prioritize deep hydration to restore your natural moisture barrier.'
  },
  {
    icon: Sun,
    title: 'Holistic Wellness',
    description: 'We treat the skin from within, considering your lifestyle and overall well-being.'
  },
  {
    icon: Sparkles,
    title: 'Modern Technology',
    description: 'Combining ancient wisdom with modern non-invasive tools for optimal results.'
  }
];
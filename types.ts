export interface Service {
  id: string;
  title: string;
  description: string;
  price: string;
  duration: string;
  image: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  price: string;
  duration: string;
  sortOrder?: number;
}

export interface ServiceCategory {
  id: string;
  title: string;
  description: string;
  sortOrder?: number;
  items: ServiceItem[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  rating: number;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export enum NavLink {
  HOME = 'home',
  SERVICES = 'services',
  ABOUT = 'about',
  CONSULT = 'consult',
  CONTACT = 'contact',
  ADMIN = 'admin'
}

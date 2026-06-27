export interface Product {
  id: string;
  name: string;
  category: string; // 'Sleep & Stress' | 'Skin Health' | 'Gut Balance' | 'Daily Energy'
  description: string;
  fullDescription: string;
  price: number;
  originalPrice?: number;
  imageUrl: string;
  secondaryImages?: string[];
  bestseller?: boolean;
  new?: boolean;
  tags?: string[];
  format: 'Tincture' | 'Capsule' | 'Powder' | 'Balm' | 'Cream' | 'Serum';
  concern: string; // 'Insomnia' | 'Stress' | 'Anxiety' | 'Aging' | 'Barrier' | 'Digestion' | 'Vitality';
  ingredients: string;
  usage: string;
  clinicalData: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedDuration: '30 Days' | '60 Days';
}

export type ScreenType = 'home' | 'shop' | 'product-detail' | 'checkout' | 'science' | 'journal' | 'order-confirmation' | 'contact' | 'faq';

export interface CheckoutInfo {
  email: string;
  newsletter: boolean;
  country: string;
  firstName: string;
  lastName: string;
  address: string;
  apartment: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
}

export interface Review {
  id: string;
  productId: string;
  name: string;
  rating: number;
  comment: string;
  date: string;
}


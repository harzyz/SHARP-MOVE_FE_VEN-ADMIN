export interface Category {
  id: string;
  label: string;
}

export const CATEGORIES: Category[] = [
  { id: "all", label: "All" },
  { id: "food", label: "Food" },
  { id: "groceries", label: "Groceries" },
  { id: "drinks", label: "Drinks" },
  { id: "top-rated", label: "Top Rated" },
  { id: "fast-delivery", label: "Fast Delivery" },
  { id: "budget", label: "Budget Friendly" },
  { id: "new", label: "New" },
];

export interface PromoBanner {
  id: string;
  title: string;
  subtitle: string;
  bgColor: string;
  textColor: string;
  badgeText?: string;
}

export const PROMO_BANNERS: PromoBanner[] = [
  {
    id: "1",
    title: "20% off your first order",
    subtitle: "Use code WELCOME20 at checkout",
    bgColor: "bg-primary-100",
    textColor: "text-primary-900",
    badgeText: "New User",
  },
  {
    id: "2",
    title: "Free delivery this weekend",
    subtitle: "On orders above \u20A62,000",
    bgColor: "bg-secondary-100",
    textColor: "text-secondary-900",
    badgeText: "Limited Offer",
  },
  {
    id: "3",
    title: "Lunch deals from \u20A6500",
    subtitle: "Available 11am \u2013 3pm daily",
    bgColor: "bg-accent-100",
    textColor: "text-accent-900",
  },
];

export interface Restaurant {
  id: string;
  name: string;
  rating: number;
  reviewCount: number;
  deliveryTime: string;
  deliveryFee: number;
  cuisines: string[];
  isOpen: boolean;
}

export const RESTAURANTS_NEAR_YOU: Restaurant[] = [
  {
    id: "1",
    name: "Mama's Kitchen",
    rating: 4.8,
    reviewCount: 234,
    deliveryTime: "20\u201330 min",
    deliveryFee: 500,
    cuisines: ["Nigerian", "Local"],
    isOpen: true,
  },
  {
    id: "2",
    name: "Grill Masters",
    rating: 4.5,
    reviewCount: 189,
    deliveryTime: "25\u201335 min",
    deliveryFee: 600,
    cuisines: ["Grills", "BBQ"],
    isOpen: true,
  },
  {
    id: "3",
    name: "Chicken Republic",
    rating: 4.2,
    reviewCount: 412,
    deliveryTime: "15\u201325 min",
    deliveryFee: 400,
    cuisines: ["Fast Food", "Chicken"],
    isOpen: true,
  },
  {
    id: "4",
    name: "The Place",
    rating: 4.6,
    reviewCount: 328,
    deliveryTime: "30\u201340 min",
    deliveryFee: 700,
    cuisines: ["Nigerian", "Continental"],
    isOpen: true,
  },
  {
    id: "5",
    name: "Sweet Sensation",
    rating: 4.1,
    reviewCount: 156,
    deliveryTime: "20\u201330 min",
    deliveryFee: 500,
    cuisines: ["Fast Food", "Pastries"],
    isOpen: false,
  },
  {
    id: "6",
    name: "Kilimanjaro",
    rating: 4.7,
    reviewCount: 267,
    deliveryTime: "25\u201335 min",
    deliveryFee: 550,
    cuisines: ["Nigerian", "Seafood"],
    isOpen: true,
  },
];

export interface RecentOrder {
  id: string;
  restaurantName: string;
  items: string;
  total: number;
  date: string;
}

export const RECENT_ORDERS: RecentOrder[] = [
  {
    id: "ord-1",
    restaurantName: "Mama's Kitchen",
    items: "Jollof Rice, Chicken, Chapman",
    total: 4500,
    date: "2026-02-05",
  },
  {
    id: "ord-2",
    restaurantName: "Grill Masters",
    items: "Suya Platter, Peppered Gizzard",
    total: 3200,
    date: "2026-02-03",
  },
  {
    id: "ord-3",
    restaurantName: "Chicken Republic",
    items: "Chicken Meal Box, Coleslaw",
    total: 2800,
    date: "2026-02-01",
  },
];

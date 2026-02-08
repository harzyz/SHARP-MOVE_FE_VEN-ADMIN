import type { StoreProfile, FAQItem } from "@/types";

export const MOCK_STORE_PROFILE: StoreProfile = {
  id: "store-1",
  name: "Mama's Kitchen",
  description: "Authentic Nigerian cuisine made with fresh, locally sourced ingredients. From smoky jollof rice to rich egusi soup, every dish is prepared with love.",
  cuisineTypes: ["Nigerian", "West African", "Local Delicacies"],
  address: "14 Admiralty Way, Lekki Phase 1, Lagos",
  phone: "+234 801 234 5678",
  email: "hello@mamaskitchen.ng",
  isOpen: true,
  operatingHours: [
    { day: "Monday", isOpen: true, openTime: "09:00", closeTime: "22:00" },
    { day: "Tuesday", isOpen: true, openTime: "09:00", closeTime: "22:00" },
    { day: "Wednesday", isOpen: true, openTime: "09:00", closeTime: "22:00" },
    { day: "Thursday", isOpen: true, openTime: "09:00", closeTime: "22:00" },
    { day: "Friday", isOpen: true, openTime: "09:00", closeTime: "23:00" },
    { day: "Saturday", isOpen: true, openTime: "10:00", closeTime: "23:00" },
    { day: "Sunday", isOpen: false, openTime: "00:00", closeTime: "00:00" },
  ],
  deliveryRadius: 10,
  minimumOrder: 1500,
  defaultPrepTime: 20,
  rating: 4.8,
  totalReviews: 342,
};

export const MOCK_FAQ_ITEMS: FAQItem[] = [
  {
    id: "faq-1",
    question: "How do I accept or reject an order?",
    answer: "Go to the Orders page and look at the 'New' tab. Each new order has Accept and Reject buttons. You must respond within 5 minutes or the order will be automatically cancelled.",
    category: "Orders",
  },
  {
    id: "faq-2",
    question: "How do I update my menu items?",
    answer: "Navigate to the Menu page. You can toggle item availability with the switch, edit prices and descriptions, or add new items using the '+ Add Item' button.",
    category: "Menu",
  },
  {
    id: "faq-3",
    question: "When do I receive my payouts?",
    answer: "Payouts are processed weekly on Mondays for the previous week's earnings. Funds typically arrive in your bank account within 1-2 business days after processing.",
    category: "Finance",
  },
  {
    id: "faq-4",
    question: "What is the commission rate?",
    answer: "The standard commission rate is 15% of the order subtotal. This covers platform fees, payment processing, and customer support.",
    category: "Finance",
  },
  {
    id: "faq-5",
    question: "How do I change my store operating hours?",
    answer: "Go to Settings > Operating Hours. You can set different opening and closing times for each day of the week, or mark specific days as closed.",
    category: "Settings",
  },
  {
    id: "faq-6",
    question: "Can I temporarily close my store?",
    answer: "Yes! Use the Open/Closed toggle in the header bar to instantly pause incoming orders. You can reopen at any time.",
    category: "Settings",
  },
  {
    id: "faq-7",
    question: "How do I update my bank account details?",
    answer: "Go to Finance > Bank Account and click 'Update Bank Details'. Verification of new bank details typically takes 24-48 hours.",
    category: "Finance",
  },
  {
    id: "faq-8",
    question: "What should I do if a rider hasn't picked up my order?",
    answer: "If a rider hasn't arrived within 10 minutes after you mark an order as ready, contact support through the Help & Support page. We'll assign a new rider immediately.",
    category: "Orders",
  },
];

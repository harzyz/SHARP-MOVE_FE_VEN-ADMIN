import type { VendorMenuCategory, VendorMenuItem } from "@/types";

export const VENDOR_MENU_CATEGORIES: VendorMenuCategory[] = [
  { id: "cat-1", name: "Popular", sortOrder: 1, itemCount: 3 },
  { id: "cat-2", name: "Rice Dishes", sortOrder: 2, itemCount: 4 },
  { id: "cat-3", name: "Soups & Swallows", sortOrder: 3, itemCount: 3 },
  { id: "cat-4", name: "Proteins", sortOrder: 4, itemCount: 3 },
  { id: "cat-5", name: "Sides", sortOrder: 5, itemCount: 3 },
  { id: "cat-6", name: "Drinks", sortOrder: 6, itemCount: 4 },
];

export const VENDOR_MENU_ITEMS: VendorMenuItem[] = [
  // Popular
  {
    id: "vmi-1", categoryId: "cat-1", name: "Jollof Rice", description: "Smoky party-style jollof rice cooked with tomatoes and spices", price: 2500, isAvailable: true, prepTime: 15, sortOrder: 1,
    modifierGroups: [
      { id: "mg-1", name: "Protein Choice", required: true, maxSelections: 1, modifiers: [
        { id: "mod-1", name: "Chicken", price: 0 },
        { id: "mod-2", name: "Beef", price: 0 },
        { id: "mod-3", name: "Fish", price: 500 },
      ]},
    ],
  },
  {
    id: "vmi-2", categoryId: "cat-1", name: "Pounded Yam & Egusi", description: "Smooth pounded yam served with rich egusi soup", price: 3500, isAvailable: true, prepTime: 20, sortOrder: 2,
    modifierGroups: [
      { id: "mg-2", name: "Protein", required: true, maxSelections: 2, modifiers: [
        { id: "mod-4", name: "Beef", price: 0 },
        { id: "mod-5", name: "Stockfish", price: 300 },
        { id: "mod-6", name: "Assorted Meat", price: 500 },
      ]},
    ],
  },
  {
    id: "vmi-3", categoryId: "cat-1", name: "Suya Platter", description: "Grilled spiced beef skewers with onions and tomatoes", price: 4500, isAvailable: true, prepTime: 25, sortOrder: 3,
    modifierGroups: [
      { id: "mg-3", name: "Spice Level", required: false, maxSelections: 1, modifiers: [
        { id: "mod-7", name: "Mild", price: 0 },
        { id: "mod-8", name: "Medium", price: 0 },
        { id: "mod-9", name: "Hot", price: 0 },
      ]},
    ],
  },

  // Rice Dishes
  {
    id: "vmi-4", categoryId: "cat-2", name: "Fried Rice & Chicken", description: "Nigerian-style fried rice with mixed vegetables and fried chicken", price: 3000, isAvailable: true, prepTime: 18, sortOrder: 1,
    modifierGroups: [],
  },
  {
    id: "vmi-5", categoryId: "cat-2", name: "Ofada Rice & Sauce", description: "Local unpolished rice with spicy ofada sauce and assorted meat", price: 3200, isAvailable: true, prepTime: 20, sortOrder: 2,
    modifierGroups: [
      { id: "mg-4", name: "Extras", required: false, maxSelections: 2, modifiers: [
        { id: "mod-10", name: "Extra Assorted Meat", price: 800 },
        { id: "mod-11", name: "Fried Plantain", price: 300 },
      ]},
    ],
  },
  {
    id: "vmi-6", categoryId: "cat-2", name: "Coconut Rice", description: "Fragrant rice cooked in coconut milk with herbs", price: 2800, isAvailable: true, prepTime: 15, sortOrder: 3,
    modifierGroups: [],
  },
  {
    id: "vmi-7", categoryId: "cat-2", name: "White Rice & Stew", description: "Steamed white rice with rich tomato stew", price: 2200, isAvailable: false, prepTime: 12, sortOrder: 4,
    modifierGroups: [
      { id: "mg-5", name: "Protein", required: true, maxSelections: 1, modifiers: [
        { id: "mod-12", name: "Chicken", price: 0 },
        { id: "mod-13", name: "Beef", price: 0 },
      ]},
    ],
  },

  // Soups & Swallows
  {
    id: "vmi-8", categoryId: "cat-3", name: "Amala & Ewedu", description: "Yam flour meal with ewedu and gbegiri soup", price: 2500, isAvailable: true, prepTime: 15, sortOrder: 1,
    modifierGroups: [
      { id: "mg-6", name: "Add-ons", required: false, maxSelections: 2, modifiers: [
        { id: "mod-14", name: "Gbegiri", price: 200 },
        { id: "mod-15", name: "Assorted Meat", price: 500 },
      ]},
    ],
  },
  {
    id: "vmi-9", categoryId: "cat-3", name: "Pepper Soup", description: "Spicy broth with tender meat or fish", price: 2800, isAvailable: true, prepTime: 22, sortOrder: 2,
    modifierGroups: [
      { id: "mg-7", name: "Protein Choice", required: true, maxSelections: 1, modifiers: [
        { id: "mod-16", name: "Goat Meat", price: 0 },
        { id: "mod-17", name: "Catfish", price: 500 },
      ]},
    ],
  },
  {
    id: "vmi-10", categoryId: "cat-3", name: "Edikang Ikong Soup", description: "Nutritious vegetable soup with assorted meat and stockfish", price: 4000, isAvailable: true, prepTime: 25, sortOrder: 3,
    modifierGroups: [],
  },

  // Proteins
  {
    id: "vmi-11", categoryId: "cat-4", name: "Grilled Fish", description: "Whole tilapia grilled with pepper sauce", price: 4500, isAvailable: true, prepTime: 30, sortOrder: 1,
    modifierGroups: [],
  },
  {
    id: "vmi-12", categoryId: "cat-4", name: "Nkwobi", description: "Spicy cow foot in palm oil sauce", price: 5000, isAvailable: true, prepTime: 20, sortOrder: 2,
    modifierGroups: [],
  },
  {
    id: "vmi-13", categoryId: "cat-4", name: "Sharwarma (Large)", description: "Chicken sharwarma wrap with coleslaw and special sauce", price: 3000, isAvailable: true, prepTime: 15, sortOrder: 3,
    modifierGroups: [],
  },

  // Sides
  {
    id: "vmi-14", categoryId: "cat-5", name: "Fried Plantain", description: "Sweet ripe plantain fried golden", price: 800, isAvailable: true, prepTime: 10, sortOrder: 1,
    modifierGroups: [],
  },
  {
    id: "vmi-15", categoryId: "cat-5", name: "Moi Moi", description: "Steamed bean pudding with egg and fish", price: 500, isAvailable: true, prepTime: 5, sortOrder: 2,
    modifierGroups: [],
  },
  {
    id: "vmi-16", categoryId: "cat-5", name: "Coleslaw", description: "Fresh creamy coleslaw salad", price: 500, isAvailable: true, prepTime: 5, sortOrder: 3,
    modifierGroups: [],
  },

  // Drinks
  {
    id: "vmi-17", categoryId: "cat-6", name: "Chapman", description: "Classic Nigerian cocktail with citrus and bitters", price: 1200, isAvailable: true, prepTime: 5, sortOrder: 1,
    modifierGroups: [],
  },
  {
    id: "vmi-18", categoryId: "cat-6", name: "Zobo Drink", description: "Chilled hibiscus drink with ginger and pineapple", price: 600, isAvailable: true, prepTime: 3, sortOrder: 2,
    modifierGroups: [],
  },
  {
    id: "vmi-19", categoryId: "cat-6", name: "Smoothie", description: "Fresh fruit smoothie blend", price: 1500, isAvailable: true, prepTime: 5, sortOrder: 3,
    modifierGroups: [],
  },
  {
    id: "vmi-20", categoryId: "cat-6", name: "Palm Wine", description: "Fresh palm wine served chilled", price: 1000, isAvailable: false, prepTime: 2, sortOrder: 4,
    modifierGroups: [],
  },
];

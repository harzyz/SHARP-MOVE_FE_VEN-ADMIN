import type { MenuCategory, MenuItem } from "@/types/ordering";

export const MENU_CATEGORIES: MenuCategory[] = [
  { id: "popular", label: "Popular" },
  { id: "rice", label: "Rice Dishes" },
  { id: "soups", label: "Soups & Swallows" },
  { id: "proteins", label: "Proteins" },
  { id: "sides", label: "Sides" },
  { id: "drinks", label: "Drinks" },
];

export const MENU_ITEMS: MenuItem[] = [
  // Restaurant 1 — Mama's Kitchen
  { id: "mi-1-1", restaurantId: "1", categoryId: "popular", name: "Jollof Rice & Chicken", description: "Smoky party-style jollof rice served with a grilled chicken drumstick and coleslaw.", price: 2500, isAvailable: true },
  { id: "mi-1-2", restaurantId: "1", categoryId: "popular", name: "Fried Rice Special", description: "Mixed vegetable fried rice with prawns, liver, and dodo.", price: 3000, isAvailable: true },
  { id: "mi-1-3", restaurantId: "1", categoryId: "rice", name: "Coconut Rice", description: "Fragrant coconut rice served with peppered fish stew.", price: 2200, isAvailable: true },
  { id: "mi-1-4", restaurantId: "1", categoryId: "soups", name: "Egusi Soup & Pounded Yam", description: "Rich melon seed soup with assorted meat and pounded yam.", price: 3500, isAvailable: true },
  { id: "mi-1-5", restaurantId: "1", categoryId: "proteins", name: "Peppered Chicken", description: "Spicy deep-fried chicken pieces in a tangy pepper sauce.", price: 1800, isAvailable: true },
  { id: "mi-1-6", restaurantId: "1", categoryId: "drinks", name: "Chapman", description: "Classic Nigerian cocktail with Fanta, Sprite, and grenadine.", price: 800, isAvailable: true },

  // Restaurant 2 — Grill Masters
  { id: "mi-2-1", restaurantId: "2", categoryId: "popular", name: "Suya Platter", description: "Spiced beef suya skewers served with sliced onions, tomatoes, and yaji spice.", price: 2800, isAvailable: true },
  { id: "mi-2-2", restaurantId: "2", categoryId: "popular", name: "Peppered Gizzard", description: "Crispy fried gizzard tossed in a hot pepper sauce.", price: 1500, isAvailable: true },
  { id: "mi-2-3", restaurantId: "2", categoryId: "proteins", name: "Grilled Croaker Fish", description: "Whole croaker fish seasoned and grilled over charcoal.", price: 4500, isAvailable: true },
  { id: "mi-2-4", restaurantId: "2", categoryId: "proteins", name: "BBQ Chicken Wings", description: "Smoky barbecue chicken wings with a honey glaze.", price: 2200, isAvailable: true },
  { id: "mi-2-5", restaurantId: "2", categoryId: "sides", name: "Coleslaw", description: "Fresh creamy coleslaw with carrots and cabbage.", price: 500, isAvailable: true },

  // Restaurant 3 — Chicken Republic
  { id: "mi-3-1", restaurantId: "3", categoryId: "popular", name: "Chicken Meal Box", description: "Two-piece fried chicken, chips, coleslaw, and a drink.", price: 2800, isAvailable: true },
  { id: "mi-3-2", restaurantId: "3", categoryId: "popular", name: "Chicken Burger", description: "Crispy chicken fillet burger with lettuce and mayo.", price: 1800, isAvailable: true },
  { id: "mi-3-3", restaurantId: "3", categoryId: "sides", name: "Chips & Ketchup", description: "Golden fried chips with tomato ketchup.", price: 800, isAvailable: true },
  { id: "mi-3-4", restaurantId: "3", categoryId: "drinks", name: "Malt Drink", description: "Chilled non-alcoholic malt beverage.", price: 500, isAvailable: true },
  { id: "mi-3-5", restaurantId: "3", categoryId: "proteins", name: "Chicken Wrap", description: "Grilled chicken wrap with vegetables and sauce.", price: 1500, isAvailable: false },

  // Restaurant 4 — The Place
  { id: "mi-4-1", restaurantId: "4", categoryId: "popular", name: "Ofada Rice & Stew", description: "Local ofada rice with spicy ayamase stew and assorted meat.", price: 3200, isAvailable: true },
  { id: "mi-4-2", restaurantId: "4", categoryId: "rice", name: "White Rice & Stew", description: "Fluffy white rice with rich tomato stew and beef.", price: 2000, isAvailable: true },
  { id: "mi-4-3", restaurantId: "4", categoryId: "soups", name: "Oha Soup & Fufu", description: "Oha leaf soup with stockfish and fufu.", price: 3000, isAvailable: true },
  { id: "mi-4-4", restaurantId: "4", categoryId: "proteins", name: "Asun", description: "Spicy smoked goat meat in a peppery sauce.", price: 2500, isAvailable: true },
  { id: "mi-4-5", restaurantId: "4", categoryId: "drinks", name: "Zobo", description: "Chilled hibiscus drink with ginger and pineapple.", price: 600, isAvailable: true },

  // Restaurant 5 — Sweet Sensation
  { id: "mi-5-1", restaurantId: "5", categoryId: "popular", name: "Meat Pie", description: "Flaky pastry filled with seasoned minced beef and vegetables.", price: 800, isAvailable: true },
  { id: "mi-5-2", restaurantId: "5", categoryId: "popular", name: "Chicken Pie", description: "Golden pastry filled with shredded chicken in a creamy sauce.", price: 900, isAvailable: true },
  { id: "mi-5-3", restaurantId: "5", categoryId: "rice", name: "Jollof Rice & Turkey", description: "Classic jollof rice served with a fried turkey leg.", price: 2800, isAvailable: true },
  { id: "mi-5-4", restaurantId: "5", categoryId: "sides", name: "Doughnut", description: "Soft sugar-coated ring doughnut.", price: 400, isAvailable: true },
  { id: "mi-5-5", restaurantId: "5", categoryId: "drinks", name: "Fresh Juice", description: "Freshly squeezed orange juice.", price: 700, isAvailable: true },

  // Restaurant 6 — Kilimanjaro
  { id: "mi-6-1", restaurantId: "6", categoryId: "popular", name: "Seafood Okra", description: "Rich okra soup loaded with prawns, crabs, and assorted seafood.", price: 5000, isAvailable: true },
  { id: "mi-6-2", restaurantId: "6", categoryId: "popular", name: "Fisherman Soup", description: "Spicy catfish pepper soup with yam.", price: 3500, isAvailable: true },
  { id: "mi-6-3", restaurantId: "6", categoryId: "rice", name: "Native Jollof", description: "Firewood-smoked jollof rice with grilled fish.", price: 3200, isAvailable: true },
  { id: "mi-6-4", restaurantId: "6", categoryId: "proteins", name: "Grilled Prawns", description: "Jumbo prawns marinated and grilled with herb butter.", price: 4800, isAvailable: true },
  { id: "mi-6-5", restaurantId: "6", categoryId: "drinks", name: "Palm Wine", description: "Fresh natural palm wine served chilled.", price: 1000, isAvailable: true },
];

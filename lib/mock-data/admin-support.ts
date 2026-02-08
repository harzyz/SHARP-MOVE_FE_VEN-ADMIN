import type { SupportTicket } from "@/types";

const now = new Date();
function hoursAgo(hours: number): string {
  return new Date(now.getTime() - hours * 3600000).toISOString();
}
function daysAgo(days: number): string {
  return new Date(now.getTime() - days * 86400000).toISOString();
}

export const MOCK_SUPPORT_TICKETS: SupportTicket[] = [
  {
    id: "tkt-001", ticketNumber: "TKT-10042", subject: "Order never delivered",
    description: "I placed an order 2 hours ago and the rider picked it up but never delivered. The app still shows 'on the way'.",
    category: "order_issue", priority: "high", status: "open",
    customerName: "Amara Nwosu", customerId: "cust-001", customerEmail: "amara.n@gmail.com",
    relatedOrderId: "aord-001", createdAt: hoursAgo(1), updatedAt: hoursAgo(1),
    messages: [
      { id: "msg-001", sender: "Amara Nwosu", senderRole: "customer", message: "I placed an order 2 hours ago and the rider picked it up but never delivered. The app still shows 'on the way'. Please help!", timestamp: hoursAgo(1) },
    ],
  },
  {
    id: "tkt-002", ticketNumber: "TKT-10041", subject: "Double charged for order",
    description: "I was charged twice for order #3419. Please refund the duplicate charge.",
    category: "payment", priority: "high", status: "in_progress",
    customerName: "Olumide Falade", customerId: "cust-004", customerEmail: "olumide.f@yahoo.com",
    assignedTo: "Adebayo Ogunlesi", relatedOrderId: "aord-004",
    createdAt: hoursAgo(5), updatedAt: hoursAgo(2),
    messages: [
      { id: "msg-002", sender: "Olumide Falade", senderRole: "customer", message: "I was charged twice for order #3419. My bank statement shows two debits of NGN 12,500. Please refund the duplicate.", timestamp: hoursAgo(5) },
      { id: "msg-003", sender: "Adebayo Ogunlesi", senderRole: "admin", message: "Hi Olumide, I can see the duplicate charge. I've initiated a refund for NGN 12,500. It should reflect in your account within 24-48 hours.", timestamp: hoursAgo(2) },
    ],
  },
  {
    id: "tkt-003", ticketNumber: "TKT-10040", subject: "Cannot update my phone number",
    description: "I'm trying to change my phone number but the app says 'verification failed'.",
    category: "account", priority: "medium", status: "awaiting_response",
    customerName: "Chioma Okeke", customerId: "cust-002", customerEmail: "chioma.okeke@gmail.com",
    assignedTo: "Adebayo Ogunlesi",
    createdAt: hoursAgo(8), updatedAt: hoursAgo(4),
    messages: [
      { id: "msg-004", sender: "Chioma Okeke", senderRole: "customer", message: "I'm trying to change my phone number in settings but I keep getting 'verification failed'. I've tried 3 times.", timestamp: hoursAgo(8) },
      { id: "msg-005", sender: "Adebayo Ogunlesi", senderRole: "admin", message: "Hi Chioma, could you please confirm the new phone number you're trying to add? I'll update it manually on our end.", timestamp: hoursAgo(4) },
    ],
  },
  {
    id: "tkt-004", ticketNumber: "TKT-10039", subject: "Food was cold and stale",
    description: "My jollof rice from Bukka Hut was cold and the chicken was stale. Very disappointed.",
    category: "vendor_complaint", priority: "medium", status: "in_progress",
    customerName: "Kemi Oladipo", customerId: "cust-005", customerEmail: "kemi.o@gmail.com",
    assignedTo: "Adebayo Ogunlesi", relatedOrderId: "aord-005",
    createdAt: daysAgo(1), updatedAt: hoursAgo(6),
    messages: [
      { id: "msg-006", sender: "Kemi Oladipo", senderRole: "customer", message: "My jollof rice from Bukka Hut was cold and the chicken was stale. I paid NGN 7,650 for this. Very disappointed.", timestamp: daysAgo(1) },
      { id: "msg-007", sender: "Adebayo Ogunlesi", senderRole: "admin", message: "Hi Kemi, I'm sorry about your experience. I've flagged this with Bukka Hut and we're investigating. Would you like a refund or a replacement order?", timestamp: hoursAgo(6) },
      { id: "msg-008", sender: "Kemi Oladipo", senderRole: "customer", message: "I'd prefer a refund please.", timestamp: hoursAgo(5) },
    ],
  },
  {
    id: "tkt-005", ticketNumber: "TKT-10038", subject: "Rider was rude",
    description: "The rider for my last delivery was very rude and aggressive when I asked him to come to my door.",
    category: "rider_complaint", priority: "medium", status: "open",
    customerName: "Obinna Agu", customerId: "cust-007", customerEmail: "obinna.agu@gmail.com",
    relatedOrderId: "aord-007",
    createdAt: daysAgo(1), updatedAt: daysAgo(1),
    messages: [
      { id: "msg-009", sender: "Obinna Agu", senderRole: "customer", message: "The rider (Segun) for my last delivery was very rude and aggressive when I asked him to bring the food to my door instead of waiting at the gate. He threw the bag at me. This is unacceptable.", timestamp: daysAgo(1) },
    ],
  },
  {
    id: "tkt-006", ticketNumber: "TKT-10037", subject: "App crashes when I try to reorder",
    description: "Every time I tap 'Reorder' on my past orders, the app crashes immediately.",
    category: "technical", priority: "low", status: "resolved",
    customerName: "Ngozi Ibe", customerId: "cust-008", customerEmail: "ngozi.ibe@outlook.com",
    assignedTo: "Adebayo Ogunlesi",
    createdAt: daysAgo(3), updatedAt: daysAgo(1), resolvedAt: daysAgo(1),
    messages: [
      { id: "msg-010", sender: "Ngozi Ibe", senderRole: "customer", message: "Every time I tap 'Reorder' on my past orders, the app crashes immediately. I'm on iPhone 13, iOS 17.2.", timestamp: daysAgo(3) },
      { id: "msg-011", sender: "Adebayo Ogunlesi", senderRole: "admin", message: "Hi Ngozi, thanks for reporting this. We've identified the bug and pushed a fix. Please update your app to the latest version (v3.2.1) and try again.", timestamp: daysAgo(2) },
      { id: "msg-012", sender: "Ngozi Ibe", senderRole: "customer", message: "Updated and it works now. Thanks!", timestamp: daysAgo(1) },
      { id: "msg-013", sender: "Adebayo Ogunlesi", senderRole: "admin", message: "Glad to hear that! Closing this ticket. Feel free to reach out if you need anything else.", timestamp: daysAgo(1) },
    ],
  },
  {
    id: "tkt-007", ticketNumber: "TKT-10036", subject: "Promo code not working",
    description: "I'm trying to use WELCOME50 but it says 'promo code invalid'.",
    category: "payment", priority: "low", status: "resolved",
    customerName: "Fatima Abdullahi", customerId: "cust-009", customerEmail: "fatima.a@gmail.com",
    assignedTo: "Adebayo Ogunlesi",
    createdAt: daysAgo(4), updatedAt: daysAgo(3), resolvedAt: daysAgo(3),
    messages: [
      { id: "msg-014", sender: "Fatima Abdullahi", senderRole: "customer", message: "I'm trying to use WELCOME50 but it says 'promo code invalid'. I'm a new user and this is my first order.", timestamp: daysAgo(4) },
      { id: "msg-015", sender: "Adebayo Ogunlesi", senderRole: "admin", message: "Hi Fatima, I checked and the minimum order is NGN 2,000 for WELCOME50. Your cart total was NGN 1,800. Please add more items or try a different code.", timestamp: daysAgo(3) },
      { id: "msg-016", sender: "Fatima Abdullahi", senderRole: "customer", message: "Oh I see, that makes sense. Thank you!", timestamp: daysAgo(3) },
    ],
  },
  {
    id: "tkt-008", ticketNumber: "TKT-10035", subject: "Missing items in order",
    description: "My order was missing 2 items — the moi moi and the plantain.",
    category: "order_issue", priority: "high", status: "in_progress",
    customerName: "Tunde Bakare", customerId: "cust-010", customerEmail: "tunde.b@yahoo.com",
    assignedTo: "Adebayo Ogunlesi", relatedOrderId: "aord-010",
    createdAt: hoursAgo(3), updatedAt: hoursAgo(1),
    messages: [
      { id: "msg-017", sender: "Tunde Bakare", senderRole: "customer", message: "My order was missing 2 items — the moi moi and the plantain. I paid for everything. Order #3415.", timestamp: hoursAgo(3) },
      { id: "msg-018", sender: "Adebayo Ogunlesi", senderRole: "admin", message: "Hi Tunde, I'm sorry about that. I've contacted Sweet Sensation to verify. In the meantime, I'll apply a credit of NGN 1,500 to your wallet for the missing items.", timestamp: hoursAgo(1) },
    ],
  },
  {
    id: "tkt-009", ticketNumber: "TKT-10034", subject: "Want to delete my account",
    description: "I want to permanently delete my account and all associated data.",
    category: "account", priority: "low", status: "closed",
    customerName: "Grace Nnamdi", customerId: "cust-015", customerEmail: "grace.n@gmail.com",
    assignedTo: "Adebayo Ogunlesi",
    createdAt: daysAgo(7), updatedAt: daysAgo(5), resolvedAt: daysAgo(5),
    messages: [
      { id: "msg-019", sender: "Grace Nnamdi", senderRole: "customer", message: "I want to permanently delete my account and all associated data.", timestamp: daysAgo(7) },
      { id: "msg-020", sender: "Adebayo Ogunlesi", senderRole: "admin", message: "Hi Grace, we're sorry to see you go. Your account has been deactivated and your data will be permanently deleted within 30 days per our data retention policy.", timestamp: daysAgo(5) },
    ],
  },
  {
    id: "tkt-010", ticketNumber: "TKT-10033", subject: "Vendor not responding to messages",
    description: "I've been trying to contact Kilimanjaro about a custom order but they don't respond.",
    category: "vendor_complaint", priority: "low", status: "open",
    customerName: "Yemi Solanke", customerId: "cust-012", customerEmail: "yemi.s@gmail.com",
    createdAt: daysAgo(2), updatedAt: daysAgo(2),
    messages: [
      { id: "msg-021", sender: "Yemi Solanke", senderRole: "customer", message: "I've been trying to contact Kilimanjaro about a custom catering order for 2 days but they don't respond on the app or phone.", timestamp: daysAgo(2) },
    ],
  },
];

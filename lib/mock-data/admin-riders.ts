import type { Rider, RiderZone, RiderApplication, RiderPayout } from "@/types";

const now = new Date();
function hoursAgo(hours: number): string {
  return new Date(now.getTime() - hours * 3600000).toISOString();
}
function daysAgo(days: number): string {
  return new Date(now.getTime() - days * 86400000).toISOString();
}

export const MOCK_RIDER_ZONES: RiderZone[] = [
  { id: "zone-001", name: "Lekki Phase 1", ridersOnline: 8, ridersTotal: 15, pendingDeliveries: 3 },
  { id: "zone-002", name: "Victoria Island", ridersOnline: 12, ridersTotal: 20, pendingDeliveries: 5 },
  { id: "zone-003", name: "Ikeja", ridersOnline: 6, ridersTotal: 18, pendingDeliveries: 8 },
  { id: "zone-004", name: "Surulere", ridersOnline: 4, ridersTotal: 12, pendingDeliveries: 2 },
  { id: "zone-005", name: "Yaba/Ebute Metta", ridersOnline: 5, ridersTotal: 10, pendingDeliveries: 4 },
  { id: "zone-006", name: "Ikoyi", ridersOnline: 7, ridersTotal: 11, pendingDeliveries: 1 },
  { id: "zone-007", name: "Ajah/Sangotedo", ridersOnline: 3, ridersTotal: 9, pendingDeliveries: 6 },
  { id: "zone-008", name: "Maryland/Anthony", ridersOnline: 4, ridersTotal: 8, pendingDeliveries: 3 },
];

export const MOCK_RIDERS: Rider[] = [
  {
    id: "rider-001", name: "Chinedu Eze", email: "chinedu.eze@gmail.com", phone: "+234 812 100 0001",
    status: "online", onboardingStatus: "approved", zone: "Victoria Island",
    vehicleType: "motorcycle", licensePlate: "LAG-234-RD",
    joinedAt: "2025-02-10T10:00:00Z", lastActiveAt: hoursAgo(0.5),
    totalDeliveries: 1240, totalEarnings: 3720000, currentBalance: 45000,
    rating: 4.8, totalRatings: 980, avgDeliveryTime: 24, completionRate: 97.5, isAvailable: true,
  },
  {
    id: "rider-002", name: "Adamu Sani", email: "adamu.sani@yahoo.com", phone: "+234 803 200 0002",
    status: "on_delivery", onboardingStatus: "approved", zone: "Lekki Phase 1",
    vehicleType: "motorcycle", licensePlate: "LAG-567-RD",
    joinedAt: "2025-03-15T09:00:00Z", lastActiveAt: hoursAgo(0.2),
    totalDeliveries: 890, totalEarnings: 2670000, currentBalance: 32000,
    rating: 4.6, totalRatings: 720, avgDeliveryTime: 28, completionRate: 95.2, isAvailable: false,
  },
  {
    id: "rider-003", name: "Tolu Ajayi", email: "tolu.ajayi@gmail.com", phone: "+234 815 300 0003",
    status: "online", onboardingStatus: "approved", zone: "Ikeja",
    vehicleType: "motorcycle", licensePlate: "LAG-890-RD",
    joinedAt: "2025-01-20T11:00:00Z", lastActiveAt: hoursAgo(1),
    totalDeliveries: 1560, totalEarnings: 4680000, currentBalance: 58000,
    rating: 4.9, totalRatings: 1280, avgDeliveryTime: 22, completionRate: 98.1, isAvailable: true,
  },
  {
    id: "rider-004", name: "Musa Bello", email: "musa.bello@gmail.com", phone: "+234 806 400 0004",
    status: "online", onboardingStatus: "approved", zone: "Surulere",
    vehicleType: "motorcycle", licensePlate: "LAG-123-RE",
    joinedAt: "2025-04-01T14:00:00Z", lastActiveAt: hoursAgo(0.5),
    totalDeliveries: 680, totalEarnings: 2040000, currentBalance: 28000,
    rating: 4.5, totalRatings: 540, avgDeliveryTime: 30, completionRate: 94.8, isAvailable: true,
  },
  {
    id: "rider-005", name: "Ibrahim Yusuf", email: "ibrahim.yusuf@outlook.com", phone: "+234 811 500 0005",
    status: "on_delivery", onboardingStatus: "approved", zone: "Victoria Island",
    vehicleType: "motorcycle", licensePlate: "LAG-456-RE",
    joinedAt: "2025-02-28T08:00:00Z", lastActiveAt: hoursAgo(0.1),
    totalDeliveries: 1080, totalEarnings: 3240000, currentBalance: 41000,
    rating: 4.7, totalRatings: 860, avgDeliveryTime: 26, completionRate: 96.3, isAvailable: false,
  },
  {
    id: "rider-006", name: "Ahmed Lawal", email: "ahmed.lawal@gmail.com", phone: "+234 809 600 0006",
    status: "offline", onboardingStatus: "approved", zone: "Yaba/Ebute Metta",
    vehicleType: "motorcycle", licensePlate: "LAG-789-RE",
    joinedAt: "2025-05-10T12:00:00Z", lastActiveAt: hoursAgo(6),
    totalDeliveries: 420, totalEarnings: 1260000, currentBalance: 18000,
    rating: 4.4, totalRatings: 340, avgDeliveryTime: 32, completionRate: 93.5, isAvailable: false,
  },
  {
    id: "rider-007", name: "Emeka Nwachukwu", email: "emeka.nw@gmail.com", phone: "+234 814 700 0007",
    status: "online", onboardingStatus: "approved", zone: "Ikoyi",
    vehicleType: "bicycle",
    joinedAt: "2025-06-01T10:00:00Z", lastActiveAt: hoursAgo(1),
    totalDeliveries: 280, totalEarnings: 700000, currentBalance: 12000,
    rating: 4.3, totalRatings: 220, avgDeliveryTime: 35, completionRate: 92.0, isAvailable: true,
  },
  {
    id: "rider-008", name: "Segun Adekunle", email: "segun.adekunle@gmail.com", phone: "+234 805 800 0008",
    status: "suspended", onboardingStatus: "approved", zone: "Ikeja",
    vehicleType: "motorcycle", licensePlate: "LAG-321-RF",
    joinedAt: "2025-03-20T15:00:00Z", lastActiveAt: daysAgo(5),
    totalDeliveries: 560, totalEarnings: 1680000, currentBalance: 0,
    rating: 3.2, totalRatings: 450, avgDeliveryTime: 40, completionRate: 82.0, isAvailable: false,
  },
  {
    id: "rider-009", name: "Kola Oluwadare", email: "kola.oluwadare@yahoo.com", phone: "+234 818 900 0009",
    status: "online", onboardingStatus: "approved", zone: "Ajah/Sangotedo",
    vehicleType: "motorcycle", licensePlate: "LAG-654-RF",
    joinedAt: "2025-04-15T09:00:00Z", lastActiveAt: hoursAgo(2),
    totalDeliveries: 520, totalEarnings: 1560000, currentBalance: 22000,
    rating: 4.6, totalRatings: 410, avgDeliveryTime: 27, completionRate: 95.8, isAvailable: true,
  },
  {
    id: "rider-010", name: "Sunday Okoro", email: "sunday.okoro@gmail.com", phone: "+234 801 010 0010",
    status: "online", onboardingStatus: "approved", zone: "Maryland/Anthony",
    vehicleType: "motorcycle", licensePlate: "LAG-987-RF",
    joinedAt: "2025-05-25T11:00:00Z", lastActiveAt: hoursAgo(0.8),
    totalDeliveries: 350, totalEarnings: 1050000, currentBalance: 15000,
    rating: 4.5, totalRatings: 280, avgDeliveryTime: 29, completionRate: 94.2, isAvailable: true,
  },
  {
    id: "rider-011", name: "Bayo Adeniyi", email: "bayo.a@gmail.com", phone: "+234 807 110 0011",
    status: "on_delivery", onboardingStatus: "approved", zone: "Lekki Phase 1",
    vehicleType: "car", licensePlate: "LAG-111-CA",
    joinedAt: "2025-06-10T10:00:00Z", lastActiveAt: hoursAgo(0.3),
    totalDeliveries: 180, totalEarnings: 720000, currentBalance: 9000,
    rating: 4.7, totalRatings: 140, avgDeliveryTime: 20, completionRate: 96.5, isAvailable: false,
  },
  {
    id: "rider-012", name: "Femi Akindele", email: "femi.akindele@gmail.com", phone: "+234 816 120 0012",
    status: "offline", onboardingStatus: "approved", zone: "Surulere",
    vehicleType: "motorcycle", licensePlate: "LAG-222-RG",
    joinedAt: "2025-07-01T14:00:00Z", lastActiveAt: daysAgo(1),
    totalDeliveries: 120, totalEarnings: 360000, currentBalance: 8000,
    rating: 4.2, totalRatings: 95, avgDeliveryTime: 33, completionRate: 91.0, isAvailable: false,
  },
];

export const MOCK_RIDER_APPLICATIONS: RiderApplication[] = [
  {
    id: "rapp-001", name: "Dapo Olayinka", email: "dapo.o@gmail.com", phone: "+234 810 001 1111",
    vehicleType: "motorcycle", zone: "Victoria Island", status: "application_submitted",
    submittedAt: daysAgo(1),
  },
  {
    id: "rapp-002", name: "Chukwudi Nnadi", email: "chukwudi.n@yahoo.com", phone: "+234 803 002 2222",
    vehicleType: "motorcycle", zone: "Ikeja", status: "documents_under_review",
    submittedAt: daysAgo(4),
  },
  {
    id: "rapp-003", name: "Yinka Babalola", email: "yinka.b@gmail.com", phone: "+234 815 003 3333",
    vehicleType: "bicycle", zone: "Ikoyi", status: "training_pending",
    submittedAt: daysAgo(8), reviewedAt: daysAgo(3), reviewedBy: "Adebayo Ogunlesi",
  },
  {
    id: "rapp-004", name: "Aliyu Garba", email: "aliyu.g@outlook.com", phone: "+234 806 004 4444",
    vehicleType: "motorcycle", zone: "Yaba/Ebute Metta", status: "rejected",
    submittedAt: daysAgo(12), reviewedAt: daysAgo(6), reviewedBy: "Adebayo Ogunlesi",
    rejectionReason: "Invalid driver's license. Vehicle inspection failed.",
  },
];

export const MOCK_RIDER_PAYOUTS: RiderPayout[] = [
  { id: "rpay-001", riderId: "rider-001", riderName: "Chinedu Eze", amount: 85000, deliveries: 42, period: "Jan 27 - Feb 2", status: "completed", paidAt: daysAgo(5) },
  { id: "rpay-002", riderId: "rider-003", riderName: "Tolu Ajayi", amount: 92000, deliveries: 48, period: "Jan 27 - Feb 2", status: "completed", paidAt: daysAgo(5) },
  { id: "rpay-003", riderId: "rider-005", riderName: "Ibrahim Yusuf", amount: 78000, deliveries: 38, period: "Jan 27 - Feb 2", status: "completed", paidAt: daysAgo(5) },
  { id: "rpay-004", riderId: "rider-001", riderName: "Chinedu Eze", amount: 91000, deliveries: 45, period: "Feb 3 - Feb 7", status: "pending" },
  { id: "rpay-005", riderId: "rider-003", riderName: "Tolu Ajayi", amount: 88000, deliveries: 44, period: "Feb 3 - Feb 7", status: "pending" },
  { id: "rpay-006", riderId: "rider-002", riderName: "Adamu Sani", amount: 72000, deliveries: 35, period: "Feb 3 - Feb 7", status: "processing" },
  { id: "rpay-007", riderId: "rider-004", riderName: "Musa Bello", amount: 65000, deliveries: 32, period: "Feb 3 - Feb 7", status: "pending" },
  { id: "rpay-008", riderId: "rider-008", riderName: "Segun Adekunle", amount: 0, deliveries: 0, period: "Feb 3 - Feb 7", status: "failed" },
];

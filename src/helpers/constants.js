export const orderStatges = {
  fresh: 1,
  accepted: 2,
  preparing: 3,
  foodReady: 4,
  foodPicked: 5,
  outForDelivery: 6,
  delivered: 7,
  completed: 8,
  cancelled: 9,
};

export const orderStatgeText = {
  1: "Fresh",
  2: "Accepted",
  3: "Preparing",
  4: "Food Ready",
  5: "Food Picked",
  6: "Out For Delivery",
  7: "Delivered",
  8: "Completed",
  9: "Cancelled",
};

export const deliveryPreferences = {
  inHouse: "1",
  service: "2",
  all: "3",
};

export const freshOrderStage = [orderStatges["fresh"]];
export const onGoingOrders = [
  orderStatges["accepted"],
  orderStatges["preparing"],
  orderStatges["foodReady"],
  orderStatges["foodPicked"],
  orderStatges["outForDelivery"],
];
export const oldOrderStage = [
  orderStatges["delivered"],
  orderStatges["completed"],
  ,
  orderStatges["cancelled"],
];

export const paymentStatuses = {
  paid: 1,
  notPaid: 2,
  paymentFailed: 3,
  paymentRequestFailed: 4,
};

export const paymentStatuseText = {
  1: "Paid",
  2: "Not Paid",
  3: "Payment Failed",
  4: "Payment Request Failed",
};

export const smartDinerVideo = [
  "https://smart-diner.s3.ap-south-1.amazonaws.com/product+video.webm",
  "https://smart-diner.s3.ap-south-1.amazonaws.com/product+video.mp4",
];

export const customerList = [
  {
    name: "The Uptown Arab Eatery",
    url: "https://theuae.in/",
    logo: "https://smart-diner-client-images.s3.ap-south-1.amazonaws.com/the_uae/logo.jpg",
  },
  {
    name: "Nanjai Virundhu ",
    url: "https://www.nanjaivirundhu.com/",
    logo: "https://smart-diner-client-images.s3.ap-south-1.amazonaws.com/nanjai_virundhu/logo.png",
  },
  {
    name: "Dessert Drizzle",
    url: "https://dessertdrizzle.com/",
    logo: "https://smart-diner-client-images.s3.ap-south-1.amazonaws.com/dessert_drizzle/dessert_drizzle_logo.jpg",
  },
  {
    name: "Zoom Chef",
    url: "https://thezoomchefs.com/",
    logo: "https://smart-diner-client-images.s3.ap-south-1.amazonaws.com/zoom_chef/logo.jpg",
  },
  {
    name: "Taste Of Kovai",
    url: "https://tasteofkovai.smartdiner.co/",
    logo: "https://smart-diner-client-images.s3.ap-south-1.amazonaws.com/taste_of_kovai/logo.jpg",
  },
  {
    name: "A3 Biriyani",
    url: "https://a3biriyani.com/",
    logo: " https://smart-diner-client-images.s3.ap-south-1.amazonaws.com/a3biriyani/logo.jpeg",
  },
  {
    name: "Geetham Foods",
    url: "https://geethamfoods.com/",
    logo: " https://smart-diner-client-images.s3.ap-south-1.amazonaws.com/geetham_foods/logo.jpg",
  },
  {
    name: "Sai Shaana Products",
    url: "https://saishanaaproducts.com/",
    logo: " https://smart-diner-client-images.s3.ap-south-1.amazonaws.com/sai_shanaa_products/logo.jpeg",
  },
];
export const roles_and_IDs = {
  "Super Admin": "1",
  Admin: "2",
  "Delivery Agent": "3",
  Customer: "4",
  "Smart Diner Super Admin": "5",
};
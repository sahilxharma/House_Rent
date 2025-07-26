
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const propertySchema = require('./schemas/propertyModel');
const userSchema = require('./schemas/userModel');

dotenv.config();

const sampleProperties = (ownerId) => [
  {
    ownerId,
    propertyType: "Apartment",
    propertyAdType: "Rent",
    propertyAddress: "101 City Center Ave, Metroville",
    ownerContact: 9999988888,
    propertyAmt: 25000,
    propertyImage: "https://via.placeholder.com/100",
    additionalInfo: "2BHK fully furnished",
    ownerName: "Alice Sharma"
  },
  {
    ownerId,
    propertyType: "Villa",
    propertyAdType: "Sale",
    propertyAddress: "75 Ocean Drive, Palm Beach",
    ownerContact: 8888877777,
    propertyAmt: 12500000,
    propertyImage: "https://via.placeholder.com/100",
    additionalInfo: "Sea-facing villa with pool",
    ownerName: "Ravi Kapoor"
  },
  {
    ownerId,
    propertyType: "Independent House",
    propertyAdType: "Rent",
    propertyAddress: "333 Old Fort Road, Downtown",
    ownerContact: 7878787878,
    propertyAmt: 18000,
    propertyImage: "https://via.placeholder.com/100",
    additionalInfo: "Ground floor with backyard",
    ownerName: "Manoj Kumar"
  },
  {
    ownerId,
    propertyType: "Apartment",
    propertyAdType: "Sale",
    propertyAddress: "14 Tech Park Lane, Cyber City",
    ownerContact: 7676767676,
    propertyAmt: 9500000,
    propertyImage: "https://via.placeholder.com/100",
    additionalInfo: "3BHK corner unit",
    ownerName: "Nidhi Mehra"
  },
  {
    ownerId,
    propertyType: "Studio",
    propertyAdType: "Rent",
    propertyAddress: "204B Hillside Avenue, Green Park",
    ownerContact: 9090909090,
    propertyAmt: 12000,
    propertyImage: "https://via.placeholder.com/100",
    additionalInfo: "Ideal for students",
    ownerName: "Shreya Nair"
  },
  {
    ownerId,
    propertyType: "Bungalow",
    propertyAdType: "Sale",
    propertyAddress: "7 Golf Course Road, Elite Enclave",
    ownerContact: 9191919191,
    propertyAmt: 22000000,
    propertyImage: "https://via.placeholder.com/100",
    additionalInfo: "Private garden and parking",
    ownerName: "Deepak Verma"
  },
  {
    ownerId,
    propertyType: "Penthouse",
    propertyAdType: "Rent",
    propertyAddress: "509 Sky Towers, Skyline City",
    ownerContact: 8787878787,
    propertyAmt: 45000,
    propertyImage: "https://via.placeholder.com/100",
    additionalInfo: "Panoramic city view",
    ownerName: "Meera Iyer"
  },
  {
    ownerId,
    propertyType: "Apartment",
    propertyAdType: "Rent",
    propertyAddress: "12 Rosewood Apartments, Lake View",
    ownerContact: 9292929292,
    propertyAmt: 27000,
    propertyImage: "https://via.placeholder.com/100",
    additionalInfo: "Lake-facing 2BHK",
    ownerName: "Rahul Singh"
  },
  {
    ownerId,
    propertyType: "Farmhouse",
    propertyAdType: "Sale",
    propertyAddress: "Route 22, Country Meadows",
    ownerContact: 9393939393,
    propertyAmt: 5000000,
    propertyImage: "https://via.placeholder.com/100",
    additionalInfo: "Ideal for weekend getaways",
    ownerName: "Kiran Rao"
  },
  {
    ownerId,
    propertyType: "Flat",
    propertyAdType: "Rent",
    propertyAddress: "Flat 302, Silver Residency",
    ownerContact: 9494949494,
    propertyAmt: 16000,
    propertyImage: "https://via.placeholder.com/100",
    additionalInfo: "Near metro station",
    ownerName: "Tarun Malik"
  },
  {
    ownerId,
    propertyType: "House",
    propertyAdType: "Sale",
    propertyAddress: "19 DLF Phase 2",
    ownerContact: 9595959595,
    propertyAmt: 8900000,
    propertyImage: "https://via.placeholder.com/100",
    additionalInfo: "4 BHK newly constructed",
    ownerName: "Geeta Sharma"
  },
  {
    ownerId,
    propertyType: "Apartment",
    propertyAdType: "Rent",
    propertyAddress: "221 Baker Street",
    ownerContact: 9696969696,
    propertyAmt: 30000,
    propertyImage: "https://via.placeholder.com/100",
    additionalInfo: "Fully furnished with AC",
    ownerName: "Sherlock Holmes"
  }
];

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB);
  const owner = { _id: "6883a36b1747a9c24a007b83" };

if (!owner) {
  console.log("❌ No owner found. Please create an owner user first.");
  process.exit(1);
} console.log(owner)

await propertySchema.insertMany(sampleProperties(owner._id));
console.log(owner._id)
    console.log("✅ Sample properties inserted successfully!");
    process.exit();
  } catch (error) {
    console.error("❌ Failed to seed properties:", error);
    process.exit(1);
  }
};

start();

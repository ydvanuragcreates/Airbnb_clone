require("dotenv").config();
const mongoose = require("mongoose");
const Place = require("./models/Place");
const User = require("./models/User");

const seedPlaces = async () => {
  try {
    // Set strictQuery before connecting
    mongoose.set('strictQuery', false);
    
    // Connect to MongoDB
    await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");

    // Get first user from database (or create one for demo)
    let user = await User.findOne();
    
    if (!user) {
      console.log("No user found. Please create a user account first.");
      process.exit(1);
    }

    const userId = user._id;

    // Sample places data
    const samplePlaces = [
      {
        owner: userId,
        title: "Cozy Downtown Apartment",
        address: "123 Main Street, New York, NY 10001",
        photos: [
          "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=500",
          "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=500",
          "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500",
          "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=500",
          "https://images.unsplash.com/photo-1493857671505-72967e2e2760?w=500",
        ],
        description:
          "Beautiful modern apartment in the heart of downtown Manhattan. Perfect for couples or small families. Walking distance to restaurants, shops, and public transportation. High-speed WiFi, fully equipped kitchen, and comfortable bedrooms.",
        perks: ["Wifi", "Free parking spot", "TV", "Private Entrance"],
        extraInfo:
          "Check-in after 3 PM, Check-out before 11 AM. No smoking. Quiet hours after 10 PM. Please treat the apartment as your home.",
        maxGuests: 4,
        price: 250,
      },
      {
        owner: userId,
        title: "Beachfront Villa with Ocean Views",
        address: "456 Ocean Boulevard, Miami, FL 33139",
        photos: [
          "https://images.unsplash.com/photo-1570129477492-45f003313e78?w=500",
          "https://images.unsplash.com/photo-1566665556112-652d60051f18?w=500",
          "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=500",
          "https://images.unsplash.com/photo-1576678927484-cc099e773c69?w=500",
          "https://images.unsplash.com/photo-1585399263032-40b015edc3d8?w=500",
        ],
        description:
          "Stunning beachfront villa with direct access to private beach. Enjoy breathtaking ocean views from the terrace. Spacious living areas, modern amenities, and perfect for a relaxing vacation.",
        perks: ["Wifi", "Pets", "Private Entrance", "TV"],
        extraInfo:
          "Private beach access. Pool area available year-round. Beach chairs and umbrellas provided. Please respect neighboring properties.",
        maxGuests: 8,
        price: 450,
      },
      {
        owner: userId,
        title: "Mountain Cabin Retreat",
        address: "789 Pine Road, Aspen, CO 81611",
        photos: [
          "https://images.unsplash.com/photo-1542314503-37143f4f6c13?w=500",
          "https://images.unsplash.com/photo-1571508601166-21f16e2b51b7?w=500",
          "https://images.unsplash.com/photo-1510578474371-5b6aa198917f?w=500",
          "https://images.unsplash.com/photo-1527004760902-f669a3e3dafe?w=500",
          "https://images.unsplash.com/photo-1549381912-e8e5d1cd27e2?w=500",
        ],
        description:
          "Charming mountain cabin surrounded by nature. Perfect for hiking enthusiasts and nature lovers. Features a cozy fireplace, large windows with mountain views, and modern conveniences.",
        perks: ["Wifi", "Radio", "TV"],
        extraInfo:
          "Firewood provided for fireplace. Walking trails nearby. Bring your hiking boots! Winter access may be limited during heavy snow.",
        maxGuests: 6,
        price: 180,
      },
      {
        owner: userId,
        title: "Luxury Penthouse in City Center",
        address: "321 Fifth Avenue, Los Angeles, CA 90001",
        photos: [
          "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=500",
          "https://images.unsplash.com/photo-1545899941-48cc108a37f0?w=500",
          "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500",
          "https://images.unsplash.com/photo-1545899941-48cc108a37f0?w=500",
          "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=500",
        ],
        description:
          "Spectacular penthouse with panoramic city views. State-of-the-art kitchen, luxury bedrooms, and a stunning rooftop terrace. Perfect for business travelers or luxury seekers.",
        perks: ["Wifi", "Free parking spot", "TV", "Private Entrance"],
        extraInfo:
          "24-hour concierge service. Rooftop gym access. Valet parking available. Elevator access only. Business center available.",
        maxGuests: 5,
        price: 550,
      },
      {
        owner: userId,
        title: "Charming Cottage in the Countryside",
        address: "654 Farm Lane, Sonoma, CA 95476",
        photos: [
          "https://images.unsplash.com/photo-1523217311519-d595dc36ab51?w=500",
          "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=500",
          "https://images.unsplash.com/photo-1532274040911-5f82f20ae318?w=500",
          "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=500",
          "https://images.unsplash.com/photo-1520646282694-29bf8baad32f?w=500",
        ],
        description:
          "Quaint countryside cottage with vineyard views. Perfect for wine enthusiasts. Features a fully equipped kitchen, comfortable bedrooms, and a spacious garden. Close to local wineries and restaurants.",
        perks: ["Wifi", "Pets", "Private Entrance"],
        extraInfo:
          "Wine tastings available nearby. Farmers market on weekends. Peaceful, quiet area. Bring insect repellent during summer months.",
        maxGuests: 4,
        price: 200,
      },
    ];

    // Check if places already exist
    const existingCount = await Place.countDocuments();
    
    if (existingCount > 0) {
      console.log(`Database already has ${existingCount} places. Skipping seeding.`);
      process.exit(0);
    }

    // Insert sample places
    const createdPlaces = await Place.insertMany(samplePlaces);
    console.log(`✅ Successfully added ${createdPlaces.length} sample places!`);

    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding places:", error.message);
    process.exit(1);
  }
};

seedPlaces();

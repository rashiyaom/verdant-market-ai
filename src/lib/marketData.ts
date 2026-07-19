export type Listing = {
  id: string;
  title: string;
  farmer: string;
  location: string;
  category: "Vegetables" | "Fruits" | "Grains" | "Dairy" | "Herbs";
  price: number;
  unit: string;
  stock: number;
  organic: boolean;
  rating: number;
  image: string;
  type: "sell" | "buy";
};

import produce from "@/assets/produce.jpg";
import leaf from "@/assets/leaf.jpg";
import hero from "@/assets/hero-farm.jpg";

export const seedListings: Listing[] = [
  { id: "l1", title: "Heirloom Tomatoes", farmer: "Rosa Del Campo", location: "Tuscany, IT", category: "Vegetables", price: 3.2, unit: "kg", stock: 240, organic: true, rating: 4.9, image: produce, type: "sell" },
  { id: "l2", title: "Alpine Wildflower Honey", farmer: "Erik Halvorsen", location: "Bergen, NO", category: "Herbs", price: 12.5, unit: "jar", stock: 48, organic: true, rating: 4.8, image: leaf, type: "sell" },
  { id: "l3", title: "Stone-Milled Spelt Flour", farmer: "Ferme Beaumont", location: "Provence, FR", category: "Grains", price: 4.75, unit: "kg", stock: 500, organic: true, rating: 4.7, image: hero, type: "sell" },
  { id: "l4", title: "Grass-fed Raw Milk", farmer: "Meadow & Oak", location: "Cork, IE", category: "Dairy", price: 2.1, unit: "L", stock: 120, organic: true, rating: 4.9, image: produce, type: "sell" },
  { id: "l5", title: "Cold-storage Braeburn Apples", farmer: "Orchard 47", location: "Kent, UK", category: "Fruits", price: 1.8, unit: "kg", stock: 900, organic: false, rating: 4.6, image: leaf, type: "sell" },
  { id: "l6", title: "Wanted: Organic Basil (bulk)", farmer: "Cucina Verde", location: "Milan, IT", category: "Herbs", price: 9.0, unit: "kg", stock: 50, organic: true, rating: 4.5, image: leaf, type: "buy" },
  { id: "l7", title: "Wanted: Yellow Onions", farmer: "Pantry Co.", location: "Berlin, DE", category: "Vegetables", price: 0.9, unit: "kg", stock: 1200, organic: false, rating: 4.4, image: produce, type: "buy" },
  { id: "l8", title: "Freshly Harvested Kale", farmer: "Green Ridge Farm", location: "Oregon, US", category: "Vegetables", price: 2.4, unit: "bunch", stock: 180, organic: true, rating: 4.8, image: produce, type: "sell" },
];

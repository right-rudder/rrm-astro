// Test script to verify locations collection is working
import { getCollection } from "astro:content";

try {
  console.log("Testing locations collection...");

  const locations = await getCollection("locations");

  console.log(`✅ Found ${locations.length} locations`);

  locations.forEach((location) => {
    console.log(
      `📍 ${location.data.title} - ${location.data.type} - Priority: ${location.data.priority}`,
    );
  });

  console.log("\n🎯 States:");
  const states = locations.filter((loc) => loc.data.type === "state");
  states.forEach((state) => {
    console.log(
      `  - ${state.data.state} (${state.data.flightSchoolCount} schools)`,
    );
  });

  console.log("\n🏙️ Cities:");
  const cities = locations.filter((loc) => loc.data.type === "city");
  cities.forEach((city) => {
    console.log(
      `  - ${city.data.city}, ${city.data.state} (${city.data.flightSchoolCount} schools)`,
    );
  });
} catch (error) {
  console.error("❌ Error testing locations:", error);
}

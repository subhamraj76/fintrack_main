//when we go and visit this route we can able to see database will be populated with the 
// transitions
import { seedTransactions } from "@/actions/seed";

export async function GET() {
  const result = await seedTransactions();
  return Response.json(result);
}
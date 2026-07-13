import { handleProductSubmission } from "@/lib/handleProductSubmission";

export async function POST(request: Request) {
  return handleProductSubmission(request, "case-submissions");
}

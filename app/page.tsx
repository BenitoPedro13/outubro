import { redirect } from "next/navigation";

// No real home page yet — docs/architecture.md §1 is still a proposal awaiting sign-off.
// Root currently points at the brand/motion preview (docs/tasks/TASK-preview-page.md).
export default function Home() {
  redirect("/apresentacao");
}

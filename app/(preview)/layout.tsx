// Standalone layout for the brand/motion preview — docs/tasks/TASK-preview-page.md.
// No header/footer from the real site: those don't exist yet, and this route is a
// dated preview document, not site content (same pattern as this workflow's prior
// /pitch route precedent).
export default function PreviewLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

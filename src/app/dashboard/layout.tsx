// src/app/dashboard/layout.tsx
export const metadata = {
  title: "Dashboard | NovaCelik",
  description: "Visualize energy efficiency metrics, compare facilities, and monitor trends in real-time."
};

export default function DashboardLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <section className="min-h-screen w-full bg-gray-50">
      {children}
    </section>
  );
}

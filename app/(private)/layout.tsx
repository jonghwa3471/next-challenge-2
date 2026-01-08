import Navigation from "@/components/navigation";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen flex-col rounded-2xl border-2 p-5">
      <div className="flex flex-col">
        <Navigation />
        {children}
      </div>
    </div>
  );
}

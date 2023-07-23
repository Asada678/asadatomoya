export default function Layout({ children }: { children: React.ReactNode }) {
  // Navbarの高さを考慮してpyを設定
  return <div className="py-12 sm:py-0">{children}</div>;
}

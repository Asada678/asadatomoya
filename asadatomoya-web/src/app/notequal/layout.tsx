import WebGlProvider from "@/components/WebGlProvider";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <WebGlProvider>
      <div className="font-serif-jp">{children}</div>
    </WebGlProvider>
  );
}

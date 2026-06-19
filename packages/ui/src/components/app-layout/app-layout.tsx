import { SidebarProvider } from "../sidebar";
import { appLayoutVariants } from "./app-layout";

const slots = appLayoutVariants();

interface AppLayoutProps extends React.ComponentProps<"div"> {
  sidebar: React.ReactNode;
  navbar: React.ReactNode;
}

export function AppLayout({
  sidebar,
  navbar,
  children,
  className,
  ...rest
}: AppLayoutProps) {
  return (
    <SidebarProvider>
      {sidebar}
      <div
        data-slot="app-layout-body"
        className={slots.body({
          className,
        })}
        {...rest}
      >
        <header data-slot="app-layout-navbar" className={slots.header()}>
          {navbar}
        </header>
        <main data-slot="app-layout-main" className={slots.main()}>
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
}

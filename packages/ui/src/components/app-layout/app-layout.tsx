import { appLayoutVariants } from "./app-layout";

const slots = appLayoutVariants();

interface AppLayoutProps extends React.ComponentProps<"div"> {
  navbar: React.ReactNode;
}

function AppLayout({ navbar, children, className, ...rest }: AppLayoutProps) {
  return (
    <div
      data-slot="app-layout-body"
      className={slots.body({ className })}
      {...rest}
    >
      <div data-slot="app-layout-header" className={slots.header()}>
        {navbar}
      </div>
      <div data-slot="app-layout-main" className={slots.main()}>
        {children}
      </div>
    </div>
  );
}

export { AppLayout };
export type { AppLayoutProps };

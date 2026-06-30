import { Button, MenuTrigger } from "react-aria-components";

import { Menu, MenuItem } from "@better-vitals/ui/components/menu";

export default function Demo() {
  return (
    <div className="flex min-h-dvh items-center justify-center p-4">
      <div className="flex flex-col gap-8">
        <h1 className="text-2xl font-bold">Component Demo</h1>

        <div className="flex flex-col gap-4">
          <h2 className="text-lg font-medium">Menu</h2>

          <MenuTrigger>
            <Button className="inline-flex h-10 items-center justify-center rounded-3xl bg-accent px-4 text-sm font-medium text-accent-foreground outline-none">
              Open menu
            </Button>
            <Menu>
              <MenuItem>Account settings</MenuItem>
              <MenuItem>Help center</MenuItem>
              <MenuItem>Keyboard shortcuts</MenuItem>
            </Menu>
          </MenuTrigger>
        </div>
      </div>
    </div>
  );
}

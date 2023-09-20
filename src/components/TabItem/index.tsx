import { ReactNode } from "preact/compat";

type TabItemProps = {
  value: string;
  activeValue?: string;
  children: ReactNode;
  conditionalRendering?: boolean;
};

export function TabItem({
  value,
  activeValue,
  children,
  conditionalRendering,
}: TabItemProps) {
  return (
    <div className="mt-4" hidden={value !== activeValue}>
      {conditionalRendering ? value === activeValue && children : children}
    </div>
  );
}

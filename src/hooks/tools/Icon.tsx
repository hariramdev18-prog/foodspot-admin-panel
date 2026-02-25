import * as Icons from "lucide-react";

interface IconProps {
  name: keyof typeof Icons;
  size?: number;
}

const Icon = ({ name, size = 20 }: IconProps) => {
  const LucideIcon = Icons[name];

  if (!LucideIcon) {
    return null;
  }

  return <LucideIcon size={size} />;
};

export default Icon;

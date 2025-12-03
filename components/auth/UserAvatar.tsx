import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getInitials } from "@/lib/utils";
import { User } from "next-auth";
import { cn } from "@/lib/utils";

type AvatarSize = "sm" | "md" | "lg";

interface UserAvatarProps {
  user: Pick<User, "name" | "image">;
  size?: AvatarSize;
  className?: string;
}

const sizeClasses: Record<AvatarSize, string> = {
  sm: "h-8 w-8",
  md: "h-10 w-10",
  lg: "h-16 w-16",
};

export function UserAvatar({ user, size = "md", className }: UserAvatarProps) {
  const initials = getInitials(user.name || "U");

  return (
    <Avatar className={cn(sizeClasses[size], className)}>
      {user.image && <AvatarImage src={user.image} alt={user.name || "User avatar"} />}
      <AvatarFallback className="bg-primary/10 text-primary">{initials}</AvatarFallback>
    </Avatar>
  );
}

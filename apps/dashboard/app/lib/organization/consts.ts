export const MEMBER_ROLE = "member";
export const ADMIN_ROLE = "admin";

export const INVITE_MEMBER_ROLES = [
  { id: MEMBER_ROLE, label: "Member" },
  { id: ADMIN_ROLE, label: "Admin" },
] as const;

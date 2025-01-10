export const UserRoles = {
  ADMIN: 'admin',
  USER: 'user',
  UNVERIFIED_USER: 'unverified_user',
}

export type UserRole = (typeof UserRoles)[keyof typeof UserRoles]

export interface UserIdentity {
  id: string
  userRole: UserRole
  email: string
  phone?: string
}

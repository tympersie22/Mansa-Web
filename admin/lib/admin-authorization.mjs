export const ADMIN_ROLES = Object.freeze(['manager', 'admin', 'super_admin']);

export function evaluateAdminProfile(profile, profileError) {
  const role = profile?.role;
  const authorized =
    !profileError &&
    profile?.company_id === 'mansa' &&
    typeof role === 'string' &&
    ADMIN_ROLES.includes(role);

  return authorized
    ? { authorized: true, role }
    : { authorized: false, status: 403, error: 'Forbidden' };
}

export function canAuthenticateAdmin(user) {
  return Boolean(
    user?.active &&
      typeof user?.passwordHash === 'string' &&
      user.passwordHash.length > 0 &&
      evaluateAdminProfile(
        user.adminProfile
          ? {
              company_id: user.adminProfile.companyId,
              role: user.adminProfile.role,
            }
          : null,
        null,
      ).authorized,
  );
}

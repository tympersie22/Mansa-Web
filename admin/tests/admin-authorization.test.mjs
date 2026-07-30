import assert from 'node:assert/strict';
import test from 'node:test';
import { canAuthenticateAdmin, evaluateAdminProfile } from '../lib/admin-authorization.mjs';

test('an authenticated user without a pre-provisioned Mansa profile receives 403', () => {
  assert.deepEqual(evaluateAdminProfile(null, null), {
    authorized: false,
    status: 403,
    error: 'Forbidden',
  });
});

test('a profile from another company receives 403', () => {
  assert.deepEqual(
    evaluateAdminProfile({ company_id: 'another-company', role: 'super_admin' }, null),
    { authorized: false, status: 403, error: 'Forbidden' },
  );
});

test('a pre-provisioned Mansa manager is authorized', () => {
  assert.deepEqual(evaluateAdminProfile({ company_id: 'mansa', role: 'manager' }, null), {
    authorized: true,
    role: 'manager',
  });
});

test('a valid user without a pre-provisioned profile cannot authenticate as an admin', () => {
  assert.equal(
    canAuthenticateAdmin({
      active: true,
      passwordHash: 'a-real-hash',
      adminProfile: null,
    }),
    false,
  );
});

test('an inactive user cannot authenticate with a valid Mansa profile', () => {
  assert.equal(
    canAuthenticateAdmin({
      active: false,
      passwordHash: 'a-real-hash',
      adminProfile: { companyId: 'mansa', role: 'super_admin' },
    }),
    false,
  );
});

test('only a pre-provisioned active Mansa administrator can authenticate', () => {
  assert.equal(
    canAuthenticateAdmin({
      active: true,
      passwordHash: 'a-real-hash',
      adminProfile: { companyId: 'mansa', role: 'manager' },
    }),
    true,
  );
});

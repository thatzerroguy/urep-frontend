const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL?.trim().replace(/\/+$/, '');

export const REGISTERED_USER_ID_KEY = 'urep_registered_user_id';
export const REGISTRATION_REFERENCE_KEY = 'urep_registration_reference';
export const NATIONAL_YOUTH_DRAFT_KEY = 'urep_national_youth_draft';
export const REGISTRATION_CONTEXT_KEY = 'urep_registration_context';
export const ACCESS_TOKEN_KEY = 'urep_access_token';
export const ADMIN_ACCESS_TOKEN_KEY = 'urep_admin_access_token';
export const USER_ID_KEY = 'urep_user_id';
export const ADMIN_ID_KEY = 'urep_admin_id';

function setAuthCookie(name: string, value: string) {
  if (typeof document === 'undefined') return;
  const secure = window.location.protocol === 'https:' ? '; Secure' : '';
  document.cookie = `${name}=${encodeURIComponent(value)}; Path=/; Max-Age=${60 * 60 * 24 * 7}; SameSite=Lax${secure}`;
}

function clearAuthCookie(name: string) {
  if (typeof document === 'undefined') return;
  document.cookie = `${name}=; Path=/; Max-Age=0; SameSite=Lax`;
}

export interface AuthData {
  access_token?: string;
  token_type?: string;
  expires_in?: number;
  id?: string;
  user_id?: string;
  email?: string;
  urep_code?: string;
}

export function storeUserAuth(data: AuthData) {
  const userId = data.id ?? data.user_id;
  if (data.access_token) {
    sessionStorage.setItem(ACCESS_TOKEN_KEY, data.access_token);
    setAuthCookie(ACCESS_TOKEN_KEY, data.access_token);
  }
  if (userId) sessionStorage.setItem(USER_ID_KEY, userId);
  if (userId) sessionStorage.setItem(REGISTERED_USER_ID_KEY, userId);
}

export function storeAdminAuth(data: AuthData) {
  if (data.access_token) {
    sessionStorage.setItem(ADMIN_ACCESS_TOKEN_KEY, data.access_token);
    setAuthCookie(ADMIN_ACCESS_TOKEN_KEY, data.access_token);
  }
  if (data.id) sessionStorage.setItem(ADMIN_ID_KEY, data.id);
}

export function clearAdminAuth() {
  sessionStorage.removeItem(ADMIN_ACCESS_TOKEN_KEY);
  sessionStorage.removeItem(ADMIN_ID_KEY);
  clearAuthCookie(ADMIN_ACCESS_TOKEN_KEY);
}

export function clearAuth() {
  sessionStorage.removeItem(ACCESS_TOKEN_KEY);
  sessionStorage.removeItem(USER_ID_KEY);
  sessionStorage.removeItem(REGISTERED_USER_ID_KEY);
  clearAuthCookie(ACCESS_TOKEN_KEY);
  clearAdminAuth();
}

export interface NationalYouthDraft {
  stakeholder: string;
  reason: string;
  expectation: string;
  organization: string;
  youth_focused_organization: string;
  application: string;
  previous_engagement: string;
  benefited_from_fmyd: string;
  urgent_priority: string;
  geopolitical_zone: string;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function formatErrorDetails(details: unknown): string {
  if (typeof details === 'string') return details;
  if (Array.isArray(details)) {
    return details
      .filter((detail): detail is string => typeof detail === 'string')
      .join(' ');
  }
  if (!isRecord(details)) return '';

  return Object.entries(details)
    .flatMap(([field, value]) => {
      if (typeof value === 'string') return [`${field}: ${value}`];
      if (Array.isArray(value)) {
        return value
          .filter((detail): detail is string => typeof detail === 'string')
          .map((detail) => `${field}: ${detail}`);
      }
      return [];
    })
    .join(' ');
}

export function isNationalYouthDraft(value: unknown): value is NationalYouthDraft {
  return isRecord(value)
    && typeof value.stakeholder === 'string'
    && typeof value.reason === 'string'
    && typeof value.expectation === 'string'
    && typeof value.organization === 'string'
    && typeof value.youth_focused_organization === 'string'
    && typeof value.application === 'string'
    && typeof value.previous_engagement === 'string'
    && typeof value.benefited_from_fmyd === 'string'
    && typeof value.urgent_priority === 'string'
    && typeof value.geopolitical_zone === 'string';
}

export async function postToApi<T>(path: string, body: Record<string, unknown>): Promise<T> {
  if (!API_BASE_URL) {
    throw new Error('The registration service is not configured. Please contact support.');
  }

  let response: Response;
  const token = sessionStorage.getItem(path.includes('/api/auth/admin/') ? ADMIN_ACCESS_TOKEN_KEY : ACCESS_TOKEN_KEY);
  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(body),
    });
  } catch {
    throw new Error('Unable to reach the registration service. Your entries are still here; please try again.');
  }

  const responseBody: unknown = await response.json().catch(() => null);

  if (!response.ok) {
    if (response.status === 409 && path === '/api/auth/register') {
      throw new Error('A user with this email already exists.');
    }

    const error = isRecord(responseBody) && typeof responseBody.error === 'string'
      ? responseBody.error
      : `The registration service returned an error (${response.status}). Please try again.`;
    const details = isRecord(responseBody) ? formatErrorDetails(responseBody.details) : '';
    const message = details ? `${error} ${details}` : error;
    throw new Error(message);
  }

  if (!isRecord(responseBody) || !('data' in responseBody)) {
    throw new Error('The registration service returned an invalid response. Please try again.');
  }

  return responseBody.data as T;
}

export async function getFromApi<T>(path: string, admin = false): Promise<T> {
  if (!API_BASE_URL) {
    throw new Error('The registration service is not configured. Please contact support.');
  }

  const token = sessionStorage.getItem(admin ? ADMIN_ACCESS_TOKEN_KEY : ACCESS_TOKEN_KEY);
  if (!token) {
    throw new Error(admin
      ? 'Your admin session has expired. Sign in again.'
      : 'Your account session has expired. Sign in again.');
  }

  let response: Response;
  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
  } catch {
    throw new Error('Unable to reach the registration service. Please try again.');
  }

  const responseBody: unknown = await response.json().catch(() => null);
  if (!response.ok) {
    const error = isRecord(responseBody) && typeof responseBody.error === 'string'
      ? responseBody.error
      : `The registration service returned an error (${response.status}). Please try again.`;
    const details = isRecord(responseBody) ? formatErrorDetails(responseBody.details) : '';
    throw new Error(details ? `${error} ${details}` : error);
  }
  if (!isRecord(responseBody) || !('data' in responseBody)) {
    throw new Error('The registration service returned an invalid response. Please try again.');
  }
  return responseBody.data as T;
}

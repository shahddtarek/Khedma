import { createContext, useContext, useMemo, useState } from 'react';

const USERS_KEY = 'khedma.auth.users';
const SESSION_KEY = 'khedma.auth.currentUser';

const AuthContext = createContext(null);

const safeParse = (payload, fallback) => {
  try {
    return JSON.parse(payload);
  } catch {
    return fallback;
  }
};

const readStorage = (key, fallback = null, storage) => {
  if (typeof window === 'undefined') {
    return fallback;
  }

  const store = storage ?? window.localStorage;
  const value = store.getItem(key);
  return value ? safeParse(value, fallback) : fallback;
};

const persistSession = (user, rememberMe = true) => {
  if (typeof window === 'undefined') {
    return;
  }

  const persistentStore = rememberMe ? window.localStorage : window.sessionStorage;
  const transientStore = rememberMe ? window.sessionStorage : window.localStorage;

  if (user) {
    persistentStore.setItem(SESSION_KEY, JSON.stringify(user));
  } else {
    persistentStore.removeItem(SESSION_KEY);
  }

  transientStore.removeItem(SESSION_KEY);
};

const persistUsers = (users) => {
  if (typeof window === 'undefined') {
    return;
  }
  window.localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

export const AuthProvider = ({ children }) => {
  const [users, setUsers] = useState(() => {
    if (typeof window === 'undefined') return [];
    return readStorage(USERS_KEY, [], window.localStorage);
  });

  const [user, setUser] = useState(() => {
    if (typeof window === 'undefined') return null;
    const fromLocal = readStorage(SESSION_KEY, null, window.localStorage);
    return fromLocal ?? readStorage(SESSION_KEY, null, window.sessionStorage);
  });

  const register = (payload) => {
    const normalizedEmail = payload.email.trim().toLowerCase();
    if (!normalizedEmail || !payload.password.trim() || !payload.fullName.trim()) {
      throw new Error('الرجاء إدخال جميع البيانات المطلوبة');
    }

    const exists = users.some(
      (existingUser) => existingUser.email.trim().toLowerCase() === normalizedEmail,
    );

    if (exists) {
      throw new Error('هذا البريد الإلكتروني مستخدم بالفعل');
    }

    const newUser = {
      ...payload,
      email: normalizedEmail,
      role: payload.role || 'user',
      professionKey: payload.professionKey || null,
      profession_ar: payload.profession_ar || null,
      photos: payload.photos || [],
      createdAt: new Date().toISOString(),
    };

    const nextUsers = [...users, newUser];
    setUsers(nextUsers);
    persistUsers(nextUsers);
    persistSession(newUser);
    setUser(newUser);
    return newUser;
  };

  const login = (email, password, options = { rememberMe: true }) => {
    const normalizedEmail = email.trim().toLowerCase();
    const matched = users.find(
      (existingUser) => existingUser.email.trim().toLowerCase() === normalizedEmail,
    );

    if (!matched || matched.password !== password.trim()) {
      throw new Error('بيانات تسجيل الدخول غير صحيحة');
    }

    setUser(matched);
    persistSession(matched, options.rememberMe);
    return matched;
  };

  const logout = () => {
    setUser(null);
    persistSession(null);
  };

  const updateUser = (partial) => {
    if (!user) return;
    const updated = { ...user, ...partial };
    setUser(updated);
    const updatedUsers = users.map((u) =>
      u.email.trim().toLowerCase() === updated.email.trim().toLowerCase() ? updated : u,
    );
    setUsers(updatedUsers);
    persistUsers(updatedUsers);
    persistSession(updated);
  };

  const value = useMemo(
    () => ({
      user,
      users,
      isAuthenticated: Boolean(user),
      register,
      login,
      logout,
      updateUser,
    }),
    [user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};


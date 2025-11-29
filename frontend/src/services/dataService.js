const DB_KEY = 'khedma.database';

const getInitialDB = () => ({
  users: [],
  jobs: [],
  notifications: [],
  ratings: [],
});

const isBrowser = () => typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';

const readDB = () => {
  if (!isBrowser()) {
    return getInitialDB();
  }

  const raw = window.localStorage.getItem(DB_KEY);
  if (!raw) {
    return getInitialDB();
  }

  try {
    const parsed = JSON.parse(raw);
    return {
      users: Array.isArray(parsed.users) ? parsed.users : [],
      jobs: Array.isArray(parsed.jobs) ? parsed.jobs : [],
      notifications: Array.isArray(parsed.notifications) ? parsed.notifications : [],
      ratings: Array.isArray(parsed.ratings) ? parsed.ratings : [],
    };
  } catch {
    return getInitialDB();
  }
};

const writeDB = (db) => {
  if (!isBrowser()) {
    return db;
  }
  window.localStorage.setItem(DB_KEY, JSON.stringify(db));
  return db;
};

const findJobById = (db, jobId) => db.jobs.find((job) => job.id === jobId) || null;

const generateId = () => `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 9)}`;

const createNotification = (db, payload) => {
  const notification = {
    id: generateId(),
    read: false,
    createdAt: new Date().toISOString(),
    ...payload,
  };
  db.notifications.push(notification);
  return notification;
};

export const getAllUsers = () => {
  const db = readDB();
  return db.users;
};

export const getUserById = (userId) => {
  const db = readDB();
  return db.users.find((user) => user.id === userId) || null;
};

export const getUserByEmail = (email) => {
  if (!email) return null;
  const normalized = email.trim().toLowerCase();
  const db = readDB();
  return (
    db.users.find((user) => user.email && user.email.trim().toLowerCase() === normalized) || null
  );
};

export const createUser = (payload) => {
  const db = readDB();
  const normalizedEmail = payload.email.trim().toLowerCase();
  const exists = db.users.some(
    (user) => user.email && user.email.trim().toLowerCase() === normalizedEmail,
  );

  if (exists) {
    throw new Error('هذا البريد الإلكتروني مستخدم بالفعل');
  }

  const newUser = {
    ...payload,
    id: generateId(),
    email: normalizedEmail,
    createdAt: new Date().toISOString(),
  };

  db.users.push(newUser);
  writeDB(db);
  return newUser;
};

export const updateUser = (userId, partial) => {
  const db = readDB();
  const index = db.users.findIndex((user) => user.id === userId);
  if (index === -1) {
    return null;
  }

  const updated = {
    ...db.users[index],
    ...partial,
  };
  db.users[index] = updated;
  writeDB(db);
  return updated;
};

export const getAllWorkers = () => {
  return getAllUsers().filter((user) => user.role === 'worker' && user.professionKey);
};

export const getAllClients = () => {
  return getAllUsers().filter((user) => user.role !== 'worker');
};

export const createJob = (payload) => {
  const db = readDB();
  const job = {
    id: generateId(),
    status: 'pending', // pending | accepted | declined | completed
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    ...payload,
  };

  db.jobs.push(job);

  createNotification(db, {
    userId: payload.workerId,
    type: 'job_request',
    title: 'طلب خدمة جديد',
    message: `لديك طلب من ${payload.clientName} لخدمة ${payload.serviceName || 'بدون اسم'}`,
    jobId: job.id,
  });

  writeDB(db);
  return job;
};

export const getJobsForWorker = (workerId) => {
  const db = readDB();
  return db.jobs.filter((job) => job.workerId === workerId);
};

export const getJobById = (jobId) => {
  const db = readDB();
  return findJobById(db, jobId);
};

export const getJobsForClient = (clientId) => {
  const db = readDB();
  return db.jobs.filter((job) => job.clientId === clientId);
};

export const updateJobStatus = (jobId, status) => {
  const db = readDB();
  const jobIndex = db.jobs.findIndex((job) => job.id === jobId);
  if (jobIndex === -1) {
    return null;
  }

  db.jobs[jobIndex] = {
    ...db.jobs[jobIndex],
    status,
    updatedAt: new Date().toISOString(),
  };

  const job = db.jobs[jobIndex];

  const notificationPayload =
    status === 'accepted'
      ? {
          title: 'تم قبول طلبك',
          message: `قام ${job.workerName} بقبول طلبك لخدمة ${job.serviceName || ''}`,
        }
      : {
          title: 'تم رفض الطلب',
          message: `قام ${job.workerName} برفض طلبك لخدمة ${job.serviceName || ''}`,
        };

  createNotification(db, {
    userId: job.clientId,
    type: 'job_response',
    jobId: job.id,
    ...notificationPayload,
  });

  writeDB(db);
  return job;
};

export const getNotificationsForUser = (userId) => {
  const db = readDB();
  return db.notifications
    .filter((notification) => notification.userId === userId)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
};

export const getUnreadNotificationCount = (userId) => {
  const notifications = getNotificationsForUser(userId);
  return notifications.filter((notification) => !notification.read).length;
};

export const markNotificationAsRead = (notificationId) => {
  const db = readDB();
  const notifIndex = db.notifications.findIndex((notification) => notification.id === notificationId);
  if (notifIndex === -1) {
    return null;
  }
  db.notifications[notifIndex].read = true;
  db.notifications[notifIndex].readAt = new Date().toISOString();
  writeDB(db);
  return db.notifications[notifIndex];
};

export const markAllNotificationsAsRead = (userId) => {
  const db = readDB();
  let changed = false;
  db.notifications = db.notifications.map((notification) => {
    if (notification.userId !== userId || notification.read) {
      return notification;
    }
    changed = true;
    return {
      ...notification,
      read: true,
      readAt: new Date().toISOString(),
    };
  });

  if (changed) {
    writeDB(db);
  }
  return changed;
};

export const addRating = ({ jobId, fromUserId, toUserId, score, comment = '', fromRole }) => {
  if (!jobId || !fromUserId || !toUserId) {
    throw new Error('بيانات التقييم غير مكتملة');
  }

  const numericScore = Number(score);
  if (Number.isNaN(numericScore) || numericScore < 1 || numericScore > 5) {
    throw new Error('التقييم يجب أن يكون بين 1 و 5');
  }

  const db = readDB();
  const job = findJobById(db, jobId);
  if (!job) {
    throw new Error('لم يتم العثور على الطلب المطلوب');
  }

  const existingIndex = db.ratings.findIndex(
    (rating) => rating.jobId === jobId && rating.fromUserId === fromUserId && rating.toUserId === toUserId,
  );

  const ratingPayload = {
    id: existingIndex === -1 ? generateId() : db.ratings[existingIndex].id,
    jobId,
    fromUserId,
    toUserId,
    score: numericScore,
    comment: comment?.trim() || '',
    fromRole: fromRole || 'client',
    fromName: job.clientId === fromUserId ? job.clientName : job.workerName,
    toName: job.clientId === toUserId ? job.clientName : job.workerName,
    serviceName: job.serviceName || 'خدمة',
    createdAt: existingIndex === -1 ? new Date().toISOString() : db.ratings[existingIndex].createdAt,
    updatedAt: new Date().toISOString(),
  };

  if (existingIndex === -1) {
    db.ratings.push(ratingPayload);
  } else {
    db.ratings[existingIndex] = ratingPayload;
  }

  writeDB(db);
  return ratingPayload;
};

export const getRatingsAuthoredByUser = (userId) => {
  const db = readDB();
  return db.ratings.filter((rating) => rating.fromUserId === userId);
};

export const getRatingsReceivedByUser = (userId) => {
  const db = readDB();
  return db.ratings.filter((rating) => rating.toUserId === userId);
};

export const getRatingForJobBetweenUsers = (jobId, fromUserId, toUserId) => {
  const db = readDB();
  return (
    db.ratings.find(
      (rating) => rating.jobId === jobId && rating.fromUserId === fromUserId && rating.toUserId === toUserId,
    ) || null
  );
};

export const getRatingStatsForUser = (userId) => {
  const received = getRatingsReceivedByUser(userId);
  if (!received.length) {
    return {
      average: 0,
      total: 0,
      breakdown: {
        5: 0,
        4: 0,
        3: 0,
        2: 0,
        1: 0,
      },
      ratings: [],
    };
  }

  const breakdown = {
    5: 0,
    4: 0,
    3: 0,
    2: 0,
    1: 0,
  };

  received.forEach((rating) => {
    breakdown[rating.score] = (breakdown[rating.score] || 0) + 1;
  });

  const average =
    received.reduce((sum, rating) => sum + rating.score, 0) / (received.length || 1);

  return {
    average,
    total: received.length,
    breakdown,
    ratings: received.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)),
  };
};

export const exportDatabase = () => readDB();

export const importDatabase = (data) => {
  if (!isBrowser()) return false;
  const incoming = {
    users: Array.isArray(data?.users) ? data.users : [],
    jobs: Array.isArray(data?.jobs) ? data.jobs : [],
    notifications: Array.isArray(data?.notifications) ? data.notifications : [],
  };
  writeDB(incoming);
  return true;
};


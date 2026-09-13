/**
 * Signals when the intro loading screen has finished. Reveal animations wait
 * on this so they actually play in front of the user instead of finishing
 * behind the loading screen's opaque overlay.
 */
type Listener = () => void;

let ready = false;
const listeners = new Set<Listener>();

export function markAppReady() {
  if (ready) return;
  ready = true;
  listeners.forEach((listener) => listener());
  listeners.clear();
}

export function onAppReady(callback: Listener) {
  if (ready) {
    callback();
    return () => {};
  }
  listeners.add(callback);
  return () => listeners.delete(callback);
}

/**
 * Signals when the intro loading screen has finished. Reveal animations wait
 * on this so they actually play in front of the user instead of finishing
 * behind the loading screen's opaque overlay.
 */
type Listener = () => void;

function createReadySignal() {
  let ready = false;
  const listeners = new Set<Listener>();

  const mark = () => {
    if (ready) return;
    ready = true;
    listeners.forEach((listener) => listener());
    listeners.clear();
  };

  const onReady = (callback: Listener) => {
    if (ready) {
      callback();
      return () => {};
    }
    listeners.add(callback);
    return () => listeners.delete(callback);
  };

  return { mark, onReady };
}

const appReady = createReadySignal();
export const markAppReady = appReady.mark;
export const onAppReady = appReady.onReady;

/**
 * Fires before `appReady` — a lead-in window during which background scenes
 * (e.g. the hero fluid sim) may start while the loading screen is still
 * fading out, instead of waiting for it to fully disappear.
 */
const sceneReady = createReadySignal();
export const markSceneReady = sceneReady.mark;
export const onSceneReady = sceneReady.onReady;

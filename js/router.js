/**
 * Router — simple screen manager.
 * Each screen is an object with enter(data), exit(), and optionally render().
 */
export class Router {
  constructor(canvas, ctx, overlay) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.overlay = overlay;
    this.screens = {};
    this.currentScreen = null;
    this.currentName = null;
  }

  /** Register a screen by name */
  register(name, screen) {
    this.screens[name] = screen;
  }

  /** Navigate to a screen, passing optional data */
  goto(name, data = {}) {
    if (this.currentScreen && this.currentScreen.exit) {
      this.currentScreen.exit();
    }
    this.overlay.innerHTML = '';
    this.currentName = name;
    this.currentScreen = this.screens[name];
    if (this.currentScreen && this.currentScreen.enter) {
      this.currentScreen.enter(data);
    }
  }
}

/**
 * Class for managing the animation game loop
 */
class Loop {

  /**
   * Creates a new game loop
   * @param {Function} [updateCallback=(deltaTime) => {}] - Callback function for update
   * @param {number} updateCallback.deltaTime - Time elapsed since the last frame in milliseconds
   */
  constructor(updateCallback = (deltaTime) => {}) {

    this.updateCallback = updateCallback;
    this.maxDeltaMs = 50;         // Максимальное deltaMs в миллисекундах

    // Временные переменные
    this.deltaTime = 0;        // Разница во времени в миллисекундах
    this.lastTime = 0;       // Время последнего кадра

    this.stepsCounter = 0;

    requestAnimationFrame(this.loop);
  }

  /**
   * Main animation loop
   * @param {number} [timestamp=0] - Current frame timestamp
   */
  loop = (timestamp = 0) => {

    this.deltaTime = Math.min(timestamp - this.lastTime, this.maxDeltaMs);
    this.lastTime = timestamp;

    this.updateCallback(this.deltaTime);

    requestAnimationFrame(this.loop);
  }

}

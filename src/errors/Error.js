class AppError extends Error {
  error;
  status;

  constructor({ message, error = '', status = 400 }) {
    super(message);

    this.error = error;
    this.status = status;
  }

  getError() {
    return {
      message: this.message,
      error: this.error,
      status: this.status,
      stack: this.stack,
    };
  }
}

module.exports = { AppError };

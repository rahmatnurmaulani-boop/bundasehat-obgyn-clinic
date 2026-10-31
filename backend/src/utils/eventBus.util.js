const EventEmitter = require("events");

class AppEventBus extends EventEmitter {
  constructor() {
    super();
    this.setMaxListeners(50);
  }
}

const eventBus = new AppEventBus();

const EVENTS = {
  BOOKING_CREATED: "booking:created",
  BOOKING_STATUS_UPDATED: "booking:status_updated",
  BOOKING_CANCELLED: "booking:cancelled",
};

module.exports = {
  eventBus,
  EVENTS,
};

const express = require("express");
const app = express();
const axios = require("axios");

//Add Prometheus client library
const promBundle = require("express-prom-bundle");

//Add logging library
const { createLogger, format, transports } = require("winston");

const metricsMiddleware = promBundle({
  includeMethod: true,
  includePath: true,
  promClient: {
    collectDefaultMetrics: {},
  },
});

var logLevel = process.env.LOG_LEVEL || "info";
var health = true;
var ready = true;

const logger = createLogger({
  level: logLevel,
  format: format.combine(
    format.timestamp({
      format: "YYYY-MM-DD'T'HH:mm:ss.SSSZ",
    }),
    format.json()
  ),
  transports: [new transports.Console()],
});

app.use(metricsMiddleware);

app.get("/", (req, res) => {
  //simulate random request delay 0-100ms
  var delay = Math.round(Math.random() * 100);
  if (errorSource()) {
    setTimeout(() => {
      res.send({ message: "Hello World!" });
      logger.debug("Hello World!", {
        msgid: "DET00001D",
        transactionTime: delay + "ms",
      });
    }, delay);
  } else {
    res.sendStatus(500);
    logger.error("Informative error message", { msgid: "DET00001E" });
  }
});

app.get("/details/:isbn", async (req, res) => {
  try {
    const response = await axios.get(
      "https://www.googleapis.com/books/v1/volumes?q=isbn:" + req.params.isbn
    );

    const book = response.data.items[0];

    const data = {
      id: req.params.isbn,
      author: book.volumeInfo["authors"][0],
      year: book.volumeInfo["publishedDate"],
      type: book.volumeInfo["printType"],
      pages: book.volumeInfo["pageCount"],
      publisher: book.volumeInfo["publisher"],
      language: book.volumeInfo["language"],
      "ISBN-10": book.volumeInfo.industryIdentifiers.find(
        (d) => d.type == "ISBN_10"
      ).identifier,
      "ISBN-13": book.volumeInfo.industryIdentifiers.find(
        (d) => d.type == "ISBN_13"
      ).identifier,
      cover: book.volumeInfo.imageLinks.thumbnail,
    };

    res.send(data);
  } catch (error) {
    //res.sendStatus(500);
    res.status(500).send({
      message: "We're sorry, we cannot get any information from Google Books",
    });
  }
});

app.get("/health", (req, res, next) => {
  if (health) {
    res.send({ status: "Healthy" });
    next();
  } else {
    res.status(500).send({ status: "Health check did not pass" });
  }
});

app.get("/ready", (req, res, next) => {
  if (ready) {
    res.send({ status: "Ready" });
    next();
  } else {
    res.status(500).send({ status: "Readiness check did not pass" });
  }
});

app.get("/simulate-problem", (req, res, next) => {
  health = false;
  res.json({
    status:
      "Health variable set to 'false'. This should activate the liveness probe",
  });
  next();
});

function errorSource() {
  // 10% error rate
  return Math.random() >= 0.1;
}

module.exports = { app };

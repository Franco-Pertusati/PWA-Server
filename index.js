const express = require("express");
const webPush = require("web-push");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

// Claves VAPID generadas
const vapidKeys = {
  publicKey: process.env.VAPID_PUBLIC_KEY,
  privateKey: process.env.VAPID_PRIVATE_KEY,
};

// Configurar las claves VAPID
webPush.setVapidDetails(
  "mailto:your-email@example.com",
  publicVapidKey,
  privateVapidKey
);

// Middleware
app.use(cors({ origin: "https://pwa-test-mcb4.vercel.app" }));
app.use(bodyParser.json());

// Endpoint para probar el servidor
app.get("/health", (req, res) => {
  res.status(200).json({ message: "Server is running!" });
});

// Endpoint para registrar suscripciones
const subscriptions = [];

app.post("/subscribe", (req, res) => {
  const subscription = req.body;
  subscriptions.push(subscription);
  res.status(201).json({ message: "Subscription added successfully!" });
});

app.post("/send-notification", (req, res) => {
  const { title, message } = req.body;
  const payload = JSON.stringify({ title, message });

  subscriptions.forEach((subscription) => {
    webPush
      .sendNotification(subscription, payload)
      .catch((error) => console.error("Error sending notification:", error));
  });

  res.status(200).json({ message: "Notifications sent successfully!" });
});

// Exportar la aplicación
module.exports = app;

const webPush = require("web-push");
const vapidKeyss = webPush.generateVAPIDKeys();
console.log(vapidKeyss);

const vapidKeys = {
  publicKey: process.env.VAPID_PUBLIC_KEY,
  privateKey: process.env.VAPID_PRIVATE_KEY,
};

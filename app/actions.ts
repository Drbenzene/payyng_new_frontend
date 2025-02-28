"use server";

import webpush from "web-push";

webpush.setVapidDetails(
  "mailto:boyinbodedev@gmail.com",
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY ||
    "BDlzKIUMqSSf6o8tcchJXGiBCc3bT5mCsjFV4dlTgmlzq53WuEwg3L3y-TmLilAgLMYoFXO2gqkRhFxxxZEjgz0",
  process.env.VAPID_PRIVATE_KEY || "9-7taojT3XaLGQN3XTatQydmf1ajDn2l3r0b0qjOexg"
);

// Public Key:
// BDlzKIUMqSSf6o8tcchJXGiBCc3bT5mCsjFV4dlTgmlzq53WuEwg3L3y-TmLilAgLMYoFXO2gqkRhFxxxZEjgz0

// Private Key:
// 9-7taojT3XaLGQN3XTatQydmf1ajDn2l3r0b0qjOexg

let subscription: any = null;

export async function subscribeUser(sub: PushSubscription) {
  subscription = sub;
  // In a production environment, you would want to store the subscription in a database
  // For example: await db.subscriptions.create({ data: sub })
  console.log(sub, "subscribed");
  return { success: true };
}

export async function unsubscribeUser() {
  subscription = null;
  // In a production environment, you would want to remove the subscription from the database
  // For example: await db.subscriptions.delete({ where: { ... } })
  return { success: true };
}

export async function sendNotification(message: string) {
  if (!subscription) {
    throw new Error("No subscription available");
  }

  console.log("Sending notification to:", subscription.endpoint);

  try {
    await webpush.sendNotification(
      subscription,
      JSON.stringify({
        title: "Test Notification",
        body: message,
        icon: "/icon.png",
      })
    );
    return { success: true };
  } catch (error) {
    console.error("Error sending push notification:", error);
    return { success: false, error: "Failed to send notification" };
  }
}

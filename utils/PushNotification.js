import { getMessaging } from 'firebase-admin/messaging';
import TaskModel from '../models/taskModel.js';

export const sendNotification = async (messages) => {
  const notifyMessages = Array.isArray(messages) ? messages : [messages];
  if (!notifyMessages.length) return;
  try {
    const results = await Promise.allSettled(
      notifyMessages.map((msg) => getMessaging().sendEachForMulticast(msg))
    );

    return results;
  } catch (err) {
    console.error('Error sending notifications:', err);
    throw err;
  }
};

export const runNotificationCronJob = async () => {
  const tasks = await TaskModel.find({
    dueDate: {
      $gt: Date.now(),
      $lt: Date.now() + 30 * 60 * 1000,
    },
  }).populate('user');

  const allowedTasks = tasks.filter(
    (el) => el.user?.allowNotification && el.user?.fcmTokens?.length > 0
  );

  const messages = allowedTasks.map((el) => ({
    notification:
      el.user.lang === 'ar'
        ? {
            title: '⏰ تذكير بمهمة',
            body: `متبقي أقل من 30 دقيقة على "${el.title}"`,
          }
        : {
            title: '⏰ Task Reminder',
            body: `"${el.title}" is due within 30 minutes.`,
          },
    tokens: el?.user?.fcmTokens,
  }));

  return await sendNotification(messages);
};

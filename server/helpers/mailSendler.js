import sendMail from "../services/MailService.js";

export const mailSendler = async (order) => {
  try {
    const message = {
      from: "lebedpavel.dev@mail.ru",
      to: order.clientEmail,
      subject: `Заказ ID-${order._id} принят!`,
      text: `
      Уважаемый клиент!
      Ваша заявка принята в работу!
      Город: ${order.city}
      Маршрут: ${order.route}
      Пакет: ${order.package_name}
      В близжайшее время с вами свяжется фотограф, и вы сможете договориться о времени проведения съемки!
      `,
    };
    const messageForManager = {
      from: "lebedpavel.dev@mail.ru",
      to: "vovoka.path@gmail.com",
      subject: `Новый заказ ID-${order._id}`,
      text: `
      Трудяга, у нас новый заказ!
      Необходимо назначить фотографа!
      `,
    };
    const status = await sendMail(message);
    const statusManagerMail = await sendMail(messageForManager);
    console.log(status, statusManagerMail);
  } catch (error) {
    console.log(error);
  }
};

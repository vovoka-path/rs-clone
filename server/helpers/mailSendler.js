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
    const status = await sendMail(message);
    console.log(status);
  } catch (error) {
    console.log(error);
  }
};

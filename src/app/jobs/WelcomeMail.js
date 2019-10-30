import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Mail from '../../libs/Mail';

class WelcomeMail {
  get key() {
    return 'WelcomeMail';
  }

  async handle({ data }) {
    const { registration } = data;

    await Mail.sendMail({
      to: `${registration.student.nome} <${registration.student.email}>`,
      subject: 'Seja Bem Vindo ao GymPoint',
      template: 'welcome',
      context: {
        student: registration.student.name,
        plan: registration.plan.title,
        duration: registration.plan.duration,
        end_date: format(
          parseISO(registration.end_date),
          "'dia' dd 'de' MMMM', às' H:mm'h'",
          {
            locale: pt,
          }
        ),
        price: registration.price,
      },
    });
  }
}
export default new WelcomeMail();

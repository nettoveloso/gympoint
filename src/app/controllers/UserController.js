import * as Yup from 'yup';

import User from '../models/User';

class UserController {
  /**
   * Lista de Usuários
   * @param {*} req
   * @param {*} res
   */
  async index(req, res) {
    const users = await User.findAll();
    return res.json(users);
  }

  /**
   * Cadastro de Usuário
   * @param {*} req
   * @param {*} res
   */
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string()
        .required()
        .min(6),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Erro na validação!' });
    }

    const userExists = await User.findOne({ where: { email: req.body.email } });

    if (userExists) {
      return res.status(400).json({ error: 'E-mail já cadastrado' });
    }

    const { id, name, email } = await User.create(req.body);

    const user = {
      id,
      name,
      email,
    };

    return res.json(user);
  }
}

export default new UserController();

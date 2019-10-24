import * as Yup from 'yup';
import Student from '../models/Student';

class StudentController {
  /**
   * Lista todos os alunos cadastrados
   * @param {*} req
   * @param {*} res
   */
  async index(req, res) {
    const students = await Student.findAll();
    return res.json(students);
  }

  /**
   * Cadastro de Usuário
   * @param {*} req
   * @param {*} res
   */
  async store(req, res) {
    const schema = Yup.object().shape({
      nome: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      idade: Yup.number().required(),
      peso: Yup.number(),
      altura: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Erro na validação!' });
    }

    const studentExists = await Student.findOne({
      where: { email: req.body.email },
    });

    if (studentExists) {
      return res
        .status(400)
        .json({ error: 'E-mail já associado a outro aluno' });
    }

    const student = await Student.create(req.body);

    return res.json(student);
  }

  async update(req, res) {
    const { id } = req.params;
    const schema = Yup.object().shape({
      nome: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      idade: Yup.number().required(),
      peso: Yup.number(),
      altura: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Erro na validação!' });
    }

    const { email } = req.body;

    const student = await Student.findByPk(id);

    if (email !== student.email) {
      const studentExists = await Student.findOne({ where: { email } });

      if (studentExists) {
        return res.status(400).json({ error: 'E-mail já cadastrado' });
      }
    }

    const studentUpdate = await student.update(req.body);

    return res.json({ studentUpdate });
  }
}

export default new StudentController();

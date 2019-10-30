import * as Yup from 'yup';
import Plan from '../models/Plan';

class PlanController {
  /**
   * Lista todos os planos cadastrados
   * @param {*} req
   * @param {*} res
   */
  async index(req, res) {
    const plans = await Plan.findAll();
    return res.json(plans);
  }

  /**
   * Cadastro de Planos
   * @param {*} req
   * @param {*} res
   */
  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      duration: Yup.number().required(),
      price: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Erro na validação!' });
    }

    const planExists = await Plan.findOne({
      where: { title: req.body.title },
    });

    if (planExists) {
      return res.status(400).json({ error: 'Plano já existe cadastrado' });
    }

    const plan = await Plan.create(req.body);

    return res.json(plan);
  }

  /**
   * Update do Planos
   * @param {*} req
   * @param {*} res
   */
  async update(req, res) {
    const { id } = req.params;
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      duration: Yup.number().required(),
      price: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Erro na validação!' });
    }

    const { title } = req.body;

    const plan = await Plan.findByPk(id);

    if (title !== plan.title) {
      const planExists = await Plan.findOne({ where: { title } });

      if (planExists) {
        return res.status(400).json({ error: 'Plano já cadastrado' });
      }
    }

    const planUpdate = await plan.update(req.body);

    return res.json({ planUpdate });
  }

  async delete(req, res) {
    const plan = await Plan.findByPk(req.params.id);

    const planDelete = await plan.destroy();

    return res.json({ planDelete });
  }
}
export default new PlanController();

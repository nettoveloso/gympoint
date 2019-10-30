import Plan from '../models/Plan';
import Registration from '../models/Registration';

class RegistrationController {
  async index(req, res) {
    const registration = await Registration.findAll();

    return res.status(200).json(registration);
  }
}

export default new RegistrationController();

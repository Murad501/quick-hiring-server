import { IApplication } from "./application.interface";
import Application from "./application.model";
import { getUniqueKey } from "../../../helpers/getUniqueKey";

class ApplicationService {
  private application: typeof Application;

  constructor(application: typeof Application) {
    this.application = application;
  }

  async applyForJob(payload: IApplication): Promise<IApplication> {
    payload.applicationId = getUniqueKey("APP");

    const result = await this.application.create(payload);
    return result;
  }

  async getAllApplications(): Promise<IApplication[]> {
    const result = await this.application.find({});
    return result;
  }
}

const applicationService = new ApplicationService(Application);

export default applicationService;

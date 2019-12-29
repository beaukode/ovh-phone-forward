import Ovh from "@ovh-api/api";
import OvhMe, { Me } from "@ovh-api/me";
import OvhTel, { Telephony } from "@ovh-api/telephony";

export default class {
  protected ovh: Ovh;
  protected me: Me;
  protected tel: Telephony;
  constructor(appKey: string, appSecret: string, consumerKey?: string) {
    this.ovh = new Ovh({
      appKey,
      appSecret,
      consumerKey,
      accessRules: [
        "GET /me",
        "GET /telephony*",
        "PUT /telephony/*/line/*/options",
      ],
    });
    this.me = OvhMe(this.ovh);
    this.tel = OvhTel(this.ovh);
  }

  public getNichandle(): Promise<string> {
    return this.me.$get().then(me => {
      return me.nichandle;
    });
  }

  public getAccounts(): Promise<string[]> {
    return this.tel.$get();
  }

  public getLines(account: string): Promise<string[]> {
    return this.tel.$(account).line.$get();
  }

  public getForward(account: string, line: string): Promise<string | null> {
    return this.tel
      .$(account)
      .line.$(line)
      .options.$get()
      .then(options => {
        return options.forwardUnconditional
          ? options.forwardUnconditionalNumber
          : null;
      });
  }

  public setForward(
    account: string,
    line: string,
    forwardTo: string
  ): Promise<void> {
    const tel = OvhTel(this.ovh);
    return tel
      .$(account)
      .line.$(line)
      .options.$put({
        forwardUnconditional: true,
        forwardBackupNature: "number",
        forwardBackupNumber: forwardTo,
      });
  }

  public removeForward(account: string, line: string): Promise<void> {
    const tel = OvhTel(this.ovh);
    return tel
      .$(account)
      .line.$(line)
      .options.$put({ forwardUnconditional: false });
  }
}

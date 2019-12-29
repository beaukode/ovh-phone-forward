import OvhClient from "./OvhClient";

interface Accounts {
  [line: string]: string;
}
interface Lines {
  [line: string]: string | null;
}

export default class {
  private client: OvhClient;
  constructor(client: OvhClient) {
    this.client = client;
  }

  public getNichandle = (): Promise<string> => {
    return this.client.getNichandle();
  };

  public setForward = (line: string, to?: string): Promise<void> => {
    return this.getAccounts().then(accounts => {
      if (!accounts[line]) {
        return Promise.reject("Line not found: " + line);
      }
      if (to) {
        return this.client.setForward(accounts[line], line, to);
      } else {
        return this.client.removeForward(accounts[line], line);
      }
    });
  };

  public getLines = (): Promise<Lines> => {
    return this.getAccounts().then(accounts => {
      const proms = Object.entries(accounts).map(([line, account]) => {
        return this.client.getForward(account, line).then(forward => {
          return { line, forward };
        });
      });
      return Promise.all(proms).then(r => {
        return r.reduce((prev, cur) => {
          return { ...prev, [cur.line]: cur.forward };
        }, {});
      });
    });
  };

  private getAccounts = (): Promise<Accounts> => {
    return this.client.getAccounts().then(accounts => {
      const proms = accounts.map(this.getAcountLines);
      return Promise.all(proms).then(r => {
        return r.reduce<Accounts>((prev, cur) => {
          return { ...prev, ...cur };
        }, {});
      });
    });
  };

  private getAcountLines = (account: string): Promise<Accounts> => {
    return this.client.getLines(account).then(lines => {
      return lines.reduce<Accounts>((prev, cur) => {
        return { ...prev, [cur]: account };
      }, {});
    });
  };
}

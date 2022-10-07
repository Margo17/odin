import IAccount from "../interfaces/IAccount";
import { Serializable } from "./serializable";

export class Account extends Serializable<Account> implements IAccount {
  id: string = "";
  name: string = "";
  baseCurrency: string = "";
  exchange: string = "";
  apiKey: string = "";
  secret: string = "";
  primary: boolean = false;
  userId: string = "";

  constructor(data?: Partial<IAccount>) {
    super();
    if (data) Object.assign(this, data);
  }

  protected create(data?: any): Account {
    return new Account(data);
  }
}

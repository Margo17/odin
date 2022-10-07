import IUser from "../interfaces/IUser";
import { Serializable } from "./serializable";

export class User extends Serializable<User> implements IUser {
  id: string = "";
  email: string = "";
  name: string = "";
  avatarUrl: string = "";
  provider: string = "";

  constructor(data?: Partial<IUser>) {
    super();
    if (data) Object.assign(this, data);
  }

  protected create(data?: any): User {
    return new User(data);
  }
}

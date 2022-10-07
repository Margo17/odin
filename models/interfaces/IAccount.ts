export default interface IAccount {
  id: string;
  name: string;
  baseCurrency: string;
  exchange: string;
  apiKey: string;
  secret: string;
  primary: boolean;
  userId: string;
}

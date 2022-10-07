import * as functionsClient from "firebase/functions";

export class ClientFunctions {
  private functions: functionsClient.Functions;

  constructor(functions: functionsClient.Functions) {
    this.functions = functions;
  }

  async callFunction(call: FunctionCall) {
    try {
      const callable = functionsClient.httpsCallable(this.functions, call.name);
      const result = await callable(call.parameters);
      const data = result.data as { [k: string]: any };
      if (data.status === "error") throw Error(data.reason ?? data.message);
      return data;
    } catch (e) {
      console.error(
        new Error(`[ClientFunctions] callFunction:
          call: ${call},
        `),
        e
      );
      return undefined;
    }
  }
}

type FunctionCall =
  | AddProductLinesToOrderCall
  | GetActualDeliveryTimesAndPricesCall
  | GetServiceableStoresCall;

interface AddProductLinesToOrderCall {
  name: "addProductLinesToOrderV2";
  parameters: {
    clientOrderId: string;
    fromProductId: string;
    cancel: boolean;
    items: { [k: string]: any }[];
  };
}

interface GetActualDeliveryTimesAndPricesCall {
  name: "getActualDeliveryTimesAndPricesV2";
  parameters:
    | {
        cartHeaderId: string;
        cityId: string;
      }
    | {
        clientOrderHeaderId: string;
      };
}

interface GetServiceableStoresCall {
  name: "getServiceableStoresV2";
  parameters: {
    latitude: number;
    longitude: number;
  };
}

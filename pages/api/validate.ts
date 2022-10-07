import { NextApiRequest, NextApiResponse } from "next";
import { parseCookies } from "nookies";

import { server } from "../../firebase/server_side";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { token } = parseCookies({ req });
    if (!token) {
      return res.status(200).send(undefined);
    }
    const user = await server.auth.validate(token);

    return res.status(200).send(user);
  } catch (e) {
    return res.status(200).send(undefined);
  }
};

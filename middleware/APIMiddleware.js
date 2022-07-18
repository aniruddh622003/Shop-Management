import { JWTMiddleWare } from "./JWTMiddleware";

export const withAPIMiddleware = (handler, JWTMiddle = false) => {
  return async (req, res) => {
    if (JWTMiddle) {
      const data = await JWTMiddleWare(req, res);
      if (data.error) return;
      req = data.req;
      res = data.res;
    }
    return handler(req, res);
  };
};

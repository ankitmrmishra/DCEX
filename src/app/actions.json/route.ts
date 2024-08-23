import { ACTIONS_CORS_HEADERS, ActionsJson } from "@solana/actions";
export const GET = async () => {
  const payload: ActionsJson = {
    rules: [
      {
        pathPattern: "/",
        apiPath: "/api/donate/",
      },
    ],
  };

  return Response.json(payload, {
    headers: {
       'Content-Type': 'application/json' ,
      ...ACTIONS_CORS_HEADERS, // Spreading the CORS headers from the imported constant
      // You can add more custom headers here if needed
      // { 'Custom-Header': 'Custom-Value' },
  }
  });
};

export const OPTIONS = GET;
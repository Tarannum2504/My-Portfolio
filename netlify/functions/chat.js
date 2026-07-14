import handler from "../../server/api/chat.js";

export default async (request, context) => {
  // 1. Check if method is POST
  if (request.method !== "POST") {
    return new Response(JSON.stringify({ reply: "Method not allowed.", actions: [] }), {
      status: 200, // Matching the existing API behavior which returns 200 with error message
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  // 2. Parse request body
  let body = {};
  if (request.body) {
    try {
      body = await request.json();
    } catch (e) {
      console.error("[Netlify Function] Error parsing request JSON:", e.message);
    }
  }

  // 3. Mock Express req and res for the existing handler
  const mockReq = {
    method: request.method,
    body: body,
  };

  return new Promise((resolve) => {
    const mockRes = {
      json: (data) => {
        resolve(
          new Response(JSON.stringify(data), {
            status: 200,
            headers: {
              "Content-Type": "application/json",
            },
          })
        );
      },
      status: (code) => {
        return {
          json: (data) => {
            resolve(
              new Response(JSON.stringify(data), {
                status: code,
                headers: {
                  "Content-Type": "application/json",
                },
              })
            );
          },
        };
      },
    };

    // 4. Call the original Express handler
    handler(mockReq, mockRes).catch((err) => {
      console.error("[Netlify Function] Handler crashed:", err);
      resolve(
        new Response(JSON.stringify({ error: err.message }), {
          status: 500,
          headers: {
            "Content-Type": "application/json",
          },
        })
      );
    });
  });
};

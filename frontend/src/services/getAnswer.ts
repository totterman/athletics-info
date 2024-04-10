type Reply = {
  reply: string;
};

export async function getAnswer(prompt: string) {
    const response = await fetch('/rag/athletics?query=' + prompt);
  if (!response.ok) {
    if (response.status === 401) {
      console.log('Response 401');
      return 'NOT_LOGGED_IN';
    } else {
      console.log(`${response.status} ${response.statusText}`);
      return prompt;
    }
  }
  try {
      // console.log('Response:', response);
      const body = (await response.json()) as unknown;
      console.log('Body', body);
      assertIsReply(body);
      return body.reply;
  } catch (e: any) {
    console.log('Exception', e);
  }
  return 'NO ANSWER';
}

function assertIsReply(payload: unknown): asserts payload is Reply {
  if (payload === null || typeof payload !== 'object') {
      throw new Error('payload is not an object');
    }
    if (!('reply' in payload)) {
      throw new Error('payload does not contain reply');
    }
    if (typeof payload.reply !== 'string') {
      throw new Error('reply is not a string');
    }
}
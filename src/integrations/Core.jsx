export async function InvokeLLM(input, options = {}) {
  if (typeof input === 'string') {
    return { content: `Echo: ${input}`, model: 'mock', usage: { tokens: 0 } };
  }
  if (input?.messages) {
    return {
      content: '모의 응답입니다.',
      model: 'mock',
      messages: [...input.messages, { role: 'assistant', content: '모의 응답입니다.' }],
    };
  }
  return { content: '모의 응답입니다.', model: 'mock' };
}
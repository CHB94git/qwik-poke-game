import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: import.meta.env.PUBLIC_OPEN_AI_KEY,
});

const openai = new OpenAIApi(configuration);

export const getPokemonInfoByChatGpt = async (pokemonName: string): Promise<string> => {
  delete configuration.baseOptions.headers['User-Agent'];

  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `Dame más información del pokémon ${pokemonName}`,
    temperature: 1,
    max_tokens: 64,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });

  return response.data.choices[0].text || `No tengo información sobre el pokémon ${pokemonName}, lo siento!`
  // return response.data.choices[0].text ?? `No tengo información sobre el pokémon ${pokemonName}, lo siento!`
}

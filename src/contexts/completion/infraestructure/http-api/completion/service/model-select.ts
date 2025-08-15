import { anthropic } from '@ai-sdk/anthropic';
import { google } from '@ai-sdk/google';
import { groq } from '@ai-sdk/groq';
import { openai } from '@ai-sdk/openai';
import { xai } from '@ai-sdk/xai';
import { LanguageModel } from 'ai';
import { Injectable as CustomInjectable } from '../../../../../shared/dependency-injection/custom-injectable';

@CustomInjectable()
export class ModelSelectFromCompletion {
  public SelectModelFromCompletion(modelSelected: string): LanguageModel {
    let model: LanguageModel;
    if (modelSelected === 'gpt-4o-mini') {
      model = openai('gpt-4o-mini');
    } else if (modelSelected === 'grok-3-fast-beta') {
      model = xai('grok-3-fast-beta');
    } else if (modelSelected === 'claude-3-5-sonnet-latest') {
      model = anthropic('claude-3-5-sonnet-latest');
    } else if (modelSelected === 'claude-3-5-haiku-latest') {
      model = anthropic('claude-3-5-haiku-latest');
    } else if (modelSelected === 'llama-3.1-8b-instant') {
      model = groq('llama-3.1-8b-instant');
    } else if (modelSelected === 'llama-3.3-70b-versatile') {
      model = groq('llama-3.3-70b-versatile');
    } else if (modelSelected === 'gemini-2.0-flash-001') {
      model = google('gemini-2.0-flash-001');
    } else if (modelSelected === 'gemini-2.0-flash-lite-preview-02-05') {
      model = google('gemini-2.0-flash-lite-preview-02-05');
    } else {
      model = openai('gpt-4o-mini');
    }

    return model;
  }
}

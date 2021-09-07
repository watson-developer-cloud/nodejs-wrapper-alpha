/**
 * (C) Copyright IBM Corp. 2017, 2021.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * IBM OpenAPI SDK Code Generator Version: 99-SNAPSHOT-9b00691c-20210824-142310
 */

import * as extend from 'extend';
import { IncomingHttpHeaders, OutgoingHttpHeaders } from 'http';
import {
  Authenticator,
  BaseService,
  getAuthenticatorFromEnvironment,
  getMissingParams,
  UserOptions,
} from 'ibm-cloud-sdk-core';
import { getSdkHeaders } from '../lib/common';

/**
 * The IBM Watson&trade; Text to Speech service provides APIs that use IBM's speech-synthesis capabilities to synthesize
 * text into natural-sounding speech in a variety of languages, dialects, and voices. The service supports at least one
 * male or female voice, sometimes both, for each language. The audio is streamed back to the client with minimal delay.
 *
 *
 * For speech synthesis, the service supports a synchronous HTTP Representational State Transfer (REST) interface and a
 * WebSocket interface. Both interfaces support plain text and SSML input. SSML is an XML-based markup language that
 * provides text annotation for speech-synthesis applications. The WebSocket interface also supports the SSML
 * <code>&lt;mark&gt;</code> element and word timings.
 *
 * The service offers a customization interface that you can use to define sounds-like or phonetic translations for
 * words. A sounds-like translation consists of one or more words that, when combined, sound like the word. A phonetic
 * translation is based on the SSML phoneme format for representing a word. You can specify a phonetic translation in
 * standard International Phonetic Alphabet (IPA) representation or in the proprietary IBM Symbolic Phonetic
 * Representation (SPR).
 *
 * The service also offers a Tune by Example feature that lets you define custom prompts. You can also define speaker
 * models to improve the quality of your custom prompts. The service support custom prompts only for US English custom
 * models and voices.
 *
 * **IBM Cloud&reg;.** The Arabic, Chinese, Dutch, Australian English, and Korean languages and voices are supported
 * only for IBM Cloud. For phonetic translation, they support only IPA, not SPR.
 *
 * API Version: 1.0.0
 * See: https://cloud.ibm.com/docs/text-to-speech
 */

class TextToSpeechV1 extends BaseService {
  static DEFAULT_SERVICE_URL: string = 'https://api.us-south.text-to-speech.watson.cloud.ibm.com';

  static DEFAULT_SERVICE_NAME: string = 'text_to_speech';

  /**
   * Construct a TextToSpeechV1 object.
   *
   * @param {Object} options - Options for the service.
   * @param {string} [options.serviceUrl] - The base url to use when contacting the service. The base url may differ between IBM Cloud regions.
   * @param {OutgoingHttpHeaders} [options.headers] - Default headers that shall be included with every request to the service.
   * @param {string} [options.serviceName] - The name of the service to configure
   * @param {Authenticator} [options.authenticator] - The Authenticator object used to authenticate requests to the service. Defaults to environment if not set
   * @constructor
   * @returns {TextToSpeechV1}
   */
  constructor(options: UserOptions) {
    options = options || {};

    if (!options.serviceName) {
      options.serviceName = TextToSpeechV1.DEFAULT_SERVICE_NAME;
    }
    // If the caller didn't supply an authenticator, construct one from external configuration.
    if (!options.authenticator) {
      options.authenticator = getAuthenticatorFromEnvironment(options.serviceName);
    }
    super(options);
    this.configureService(options.serviceName);
    if (options.serviceUrl) {
      this.setServiceUrl(options.serviceUrl);
    }
  }

  /*************************
   * voices
   ************************/

  /**
   * List voices.
   *
   * Lists all voices available for use with the service. The information includes the name, language, gender, and other
   * details about the voice. The ordering of the list of voices can change from call to call; do not rely on an
   * alphabetized or static list of voices. To see information about a specific voice, use the **Get a voice** method.
   *
   * **See also:** [Listing all available
   * voices](https://cloud.ibm.com/docs/text-to-speech?topic=text-to-speech-voices#listVoices).
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<TextToSpeechV1.Response<TextToSpeechV1.Voices>>}
   */
  public listVoices(
    params?: TextToSpeechV1.ListVoicesParams
  ): Promise<TextToSpeechV1.Response<TextToSpeechV1.Voices>> {
    const _params = { ...params };

    const sdkHeaders = getSdkHeaders(
      TextToSpeechV1.DEFAULT_SERVICE_NAME,
      'v1',
      'listVoices'
    );

    const parameters = {
      options: {
        url: '/v1/voices',
        method: 'GET',
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Get a voice.
   *
   * Gets information about the specified voice. The information includes the name, language, gender, and other details
   * about the voice. Specify a customization ID to obtain information for a custom model that is defined for the
   * language of the specified voice. To list information about all available voices, use the **List voices** method.
   *
   * **See also:** [Listing a specific
   * voice](https://cloud.ibm.com/docs/text-to-speech?topic=text-to-speech-voices#listVoice).
   *
   * ### Important voice updates for IBM Cloud
   *
   *  The service's voices underwent significant change on 2 December 2020.
   * * The Arabic, Chinese, Dutch, Australian English, and Korean voices are now neural instead of concatenative.
   * * The `ar-AR_OmarVoice` voice is deprecated. Use `ar-MS_OmarVoice` voice instead.
   * * The `ar-AR` language identifier cannot be used to create a custom model. Use the `ar-MS` identifier instead.
   * * The standard concatenative voices for the following languages are now deprecated: Brazilian Portuguese, United
   * Kingdom and United States English, French, German, Italian, Japanese, and Spanish (all dialects).
   * * The features expressive SSML, voice transformation SSML, and use of the `volume` attribute of the `<prosody>`
   * element are deprecated and are not supported with any of the service's neural voices.
   * * All of the service's voices are now customizable and generally available (GA) for production use.
   *
   * The deprecated voices and features will continue to function for at least one year but might be removed at a future
   * date. You are encouraged to migrate to the equivalent neural voices at your earliest convenience. For more
   * information about all voice updates, see the [2 December 2020 service
   * update](https://cloud.ibm.com/docs/text-to-speech?topic=text-to-speech-release-notes#December2020) in the release
   * notes for IBM Cloud.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.voice - The voice for which information is to be returned. For more information about
   * specifying a voice, see **Important voice updates for IBM Cloud** in the method description. **IBM Cloud:** The
   * Arabic, Chinese, Dutch, Australian English, and Korean languages and voices are supported only for IBM Cloud.
   * @param {string} [params.customizationId] - The customization ID (GUID) of a custom model for which information is
   * to be returned. You must make the request with credentials for the instance of the service that owns the custom
   * model. Omit the parameter to see information about the specified voice with no customization.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<TextToSpeechV1.Response<TextToSpeechV1.Voice>>}
   */
  public getVoice(
    params: TextToSpeechV1.GetVoiceParams
  ): Promise<TextToSpeechV1.Response<TextToSpeechV1.Voice>> {
    const _params = { ...params };
    const requiredParams = ['voice'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const query = {
      'customization_id': _params.customizationId,
    };

    const path = {
      'voice': _params.voice,
    };

    const sdkHeaders = getSdkHeaders(
      TextToSpeechV1.DEFAULT_SERVICE_NAME,
      'v1',
      'getVoice'
    );

    const parameters = {
      options: {
        url: '/v1/voices/{voice}',
        method: 'GET',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }
  /*************************
   * synthesis
   ************************/

  /**
   * Synthesize audio.
   *
   * Synthesizes text to audio that is spoken in the specified voice. The service bases its understanding of the
   * language for the input text on the specified voice. Use a voice that matches the language of the input text.
   *
   * The method accepts a maximum of 5 KB of input text in the body of the request, and 8 KB for the URL and headers.
   * The 5 KB limit includes any SSML tags that you specify. The service returns the synthesized audio stream as an
   * array of bytes.
   *
   * **See also:** [The HTTP
   * interface](https://cloud.ibm.com/docs/text-to-speech?topic=text-to-speech-usingHTTP#usingHTTP).
   *
   * ### Audio formats (accept types)
   *
   *  The service can return audio in the following formats (MIME types).
   * * Where indicated, you can optionally specify the sampling rate (`rate`) of the audio. You must specify a sampling
   * rate for the `audio/l16` and `audio/mulaw` formats. A specified sampling rate must lie in the range of 8 kHz to 192
   * kHz. Some formats restrict the sampling rate to certain values, as noted.
   * * For the `audio/l16` format, you can optionally specify the endianness (`endianness`) of the audio:
   * `endianness=big-endian` or `endianness=little-endian`.
   *
   * Use the `Accept` header or the `accept` parameter to specify the requested format of the response audio. If you
   * omit an audio format altogether, the service returns the audio in Ogg format with the Opus codec
   * (`audio/ogg;codecs=opus`). The service always returns single-channel audio.
   * * `audio/basic` - The service returns audio with a sampling rate of 8000 Hz.
   * * `audio/flac` - You can optionally specify the `rate` of the audio. The default sampling rate is 22,050 Hz.
   * * `audio/l16` - You must specify the `rate` of the audio. You can optionally specify the `endianness` of the audio.
   * The default endianness is `little-endian`.
   * * `audio/mp3` - You can optionally specify the `rate` of the audio. The default sampling rate is 22,050 Hz.
   * * `audio/mpeg` - You can optionally specify the `rate` of the audio. The default sampling rate is 22,050 Hz.
   * * `audio/mulaw` - You must specify the `rate` of the audio.
   * * `audio/ogg` - The service returns the audio in the `vorbis` codec. You can optionally specify the `rate` of the
   * audio. The default sampling rate is 22,050 Hz.
   * * `audio/ogg;codecs=opus` - You can optionally specify the `rate` of the audio. Only the following values are valid
   * sampling rates: `48000`, `24000`, `16000`, `12000`, or `8000`. If you specify a value other than one of these, the
   * service returns an error. The default sampling rate is 48,000 Hz.
   * * `audio/ogg;codecs=vorbis` - You can optionally specify the `rate` of the audio. The default sampling rate is
   * 22,050 Hz.
   * * `audio/wav` - You can optionally specify the `rate` of the audio. The default sampling rate is 22,050 Hz.
   * * `audio/webm` - The service returns the audio in the `opus` codec. The service returns audio with a sampling rate
   * of 48,000 Hz.
   * * `audio/webm;codecs=opus` - The service returns audio with a sampling rate of 48,000 Hz.
   * * `audio/webm;codecs=vorbis` - You can optionally specify the `rate` of the audio. The default sampling rate is
   * 22,050 Hz.
   *
   * For more information about specifying an audio format, including additional details about some of the formats, see
   * [Using audio formats](https://cloud.ibm.com/docs/text-to-speech?topic=text-to-speech-audio-formats).
   *
   * ### Important voice updates for IBM Cloud
   *
   *  The service's voices underwent significant change on 2 December 2020.
   * * The Arabic, Chinese, Dutch, Australian English, and Korean voices are now neural instead of concatenative.
   * * The `ar-AR_OmarVoice` voice is deprecated. Use `ar-MS_OmarVoice` voice instead.
   * * The `ar-AR` language identifier cannot be used to create a custom model. Use the `ar-MS` identifier instead.
   * * The standard concatenative voices for the following languages are now deprecated: Brazilian Portuguese, United
   * Kingdom and United States English, French, German, Italian, Japanese, and Spanish (all dialects).
   * * The features expressive SSML, voice transformation SSML, and use of the `volume` attribute of the `<prosody>`
   * element are deprecated and are not supported with any of the service's neural voices.
   * * All of the service's voices are now customizable and generally available (GA) for production use.
   *
   * The deprecated voices and features will continue to function for at least one year but might be removed at a future
   * date. You are encouraged to migrate to the equivalent neural voices at your earliest convenience. For more
   * information about all voice updates, see the [2 December 2020 service
   * update](https://cloud.ibm.com/docs/text-to-speech?topic=text-to-speech-release-notes#December2020) in the release
   * notes for IBM Cloud.
   *
   * ### Warning messages
   *
   *  If a request includes invalid query parameters, the service returns a `Warnings` response header that provides
   * messages about the invalid parameters. The warning includes a descriptive message and a list of invalid argument
   * strings. For example, a message such as `"Unknown arguments:"` or `"Unknown url query arguments:"` followed by a
   * list of the form `"{invalid_arg_1}, {invalid_arg_2}."` The request succeeds despite the warnings.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.text - The text to synthesize.
   * @param {string} [params.accept] - The requested format (MIME type) of the audio. You can use the `Accept` header or
   * the `accept` parameter to specify the audio format. For more information about specifying an audio format, see
   * **Audio formats (accept types)** in the method description.
   * @param {string} [params.voice] - The voice to use for synthesis. For more information about specifying a voice, see
   * **Important voice updates for IBM Cloud** in the method description. **IBM Cloud:** The Arabic, Chinese, Dutch,
   * Australian English, and Korean languages and voices are supported only for IBM Cloud.
   *
   * **See also:** See also [Using languages and
   * voices](https://cloud.ibm.com/docs/text-to-speech?topic=text-to-speech-voices).
   * @param {string} [params.customizationId] - The customization ID (GUID) of a custom model to use for the synthesis.
   * If a custom model is specified, it works only if it matches the language of the indicated voice. You must make the
   * request with credentials for the instance of the service that owns the custom model. Omit the parameter to use the
   * specified voice with no customization.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<TextToSpeechV1.Response<NodeJS.ReadableStream | Buffer>>}
   */
  public synthesize(
    params: TextToSpeechV1.SynthesizeParams
  ): Promise<TextToSpeechV1.Response<NodeJS.ReadableStream | Buffer>> {
    const _params = { ...params };
    const requiredParams = ['text'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const body = {
      'text': _params.text,
    };

    const query = {
      'voice': _params.voice,
      'customization_id': _params.customizationId,
    };

    const sdkHeaders = getSdkHeaders(
      TextToSpeechV1.DEFAULT_SERVICE_NAME,
      'v1',
      'synthesize'
    );

    const parameters = {
      options: {
        url: '/v1/synthesize',
        method: 'POST',
        body,
        qs: query,
        responseType: 'stream',
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Content-Type': 'application/json',
            'Accept': _params.accept,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }
  /*************************
   * pronunciation
   ************************/

  /**
   * Get pronunciation.
   *
   * Gets the phonetic pronunciation for the specified word. You can request the pronunciation for a specific format.
   * You can also request the pronunciation for a specific voice to see the default translation for the language of that
   * voice or for a specific custom model to see the translation for that model.
   *
   * **See also:** [Querying a word from a
   * language](https://cloud.ibm.com/docs/text-to-speech?topic=text-to-speech-customWords#cuWordsQueryLanguage).
   *
   * ### Important voice updates for IBM Cloud
   *
   *  The service's voices underwent significant change on 2 December 2020.
   * * The Arabic, Chinese, Dutch, Australian English, and Korean voices are now neural instead of concatenative.
   * * The `ar-AR_OmarVoice` voice is deprecated. Use `ar-MS_OmarVoice` voice instead.
   * * The `ar-AR` language identifier cannot be used to create a custom model. Use the `ar-MS` identifier instead.
   * * The standard concatenative voices for the following languages are now deprecated: Brazilian Portuguese, United
   * Kingdom and United States English, French, German, Italian, Japanese, and Spanish (all dialects).
   * * The features expressive SSML, voice transformation SSML, and use of the `volume` attribute of the `<prosody>`
   * element are deprecated and are not supported with any of the service's neural voices.
   * * All of the service's voices are now customizable and generally available (GA) for production use.
   *
   * The deprecated voices and features will continue to function for at least one year but might be removed at a future
   * date. You are encouraged to migrate to the equivalent neural voices at your earliest convenience. For more
   * information about all voice updates, see the [2 December 2020 service
   * update](https://cloud.ibm.com/docs/text-to-speech?topic=text-to-speech-release-notes#December2020) in the release
   * notes for IBM Cloud.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.text - The word for which the pronunciation is requested.
   * @param {string} [params.voice] - A voice that specifies the language in which the pronunciation is to be returned.
   * All voices for the same language (for example, `en-US`) return the same translation. For more information about
   * specifying a voice, see **Important voice updates for IBM Cloud** in the method description. **IBM Cloud:** The
   * Arabic, Chinese, Dutch, Australian English, and Korean languages and voices are supported only for IBM Cloud.
   * @param {string} [params.format] - The phoneme format in which to return the pronunciation. The Arabic, Chinese,
   * Dutch, Australian English, and Korean languages support only IPA. Omit the parameter to obtain the pronunciation in
   * the default format.
   * @param {string} [params.customizationId] - The customization ID (GUID) of a custom model for which the
   * pronunciation is to be returned. The language of a specified custom model must match the language of the specified
   * voice. If the word is not defined in the specified custom model, the service returns the default translation for
   * the custom model's language. You must make the request with credentials for the instance of the service that owns
   * the custom model. Omit the parameter to see the translation for the specified voice with no customization.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<TextToSpeechV1.Response<TextToSpeechV1.Pronunciation>>}
   */
  public getPronunciation(
    params: TextToSpeechV1.GetPronunciationParams
  ): Promise<TextToSpeechV1.Response<TextToSpeechV1.Pronunciation>> {
    const _params = { ...params };
    const requiredParams = ['text'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const query = {
      'text': _params.text,
      'voice': _params.voice,
      'format': _params.format,
      'customization_id': _params.customizationId,
    };

    const sdkHeaders = getSdkHeaders(
      TextToSpeechV1.DEFAULT_SERVICE_NAME,
      'v1',
      'getPronunciation'
    );

    const parameters = {
      options: {
        url: '/v1/pronunciation',
        method: 'GET',
        qs: query,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }
  /*************************
   * customModels
   ************************/

  /**
   * Create a custom model.
   *
   * Creates a new empty custom model. You must specify a name for the new custom model. You can optionally specify the
   * language and a description for the new model. The model is owned by the instance of the service whose credentials
   * are used to create it.
   *
   * **See also:** [Creating a custom
   * model](https://cloud.ibm.com/docs/text-to-speech?topic=text-to-speech-customModels#cuModelsCreate).
   *
   * ### Important voice updates for IBM Cloud
   *
   *  The service's voices underwent significant change on 2 December 2020.
   * * The Arabic, Chinese, Dutch, Australian English, and Korean voices are now neural instead of concatenative.
   * * The `ar-AR_OmarVoice` voice is deprecated. Use `ar-MS_OmarVoice` voice instead.
   * * The `ar-AR` language identifier cannot be used to create a custom model. Use the `ar-MS` identifier instead.
   * * The standard concatenative voices for the following languages are now deprecated: Brazilian Portuguese, United
   * Kingdom and United States English, French, German, Italian, Japanese, and Spanish (all dialects).
   * * The features expressive SSML, voice transformation SSML, and use of the `volume` attribute of the `<prosody>`
   * element are deprecated and are not supported with any of the service's neural voices.
   * * All of the service's voices are now customizable and generally available (GA) for production use.
   *
   * The deprecated voices and features will continue to function for at least one year but might be removed at a future
   * date. You are encouraged to migrate to the equivalent neural voices at your earliest convenience. For more
   * information about all voice updates, see the [2 December 2020 service
   * update](https://cloud.ibm.com/docs/text-to-speech?topic=text-to-speech-release-notes#December2020) in the release
   * notes for IBM Cloud.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.name - The name of the new custom model.
   * @param {string} [params.language] - The language of the new custom model. You create a custom model for a specific
   * language, not for a specific voice. A custom model can be used with any voice for its specified language. Omit the
   * parameter to use the the default language, `en-US`. **Note:** The `ar-AR` language identifier cannot be used to
   * create a custom model. Use the `ar-MS` identifier instead. **IBM Cloud:** The Arabic, Chinese, Dutch, Australian
   * English, and Korean languages and voices are supported only for IBM Cloud.
   * @param {string} [params.description] - A description of the new custom model. Specifying a description is
   * recommended.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<TextToSpeechV1.Response<TextToSpeechV1.CustomModel>>}
   */
  public createCustomModel(
    params: TextToSpeechV1.CreateCustomModelParams
  ): Promise<TextToSpeechV1.Response<TextToSpeechV1.CustomModel>> {
    const _params = { ...params };
    const requiredParams = ['name'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const body = {
      'name': _params.name,
      'language': _params.language,
      'description': _params.description,
    };

    const sdkHeaders = getSdkHeaders(
      TextToSpeechV1.DEFAULT_SERVICE_NAME,
      'v1',
      'createCustomModel'
    );

    const parameters = {
      options: {
        url: '/v1/customizations',
        method: 'POST',
        body,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * List custom models.
   *
   * Lists metadata such as the name and description for all custom models that are owned by an instance of the service.
   * Specify a language to list the custom models for that language only. To see the words and prompts in addition to
   * the metadata for a specific custom model, use the **Get a custom model** method. You must use credentials for the
   * instance of the service that owns a model to list information about it.
   *
   * **See also:** [Querying all custom
   * models](https://cloud.ibm.com/docs/text-to-speech?topic=text-to-speech-customModels#cuModelsQueryAll).
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {string} [params.language] - The language for which custom models that are owned by the requesting
   * credentials are to be returned. Omit the parameter to see all custom models that are owned by the requester.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<TextToSpeechV1.Response<TextToSpeechV1.CustomModels>>}
   */
  public listCustomModels(
    params?: TextToSpeechV1.ListCustomModelsParams
  ): Promise<TextToSpeechV1.Response<TextToSpeechV1.CustomModels>> {
    const _params = { ...params };

    const query = {
      'language': _params.language,
    };

    const sdkHeaders = getSdkHeaders(
      TextToSpeechV1.DEFAULT_SERVICE_NAME,
      'v1',
      'listCustomModels'
    );

    const parameters = {
      options: {
        url: '/v1/customizations',
        method: 'GET',
        qs: query,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Update a custom model.
   *
   * Updates information for the specified custom model. You can update metadata such as the name and description of the
   * model. You can also update the words in the model and their translations. Adding a new translation for a word that
   * already exists in a custom model overwrites the word's existing translation. A custom model can contain no more
   * than 20,000 entries. You must use credentials for the instance of the service that owns a model to update it.
   *
   * You can define sounds-like or phonetic translations for words. A sounds-like translation consists of one or more
   * words that, when combined, sound like the word. Phonetic translations are based on the SSML phoneme format for
   * representing a word. You can specify them in standard International Phonetic Alphabet (IPA) representation
   *
   *   <code>&lt;phoneme alphabet="ipa" ph="t&#601;m&#712;&#593;to"&gt;&lt;/phoneme&gt;</code>
   *
   *   or in the proprietary IBM Symbolic Phonetic Representation (SPR)
   *
   *   <code>&lt;phoneme alphabet="ibm" ph="1gAstroEntxrYFXs"&gt;&lt;/phoneme&gt;</code>
   *
   * **See also:**
   * * [Updating a custom
   * model](https://cloud.ibm.com/docs/text-to-speech?topic=text-to-speech-customModels#cuModelsUpdate)
   * * [Adding words to a Japanese custom
   * model](https://cloud.ibm.com/docs/text-to-speech?topic=text-to-speech-customWords#cuJapaneseAdd)
   * * [Understanding
   * customization](https://cloud.ibm.com/docs/text-to-speech?topic=text-to-speech-customIntro#customIntro).
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.customizationId - The customization ID (GUID) of the custom model. You must make the request
   * with credentials for the instance of the service that owns the custom model.
   * @param {string} [params.name] - A new name for the custom model.
   * @param {string} [params.description] - A new description for the custom model.
   * @param {Word[]} [params.words] - An array of `Word` objects that provides the words and their translations that are
   * to be added or updated for the custom model. Pass an empty array to make no additions or updates.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<TextToSpeechV1.Response<TextToSpeechV1.Empty>>}
   */
  public updateCustomModel(
    params: TextToSpeechV1.UpdateCustomModelParams
  ): Promise<TextToSpeechV1.Response<TextToSpeechV1.Empty>> {
    const _params = { ...params };
    const requiredParams = ['customizationId'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const body = {
      'name': _params.name,
      'description': _params.description,
      'words': _params.words,
    };

    const path = {
      'customization_id': _params.customizationId,
    };

    const sdkHeaders = getSdkHeaders(
      TextToSpeechV1.DEFAULT_SERVICE_NAME,
      'v1',
      'updateCustomModel'
    );

    const parameters = {
      options: {
        url: '/v1/customizations/{customization_id}',
        method: 'POST',
        body,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Get a custom model.
   *
   * Gets all information about a specified custom model. In addition to metadata such as the name and description of
   * the custom model, the output includes the words and their translations that are defined for the model, as well as
   * any prompts that are defined for the model. To see just the metadata for a model, use the **List custom models**
   * method.
   *
   * **See also:** [Querying a custom
   * model](https://cloud.ibm.com/docs/text-to-speech?topic=text-to-speech-customModels#cuModelsQuery).
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.customizationId - The customization ID (GUID) of the custom model. You must make the request
   * with credentials for the instance of the service that owns the custom model.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<TextToSpeechV1.Response<TextToSpeechV1.CustomModel>>}
   */
  public getCustomModel(
    params: TextToSpeechV1.GetCustomModelParams
  ): Promise<TextToSpeechV1.Response<TextToSpeechV1.CustomModel>> {
    const _params = { ...params };
    const requiredParams = ['customizationId'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const path = {
      'customization_id': _params.customizationId,
    };

    const sdkHeaders = getSdkHeaders(
      TextToSpeechV1.DEFAULT_SERVICE_NAME,
      'v1',
      'getCustomModel'
    );

    const parameters = {
      options: {
        url: '/v1/customizations/{customization_id}',
        method: 'GET',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Delete a custom model.
   *
   * Deletes the specified custom model. You must use credentials for the instance of the service that owns a model to
   * delete it.
   *
   * **See also:** [Deleting a custom
   * model](https://cloud.ibm.com/docs/text-to-speech?topic=text-to-speech-customModels#cuModelsDelete).
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.customizationId - The customization ID (GUID) of the custom model. You must make the request
   * with credentials for the instance of the service that owns the custom model.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<TextToSpeechV1.Response<TextToSpeechV1.Empty>>}
   */
  public deleteCustomModel(
    params: TextToSpeechV1.DeleteCustomModelParams
  ): Promise<TextToSpeechV1.Response<TextToSpeechV1.Empty>> {
    const _params = { ...params };
    const requiredParams = ['customizationId'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const path = {
      'customization_id': _params.customizationId,
    };

    const sdkHeaders = getSdkHeaders(
      TextToSpeechV1.DEFAULT_SERVICE_NAME,
      'v1',
      'deleteCustomModel'
    );

    const parameters = {
      options: {
        url: '/v1/customizations/{customization_id}',
        method: 'DELETE',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }
  /*************************
   * customWords
   ************************/

  /**
   * Add custom words.
   *
   * Adds one or more words and their translations to the specified custom model. Adding a new translation for a word
   * that already exists in a custom model overwrites the word's existing translation. A custom model can contain no
   * more than 20,000 entries. You must use credentials for the instance of the service that owns a model to add words
   * to it.
   *
   * You can define sounds-like or phonetic translations for words. A sounds-like translation consists of one or more
   * words that, when combined, sound like the word. Phonetic translations are based on the SSML phoneme format for
   * representing a word. You can specify them in standard International Phonetic Alphabet (IPA) representation
   *
   *   <code>&lt;phoneme alphabet="ipa" ph="t&#601;m&#712;&#593;to"&gt;&lt;/phoneme&gt;</code>
   *
   *   or in the proprietary IBM Symbolic Phonetic Representation (SPR)
   *
   *   <code>&lt;phoneme alphabet="ibm" ph="1gAstroEntxrYFXs"&gt;&lt;/phoneme&gt;</code>
   *
   * **See also:**
   * * [Adding multiple words to a custom
   * model](https://cloud.ibm.com/docs/text-to-speech?topic=text-to-speech-customWords#cuWordsAdd)
   * * [Adding words to a Japanese custom
   * model](https://cloud.ibm.com/docs/text-to-speech?topic=text-to-speech-customWords#cuJapaneseAdd)
   * * [Understanding
   * customization](https://cloud.ibm.com/docs/text-to-speech?topic=text-to-speech-customIntro#customIntro).
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.customizationId - The customization ID (GUID) of the custom model. You must make the request
   * with credentials for the instance of the service that owns the custom model.
   * @param {Word[]} params.words - The **Add custom words** method accepts an array of `Word` objects. Each object
   * provides a word that is to be added or updated for the custom model and the word's translation.
   *
   * The **List custom words** method returns an array of `Word` objects. Each object shows a word and its translation
   * from the custom model. The words are listed in alphabetical order, with uppercase letters listed before lowercase
   * letters. The array is empty if the custom model contains no words.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<TextToSpeechV1.Response<TextToSpeechV1.Empty>>}
   */
  public addWords(
    params: TextToSpeechV1.AddWordsParams
  ): Promise<TextToSpeechV1.Response<TextToSpeechV1.Empty>> {
    const _params = { ...params };
    const requiredParams = ['customizationId', 'words'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const body = {
      'words': _params.words,
    };

    const path = {
      'customization_id': _params.customizationId,
    };

    const sdkHeaders = getSdkHeaders(
      TextToSpeechV1.DEFAULT_SERVICE_NAME,
      'v1',
      'addWords'
    );

    const parameters = {
      options: {
        url: '/v1/customizations/{customization_id}/words',
        method: 'POST',
        body,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * List custom words.
   *
   * Lists all of the words and their translations for the specified custom model. The output shows the translations as
   * they are defined in the model. You must use credentials for the instance of the service that owns a model to list
   * its words.
   *
   * **See also:** [Querying all words from a custom
   * model](https://cloud.ibm.com/docs/text-to-speech?topic=text-to-speech-customWords#cuWordsQueryModel).
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.customizationId - The customization ID (GUID) of the custom model. You must make the request
   * with credentials for the instance of the service that owns the custom model.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<TextToSpeechV1.Response<TextToSpeechV1.Words>>}
   */
  public listWords(
    params: TextToSpeechV1.ListWordsParams
  ): Promise<TextToSpeechV1.Response<TextToSpeechV1.Words>> {
    const _params = { ...params };
    const requiredParams = ['customizationId'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const path = {
      'customization_id': _params.customizationId,
    };

    const sdkHeaders = getSdkHeaders(
      TextToSpeechV1.DEFAULT_SERVICE_NAME,
      'v1',
      'listWords'
    );

    const parameters = {
      options: {
        url: '/v1/customizations/{customization_id}/words',
        method: 'GET',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Add a custom word.
   *
   * Adds a single word and its translation to the specified custom model. Adding a new translation for a word that
   * already exists in a custom model overwrites the word's existing translation. A custom model can contain no more
   * than 20,000 entries. You must use credentials for the instance of the service that owns a model to add a word to
   * it.
   *
   * You can define sounds-like or phonetic translations for words. A sounds-like translation consists of one or more
   * words that, when combined, sound like the word. Phonetic translations are based on the SSML phoneme format for
   * representing a word. You can specify them in standard International Phonetic Alphabet (IPA) representation
   *
   *   <code>&lt;phoneme alphabet="ipa" ph="t&#601;m&#712;&#593;to"&gt;&lt;/phoneme&gt;</code>
   *
   *   or in the proprietary IBM Symbolic Phonetic Representation (SPR)
   *
   *   <code>&lt;phoneme alphabet="ibm" ph="1gAstroEntxrYFXs"&gt;&lt;/phoneme&gt;</code>
   *
   * **See also:**
   * * [Adding a single word to a custom
   * model](https://cloud.ibm.com/docs/text-to-speech?topic=text-to-speech-customWords#cuWordAdd)
   * * [Adding words to a Japanese custom
   * model](https://cloud.ibm.com/docs/text-to-speech?topic=text-to-speech-customWords#cuJapaneseAdd)
   * * [Understanding
   * customization](https://cloud.ibm.com/docs/text-to-speech?topic=text-to-speech-customIntro#customIntro).
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.customizationId - The customization ID (GUID) of the custom model. You must make the request
   * with credentials for the instance of the service that owns the custom model.
   * @param {string} params.word - The word that is to be added or updated for the custom model.
   * @param {string} params.translation - The phonetic or sounds-like translation for the word. A phonetic translation
   * is based on the SSML format for representing the phonetic string of a word either as an IPA translation or as an
   * IBM SPR translation. The Arabic, Chinese, Dutch, Australian English, and Korean languages support only IPA. A
   * sounds-like is one or more words that, when combined, sound like the word.
   * @param {string} [params.partOfSpeech] - **Japanese only.** The part of speech for the word. The service uses the
   * value to produce the correct intonation for the word. You can create only a single entry, with or without a single
   * part of speech, for any word; you cannot create multiple entries with different parts of speech for the same word.
   * For more information, see [Working with Japanese
   * entries](https://cloud.ibm.com/docs/text-to-speech?topic=text-to-speech-rules#jaNotes).
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<TextToSpeechV1.Response<TextToSpeechV1.Empty>>}
   */
  public addWord(
    params: TextToSpeechV1.AddWordParams
  ): Promise<TextToSpeechV1.Response<TextToSpeechV1.Empty>> {
    const _params = { ...params };
    const requiredParams = ['customizationId', 'word', 'translation'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const body = {
      'translation': _params.translation,
      'part_of_speech': _params.partOfSpeech,
    };

    const path = {
      'customization_id': _params.customizationId,
      'word': _params.word,
    };

    const sdkHeaders = getSdkHeaders(
      TextToSpeechV1.DEFAULT_SERVICE_NAME,
      'v1',
      'addWord'
    );

    const parameters = {
      options: {
        url: '/v1/customizations/{customization_id}/words/{word}',
        method: 'PUT',
        body,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Content-Type': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Get a custom word.
   *
   * Gets the translation for a single word from the specified custom model. The output shows the translation as it is
   * defined in the model. You must use credentials for the instance of the service that owns a model to list its words.
   *
   *
   * **See also:** [Querying a single word from a custom
   * model](https://cloud.ibm.com/docs/text-to-speech?topic=text-to-speech-customWords#cuWordQueryModel).
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.customizationId - The customization ID (GUID) of the custom model. You must make the request
   * with credentials for the instance of the service that owns the custom model.
   * @param {string} params.word - The word that is to be queried from the custom model.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<TextToSpeechV1.Response<TextToSpeechV1.Translation>>}
   */
  public getWord(
    params: TextToSpeechV1.GetWordParams
  ): Promise<TextToSpeechV1.Response<TextToSpeechV1.Translation>> {
    const _params = { ...params };
    const requiredParams = ['customizationId', 'word'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const path = {
      'customization_id': _params.customizationId,
      'word': _params.word,
    };

    const sdkHeaders = getSdkHeaders(
      TextToSpeechV1.DEFAULT_SERVICE_NAME,
      'v1',
      'getWord'
    );

    const parameters = {
      options: {
        url: '/v1/customizations/{customization_id}/words/{word}',
        method: 'GET',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Delete a custom word.
   *
   * Deletes a single word from the specified custom model. You must use credentials for the instance of the service
   * that owns a model to delete its words.
   *
   * **See also:** [Deleting a word from a custom
   * model](https://cloud.ibm.com/docs/text-to-speech?topic=text-to-speech-customWords#cuWordDelete).
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.customizationId - The customization ID (GUID) of the custom model. You must make the request
   * with credentials for the instance of the service that owns the custom model.
   * @param {string} params.word - The word that is to be deleted from the custom model.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<TextToSpeechV1.Response<TextToSpeechV1.Empty>>}
   */
  public deleteWord(
    params: TextToSpeechV1.DeleteWordParams
  ): Promise<TextToSpeechV1.Response<TextToSpeechV1.Empty>> {
    const _params = { ...params };
    const requiredParams = ['customizationId', 'word'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const path = {
      'customization_id': _params.customizationId,
      'word': _params.word,
    };

    const sdkHeaders = getSdkHeaders(
      TextToSpeechV1.DEFAULT_SERVICE_NAME,
      'v1',
      'deleteWord'
    );

    const parameters = {
      options: {
        url: '/v1/customizations/{customization_id}/words/{word}',
        method: 'DELETE',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }
  /*************************
   * customPrompts
   ************************/

  /**
   * List custom prompts.
   *
   * Lists information about all custom prompts that are defined for a custom model. The information includes the prompt
   * ID, prompt text, status, and optional speaker ID for each prompt of the custom model. You must use credentials for
   * the instance of the service that owns the custom model. The same information about all of the prompts for a custom
   * model is also provided by the **Get a custom model** method. That method provides complete details about a
   * specified custom model, including its language, owner, custom words, and more. Custom prompts are supported only
   * for use with US English custom models and voices.
   *
   * **See also:** [Listing custom
   * prompts](https://cloud.ibm.com/docs/text-to-speech?topic=text-to-speech-tbe-custom-prompts#tbe-custom-prompts-list).
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.customizationId - The customization ID (GUID) of the custom model. You must make the request
   * with credentials for the instance of the service that owns the custom model.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<TextToSpeechV1.Response<TextToSpeechV1.Prompts>>}
   */
  public listCustomPrompts(
    params: TextToSpeechV1.ListCustomPromptsParams
  ): Promise<TextToSpeechV1.Response<TextToSpeechV1.Prompts>> {
    const _params = { ...params };
    const requiredParams = ['customizationId'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const path = {
      'customization_id': _params.customizationId,
    };

    const sdkHeaders = getSdkHeaders(
      TextToSpeechV1.DEFAULT_SERVICE_NAME,
      'v1',
      'listCustomPrompts'
    );

    const parameters = {
      options: {
        url: '/v1/customizations/{customization_id}/prompts',
        method: 'GET',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Add a custom prompt.
   *
   * Adds a custom prompt to a custom model. A prompt is defined by the text that is to be spoken, the audio for that
   * text, a unique user-specified ID for the prompt, and an optional speaker ID. The information is used to generate
   * prosodic data that is not visible to the user. This data is used by the service to produce the synthesized audio
   * upon request. You must use credentials for the instance of the service that owns a custom model to add a prompt to
   * it. You can add a maximum of 1000 custom prompts to a single custom model.
   *
   * You are recommended to assign meaningful values for prompt IDs. For example, use `goodbye` to identify a prompt
   * that speaks a farewell message. Prompt IDs must be unique within a given custom model. You cannot define two
   * prompts with the same name for the same custom model. If you provide the ID of an existing prompt, the previously
   * uploaded prompt is replaced by the new information. The existing prompt is reprocessed by using the new text and
   * audio and, if provided, new speaker model, and the prosody data associated with the prompt is updated.
   *
   * The quality of a prompt is undefined if the language of a prompt does not match the language of its custom model.
   * This is consistent with any text or SSML that is specified for a speech synthesis request. The service makes a
   * best-effort attempt to render the specified text for the prompt; it does not validate that the language of the text
   * matches the language of the model.
   *
   * Adding a prompt is an asynchronous operation. Although it accepts less audio than speaker enrollment, the service
   * must align the audio with the provided text. The time that it takes to process a prompt depends on the prompt
   * itself. The processing time for a reasonably sized prompt generally matches the length of the audio (for example,
   * it takes 20 seconds to process a 20-second prompt).
   *
   * For shorter prompts, you can wait for a reasonable amount of time and then check the status of the prompt with the
   * **Get a custom prompt** method. For longer prompts, consider using that method to poll the service every few
   * seconds to determine when the prompt becomes available. No prompt can be used for speech synthesis if it is in the
   * `processing` or `failed` state. Only prompts that are in the `available` state can be used for speech synthesis.
   *
   * When it processes a request, the service attempts to align the text and the audio that are provided for the prompt.
   * The text that is passed with a prompt must match the spoken audio as closely as possible. Optimally, the text and
   * audio match exactly. The service does its best to align the specified text with the audio, and it can often
   * compensate for mismatches between the two. But if the service cannot effectively align the text and the audio,
   * possibly because the magnitude of mismatches between the two is too great, processing of the prompt fails.
   *
   * ### Evaluating a prompt
   *
   *  Always listen to and evaluate a prompt to determine its quality before using it in production. To evaluate a
   * prompt, include only the single prompt in a speech synthesis request by using the following SSML extension, in this
   * case for a prompt whose ID is `goodbye`:
   *
   * `<ibm:prompt id="goodbye"/>`
   *
   * In some cases, you might need to rerecord and resubmit a prompt as many as five times to address the following
   * possible problems:
   * * The service might fail to detect a mismatch between the prompt’s text and audio. The longer the prompt, the
   * greater the chance for misalignment between its text and audio. Therefore, multiple shorter prompts are preferable
   * to a single long prompt.
   * * The text of a prompt might include a word that the service does not recognize. In this case, you can create a
   * custom word and pronunciation pair to tell the service how to pronounce the word. You must then re-create the
   * prompt.
   * * The quality of the input audio might be insufficient or the service’s processing of the audio might fail to
   * detect the intended prosody. Submitting new audio for the prompt can correct these issues.
   *
   * If a prompt that is created without a speaker ID does not adequately reflect the intended prosody, enrolling the
   * speaker and providing a speaker ID for the prompt is one recommended means of potentially improving the quality of
   * the prompt. This is especially important for shorter prompts such as "good-bye" or "thank you," where less audio
   * data makes it more difficult to match the prosody of the speaker. Custom prompts are supported only for use with US
   * English custom models and voices.
   *
   * **See also:**
   * * [Add a custom
   * prompt](https://cloud.ibm.com/docs/text-to-speech?topic=text-to-speech-tbe-create#tbe-create-add-prompt)
   * * [Evaluate a custom
   * prompt](https://cloud.ibm.com/docs/text-to-speech?topic=text-to-speech-tbe-create#tbe-create-evaluate-prompt)
   * * [Rules for creating custom
   * prompts](https://cloud.ibm.com/docs/text-to-speech?topic=text-to-speech-tbe-rules#tbe-rules-prompts).
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.customizationId - The customization ID (GUID) of the custom model. You must make the request
   * with credentials for the instance of the service that owns the custom model.
   * @param {string} params.promptId - The identifier of the prompt that is to be added to the custom model:
   * * Include a maximum of 49 characters in the ID.
   * * Include only alphanumeric characters and `_` (underscores) in the ID.
   * * Do not include XML sensitive characters (double quotes, single quotes, ampersands, angle brackets, and slashes)
   * in the ID.
   * * To add a new prompt, the ID must be unique for the specified custom model. Otherwise, the new information for the
   * prompt overwrites the existing prompt that has that ID.
   * @param {PromptMetadata} params.metadata - Information about the prompt that is to be added to a custom model. The
   * following example of a `PromptMetadata` object includes both the required prompt text and an optional speaker model
   * ID:
   *
   * `{ "prompt_text": "Thank you and good-bye!", "speaker_id": "823068b2-ed4e-11ea-b6e0-7b6456aa95cc" }`.
   * @param {NodeJS.ReadableStream | Buffer} params.file - An audio file that speaks the text of the prompt with
   * intonation and prosody that matches how you would like the prompt to be spoken.
   * * The prompt audio must be in WAV format and must have a minimum sampling rate of 16 kHz. The service accepts audio
   * with higher sampling rates. The service transcodes all audio to 16 kHz before processing it.
   * * The length of the prompt audio is limited to 30 seconds.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<TextToSpeechV1.Response<TextToSpeechV1.Prompt>>}
   */
  public addCustomPrompt(
    params: TextToSpeechV1.AddCustomPromptParams
  ): Promise<TextToSpeechV1.Response<TextToSpeechV1.Prompt>> {
    const _params = { ...params };
    const requiredParams = ['customizationId', 'promptId', 'metadata', 'file'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const formData = {
      'metadata': _params.metadata,
      'file': {
        data: _params.file,
        contentType: 'audio/wav',
      },
    };

    const path = {
      'customization_id': _params.customizationId,
      'prompt_id': _params.promptId,
    };

    const sdkHeaders = getSdkHeaders(
      TextToSpeechV1.DEFAULT_SERVICE_NAME,
      'v1',
      'addCustomPrompt'
    );

    const parameters = {
      options: {
        url: '/v1/customizations/{customization_id}/prompts/{prompt_id}',
        method: 'POST',
        path,
        formData
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Get a custom prompt.
   *
   * Gets information about a specified custom prompt for a specified custom model. The information includes the prompt
   * ID, prompt text, status, and optional speaker ID for each prompt of the custom model. You must use credentials for
   * the instance of the service that owns the custom model. Custom prompts are supported only for use with US English
   * custom models and voices.
   *
   * **See also:** [Listing custom
   * prompts](https://cloud.ibm.com/docs/text-to-speech?topic=text-to-speech-tbe-custom-prompts#tbe-custom-prompts-list).
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.customizationId - The customization ID (GUID) of the custom model. You must make the request
   * with credentials for the instance of the service that owns the custom model.
   * @param {string} params.promptId - The identifier (name) of the prompt.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<TextToSpeechV1.Response<TextToSpeechV1.Prompt>>}
   */
  public getCustomPrompt(
    params: TextToSpeechV1.GetCustomPromptParams
  ): Promise<TextToSpeechV1.Response<TextToSpeechV1.Prompt>> {
    const _params = { ...params };
    const requiredParams = ['customizationId', 'promptId'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const path = {
      'customization_id': _params.customizationId,
      'prompt_id': _params.promptId,
    };

    const sdkHeaders = getSdkHeaders(
      TextToSpeechV1.DEFAULT_SERVICE_NAME,
      'v1',
      'getCustomPrompt'
    );

    const parameters = {
      options: {
        url: '/v1/customizations/{customization_id}/prompts/{prompt_id}',
        method: 'GET',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Delete a custom prompt.
   *
   * Deletes an existing custom prompt from a custom model. The service deletes the prompt with the specified ID. You
   * must use credentials for the instance of the service that owns the custom model from which the prompt is to be
   * deleted.
   *
   * **Caution:** Deleting a custom prompt elicits a 400 response code from synthesis requests that attempt to use the
   * prompt. Make sure that you do not attempt to use a deleted prompt in a production application. Custom prompts are
   * supported only for use with US English custom models and voices.
   *
   * **See also:** [Deleting a custom
   * prompt](https://cloud.ibm.com/docs/text-to-speech?topic=text-to-speech-tbe-custom-prompts#tbe-custom-prompts-delete).
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.customizationId - The customization ID (GUID) of the custom model. You must make the request
   * with credentials for the instance of the service that owns the custom model.
   * @param {string} params.promptId - The identifier (name) of the prompt that is to be deleted.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<TextToSpeechV1.Response<TextToSpeechV1.Empty>>}
   */
  public deleteCustomPrompt(
    params: TextToSpeechV1.DeleteCustomPromptParams
  ): Promise<TextToSpeechV1.Response<TextToSpeechV1.Empty>> {
    const _params = { ...params };
    const requiredParams = ['customizationId', 'promptId'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const path = {
      'customization_id': _params.customizationId,
      'prompt_id': _params.promptId,
    };

    const sdkHeaders = getSdkHeaders(
      TextToSpeechV1.DEFAULT_SERVICE_NAME,
      'v1',
      'deleteCustomPrompt'
    );

    const parameters = {
      options: {
        url: '/v1/customizations/{customization_id}/prompts/{prompt_id}',
        method: 'DELETE',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }
  /*************************
   * speakerModels
   ************************/

  /**
   * List speaker models.
   *
   * Lists information about all speaker models that are defined for a service instance. The information includes the
   * speaker ID and speaker name of each defined speaker. You must use credentials for the instance of a service to list
   * its speakers. Speaker models and the custom prompts with which they are used are supported only for use with US
   * English custom models and voices.
   *
   * **See also:** [Listing speaker
   * models](https://cloud.ibm.com/docs/text-to-speech?topic=text-to-speech-tbe-speaker-models#tbe-speaker-models-list).
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<TextToSpeechV1.Response<TextToSpeechV1.Speakers>>}
   */
  public listSpeakerModels(
    params?: TextToSpeechV1.ListSpeakerModelsParams
  ): Promise<TextToSpeechV1.Response<TextToSpeechV1.Speakers>> {
    const _params = { ...params };

    const sdkHeaders = getSdkHeaders(
      TextToSpeechV1.DEFAULT_SERVICE_NAME,
      'v1',
      'listSpeakerModels'
    );

    const parameters = {
      options: {
        url: '/v1/speakers',
        method: 'GET',
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Create a speaker model.
   *
   * Creates a new speaker model, which is an optional enrollment token for users who are to add prompts to custom
   * models. A speaker model contains information about a user's voice. The service extracts this information from a WAV
   * audio sample that you pass as the body of the request. Associating a speaker model with a prompt is optional, but
   * the information that is extracted from the speaker model helps the service learn about the speaker's voice.
   *
   * A speaker model can make an appreciable difference in the quality of prompts, especially short prompts with
   * relatively little audio, that are associated with that speaker. A speaker model can help the service produce a
   * prompt with more confidence; the lack of a speaker model can potentially compromise the quality of a prompt.
   *
   * The gender of the speaker who creates a speaker model does not need to match the gender of a voice that is used
   * with prompts that are associated with that speaker model. For example, a speaker model that is created by a male
   * speaker can be associated with prompts that are spoken by female voices.
   *
   * You create a speaker model for a given instance of the service. The new speaker model is owned by the service
   * instance whose credentials are used to create it. That same speaker can then be used to create prompts for all
   * custom models within that service instance. No language is associated with a speaker model, but each custom model
   * has a single specified language. You can add prompts only to US English models.
   *
   * You specify a name for the speaker when you create it. The name must be unique among all speaker names for the
   * owning service instance. To re-create a speaker model for an existing speaker name, you must first delete the
   * existing speaker model that has that name.
   *
   * Speaker enrollment is a synchronous operation. Although it accepts more audio data than a prompt, the process of
   * adding a speaker is very fast. The service simply extracts information about the speaker’s voice from the audio.
   * Unlike prompts, speaker models neither need nor accept a transcription of the audio. When the call returns, the
   * audio is fully processed and the speaker enrollment is complete.
   *
   * The service returns a speaker ID with the request. A speaker ID is globally unique identifier (GUID) that you use
   * to identify the speaker in subsequent requests to the service. Speaker models and the custom prompts with which
   * they are used are supported only for use with US English custom models and voices.
   *
   * **See also:**
   * * [Create a speaker
   * model](https://cloud.ibm.com/docs/text-to-speech?topic=text-to-speech-tbe-create#tbe-create-speaker-model)
   * * [Rules for creating speaker
   * models](https://cloud.ibm.com/docs/text-to-speech?topic=text-to-speech-tbe-rules#tbe-rules-speakers).
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.speakerName - The name of the speaker that is to be added to the service instance.
   * * Include a maximum of 49 characters in the name.
   * * Include only alphanumeric characters and `_` (underscores) in the name.
   * * Do not include XML sensitive characters (double quotes, single quotes, ampersands, angle brackets, and slashes)
   * in the name.
   * * Do not use the name of an existing speaker that is already defined for the service instance.
   * @param {NodeJS.ReadableStream | Buffer} params.audio - An enrollment audio file that contains a sample of the
   * speaker’s voice.
   * * The enrollment audio must be in WAV format and must have a minimum sampling rate of 16 kHz. The service accepts
   * audio with higher sampling rates. It transcodes all audio to 16 kHz before processing it.
   * * The length of the enrollment audio is limited to 1 minute. Speaking one or two paragraphs of text that include
   * five to ten sentences is recommended.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<TextToSpeechV1.Response<TextToSpeechV1.SpeakerModel>>}
   */
  public createSpeakerModel(
    params: TextToSpeechV1.CreateSpeakerModelParams
  ): Promise<TextToSpeechV1.Response<TextToSpeechV1.SpeakerModel>> {
    const _params = { ...params };
    const requiredParams = ['speakerName', 'audio'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const body = _params.audio;
    const query = {
      'speaker_name': _params.speakerName,
    };

    const sdkHeaders = getSdkHeaders(
      TextToSpeechV1.DEFAULT_SERVICE_NAME,
      'v1',
      'createSpeakerModel'
    );

    const parameters = {
      options: {
        url: '/v1/speakers',
        method: 'POST',
        body,
        qs: query,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'Content-Type': 'audio/wav',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Get a speaker model.
   *
   * Gets information about all prompts that are defined by a specified speaker for all custom models that are owned by
   * a service instance. The information is grouped by the customization IDs of the custom models. For each custom
   * model, the information lists information about each prompt that is defined for that custom model by the speaker.
   * You must use credentials for the instance of the service that owns a speaker model to list its prompts. Speaker
   * models and the custom prompts with which they are used are supported only for use with US English custom models and
   * voices.
   *
   * **See also:** [Listing the custom prompts for a speaker
   * model](https://cloud.ibm.com/docs/text-to-speech?topic=text-to-speech-tbe-speaker-models#tbe-speaker-models-list-prompts).
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.speakerId - The speaker ID (GUID) of the speaker model. You must make the request with
   * service credentials for the instance of the service that owns the speaker model.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<TextToSpeechV1.Response<TextToSpeechV1.SpeakerCustomModels>>}
   */
  public getSpeakerModel(
    params: TextToSpeechV1.GetSpeakerModelParams
  ): Promise<TextToSpeechV1.Response<TextToSpeechV1.SpeakerCustomModels>> {
    const _params = { ...params };
    const requiredParams = ['speakerId'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const path = {
      'speaker_id': _params.speakerId,
    };

    const sdkHeaders = getSdkHeaders(
      TextToSpeechV1.DEFAULT_SERVICE_NAME,
      'v1',
      'getSpeakerModel'
    );

    const parameters = {
      options: {
        url: '/v1/speakers/{speaker_id}',
        method: 'GET',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Delete a speaker model.
   *
   * Deletes an existing speaker model from the service instance. The service deletes the enrolled speaker with the
   * specified speaker ID. You must use credentials for the instance of the service that owns a speaker model to delete
   * the speaker.
   *
   * Any prompts that are associated with the deleted speaker are not affected by the speaker's deletion. The prosodic
   * data that defines the quality of a prompt is established when the prompt is created. A prompt is static and remains
   * unaffected by deletion of its associated speaker. However, the prompt cannot be resubmitted or updated with its
   * original speaker once that speaker is deleted. Speaker models and the custom prompts with which they are used are
   * supported only for use with US English custom models and voices.
   *
   * **See also:** [Deleting a speaker
   * model](https://cloud.ibm.com/docs/text-to-speech?topic=text-to-speech-tbe-speaker-models#tbe-speaker-models-delete).
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.speakerId - The speaker ID (GUID) of the speaker model. You must make the request with
   * service credentials for the instance of the service that owns the speaker model.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<TextToSpeechV1.Response<TextToSpeechV1.Empty>>}
   */
  public deleteSpeakerModel(
    params: TextToSpeechV1.DeleteSpeakerModelParams
  ): Promise<TextToSpeechV1.Response<TextToSpeechV1.Empty>> {
    const _params = { ...params };
    const requiredParams = ['speakerId'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const path = {
      'speaker_id': _params.speakerId,
    };

    const sdkHeaders = getSdkHeaders(
      TextToSpeechV1.DEFAULT_SERVICE_NAME,
      'v1',
      'deleteSpeakerModel'
    );

    const parameters = {
      options: {
        url: '/v1/speakers/{speaker_id}',
        method: 'DELETE',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }
  /*************************
   * userData
   ************************/

  /**
   * Delete labeled data.
   *
   * Deletes all data that is associated with a specified customer ID. The method deletes all data for the customer ID,
   * regardless of the method by which the information was added. The method has no effect if no data is associated with
   * the customer ID. You must issue the request with credentials for the same instance of the service that was used to
   * associate the customer ID with the data. You associate a customer ID with data by passing the `X-Watson-Metadata`
   * header with a request that passes the data.
   *
   * **Note:** If you delete an instance of the service from the service console, all data associated with that service
   * instance is automatically deleted. This includes all custom models and word/translation pairs, and all data related
   * to speech synthesis requests.
   *
   * **See also:** [Information
   * security](https://cloud.ibm.com/docs/text-to-speech?topic=text-to-speech-information-security#information-security).
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.customerId - The customer ID for which all data is to be deleted.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<TextToSpeechV1.Response<TextToSpeechV1.Empty>>}
   */
  public deleteUserData(
    params: TextToSpeechV1.DeleteUserDataParams
  ): Promise<TextToSpeechV1.Response<TextToSpeechV1.Empty>> {
    const _params = { ...params };
    const requiredParams = ['customerId'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const query = {
      'customer_id': _params.customerId,
    };

    const sdkHeaders = getSdkHeaders(
      TextToSpeechV1.DEFAULT_SERVICE_NAME,
      'v1',
      'deleteUserData'
    );

    const parameters = {
      options: {
        url: '/v1/user_data',
        method: 'DELETE',
        qs: query,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }
}

/*************************
 * interfaces
 ************************/

namespace TextToSpeechV1 {
  /** An operation response. */
  export interface Response<T = any> {
    result: T;
    status: number;
    statusText: string;
    headers: IncomingHttpHeaders;
  }

  /** The callback for a service request. */
  export type Callback<T> = (error: any, response?: Response<T>) => void;

  /** The body of a service request that returns no response data. */
  export interface Empty {}

  /** A standard JS object, defined to avoid the limitations of `Object` and `object` */
  export interface JsonObject {
    [key: string]: any;
  }

  /*************************
   * request interfaces
   ************************/

  /** Parameters for the `listVoices` operation. */
  export interface ListVoicesParams {
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getVoice` operation. */
  export interface GetVoiceParams {
    /** The voice for which information is to be returned. For more information about specifying a voice, see
     *  **Important voice updates for IBM Cloud** in the method description. **IBM Cloud:** The Arabic, Chinese, Dutch,
     *  Australian English, and Korean languages and voices are supported only for IBM Cloud.
     */
    voice: GetVoiceConstants.Voice | string;
    /** The customization ID (GUID) of a custom model for which information is to be returned. You must make the
     *  request with credentials for the instance of the service that owns the custom model. Omit the parameter to see
     *  information about the specified voice with no customization.
     */
    customizationId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `getVoice` operation. */
  export namespace GetVoiceConstants {
    /** The voice for which information is to be returned. For more information about specifying a voice, see **Important voice updates for IBM Cloud** in the method description. **IBM Cloud:** The Arabic, Chinese, Dutch, Australian English, and Korean languages and voices are supported only for IBM Cloud. */
    export enum Voice {
      AR_AR_OMARVOICE = 'ar-AR_OmarVoice',
      AR_MS_OMARVOICE = 'ar-MS_OmarVoice',
      DE_DE_BIRGITVOICE = 'de-DE_BirgitVoice',
      DE_DE_BIRGITV3VOICE = 'de-DE_BirgitV3Voice',
      DE_DE_DIETERVOICE = 'de-DE_DieterVoice',
      DE_DE_DIETERV3VOICE = 'de-DE_DieterV3Voice',
      DE_DE_ERIKAV3VOICE = 'de-DE_ErikaV3Voice',
      EN_AU_CRAIGVOICE = 'en-AU-CraigVoice',
      EN_AU_MADISONVOICE = 'en-AU-MadisonVoice',
      EN_GB_CHARLOTTEV3VOICE = 'en-GB_CharlotteV3Voice',
      EN_GB_JAMESV3VOICE = 'en-GB_JamesV3Voice',
      EN_GB_KATEVOICE = 'en-GB_KateVoice',
      EN_GB_KATEV3VOICE = 'en-GB_KateV3Voice',
      EN_US_ALLISONVOICE = 'en-US_AllisonVoice',
      EN_US_ALLISONV3VOICE = 'en-US_AllisonV3Voice',
      EN_US_EMILYV3VOICE = 'en-US_EmilyV3Voice',
      EN_US_HENRYV3VOICE = 'en-US_HenryV3Voice',
      EN_US_KEVINV3VOICE = 'en-US_KevinV3Voice',
      EN_US_LISAVOICE = 'en-US_LisaVoice',
      EN_US_LISAV3VOICE = 'en-US_LisaV3Voice',
      EN_US_MICHAELVOICE = 'en-US_MichaelVoice',
      EN_US_MICHAELV3VOICE = 'en-US_MichaelV3Voice',
      EN_US_OLIVIAV3VOICE = 'en-US_OliviaV3Voice',
      ES_ES_ENRIQUEVOICE = 'es-ES_EnriqueVoice',
      ES_ES_ENRIQUEV3VOICE = 'es-ES_EnriqueV3Voice',
      ES_ES_LAURAVOICE = 'es-ES_LauraVoice',
      ES_ES_LAURAV3VOICE = 'es-ES_LauraV3Voice',
      ES_LA_SOFIAVOICE = 'es-LA_SofiaVoice',
      ES_LA_SOFIAV3VOICE = 'es-LA_SofiaV3Voice',
      ES_US_SOFIAVOICE = 'es-US_SofiaVoice',
      ES_US_SOFIAV3VOICE = 'es-US_SofiaV3Voice',
      FR_CA_LOUISEV3VOICE = 'fr-CA_LouiseV3Voice',
      FR_FR_NICOLASV3VOICE = 'fr-FR_NicolasV3Voice',
      FR_FR_RENEEVOICE = 'fr-FR_ReneeVoice',
      FR_FR_RENEEV3VOICE = 'fr-FR_ReneeV3Voice',
      IT_IT_FRANCESCAVOICE = 'it-IT_FrancescaVoice',
      IT_IT_FRANCESCAV3VOICE = 'it-IT_FrancescaV3Voice',
      JA_JP_EMIVOICE = 'ja-JP_EmiVoice',
      JA_JP_EMIV3VOICE = 'ja-JP_EmiV3Voice',
      KO_KR_HYUNJUNVOICE = 'ko-KR_HyunjunVoice',
      KO_KR_SIWOOVOICE = 'ko-KR_SiWooVoice',
      KO_KR_YOUNGMIVOICE = 'ko-KR_YoungmiVoice',
      KO_KR_YUNAVOICE = 'ko-KR_YunaVoice',
      NL_BE_ADELEVOICE = 'nl-BE_AdeleVoice',
      NL_NL_EMMAVOICE = 'nl-NL_EmmaVoice',
      NL_NL_LIAMVOICE = 'nl-NL_LiamVoice',
      PT_BR_ISABELAVOICE = 'pt-BR_IsabelaVoice',
      PT_BR_ISABELAV3VOICE = 'pt-BR_IsabelaV3Voice',
      ZH_CN_LINAVOICE = 'zh-CN_LiNaVoice',
      ZH_CN_WANGWEIVOICE = 'zh-CN_WangWeiVoice',
      ZH_CN_ZHANGJINGVOICE = 'zh-CN_ZhangJingVoice',
    }
  }

  /** Parameters for the `synthesize` operation. */
  export interface SynthesizeParams {
    /** The text to synthesize. */
    text: string;
    /** The requested format (MIME type) of the audio. You can use the `Accept` header or the `accept` parameter to
     *  specify the audio format. For more information about specifying an audio format, see **Audio formats (accept
     *  types)** in the method description.
     */
    accept?: SynthesizeConstants.Accept | string;
    /** The voice to use for synthesis. For more information about specifying a voice, see **Important voice updates
     *  for IBM Cloud** in the method description. **IBM Cloud:** The Arabic, Chinese, Dutch, Australian English, and
     *  Korean languages and voices are supported only for IBM Cloud.
     *
     *  **See also:** See also [Using languages and
     *  voices](https://cloud.ibm.com/docs/text-to-speech?topic=text-to-speech-voices).
     */
    voice?: SynthesizeConstants.Voice | string;
    /** The customization ID (GUID) of a custom model to use for the synthesis. If a custom model is specified, it
     *  works only if it matches the language of the indicated voice. You must make the request with credentials for the
     *  instance of the service that owns the custom model. Omit the parameter to use the specified voice with no
     *  customization.
     */
    customizationId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `synthesize` operation. */
  export namespace SynthesizeConstants {
    /** The requested format (MIME type) of the audio. You can use the `Accept` header or the `accept` parameter to specify the audio format. For more information about specifying an audio format, see **Audio formats (accept types)** in the method description. */
    export enum Accept {
      AUDIO_BASIC = 'audio/basic',
      AUDIO_FLAC = 'audio/flac',
      AUDIO_L16 = 'audio/l16',
      AUDIO_OGG = 'audio/ogg',
      AUDIO_OGG_CODECS_OPUS = 'audio/ogg;codecs=opus',
      AUDIO_OGG_CODECS_VORBIS = 'audio/ogg;codecs=vorbis',
      AUDIO_MP3 = 'audio/mp3',
      AUDIO_MPEG = 'audio/mpeg',
      AUDIO_MULAW = 'audio/mulaw',
      AUDIO_WAV = 'audio/wav',
      AUDIO_WEBM = 'audio/webm',
      AUDIO_WEBM_CODECS_OPUS = 'audio/webm;codecs=opus',
      AUDIO_WEBM_CODECS_VORBIS = 'audio/webm;codecs=vorbis',
    }
    /** The voice to use for synthesis. For more information about specifying a voice, see **Important voice updates for IBM Cloud** in the method description. **IBM Cloud:** The Arabic, Chinese, Dutch, Australian English, and Korean languages and voices are supported only for IBM Cloud. **See also:** See also [Using languages and voices](https://cloud.ibm.com/docs/text-to-speech?topic=text-to-speech-voices). */
    export enum Voice {
      AR_AR_OMARVOICE = 'ar-AR_OmarVoice',
      AR_MS_OMARVOICE = 'ar-MS_OmarVoice',
      DE_DE_BIRGITVOICE = 'de-DE_BirgitVoice',
      DE_DE_BIRGITV3VOICE = 'de-DE_BirgitV3Voice',
      DE_DE_DIETERVOICE = 'de-DE_DieterVoice',
      DE_DE_DIETERV3VOICE = 'de-DE_DieterV3Voice',
      DE_DE_ERIKAV3VOICE = 'de-DE_ErikaV3Voice',
      EN_AU_CRAIGVOICE = 'en-AU-CraigVoice',
      EN_AU_MADISONVOICE = 'en-AU-MadisonVoice',
      EN_GB_CHARLOTTEV3VOICE = 'en-GB_CharlotteV3Voice',
      EN_GB_JAMESV3VOICE = 'en-GB_JamesV3Voice',
      EN_GB_KATEVOICE = 'en-GB_KateVoice',
      EN_GB_KATEV3VOICE = 'en-GB_KateV3Voice',
      EN_US_ALLISONVOICE = 'en-US_AllisonVoice',
      EN_US_ALLISONV3VOICE = 'en-US_AllisonV3Voice',
      EN_US_EMILYV3VOICE = 'en-US_EmilyV3Voice',
      EN_US_HENRYV3VOICE = 'en-US_HenryV3Voice',
      EN_US_KEVINV3VOICE = 'en-US_KevinV3Voice',
      EN_US_LISAVOICE = 'en-US_LisaVoice',
      EN_US_LISAV3VOICE = 'en-US_LisaV3Voice',
      EN_US_MICHAELVOICE = 'en-US_MichaelVoice',
      EN_US_MICHAELV3VOICE = 'en-US_MichaelV3Voice',
      EN_US_OLIVIAV3VOICE = 'en-US_OliviaV3Voice',
      ES_ES_ENRIQUEVOICE = 'es-ES_EnriqueVoice',
      ES_ES_ENRIQUEV3VOICE = 'es-ES_EnriqueV3Voice',
      ES_ES_LAURAVOICE = 'es-ES_LauraVoice',
      ES_ES_LAURAV3VOICE = 'es-ES_LauraV3Voice',
      ES_LA_SOFIAVOICE = 'es-LA_SofiaVoice',
      ES_LA_SOFIAV3VOICE = 'es-LA_SofiaV3Voice',
      ES_US_SOFIAVOICE = 'es-US_SofiaVoice',
      ES_US_SOFIAV3VOICE = 'es-US_SofiaV3Voice',
      FR_CA_LOUISEV3VOICE = 'fr-CA_LouiseV3Voice',
      FR_FR_NICOLASV3VOICE = 'fr-FR_NicolasV3Voice',
      FR_FR_RENEEVOICE = 'fr-FR_ReneeVoice',
      FR_FR_RENEEV3VOICE = 'fr-FR_ReneeV3Voice',
      IT_IT_FRANCESCAVOICE = 'it-IT_FrancescaVoice',
      IT_IT_FRANCESCAV3VOICE = 'it-IT_FrancescaV3Voice',
      JA_JP_EMIVOICE = 'ja-JP_EmiVoice',
      JA_JP_EMIV3VOICE = 'ja-JP_EmiV3Voice',
      KO_KR_HYUNJUNVOICE = 'ko-KR_HyunjunVoice',
      KO_KR_SIWOOVOICE = 'ko-KR_SiWooVoice',
      KO_KR_YOUNGMIVOICE = 'ko-KR_YoungmiVoice',
      KO_KR_YUNAVOICE = 'ko-KR_YunaVoice',
      NL_BE_ADELEVOICE = 'nl-BE_AdeleVoice',
      NL_NL_EMMAVOICE = 'nl-NL_EmmaVoice',
      NL_NL_LIAMVOICE = 'nl-NL_LiamVoice',
      PT_BR_ISABELAVOICE = 'pt-BR_IsabelaVoice',
      PT_BR_ISABELAV3VOICE = 'pt-BR_IsabelaV3Voice',
      ZH_CN_LINAVOICE = 'zh-CN_LiNaVoice',
      ZH_CN_WANGWEIVOICE = 'zh-CN_WangWeiVoice',
      ZH_CN_ZHANGJINGVOICE = 'zh-CN_ZhangJingVoice',
    }
  }

  /** Parameters for the `getPronunciation` operation. */
  export interface GetPronunciationParams {
    /** The word for which the pronunciation is requested. */
    text: string;
    /** A voice that specifies the language in which the pronunciation is to be returned. All voices for the same
     *  language (for example, `en-US`) return the same translation. For more information about specifying a voice, see
     *  **Important voice updates for IBM Cloud** in the method description. **IBM Cloud:** The Arabic, Chinese, Dutch,
     *  Australian English, and Korean languages and voices are supported only for IBM Cloud.
     */
    voice?: GetPronunciationConstants.Voice | string;
    /** The phoneme format in which to return the pronunciation. The Arabic, Chinese, Dutch, Australian English, and
     *  Korean languages support only IPA. Omit the parameter to obtain the pronunciation in the default format.
     */
    format?: GetPronunciationConstants.Format | string;
    /** The customization ID (GUID) of a custom model for which the pronunciation is to be returned. The language of
     *  a specified custom model must match the language of the specified voice. If the word is not defined in the
     *  specified custom model, the service returns the default translation for the custom model's language. You must
     *  make the request with credentials for the instance of the service that owns the custom model. Omit the parameter
     *  to see the translation for the specified voice with no customization.
     */
    customizationId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `getPronunciation` operation. */
  export namespace GetPronunciationConstants {
    /** A voice that specifies the language in which the pronunciation is to be returned. All voices for the same language (for example, `en-US`) return the same translation. For more information about specifying a voice, see **Important voice updates for IBM Cloud** in the method description. **IBM Cloud:** The Arabic, Chinese, Dutch, Australian English, and Korean languages and voices are supported only for IBM Cloud. */
    export enum Voice {
      AR_AR_OMARVOICE = 'ar-AR_OmarVoice',
      AR_MS_OMARVOICE = 'ar-MS_OmarVoice',
      DE_DE_BIRGITVOICE = 'de-DE_BirgitVoice',
      DE_DE_BIRGITV3VOICE = 'de-DE_BirgitV3Voice',
      DE_DE_DIETERVOICE = 'de-DE_DieterVoice',
      DE_DE_DIETERV3VOICE = 'de-DE_DieterV3Voice',
      DE_DE_ERIKAV3VOICE = 'de-DE_ErikaV3Voice',
      EN_AU_CRAIGVOICE = 'en-AU-CraigVoice',
      EN_AU_MADISONVOICE = 'en-AU-MadisonVoice',
      EN_GB_CHARLOTTEV3VOICE = 'en-GB_CharlotteV3Voice',
      EN_GB_JAMESV3VOICE = 'en-GB_JamesV3Voice',
      EN_GB_KATEVOICE = 'en-GB_KateVoice',
      EN_GB_KATEV3VOICE = 'en-GB_KateV3Voice',
      EN_US_ALLISONVOICE = 'en-US_AllisonVoice',
      EN_US_ALLISONV3VOICE = 'en-US_AllisonV3Voice',
      EN_US_EMILYV3VOICE = 'en-US_EmilyV3Voice',
      EN_US_HENRYV3VOICE = 'en-US_HenryV3Voice',
      EN_US_KEVINV3VOICE = 'en-US_KevinV3Voice',
      EN_US_LISAVOICE = 'en-US_LisaVoice',
      EN_US_LISAV3VOICE = 'en-US_LisaV3Voice',
      EN_US_MICHAELVOICE = 'en-US_MichaelVoice',
      EN_US_MICHAELV3VOICE = 'en-US_MichaelV3Voice',
      EN_US_OLIVIAV3VOICE = 'en-US_OliviaV3Voice',
      ES_ES_ENRIQUEVOICE = 'es-ES_EnriqueVoice',
      ES_ES_ENRIQUEV3VOICE = 'es-ES_EnriqueV3Voice',
      ES_ES_LAURAVOICE = 'es-ES_LauraVoice',
      ES_ES_LAURAV3VOICE = 'es-ES_LauraV3Voice',
      ES_LA_SOFIAVOICE = 'es-LA_SofiaVoice',
      ES_LA_SOFIAV3VOICE = 'es-LA_SofiaV3Voice',
      ES_US_SOFIAVOICE = 'es-US_SofiaVoice',
      ES_US_SOFIAV3VOICE = 'es-US_SofiaV3Voice',
      FR_CA_LOUISEV3VOICE = 'fr-CA_LouiseV3Voice',
      FR_FR_NICOLASV3VOICE = 'fr-FR_NicolasV3Voice',
      FR_FR_RENEEVOICE = 'fr-FR_ReneeVoice',
      FR_FR_RENEEV3VOICE = 'fr-FR_ReneeV3Voice',
      IT_IT_FRANCESCAVOICE = 'it-IT_FrancescaVoice',
      IT_IT_FRANCESCAV3VOICE = 'it-IT_FrancescaV3Voice',
      JA_JP_EMIVOICE = 'ja-JP_EmiVoice',
      JA_JP_EMIV3VOICE = 'ja-JP_EmiV3Voice',
      KO_KR_HYUNJUNVOICE = 'ko-KR_HyunjunVoice',
      KO_KR_SIWOOVOICE = 'ko-KR_SiWooVoice',
      KO_KR_YOUNGMIVOICE = 'ko-KR_YoungmiVoice',
      KO_KR_YUNAVOICE = 'ko-KR_YunaVoice',
      NL_BE_ADELEVOICE = 'nl-BE_AdeleVoice',
      NL_NL_EMMAVOICE = 'nl-NL_EmmaVoice',
      NL_NL_LIAMVOICE = 'nl-NL_LiamVoice',
      PT_BR_ISABELAVOICE = 'pt-BR_IsabelaVoice',
      PT_BR_ISABELAV3VOICE = 'pt-BR_IsabelaV3Voice',
      ZH_CN_LINAVOICE = 'zh-CN_LiNaVoice',
      ZH_CN_WANGWEIVOICE = 'zh-CN_WangWeiVoice',
      ZH_CN_ZHANGJINGVOICE = 'zh-CN_ZhangJingVoice',
    }
    /** The phoneme format in which to return the pronunciation. The Arabic, Chinese, Dutch, Australian English, and Korean languages support only IPA. Omit the parameter to obtain the pronunciation in the default format. */
    export enum Format {
      IBM = 'ibm',
      IPA = 'ipa',
    }
  }

  /** Parameters for the `createCustomModel` operation. */
  export interface CreateCustomModelParams {
    /** The name of the new custom model. */
    name: string;
    /** The language of the new custom model. You create a custom model for a specific language, not for a specific
     *  voice. A custom model can be used with any voice for its specified language. Omit the parameter to use the the
     *  default language, `en-US`. **Note:** The `ar-AR` language identifier cannot be used to create a custom model.
     *  Use the `ar-MS` identifier instead. **IBM Cloud:** The Arabic, Chinese, Dutch, Australian English, and Korean
     *  languages and voices are supported only for IBM Cloud.
     */
    language?: CreateCustomModelConstants.Language | string;
    /** A description of the new custom model. Specifying a description is recommended. */
    description?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `createCustomModel` operation. */
  export namespace CreateCustomModelConstants {
    /** The language of the new custom model. You create a custom model for a specific language, not for a specific voice. A custom model can be used with any voice for its specified language. Omit the parameter to use the the default language, `en-US`. **Note:** The `ar-AR` language identifier cannot be used to create a custom model. Use the `ar-MS` identifier instead. **IBM Cloud:** The Arabic, Chinese, Dutch, Australian English, and Korean languages and voices are supported only for IBM Cloud. */
    export enum Language {
      AR_MS = 'ar-MS',
      DE_DE = 'de-DE',
      EN_GB = 'en-GB',
      EN_US = 'en-US',
      ES_ES = 'es-ES',
      ES_LA = 'es-LA',
      ES_US = 'es-US',
      FR_CA = 'fr-CA',
      FR_FR = 'fr-FR',
      IT_IT = 'it-IT',
      JA_JP = 'ja-JP',
      KO_KR = 'ko-KR',
      NL_BE = 'nl-BE',
      NL_NL = 'nl-NL',
      PT_BR = 'pt-BR',
      ZH_CN = 'zh-CN',
    }
  }

  /** Parameters for the `listCustomModels` operation. */
  export interface ListCustomModelsParams {
    /** The language for which custom models that are owned by the requesting credentials are to be returned. Omit
     *  the parameter to see all custom models that are owned by the requester.
     */
    language?: ListCustomModelsConstants.Language | string;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `listCustomModels` operation. */
  export namespace ListCustomModelsConstants {
    /** The language for which custom models that are owned by the requesting credentials are to be returned. Omit the parameter to see all custom models that are owned by the requester. */
    export enum Language {
      AR_MS = 'ar-MS',
      DE_DE = 'de-DE',
      EN_AU = 'en-AU',
      EN_GB = 'en-GB',
      EN_US = 'en-US',
      ES_ES = 'es-ES',
      ES_LA = 'es-LA',
      ES_US = 'es-US',
      FR_CA = 'fr-CA',
      FR_FR = 'fr-FR',
      IT_IT = 'it-IT',
      JA_JP = 'ja-JP',
      KO_KR = 'ko-KR',
      NL_BE = 'nl-BE',
      NL_NL = 'nl-NL',
      PT_BR = 'pt-BR',
      ZH_CN = 'zh-CN',
    }
  }

  /** Parameters for the `updateCustomModel` operation. */
  export interface UpdateCustomModelParams {
    /** The customization ID (GUID) of the custom model. You must make the request with credentials for the instance
     *  of the service that owns the custom model.
     */
    customizationId: string;
    /** A new name for the custom model. */
    name?: string;
    /** A new description for the custom model. */
    description?: string;
    /** An array of `Word` objects that provides the words and their translations that are to be added or updated
     *  for the custom model. Pass an empty array to make no additions or updates.
     */
    words?: Word[];
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getCustomModel` operation. */
  export interface GetCustomModelParams {
    /** The customization ID (GUID) of the custom model. You must make the request with credentials for the instance
     *  of the service that owns the custom model.
     */
    customizationId: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `deleteCustomModel` operation. */
  export interface DeleteCustomModelParams {
    /** The customization ID (GUID) of the custom model. You must make the request with credentials for the instance
     *  of the service that owns the custom model.
     */
    customizationId: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `addWords` operation. */
  export interface AddWordsParams {
    /** The customization ID (GUID) of the custom model. You must make the request with credentials for the instance
     *  of the service that owns the custom model.
     */
    customizationId: string;
    /** The **Add custom words** method accepts an array of `Word` objects. Each object provides a word that is to
     *  be added or updated for the custom model and the word's translation.
     *
     *  The **List custom words** method returns an array of `Word` objects. Each object shows a word and its
     *  translation from the custom model. The words are listed in alphabetical order, with uppercase letters listed
     *  before lowercase letters. The array is empty if the custom model contains no words.
     */
    words: Word[];
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `listWords` operation. */
  export interface ListWordsParams {
    /** The customization ID (GUID) of the custom model. You must make the request with credentials for the instance
     *  of the service that owns the custom model.
     */
    customizationId: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `addWord` operation. */
  export interface AddWordParams {
    /** The customization ID (GUID) of the custom model. You must make the request with credentials for the instance
     *  of the service that owns the custom model.
     */
    customizationId: string;
    /** The word that is to be added or updated for the custom model. */
    word: string;
    /** The phonetic or sounds-like translation for the word. A phonetic translation is based on the SSML format for
     *  representing the phonetic string of a word either as an IPA translation or as an IBM SPR translation. The
     *  Arabic, Chinese, Dutch, Australian English, and Korean languages support only IPA. A sounds-like is one or more
     *  words that, when combined, sound like the word.
     */
    translation: string;
    /** **Japanese only.** The part of speech for the word. The service uses the value to produce the correct
     *  intonation for the word. You can create only a single entry, with or without a single part of speech, for any
     *  word; you cannot create multiple entries with different parts of speech for the same word. For more information,
     *  see [Working with Japanese
     *  entries](https://cloud.ibm.com/docs/text-to-speech?topic=text-to-speech-rules#jaNotes).
     */
    partOfSpeech?: AddWordConstants.PartOfSpeech | string;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `addWord` operation. */
  export namespace AddWordConstants {
    /** **Japanese only.** The part of speech for the word. The service uses the value to produce the correct intonation for the word. You can create only a single entry, with or without a single part of speech, for any word; you cannot create multiple entries with different parts of speech for the same word. For more information, see [Working with Japanese entries](https://cloud.ibm.com/docs/text-to-speech?topic=text-to-speech-rules#jaNotes). */
    export enum PartOfSpeech {
      DOSI = 'Dosi',
      FUKU = 'Fuku',
      GOBI = 'Gobi',
      HOKA = 'Hoka',
      JODO = 'Jodo',
      JOSI = 'Josi',
      KATO = 'Kato',
      KEDO = 'Kedo',
      KEYO = 'Keyo',
      KIGO = 'Kigo',
      KOYU = 'Koyu',
      MESI = 'Mesi',
      RETA = 'Reta',
      STBI = 'Stbi',
      STTO = 'Stto',
      STZO = 'Stzo',
      SUJI = 'Suji',
    }
  }

  /** Parameters for the `getWord` operation. */
  export interface GetWordParams {
    /** The customization ID (GUID) of the custom model. You must make the request with credentials for the instance
     *  of the service that owns the custom model.
     */
    customizationId: string;
    /** The word that is to be queried from the custom model. */
    word: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `deleteWord` operation. */
  export interface DeleteWordParams {
    /** The customization ID (GUID) of the custom model. You must make the request with credentials for the instance
     *  of the service that owns the custom model.
     */
    customizationId: string;
    /** The word that is to be deleted from the custom model. */
    word: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `listCustomPrompts` operation. */
  export interface ListCustomPromptsParams {
    /** The customization ID (GUID) of the custom model. You must make the request with credentials for the instance
     *  of the service that owns the custom model.
     */
    customizationId: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `addCustomPrompt` operation. */
  export interface AddCustomPromptParams {
    /** The customization ID (GUID) of the custom model. You must make the request with credentials for the instance
     *  of the service that owns the custom model.
     */
    customizationId: string;
    /** The identifier of the prompt that is to be added to the custom model:
     *  * Include a maximum of 49 characters in the ID.
     *  * Include only alphanumeric characters and `_` (underscores) in the ID.
     *  * Do not include XML sensitive characters (double quotes, single quotes, ampersands, angle brackets, and
     *  slashes) in the ID.
     *  * To add a new prompt, the ID must be unique for the specified custom model. Otherwise, the new information for
     *  the prompt overwrites the existing prompt that has that ID.
     */
    promptId: string;
    /** Information about the prompt that is to be added to a custom model. The following example of a
     *  `PromptMetadata` object includes both the required prompt text and an optional speaker model ID:
     *
     *  `{ "prompt_text": "Thank you and good-bye!", "speaker_id": "823068b2-ed4e-11ea-b6e0-7b6456aa95cc" }`.
     */
    metadata: PromptMetadata;
    /** An audio file that speaks the text of the prompt with intonation and prosody that matches how you would like
     *  the prompt to be spoken.
     *  * The prompt audio must be in WAV format and must have a minimum sampling rate of 16 kHz. The service accepts
     *  audio with higher sampling rates. The service transcodes all audio to 16 kHz before processing it.
     *  * The length of the prompt audio is limited to 30 seconds.
     */
    file: NodeJS.ReadableStream | Buffer;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getCustomPrompt` operation. */
  export interface GetCustomPromptParams {
    /** The customization ID (GUID) of the custom model. You must make the request with credentials for the instance
     *  of the service that owns the custom model.
     */
    customizationId: string;
    /** The identifier (name) of the prompt. */
    promptId: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `deleteCustomPrompt` operation. */
  export interface DeleteCustomPromptParams {
    /** The customization ID (GUID) of the custom model. You must make the request with credentials for the instance
     *  of the service that owns the custom model.
     */
    customizationId: string;
    /** The identifier (name) of the prompt that is to be deleted. */
    promptId: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `listSpeakerModels` operation. */
  export interface ListSpeakerModelsParams {
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `createSpeakerModel` operation. */
  export interface CreateSpeakerModelParams {
    /** The name of the speaker that is to be added to the service instance.
     *  * Include a maximum of 49 characters in the name.
     *  * Include only alphanumeric characters and `_` (underscores) in the name.
     *  * Do not include XML sensitive characters (double quotes, single quotes, ampersands, angle brackets, and
     *  slashes) in the name.
     *  * Do not use the name of an existing speaker that is already defined for the service instance.
     */
    speakerName: string;
    /** An enrollment audio file that contains a sample of the speaker’s voice.
     *  * The enrollment audio must be in WAV format and must have a minimum sampling rate of 16 kHz. The service
     *  accepts audio with higher sampling rates. It transcodes all audio to 16 kHz before processing it.
     *  * The length of the enrollment audio is limited to 1 minute. Speaking one or two paragraphs of text that include
     *  five to ten sentences is recommended.
     */
    audio: NodeJS.ReadableStream | Buffer;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getSpeakerModel` operation. */
  export interface GetSpeakerModelParams {
    /** The speaker ID (GUID) of the speaker model. You must make the request with service credentials for the
     *  instance of the service that owns the speaker model.
     */
    speakerId: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `deleteSpeakerModel` operation. */
  export interface DeleteSpeakerModelParams {
    /** The speaker ID (GUID) of the speaker model. You must make the request with service credentials for the
     *  instance of the service that owns the speaker model.
     */
    speakerId: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `deleteUserData` operation. */
  export interface DeleteUserDataParams {
    /** The customer ID for which all data is to be deleted. */
    customerId: string;
    headers?: OutgoingHttpHeaders;
  }

  /*************************
   * model interfaces
   ************************/

  /** Information about an existing custom model. */
  export interface CustomModel {
    /** The customization ID (GUID) of the custom model. The **Create a custom model** method returns only this
     *  field. It does not not return the other fields of this object.
     */
    customization_id: string;
    /** The name of the custom model. */
    name?: string;
    /** The language identifier of the custom model (for example, `en-US`). */
    language?: string;
    /** The GUID of the credentials for the instance of the service that owns the custom model. */
    owner?: string;
    /** The date and time in Coordinated Universal Time (UTC) at which the custom model was created. The value is
     *  provided in full ISO 8601 format (`YYYY-MM-DDThh:mm:ss.sTZD`).
     */
    created?: string;
    /** The date and time in Coordinated Universal Time (UTC) at which the custom model was last modified. The
     *  `created` and `updated` fields are equal when a model is first added but has yet to be updated. The value is
     *  provided in full ISO 8601 format (`YYYY-MM-DDThh:mm:ss.sTZD`).
     */
    last_modified?: string;
    /** The description of the custom model. */
    description?: string;
    /** An array of `Word` objects that lists the words and their translations from the custom model. The words are
     *  listed in alphabetical order, with uppercase letters listed before lowercase letters. The array is empty if no
     *  words are defined for the custom model. This field is returned only by the **Get a custom model** method.
     */
    words?: Word[];
    /** An array of `Prompt` objects that provides information about the prompts that are defined for the specified
     *  custom model. The array is empty if no prompts are defined for the custom model. This field is returned only by
     *  the **Get a custom model** method.
     */
    prompts?: Prompt[];
  }

  /** Information about existing custom models. */
  export interface CustomModels {
    /** An array of `CustomModel` objects that provides information about each available custom model. The array is
     *  empty if the requesting credentials own no custom models (if no language is specified) or own no custom models
     *  for the specified language.
     */
    customizations: CustomModel[];
  }

  /** Information about a custom prompt. */
  export interface Prompt {
    /** The user-specified text of the prompt. */
    prompt: string;
    /** The user-specified identifier (name) of the prompt. */
    prompt_id: string;
    /** The status of the prompt:
     *  * `processing`: The service received the request to add the prompt and is analyzing the validity of the prompt.
     *  * `available`: The service successfully validated the prompt, which is now ready for use in a speech synthesis
     *  request.
     *  * `failed`: The service's validation of the prompt failed. The status of the prompt includes an `error` field
     *  that describes the reason for the failure.
     */
    status: string;
    /** If the status of the prompt is `failed`, an error message that describes the reason for the failure. The
     *  field is omitted if no error occurred.
     */
    error?: string;
    /** The speaker ID (GUID) of the speaker for which the prompt was defined. The field is omitted if no speaker ID
     *  was specified.
     */
    speaker_id?: string;
  }

  /** Information about the prompt that is to be added to a custom model. The following example of a `PromptMetadata` object includes both the required prompt text and an optional speaker model ID: `{ "prompt_text": "Thank you and good-bye!", "speaker_id": "823068b2-ed4e-11ea-b6e0-7b6456aa95cc" }`. */
  export interface PromptMetadata {
    /** The required written text of the spoken prompt. The length of a prompt's text is limited to a few sentences.
     *  Speaking one or two sentences of text is the recommended limit. A prompt cannot contain more than 1000
     *  characters of text. Escape any XML control characters (double quotes, single quotes, ampersands, angle brackets,
     *  and slashes) that appear in the text of the prompt.
     */
    prompt_text: string;
    /** The optional speaker ID (GUID) of a previously defined speaker model that is to be associated with the
     *  prompt.
     */
    speaker_id?: string;
  }

  /** Information about the custom prompts that are defined for a custom model. */
  export interface Prompts {
    /** An array of `Prompt` objects that provides information about the prompts that are defined for the specified
     *  custom model. The array is empty if no prompts are defined for the custom model.
     */
    prompts: Prompt[];
  }

  /** The pronunciation of the specified text. */
  export interface Pronunciation {
    /** The pronunciation of the specified text in the requested voice and format. If a custom model is specified,
     *  the pronunciation also reflects that custom model.
     */
    pronunciation: string;
  }

  /** Information about a speaker model. */
  export interface Speaker {
    /** The speaker ID (GUID) of the speaker. */
    speaker_id: string;
    /** The user-defined name of the speaker. */
    name: string;
  }

  /** A custom models for which the speaker has defined prompts. */
  export interface SpeakerCustomModel {
    /** The customization ID (GUID) of a custom model for which the speaker has defined one or more prompts. */
    customization_id: string;
    /** An array of `SpeakerPrompt` objects that provides information about each prompt that the user has defined
     *  for the custom model.
     */
    prompts: SpeakerPrompt[];
  }

  /** Custom models for which the speaker has defined prompts. */
  export interface SpeakerCustomModels {
    /** An array of `SpeakerCustomModel` objects. Each object provides information about the prompts that are
     *  defined for a specified speaker in the custom models that are owned by a specified service instance. The array
     *  is empty if no prompts are defined for the speaker.
     */
    customizations: SpeakerCustomModel[];
  }

  /** The speaker ID of the speaker model. */
  export interface SpeakerModel {
    /** The speaker ID (GUID) of the speaker model. */
    speaker_id: string;
  }

  /** A prompt that a speaker has defined for a custom model. */
  export interface SpeakerPrompt {
    /** The user-specified text of the prompt. */
    prompt: string;
    /** The user-specified identifier (name) of the prompt. */
    prompt_id: string;
    /** The status of the prompt:
     *  * `processing`: The service received the request to add the prompt and is analyzing the validity of the prompt.
     *  * `available`: The service successfully validated the prompt, which is now ready for use in a speech synthesis
     *  request.
     *  * `failed`: The service's validation of the prompt failed. The status of the prompt includes an `error` field
     *  that describes the reason for the failure.
     */
    status: string;
    /** If the status of the prompt is `failed`, an error message that describes the reason for the failure. The
     *  field is omitted if no error occurred.
     */
    error?: string;
  }

  /** Information about all speaker models for the service instance. */
  export interface Speakers {
    /** An array of `Speaker` objects that provides information about the speakers for the service instance. The
     *  array is empty if the service instance has no speakers.
     */
    speakers: Speaker[];
  }

  /** Additional service features that are supported with the voice. */
  export interface SupportedFeatures {
    /** If `true`, the voice can be customized; if `false`, the voice cannot be customized. (Same as
     *  `customizable`.).
     */
    custom_pronunciation: boolean;
    /** If `true`, the voice can be transformed by using the SSML &lt;voice-transformation&gt; element; if `false`,
     *  the voice cannot be transformed. The feature was available only for the now-deprecated standard voices. You
     *  cannot use the feature with neural voices.
     */
    voice_transformation: boolean;
  }

  /** Information about the translation for the specified text. */
  export interface Translation {
    /** The phonetic or sounds-like translation for the word. A phonetic translation is based on the SSML format for
     *  representing the phonetic string of a word either as an IPA translation or as an IBM SPR translation. The
     *  Arabic, Chinese, Dutch, Australian English, and Korean languages support only IPA. A sounds-like is one or more
     *  words that, when combined, sound like the word.
     */
    translation: string;
    /** **Japanese only.** The part of speech for the word. The service uses the value to produce the correct
     *  intonation for the word. You can create only a single entry, with or without a single part of speech, for any
     *  word; you cannot create multiple entries with different parts of speech for the same word. For more information,
     *  see [Working with Japanese
     *  entries](https://cloud.ibm.com/docs/text-to-speech?topic=text-to-speech-rules#jaNotes).
     */
    part_of_speech?: string;
  }

  /** Information about an available voice. */
  export interface Voice {
    /** The URI of the voice. */
    url: string;
    /** The gender of the voice: `male` or `female`. */
    gender: string;
    /** The name of the voice. Use this as the voice identifier in all requests. */
    name: string;
    /** The language and region of the voice (for example, `en-US`). */
    language: string;
    /** A textual description of the voice. */
    description: string;
    /** If `true`, the voice can be customized; if `false`, the voice cannot be customized. (Same as
     *  `custom_pronunciation`; maintained for backward compatibility.).
     */
    customizable: boolean;
    /** Additional service features that are supported with the voice. */
    supported_features: SupportedFeatures;
    /** Returns information about a specified custom model. This field is returned only by the **Get a voice**
     *  method and only when you specify the customization ID of a custom model.
     */
    customization?: CustomModel;
  }

  /** Information about all available voices. */
  export interface Voices {
    /** A list of available voices. */
    voices: Voice[];
  }

  /** Information about a word for the custom model. */
  export interface Word {
    /** The word for the custom model. The maximum length of a word is 49 characters. */
    word: string;
    /** The phonetic or sounds-like translation for the word. A phonetic translation is based on the SSML format for
     *  representing the phonetic string of a word either as an IPA or IBM SPR translation. The Arabic, Chinese, Dutch,
     *  Australian English, and Korean languages support only IPA. A sounds-like translation consists of one or more
     *  words that, when combined, sound like the word. The maximum length of a translation is 499 characters.
     */
    translation: string;
    /** **Japanese only.** The part of speech for the word. The service uses the value to produce the correct
     *  intonation for the word. You can create only a single entry, with or without a single part of speech, for any
     *  word; you cannot create multiple entries with different parts of speech for the same word. For more information,
     *  see [Working with Japanese
     *  entries](https://cloud.ibm.com/docs/text-to-speech?topic=text-to-speech-rules#jaNotes).
     */
    part_of_speech?: string;
  }

  /** For the **Add custom words** method, one or more words that are to be added or updated for the custom model and the translation for each specified word. For the **List custom words** method, the words and their translations from the custom model. */
  export interface Words {
    /** The **Add custom words** method accepts an array of `Word` objects. Each object provides a word that is to
     *  be added or updated for the custom model and the word's translation.
     *
     *  The **List custom words** method returns an array of `Word` objects. Each object shows a word and its
     *  translation from the custom model. The words are listed in alphabetical order, with uppercase letters listed
     *  before lowercase letters. The array is empty if the custom model contains no words.
     */
    words: Word[];
  }
}

export = TextToSpeechV1;

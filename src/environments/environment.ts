// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  azureAD: {
    clientId: '75b5c4c4-2dcd-474d-b2fc-acaa01b0a6ab',
    tenantId: '92e84ceb-fbfd-47ab-be52-080c6b87953f',
    authority: 'https://login.microsoftonline.com/',
    redirectUri: '/',
    validateAuthority: true,
    postLogoutRedirectUri: '/',
    navigateToLoginRequestUrl: true,
    graphApi: 'https://graph.microsoft.com/',
  },
  respAiUrl:
    'https://respai-chat-api.azurewebsites.net/api/fetchResponse?query=',
  SPEECH_REGION: 'eastus',
  SPEECH_KEY: 'f7da2c3fc4024ca09da560929403393a',
  // TEXT_TO_SPEECH_VOICE_GUJ: 'gu-IN-DhwaniNeural', //gu-IN-DhwaniNeural (female)
  // TEXT_TO_SPEECH_VOICE_HIN: 'hi-IN-MadhurNeural', //hi-IN-SwaraNeural (female)
  TEXT_TO_SPEECH_VOICE_ENG: 'en-US-JennyMultilingualNeural', // en-IN-NeerjaNeural (female)
  // AUTOPACKER_GUJ_CUSTOM_MODEL: 'e9ece744-c416-487e-8e25-8146c216127e',
  // CONTAINER_NAME: 'genai-mfg-chat-files',
  // BLOB_NAME: 'freq_qna.json',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.

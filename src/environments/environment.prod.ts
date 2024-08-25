export const environment = {
  production: true,
  azureAD: {
    clientId: '06ed8c50-dc2b-43c7-8945-091f4c2c71f6',
    tenantId: '3c8ea0e4-127c-4a02-ac65-58830e4ac608',
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
  CONTAINER_NAME: 'genai-mfg-chat-files',
  BLOB_NAME: 'freq_qna.json',
};

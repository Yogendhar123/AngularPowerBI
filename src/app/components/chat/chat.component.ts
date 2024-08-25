import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {
  SpeechRecognizer,
  SpeechConfig,
  SpeechRecognitionEventArgs,
  AudioConfig,
  ResultReason,
  SpeechSynthesizer,
  SpeechSynthesisResult,
} from 'microsoft-cognitiveservices-speech-sdk';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  mic_status = false;
  // voice_status = false;
  api_endpoint = 'getAnswer?query=';
  prompt_query: string = '';
  promptList: Prompt[] = [];
  stars: number[] = [1, 2, 3, 4, 5];
  staticPromptList: any[] = [
    {
      question:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
      answer:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
      voice_status: false,
    },
    {
      question:
        "Now is the winter of our discontent Made glorious summer by this sun of York; And all the clouds that lour'd upon our house In the deep bosom of the ocean buried.",
      answer:
        "Now is the winter of our discontent Made glorious summer by this sun of York; And all the clouds that lour'd upon our house In the deep bosom of the ocean buried.",
      voice_status: false,
    },
  ];
  activeTag = '';
  tagsList = [
    'Shift Logs',
    'Production Logs',
    'Machine Maintenance Logs',
    'Machine Maintenance Schedules',
    'Machinery Issues and Troubleshooting',
    'Safety and Regulatory Content',
  ];
  suggestedPromptsList = [
    'List down all the requests, userid, EventTime whose blocked reason is Sensitive Data. Please provide result in tabular format',
    'List down all the requests, userid, EventTime whose blocked reason is Non-compliant. Please provide result in tabular format',
    'List down all the requests, userid, EventTime whose blocked reason is Prompt Injection. Please provide result in tabular format',
    'List down all the records having usersid who are sending unethical requests. Please provide response in tabular format',
    'Which user ids are sending self harm requests has context menu',
    'Which type of blocked requests are mostly asked? Explain with most suitable examples',
  ];
  transcribedText = '';
  speechConfig!: SpeechConfig;
  audioConfig!: AudioConfig;
  recognizer!: SpeechRecognizer; // Add the "!" operator to indicate it will be initialized later
  isRecordingInProcess: boolean = false;
  voiceResponse: boolean = false;
  selectedPrompt = '';

  @ViewChild('chatConversations', { static: true })
  msgOverflowContainer!: ElementRef;
  @ViewChild('chatFiles') fileInput!: ElementRef;

  constructor(private httpClient: HttpClient, private cdr: ChangeDetectorRef) {
    // Initialize the speech recognizer variable
    this.speechConfig = SpeechConfig.fromSubscription(
      environment.SPEECH_KEY,
      environment.SPEECH_REGION
    );
    this.audioConfig = AudioConfig.fromDefaultMicrophoneInput();
  }

  ngOnInit(): void {}

  // launchFileSelection() {
  //   this.fileInput.nativeElement.click();
  // }

  async uploadFiles(event: any) {
    // alert(event.target.files.length + " file(s) selected!");
    // for (var file of event.target.files) {
    //   if (file) {
    //     // Upload File logic to Blob Storage and Execute the workflow
    //   }
    // }
  }

  promptChange(value: string) {
    this.prompt_query = value;
  }

  onPromptSelection(temp: any) {
    this.prompt_query = temp.target.value;
  }

  submitQuestion() {
    if (this.prompt_query != '') {
      var prompt = new Prompt();
      prompt.question = this.prompt_query;
      prompt.answer = 'Loading';
      this.promptList.push(prompt);

      this.scrollToBottom();

      let serviceUrl = environment.respAiUrl + this.prompt_query;

      this.prompt_query = '';
      this.httpClient.post(serviceUrl, {}).subscribe((responseData: any) => {
        var response = JSON.parse(JSON.stringify(responseData));

        var answer =
          response.answer != null ||
          response.answer != '' ||
          response.answer != undefined
            ? response.answer
            : "I don't know";
        this.promptList[this.promptList.length - 1].answer = answer;

        this.scrollToBottom();
      });
    }
  }

  scrollToBottom() {
    this.cdr.detectChanges();
    const scrollDiv = this.msgOverflowContainer.nativeElement;
    scrollDiv.scrollTop = scrollDiv.scrollHeight;
  }

  toggleMicrophone(recordStatus: boolean) {
    recordStatus ? this.startRecording() : this.stopRecording();

    // if (this.mic_status)
    //   alert('Recording Started');
    // else
    //   alert('Recording Stopped');
  }

  toggleSpeaker(prompt: Prompt) {
    prompt.voice_status = !prompt.voice_status;
    // var selectedPrompt = this.promptList.find(prop => prop.question.toLowerCase() == promptQuestion.toLowerCase());
    // selectedPrompt!.voice_status = voiceStatus;

    if (prompt.voice_status) {
      this.speakContent(prompt);
      // selectedPrompt!.voice_status = false;
    }
  }

  startRecording() {
    //alert('Please speak very clear and very slowly. કૃપા કરીને ખૂબ જ સ્પષ્ટ અને ખૂબ ધીમેથી બોલો. कृपया बहुत स्पष्ट और बहुत धीरे बोलें। ');
    this.prompt_query = 'Listening...';
    this.transcribedText = '';
    this.mic_status = true;

    // if (this.selectedLanguage.toLowerCase() == 'gujarati') {
    //   this.speechConfig.speechRecognitionLanguage = 'gu-IN';
    //   this.speechConfig.endpointId = environment.AUTOPACKER_GUJ_CUSTOM_MODEL;
    // } else if (this.selectedLanguage.toLowerCase() == 'hindi')
    //   this.speechConfig.speechRecognitionLanguage = 'hi-IN';
    // else
    this.speechConfig.speechRecognitionLanguage = 'en-US';

    // console.log('Speech lang:' + this.speechConfig.speechRecognitionLanguage);
    this.recognizer = new SpeechRecognizer(this.speechConfig, this.audioConfig);

    //Improve model accuracy using Custom phrases. This is not supported for Gujarati as per MS docs. As of now did only for Gujarati.
    // this.addPhrasesToList();

    this.recognizer.recognized = (_, event: SpeechRecognitionEventArgs) => {
      // console.log(event.result.text);
      if (event.result.reason == ResultReason.RecognizedSpeech) {
        this.transcribedText += event.result.text + ' ';
      }
    };

    this.recognizer.startContinuousRecognitionAsync();
  }

  stopRecording() {
    this.prompt_query = '';
    (async () => {
      // console.log('before stop delay');
      await new Promise((f) => setTimeout(f, 1000));
    })();

    this.mic_status = false;
    this.recognizer.stopContinuousRecognitionAsync();

    (async () => {
      // console.log('before delay');
      await new Promise((f) => setTimeout(f, 1000));
      // console.log('after delay');
    })();

    this.prompt_query = this.transcribedText;
    this.transcribedText = '';
  }

  speakContent(prompt: Prompt) {
    //The below code is for Text to Speech
    //  if (this.voiceResponse == true) {
    // if (this.selectedLanguage.toLowerCase() == 'gujarati') {
    //   this.speechConfig.speechSynthesisLanguage = 'gu-IN';
    //   this.speechConfig.speechSynthesisVoiceName =
    //     environment.TEXT_TO_SPEECH_VOICE_GUJ;
    // } else if (this.selectedLanguage.toLowerCase() == 'hindi') {
    //   this.speechConfig.speechSynthesisLanguage = 'hi-IN';
    //   this.speechConfig.speechSynthesisVoiceName =
    //     environment.TEXT_TO_SPEECH_VOICE_HIN;
    // } else {
    this.speechConfig.speechSynthesisLanguage = 'en-US';
    this.speechConfig.speechSynthesisVoiceName =
      environment.TEXT_TO_SPEECH_VOICE_ENG;
    // }
    // console.log(this.speechConfig.speechSynthesisLanguage);
    // console.log(this.speechConfig.speechSynthesisVoiceName);
    const audioConfig_t2s = AudioConfig.fromDefaultSpeakerOutput();
    const speechSynthesizer = new SpeechSynthesizer(
      this.speechConfig,
      audioConfig_t2s
    );

    speechSynthesizer.speakTextAsync(
      this.RemoteHTMLPartForSpeech(prompt.answer),
      (result: SpeechSynthesisResult) => {
        if (result) {
          //console.log(result);
          //console.log(this.speechConfig);
          speechSynthesizer.close();
          prompt.voice_status = false;
          // console.log('Output for audio' + result.audioData);
          return result.audioData;
        }
        return null;
      },
      (error) => {
        // console.log(error);
        speechSynthesizer.close();
        return null;
      }
    );
    // }
  }

  RemoteHTMLPartForSpeech(text: string): string {
    var regexp = /<[^>]*>/g;
    var result = text.replaceAll(regexp, '^^^');
    // console.log('in remove part' + result);
    return result;
  }

  clearChatConversions() {
    this.promptList = [];
    this.activeTag = '';
  }

  setActiveTag(tagName: string) {
    this.activeTag = tagName;
  }

  setPromptRating(prompt: any, star: number) {
    prompt.rating = star;
  }
}

class Prompt {
  question: string = '';
  answer: string = '';
  voice_status: boolean = false;
  rating: number = 0;
}

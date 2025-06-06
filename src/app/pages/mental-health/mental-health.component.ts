import { CommonModule } from '@angular/common'; 
import { HttpClient } from '@angular/common/http'; 
import { Component } from '@angular/core'; 
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms'; 
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser'; 
 
@Component({ 
  selector: 'app-mental-health', 
  standalone: true, 
  imports: [CommonModule, ReactiveFormsModule], 
  templateUrl: './mental-health.component.html', 
  styleUrls: ['./mental-health.component.scss'] 
}) 
export class MentalHealthComponent { 
  aiForm: FormGroup; 
  aiAnswer: string | null = null; 
  loading = false; 
 
  testForm: FormGroup; 
  testResult: string | null = null; 
 
  constructor( 
    private fb: FormBuilder, 
    private http: HttpClient, 
    private sanitizer: DomSanitizer 
  ) { 
    this.testForm = this.fb.group({ 
      anxiety: [false], 
      insomnia: [false], 
      lossInterest: [false], 
      fatigue: [false], 
      appetiteChange: [false], 
      concentration: [false], 
      hopelessness: [false], 
      irritability: [false], 
    }); 
 
    this.aiForm = this.fb.group({ 
      question: [''], 
    }); 
  } 
 
  transform(url: string): SafeResourceUrl { 
    return this.sanitizer.bypassSecurityTrustResourceUrl(url); 
  } 
 
  submitTest() { 
    const answers = this.testForm.value; 
    const score = Object.values(answers).filter(Boolean).length; 
 
    if (score >= 6) { 
      this.testResult = 'النتيجة تشير إلى أعراض قوية من اضطراب نفسي، يُفضل استشارة طبيب نفسي في أقرب وقت.'; 
    } else if (score >= 3) { 
      this.testResult = 'قد تكون لديك أعراض خفيفة إلى متوسطة، حاول تحسين نمط حياتك، وإذا استمرت الأعراض استشر مختصًا.'; 
    } else { 
      this.testResult = 'لا توجد مؤشرات قوية على اضطراب نفسي، ولكن راقب حالتك النفسية بانتظام.'; 
    } 
  } 
 
  askAI() { 
    const question = this.aiForm.value.question?.trim(); 
    if (!question) return; 
 
    this.loading = true; 
    this.aiAnswer = null; 
 
    this.http.post<{ response: string }>('http://localhost:8000/chat', { message: question }).subscribe({ 
      next: (res) => { 
        this.aiAnswer = res.response; 
        this.loading = false; 
      }, 
      error: () => { 
        this.aiAnswer = 'حدث خطأ أثناء الاتصال بالخادم، حاول مرة أخرى.'; 
        this.loading = false; 
      } 
    }); 
  } 
  mentalIllnesses = [
    {
      name: 'الاكتئاب',
      symptoms: [
        'حزن مستمر لأكثر من أسبوعين',
        'فقدان الاهتمام بالأنشطة اليومية',
        'الإرهاق الدائم رغم الراحة',
        'صعوبة في اتخاذ القرارات',
        'تغير في الشهية أو الوزن',
        'أفكار سلبية عن الذات أو الحياة'
      ],
      tips: [
        'مارس الرياضة الخفيفة مثل المشي 30 دقيقة يوميًا',
        'تحدث إلى شخص تثق به أو استشر معالج نفسي',
        'أنشئ روتين نوم منتظم وتجنب السهر',
        'قلل العزلة الاجتماعية، شارك في أنشطة بسيطة',
        'تجنب الكحول والمنبهات المفرطة'
      ]
    },
    {
      name: 'القلق العام',
      symptoms: [
        'توتر دائم وغير مبرر',
        'توقع الأسوأ باستمرار',
        'صعوبة في التركيز والانتباه',
        'أرق أو نوم متقطع',
        'آلام عضلية أو صداع مزمن',
        'تسارع ضربات القلب أو تعرق'
      ],
      tips: [
        'مارس تمارين التنفس العميق أو التأمل يوميًا',
        'قلل من الكافيين والسكريات الصناعية',
        'نظم وقتك وجدول مهامك لتقليل الضغط',
        'اكتب أفكارك المقلقة بدفتر قبل النوم',
        'احرص على ممارسة هوايات مريحة للنفس'
      ]
    },
    {
      name: 'نوبات الهلع',
      symptoms: [
        'ضيق مفاجئ في التنفس',
        'تسارع ضربات القلب',
        'شعور باقتراب الموت أو فقدان السيطرة',
        'دوخة أو غثيان مفاجئ',
        'شعور بالاختناق أو الرجفة'
      ],
      tips: [
        'حاول التركيز على تنفسك وابق في مكان هادئ',
        'ذكر نفسك بأنها مجرد نوبة وستمر',
        'تدرب على تقنيات الأرضية (مثل لمس الأشياء من حولك)',
        'تجنب الأماكن أو المواقف التي تثيرك مؤقتًا',
        'استشر أخصائي نفسي لتحديد العلاج الأنسب'
      ]
    },
    {
      name: 'اضطراب الوسواس القهري (OCD)',
      symptoms: [
        'أفكار متكررة غير مرغوب فيها (وساوس)',
        'سلوكيات قهرية مكررة (مثل الغسل أو التحقق)',
        'قلق شديد عند عدم تنفيذ السلوك القهري',
        'صعوبة في التركيز بسبب الأفكار الملحة'
      ],
      tips: [
        'استخدم تقنيات التعرض ومنع الاستجابة (ERP)',
        'قلل من التحقق القهري تدريجيًا بمساعدة مختص',
        'تحدث مع معالج سلوكي متخصص',
        'تعلم تمييز الوسواس عن الواقع تدريجيًا'
      ]
    },
    {
      name: 'اضطراب ما بعد الصدمة (PTSD)',
      symptoms: [
        'ذكريات مزعجة متكررة للحدث الصادم',
        'كوابيس أو فزع ليلي',
        'تجنب الأماكن أو الأشخاص المرتبطين بالحادث',
        'فرط يقظة أو تهيج مفاجئ',
        'تبلد المشاعر أو الانعزال'
      ],
      tips: [
        'تحدث مع معالج متخصص في الصدمات',
        'مارس تمارين تهدئة الجهاز العصبي (مثل EMDR أو اليقظة الذهنية)',
        'اكتب عن تجربتك في دفتر خاص لتفريغ المشاعر',
        'لا تضغط على نفسك، خذ وقتك في التعافي'
      ]
    }
  ];

  dailyTips = [
    'مارس تمارين التنفس بعمق لمدة 5 دقائق صباحًا ومساءً',
    'قم بنشاط تحبه يوميًا حتى لو كان بسيطًا كالرسم أو المشي',
    'نظم نومك: حاول النوم والاستيقاظ في نفس التوقيت يوميًا',
    'قلل من وقت الشاشة قبل النوم بساعة على الأقل',
    'اشرب كمية كافية من الماء يوميًا (2 لتر على الأقل)',
    'دوّن مشاعرك كل مساء لتفريغ الضغط النفسي',
    'ابتعد عن الأشخاص السلبين وخصص وقتًا لنفسك',
    'استمع لموسيقى هادئة أو طبيعية عند التوتر',
    'خصص وقتًا أسبوعيًا للعزلة الذكية والتأمل',
    'احتفل بإنجازاتك الصغيرة، فهي خطوات نحو التوازن'
  ];

  supportContacts = [
    {
      name: 'الخط الساخن للدعم النفسي - مصر (وزارة الصحة)',
      phone: '08008880700',
      website: 'https://www.mohp.gov.eg'
    },
    {
      name: 'جمعية أصدقاء الصحة النفسية "وياك" - قطر',
      phone: '+974 4468 2700',
      website: 'https://www.weyak.qa'
    },
    {
      name: 'مركز إرادة للصحة النفسية - السعودية',
      phone: '920033360',
      website: 'https://www.eradah.med.sa'
    },
    {
      name: 'National Suicide Prevention Lifeline - USA',
      phone: '988',
      website: 'https://988lifeline.org'
    },
    {
      name: 'منظمة الصحة العالمية - قسم الصحة النفسية',
      phone: '',
      website: 'https://www.who.int/health-topics/mental-health'
    }
  ];

  videos = [
    {
      title: 'كيف تحافظ على صحتك النفسية',
      url: 'https://www.youtube.com/embed/mNJqBllGCw8'
    },
    {
      title: 'تمارين استرخاء فعالة',
      url: 'https://www.youtube.com/embed/QOYWNjdOjmA'
    }
  ];
}

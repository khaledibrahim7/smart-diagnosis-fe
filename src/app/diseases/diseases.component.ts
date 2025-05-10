import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-diseases',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './diseases.component.html',
  styleUrls: ['./diseases.component.scss']
})
export class DiseasesComponent {
  isArabic = false;
 diseases = [
  {
    tag: 'colon',
    tagAr: 'القولون',
    patterns: [
      'I feel bloated and have abdominal pain',
      'I have frequent gas and irregular bowel movements',
      'My stomach hurts after I eat certain foods'
    ],
    patternsAr: [
      'أشعر بالانتفاخ وألم في البطن',
      'أعاني من غازات متكررة وعدم انتظام في حركة الأمعاء',
      'بطني بيوجعني بعد الأكل'
    ],
    response: 'Irritable bowel syndrome (IBS) is a common disorder that affects the large intestine. Managing diet and stress helps relieve symptoms.',
    responseAr: 'القولون العصبي هو اضطراب شائع يؤثر على الأمعاء الغليظة. التحكم في الأكل وتقليل التوتر بيساعد على تقليل الأعراض.',
    showResponse: false
  },
  {
    tag: 'heart',
    tagAr: 'القلب',
    patterns: [
      'I feel chest pain and shortness of breath',
      'My heart beats fast and I feel tired',
      'I feel pain in my left arm and chest'
    ],
    patternsAr: [
      'عندي ألم في صدري وضيق تنفس',
      'قلبي بيدق بسرعة وبحس بتعب',
      'بحس بألم في دراعي الشمال وصدري'
    ],
    response: 'Heart-related symptoms could indicate cardiovascular issues. Seek immediate medical attention if you feel severe chest pain or breathlessness.',
    responseAr: 'أعراض القلب ممكن تشير لمشاكل في القلب. لو حسيت بألم شديد في الصدر أو ضيق نفس، لازم تروح المستشفى فورًا.',
    showResponse: false
  },
  {
    tag: 'diabetes',
    tagAr: 'السكر',
    patterns: [
      'I feel thirsty all the time and urinate frequently',
      'I lost weight without trying and feel tired',
      'My vision is blurry and I feel numbness in my hands or feet'
    ],
    patternsAr: [
      'عطشان دايمًا وبادخل الحمام كتير',
      'خسيت من غير سبب وبحس بإرهاق',
      'نظري مش واضح وبحس بتنميل في إيدي أو رجلي'
    ],
    response: 'These may be symptoms of diabetes. Please consult a doctor for a blood sugar test and proper treatment.',
    responseAr: 'الأعراض دي ممكن تكون علامات على مرض السكر. يفضل تروح تعمل تحليل سكر وتشوف دكتور.',
    showResponse: false
  },
  {
    tag: 'blood pressure',
    tagAr: 'الضغط',
    patterns: [
      'I feel dizzy and my head hurts',
      'My blood pressure is high',
      'I have blurred vision and chest discomfort'
    ],
    patternsAr: [
      'حاسس بدوخة وصداع',
      'ضغط دمي عالي',
      'رؤيتي مش واضحة وفيه ألم في صدري'
    ],
    response: 'You might be experiencing hypertension. Monitor your blood pressure and consult a healthcare provider.',
    responseAr: 'دي ممكن تكون أعراض الضغط العالي. راقب ضغطك وشوف دكتور.',
    showResponse: false
  },
  {
    tag: 'anemia',
    tagAr: 'الأنيميا',
    patterns: [
      'I feel tired and weak all the time',
      'My skin is pale and I get dizzy easily',
      'I have shortness of breath even when I rest'
    ],
    patternsAr: [
      'بحس بتعب وضعف دايمًا',
      'جلدي شاحب وبدوخ بسرعة',
      'بنهج حتى وانا مرتاح'
    ],
    response: 'Anemia causes fatigue and weakness due to a lack of red blood cells. Iron-rich foods and supplements may help.',
    responseAr: 'الأنيميا بتسبب تعب وضعف بسبب نقص كرات الدم الحمراء. ممكن تتحسن بأكل غني بالحديد أو مكملات.',
    showResponse: false
  },
  {
    tag: 'kidney',
    tagAr: 'الكلى',
    patterns: [
      'I have lower back pain and feel tired',
      'I see foam or blood in my urine',
      'I have swelling in my legs and ankles'
    ],
    patternsAr: [
      'عندي ألم أسفل الظهر وبحس بتعب',
      'بشوف رغوة أو دم في البول',
      'فيه تورم في رجلي وكاحلي'
    ],
    response: 'These might be signs of kidney issues. You should get a urine test and consult a nephrologist.',
    responseAr: 'دي ممكن تكون علامات على مشاكل في الكلى. اعمل تحليل بول وشوف دكتور كلى.',
    showResponse: false
  },
  {
    tag: 'headache',
    tagAr: 'الصداع',
    patterns: [
      'I have a strong headache',
      'My head hurts when I look at light',
      'I feel pressure around my eyes'
    ],
    patternsAr: [
      'عندي صداع شديد',
      'رأسي بتوجعني لما أبص في نور',
      'حاسس بضغط حوالين عيني'
    ],
    response: 'Headaches can result from stress, dehydration, or migraines. Resting in a dark room and staying hydrated may help.',
    responseAr: 'الصداع ممكن ييجي من التوتر أو قلة المية أو الشقيقة. ارتاح في مكان هادي واشرب مية كفاية.',
    showResponse: false
  },
  {
    tag: 'stomach',
    tagAr: 'المعدة',
    patterns: [
      'I have stomach pain after eating',
      'I feel nauseous and bloated',
      'I have heartburn and indigestion'
    ],
    patternsAr: [
      'بطني بتوجعني بعد الأكل',
      'حاسس بغثيان وانتفاخ',
      'عندي حموضة وسوء هضم'
    ],
    response: 'These may be signs of gastritis or indigestion. Avoid spicy food and eat small meals. Consult a doctor if it continues.',
    responseAr: 'دي ممكن تكون أعراض التهاب معدة أو سوء هضم. ابعد عن الأكل الحار وكل وجبات صغيرة، واستشير دكتور لو استمرت.',
    showResponse: false
  },
  {
    tag: 'flu',
    tagAr: 'الإنفلونزا',
    patterns: [
      'I have a high fever and chills',
      'My body aches all over',
      'I feel extremely tired and weak'
    ],
    patternsAr: [
      'حرارتي مرتفعة وأشعر بالقشعريرة',
      'جسمي يؤلمني بالكامل',
      'أشعر بتعب شديد وضعف'
    ],
    response: 'Flu is a viral infection causing fever, chills, body aches, and fatigue. Rest and fluids are key, and antivirals may help if taken early.',
    responseAr: 'الإنفلونزا عدوى فيروسية تسبب الحمى، القشعريرة، آلام الجسم، والتعب. الراحة والسوائل مهمة، وقد تساعد مضادات الفيروسات إذا أُخذت مبكرًا.',
    showResponse: false
  },
  {
    tag: 'allergy',
    tagAr: 'الحساسية',
    patterns: [
      'I sneeze a lot and have itchy eyes',
      'My skin develops rashes and itches',
      'I have nasal congestion and watery eyes'
    ],
    patternsAr: [
      'أعطس كثيرًا وعيناي تحكان',
      'تظهر طفح جلدي على بشرتي وأشعر بالحكة',
      'عندي انسداد في الأنف وعيون دامعة'
    ],
    response: 'Allergies are immune responses to certain triggers like pollen or dust. Antihistamines and avoiding allergens help manage symptoms.',
    responseAr: 'الحساسية هي استجابة مناعية لمحفزات مثل الغبار أو حبوب اللقاح. مضادات الهيستامين وتجنب المسببات يساعد في تخفيف الأعراض.',
    showResponse: false
  },
  {
    tag: 'covid-19',
    tagAr: 'كوفيد-19',
    patterns: [
      'I have a cough and lost my sense of smell',
      'I feel feverish and short of breath',
      'I was exposed to someone with COVID-19 and now I feel sick'
    ],
    patternsAr: [
      'أكح وفقدت حاسة الشم',
      'أشعر بالحمى وضيق التنفس',
      'خالطت شخصًا مصابًا بكورونا والآن أشعر بالمرض'
    ],
    response: 'COVID-19 is a contagious virus with symptoms like cough, fever, and loss of smell. Isolation and medical attention are recommended.',
    responseAr: 'كوفيد-19 فيروس معدي يسبب الكحة والحمى وفقدان الشم. يُنصح بالعزل واستشارة الطبيب.',
    showResponse: false
  },
  {
    tag: 'stomach ulcer',
    tagAr: 'قرحة المعدة',
    patterns: [
      'I feel a burning pain in my stomach',
      'The pain gets worse when I’m hungry',
      'I feel nauseous and sometimes vomit'
    ],
    patternsAr: [
      'أشعر بألم حارق في معدتي',
      'يزداد الألم عندما أكون جائعًا',
      'أشعر بالغثيان وأحيانًا أتقيأ'
    ],
    response: 'Stomach ulcers are sores in the stomach lining. Symptoms include burning pain, especially when hungry. Treatment includes acid blockers and dietary changes.',
    responseAr: 'قرحة المعدة هي تقرحات في بطانة المعدة. الأعراض تشمل ألم حارق خاصة عند الجوع. العلاج يشمل مضادات الحموضة وتغيير النظام الغذائي.',
    showResponse: false
  },
  {
    tag: 'skin rash',
    tagAr: 'الطفح الجلدي',
    patterns: [
      'I have red patches on my skin',
      'My skin is itchy and irritated',
      'I developed a rash after using a new product'
    ],
    patternsAr: [
      'عندي بقع حمراء على الجلد',
      'جلدي يسبب الحكة ومتهيج',
      'ظهر لي طفح بعد استخدام منتج جديد'
    ],
    response: 'Skin rashes can be due to allergies, infections, or irritants. Avoid triggers and apply soothing creams. Seek help if it worsens.',
    responseAr: 'الطفح الجلدي قد يكون بسبب حساسية أو عدوى أو مهيجات. تجنب المحفزات واستخدم كريمات مهدئة. استشر الطبيب إذا تفاقم.',
    showResponse: false
  },
  {
    tag: 'asthma',
    tagAr: 'الربو',
    patterns: [
      'I have difficulty breathing and wheeze',
      'I get short of breath during exercise',
      'I cough a lot, especially at night'
    ],
    patternsAr: [
      'أجد صعوبة في التنفس مع صفير',
      'أشعر بضيق التنفس عند التمرين',
      'أسعل كثيرًا خاصة في الليل'
    ],
    response: 'Asthma is a chronic condition that causes airway inflammation. Inhalers and avoiding triggers help manage it effectively.',
    responseAr: 'الربو حالة مزمنة تسبب التهاب الشعب الهوائية. استخدام البخاخات وتجنب المحفزات يساعدان في التحكم به.',
    showResponse: false
  },
  {
  tag: 'arthritis',
  tagAr: 'التهاب المفاصل',
  patterns: [
    'I feel joint pain and stiffness',
    'My knees and hands hurt when I move',
    'I have swelling and difficulty moving my joints'
  ],
  patternsAr: [
    'أشعر بألم وتيبس في المفاصل',
    'ركبي وإيديا بتوجعني لما أتحرك',
    'عندي تورم وصعوبة في تحريك المفاصل'
  ],
  response: 'Arthritis causes pain and inflammation in the joints. Regular exercise, medications, and physical therapy can help manage symptoms.',
  responseAr: 'التهاب المفاصل بيسبب ألم والتهاب في المفاصل. التمارين المنتظمة والعلاج الدوائي والعلاج الطبيعي ممكن يساعدوا في تقليل الأعراض.',
  showResponse: false
}
];

  

  toggleResponse(disease: any) {
    disease.showResponse = !disease.showResponse;
  }

  toggleLanguage() {
    this.isArabic = !this.isArabic;
    document.documentElement.dir = this.isArabic ? 'rtl' : 'ltr';
  }
}

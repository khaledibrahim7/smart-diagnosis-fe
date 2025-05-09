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
      tag: 'diabetes', 
      tagAr: 'السكري', 
      patterns: [ 
        'I feel very thirsty and urinate frequently', 
        'I have blurry vision and fatigue', 
        'I lost weight without trying' 
      ], 
      patternsAr: [ 
        'أشعر بالعطش الشديد وأتبول كثيرًا', 
        'عندي رؤية ضبابية وإرهاق', 
        'فقدت وزنًا دون محاولة' 
      ], 
      response: 'Diabetes causes high blood sugar. Symptoms include thirst, frequent urination, and fatigue. Regular checkups and a healthy diet are important.',
      responseAr: 'السكري يسبب ارتفاع السكر في الدم. من الأعراض: العطش، التبول المتكرر، والإرهاق. الفحوصات المنتظمة والنظام الغذائي الصحي ضروريان.', 
      showResponse: false 
    },
    { 
      tag: 'heart disease', 
      tagAr: 'أمراض القلب', 
      patterns: [ 
        'I have chest pain and shortness of breath', 
        'I feel tired with minimal effort', 
        'My heart beats irregularly' 
      ], 
      patternsAr: [ 
        'أشعر بألم في الصدر وضيق في التنفس', 
        'أتعب بسرعة من أقل مجهود', 
        'دقات قلبي غير منتظمة' 
      ], 
      response: 'Heart disease includes conditions like coronary artery disease. Symptoms may include chest pain, fatigue, and irregular heartbeat. Seek medical attention for diagnosis and treatment.',
      responseAr: 'تشمل أمراض القلب مثل مرض الشريان التاجي. الأعراض قد تشمل ألم الصدر، التعب، وعدم انتظام ضربات القلب. يُنصح بالاستشارة الطبية للتشخيص والعلاج.',
      showResponse: false 
    },
    { 
      tag: 'cold', 
      tagAr: 'نزلات البرد', 
      patterns: [ 
        'I have a runny nose and sore throat', 
        'I am sneezing and coughing', 
        'I feel weak and have a mild fever' 
      ], 
      patternsAr: [ 
        'عندي سيلان في الأنف والتهاب بالحلق', 
        'أعطس وأكح', 
        'أشعر بالضعف وحرارتي مرتفعة قليلًا' 
      ], 
      response: 'Common colds are caused by viruses. Rest, fluids, and over-the-counter medications can help relieve symptoms. Seek medical advice if symptoms worsen.',
      responseAr: 'نزلات البرد ناتجة عن فيروسات. الراحة، السوائل، وبعض الأدوية يمكن أن تساعد في تخفيف الأعراض. استشر الطبيب إذا تفاقمت الأعراض.',
      showResponse: false 
    },
    { 
      tag: 'colon issues', 
      tagAr: 'القولون', 
      patterns: [ 
        'I feel bloated and have abdominal pain', 
        'I have gas and irregular bowel movements', 
        'I feel discomfort after eating' 
      ], 
      patternsAr: [ 
        'أشعر بالانتفاخ وألم في البطن', 
        'عندي غازات وعدم انتظام في الإخراج', 
        'أشعر بعدم الراحة بعد الأكل' 
      ], 
      response: 'Colon issues like IBS can cause bloating, cramps, and irregular digestion. A balanced diet and stress management can help reduce symptoms. Consulting a doctor may be necessary.',
      responseAr: 'مشاكل القولون مثل القولون العصبي تسبب انتفاخ وتقلصات واضطرابات في الهضم. النظام الغذائي المتوازن وتقليل التوتر يساعدان في تخفيف الأعراض. قد يكون من الضروري استشارة الطبيب.',
      showResponse: false 
    },
    { 
      tag: 'bone pain', 
      tagAr: 'وجع العظام', 
      patterns: [ 
        'My joints ache, especially in the morning', 
        'I feel pain in my knees and back', 
        'I struggle with movement' 
      ], 
      patternsAr: [ 
        'مفاصلي تؤلمني خصوصًا الصباح', 
        'أشعر بألم في الركبتين والظهر', 
        'أواجه صعوبة في الحركة' 
      ], 
      response: 'Bone pain could be due to conditions like arthritis or vitamin D deficiency. A medical consultation and supplements may help. Regular exercise can improve mobility.',
      responseAr: 'ألم العظام قد يكون بسبب التهاب المفاصل أو نقص فيتامين د. استشارة الطبيب والمكملات قد تفيد. التمرين المنتظم يمكن أن يحسن القدرة على الحركة.',
      showResponse: false 
    },
    { 
      tag: 'eye problems', 
      tagAr: 'مشاكل العيون', 
      patterns: [ 
        'I have blurry vision', 
        'My eyes are dry and itchy', 
        'I feel eye strain after using screens' 
      ], 
      patternsAr: [ 
        'رؤيتي ضبابية', 
        'عيناي جافتان وتسببان حكة', 
        'أشعر بإجهاد في عيني بعد استخدام الشاشة' 
      ], 
      response: 'Eye problems may be due to screen overuse, dryness, or needing corrective lenses. Regular eye exams and proper hydration can help maintain eye health.',
      responseAr: 'مشاكل العيون قد تكون بسبب كثرة استخدام الشاشات أو جفاف العين أو الحاجة إلى نظارات. الفحوصات المنتظمة للعيون والترطيب المناسب يمكن أن تساعد في الحفاظ على صحة العين.',
      showResponse: false 
    },
    { 
      tag: 'child illnesses', 
      tagAr: 'أمراض الأطفال', 
      patterns: [ 
        'My child has a fever and cough', 
        'He refuses to eat and looks weak', 
        'She is crying more than usual' 
      ], 
      patternsAr: [ 
        'طفلي لديه حمى وكحة', 
        'يرفض الأكل ويبدو ضعيفًا', 
        'تبكي أكثر من المعتاد' 
      ], 
      response: 'Children’s illnesses may include infections or viruses. Ensure hydration, rest, and consult a pediatrician for proper care.',
      responseAr: 'أمراض الأطفال قد تكون نتيجة عدوى أو فيروسات. تأكد من توفير السوائل والراحة واستشارة طبيب الأطفال للرعاية المناسبة.',
      showResponse: false 
    },
    { 
      tag: 'fatigue', 
      tagAr: 'الإرهاق', 
      patterns: [ 
        'I am always tired', 
        'I feel exhausted all the time', 
        'I don’t have the energy to do anything' 
      ], 
      patternsAr: [ 
        'أنا دائمًا متعب', 
        'أشعر بالإرهاق طوال الوقت', 
        'ليس لدي طاقة لفعل أي شيء' 
      ], 
      response: 'Chronic fatigue could indicate anemia, depression, or thyroid issues. A complete medical evaluation, including blood tests, is recommended.',
      responseAr: 'الإرهاق المزمن قد يشير إلى فقر الدم أو الاكتئاب أو مشاكل في الغدة الدرقية. يُنصح بإجراء تقييم طبي شامل، بما في ذلك تحاليل الدم.',
      showResponse: false 
    },
    { 
      tag: 'migraine', 
      tagAr: 'الصداع النصفي', 
      patterns: [
        'I have severe headache on one side of my head',
        'I feel nausea and light sensitivity',
        'I experience visual disturbances before the headache starts'
      ], 
      patternsAr: [
        'لدي صداع شديد في جانب واحد من رأسي',
        'أشعر بالغثيان وحساسية الضوء',
        'أعاني من اضطرابات بصرية قبل بداية الصداع'
      ], 
      response: 'Migraines are intense headaches often accompanied by nausea, light sensitivity, and visual disturbances. Avoiding triggers, using medication, and managing stress can help.',
      responseAr: 'الصداع النصفي هو صداع شديد غالبًا ما يصاحبه غثيان وحساسية للضوء واضطرابات بصرية. تجنب المحفزات، واستخدام الأدوية، وإدارة التوتر يمكن أن تساعد.',
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

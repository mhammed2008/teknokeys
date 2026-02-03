import { type User, type InsertUser, type Project, type Service, type PricingPlan, type Blog, type Partner, type Testimonial, type CompanyStats, type ContactForm } from "@shared/schema";
import { randomUUID } from "crypto";

// Initial data from TeknoKeys website
const projectsData: Project[] = [
  {
    id: "1",
    title: { en: "Mocha Hunters", ar: "موكا هانترز" },
    description: {
      en: "Mocha Hunters is a specialized platform showcasing and selling premium Yemeni coffee from the country's finest coffee-growing regions.",
      ar: "موكا هانترز منصة متخصصة في عرض وبيع القهوة اليمنية الفاخرة من أفضل مناطق زراعة البن في البلاد."
    },
    images: [
      "https://teknokeys.com/images/2025101806142%D9%85%D9%88%D9%83%D8%A7%20%D9%87%D8%A7%D9%86%D8%AA%D8%B1%D8%B2.png.webp",
      "https://teknokeys.com/images/202510180611%D9%85%D9%88%D9%83%D8%A7%20%D9%87%D8%A7%D9%86%D8%AA%D8%B1%D8%B2.png.webp"
    ],
    websiteUrl: "https://www.mochahunters.com"
  },
  {
    id: "2",
    title: { en: "Mosnad", ar: "مسند" },
    description: {
      en: "Mosnad is a platform that connects Yemeni programming talent with companies seeking tech skills, making it easier for developers to find remote jobs.",
      ar: "مسند منصة تربط المواهب البرمجية اليمنية بالشركات الباحثة عن مهارات تقنية، مما يسهل على المطورين إيجاد وظائف عن بعد."
    },
    images: [
      "https://teknokeys.com/images/202510180825Mosnad%20mockup%20.png.webp",
      "https://teknokeys.com/images/202510180824Mosnad%20mockup1%20%20.png.webp"
    ],
    websiteUrl: "https://mosnad.net"
  },
  {
    id: "3",
    title: { en: "Sana'a International Coffee Exhibition", ar: "معرض صنعاء الدولي للقهوة" },
    description: {
      en: "The Sana'a International Coffee Exhibition is an annual event held in Yemen's capital, showcasing the country's coffee industry.",
      ar: "معرض صنعاء الدولي للقهوة حدث سنوي يُقام في العاصمة اليمنية، يعرض صناعة البن في البلاد."
    },
    images: [
      "https://teknokeys.com/images/202510180934Sana%E2%80%99a%20International%20Coffee%20Exhibition%20mockup%202.png.webp",
      "https://teknokeys.com/images/202510180934Sana%E2%80%99a%20International%20Coffee%20Exhibition%20mockup%201.png.webp"
    ],
    websiteUrl: "https://sanaacoffeexpo.com/"
  },
  {
    id: "4",
    title: { en: "NASS", ar: "ناس" },
    description: {
      en: "Nass is a Yemeni all-in-one delivery platform that connects users with restaurants, supermarkets, electronics, and beauty stores across Sana'a.",
      ar: "ناس منصة توصيل يمنية شاملة تربط المستخدمين بالمطاعم والسوبرماركت ومتاجر الإلكترونيات والجمال في صنعاء."
    },
    images: [
      "https://teknokeys.com/images/202510181157nass%20mockup2.png.webp",
      "https://teknokeys.com/images/202510181155nass%20mockup.png.webp"
    ],
    playStoreUrl: "https://play.google.com/store/apps/details?id=com.teknokeys.nass",
    appStoreUrl: "https://apps.apple.com/us/app/nass-%D9%86%D8%A7%D8%B3/id6737146842"
  },
  {
    id: "5",
    title: { en: "Mocha Auction", ar: "مزاد موكا" },
    description: {
      en: "The first platform in the Arab world to bid on the finest Yemeni coffee publicly.",
      ar: "أول منصة في العالم العربي للمزايدة على أفضل القهوة اليمنية علنياً."
    },
    images: [
      "https://teknokeys.com/images/mocha_auction3.webp",
      "https://teknokeys.com/images/mocha_auction.webp",
      "https://teknokeys.com/images/mocha_auction2.webp"
    ],
    websiteUrl: "https://mocha.auction/"
  },
  {
    id: "6",
    title: { en: "Kiwi App", ar: "تطبيق كيوي" },
    description: {
      en: "An application designed to facilitate the process of purchasing vegetables and fruits via the Internet.",
      ar: "تطبيق مصمم لتسهيل عملية شراء الخضروات والفواكه عبر الإنترنت."
    },
    images: ["https://teknokeys.com/images/kiwi.webp"],
    playStoreUrl: "https://play.google.com/store/apps/details?id=com.teknokeys.kewi",
    appStoreUrl: "https://apps.apple.com/us/app/%D9%83%D9%8A%D9%88%D9%8A/id6450619705"
  },
  {
    id: "7",
    title: { en: "Giftak App & Website", ar: "تطبيق وموقع جفتاك" },
    description: {
      en: "Giftak store provides you with a faster way to choose a gift and send it to whomever you want.",
      ar: "متجر جفتاك يوفر لك طريقة أسرع لاختيار هدية وإرسالها لمن تريد."
    },
    images: ["https://teknokeys.com/images/giftak1.webp"],
    websiteUrl: "https://giftak.store/",
    playStoreUrl: "https://play.google.com/store/apps/details?id=com.Teknokeys.tahadu",
    appStoreUrl: "https://apps.apple.com/us/app/giftak-%D8%AC%D9%81%D8%AA%D8%A7%D9%83/id1605799781"
  },
  {
    id: "8",
    title: { en: "Karend App", ar: "تطبيق كاريند" },
    description: {
      en: "A cutting-edge delivery app that provides a fast, reliable and easy-to-use experience for customers and delivery drivers.",
      ar: "تطبيق توصيل متطور يوفر تجربة سريعة وموثوقة وسهلة الاستخدام للعملاء والسائقين."
    },
    images: ["https://teknokeys.com/images/karend.webp"],
    playStoreUrl: "https://play.google.com/store/apps/details?id=com.teknokeys.karend",
    appStoreUrl: "https://apps.apple.com/us/app/karend-%D9%83%D8%A7%D8%B1%D9%8A%D9%86%D8%AF/id6467630690"
  },
  {
    id: "9",
    title: { en: "Dropoff App", ar: "تطبيق دروب أوف" },
    description: {
      en: "You can shop and order food products or meals, or even deliver anything you want to anywhere.",
      ar: "يمكنك التسوق وطلب المنتجات الغذائية أو الوجبات، أو حتى توصيل أي شيء تريده إلى أي مكان."
    },
    images: ["https://teknokeys.com/images/dropoff.webp"],
    playStoreUrl: "https://play.google.com/store/apps/details?id=com.dropoff.drop_off",
    appStoreUrl: "https://apps.apple.com/us/app/dropoff-%D8%AF%D8%B1%D9%88%D8%A8-%D8%A7%D9%88%D9%81/id1609134671"
  },
  {
    id: "10",
    title: { en: "Phoenix Travel", ar: "فينكس للسفر" },
    description: {
      en: "A website dedicated to booking flights, hotels, and other travel services.",
      ar: "موقع مخصص لحجز الرحلات الجوية والفنادق وخدمات السفر الأخرى."
    },
    images: ["https://teknokeys.com/images/phoenix.webp"],
    websiteUrl: "https://www.phoenixtra.com/en"
  },
  {
    id: "11",
    title: { en: "WayTrans", ar: "واي ترانس" },
    description: {
      en: "An introductory site dedicated to packaging, shipping, customs services, and transportation services.",
      ar: "موقع تعريفي مخصص لخدمات التعبئة والشحن والجمارك والنقل."
    },
    images: ["https://teknokeys.com/images/waytrans.webp"],
    websiteUrl: "https://www.waytrans-ye.com/en"
  }
];

const servicesData: Service[] = [
  {
    id: "1",
    title: { en: "Cybersecurity & Compliance", ar: "الأمن السيبراني والامتثال" },
    description: {
      en: "Protect your digital assets and ensure compliance with global standards, boosting customer trust and reducing legal risks.",
      ar: "حماية أصولك الرقمية وضمان الامتثال للمعايير العالمية، مما يعزز ثقة العملاء ويقلل المخاطر القانونية."
    },
    features: [
      { en: "Vulnerability and penetration testing (VAPT)", ar: "اختبار الثغرات والاختراق" },
      { en: "Implementation of ISO 27001 / 27701 standards", ar: "تطبيق معايير ISO 27001 / 27701" },
      { en: "Cyber risk assessments and compliance audits", ar: "تقييمات المخاطر السيبرانية ومراجعات الامتثال" },
      { en: "Data privacy consulting (GDPR, HIPAA, CCPA)", ar: "استشارات خصوصية البيانات" },
      { en: "Regulatory alignment (SAMA, NCA, SOX, MAS-TRM)", ar: "مواءمة التنظيمات" }
    ],
    image: "https://teknokeys.com/images/cyber.webp"
  },
  {
    id: "2",
    title: { en: "Training & Capacity Building", ar: "التدريب وبناء القدرات" },
    description: {
      en: "Equip your team with practical skills that translate into real execution, and be fully prepared for future technologies.",
      ar: "زود فريقك بالمهارات العملية التي تترجم إلى تنفيذ حقيقي، وكن مستعداً تماماً للتقنيات المستقبلية."
    },
    features: [
      { en: "Digital transformation and cybersecurity training", ar: "تدريب التحول الرقمي والأمن السيبراني" },
      { en: "Tailored programs for employees and tech leaders", ar: "برامج مخصصة للموظفين وقادة التقنية" },
      { en: "Interactive learning content", ar: "محتوى تعليمي تفاعلي" },
      { en: "Specialized workshops and strategic advisory", ar: "ورش عمل متخصصة واستشارات استراتيجية" }
    ],
    image: "https://teknokeys.com/images/ISO.0.webp"
  },
  {
    id: "6",
    title: { en: "Business Solutions", ar: "حلول الأعمال" },
    description: {
      en: "Save up to 40% of your administrative time by digitizing operations with our advanced and seamlessly integrated solutions.",
      ar: "وفر حتى 40% من وقتك الإداري بتحويل العمليات رقمياً مع حلولنا المتقدمة والمتكاملة بسلاسة."
    },
    features: [
      { en: "Enterprise Resource Planning (ERP) systems", ar: "أنظمة تخطيط موارد المؤسسات" },
      { en: "Invoicing, sales, and Point-of-Sale (POS) solutions", ar: "حلول الفواتير والمبيعات ونقاط البيع" },
      { en: "Cloud-based accounting and reporting tools", ar: "أدوات المحاسبة والتقارير السحابية" },
      { en: "Human Resource Management systems", ar: "أنظمة إدارة الموارد البشرية" }
    ],
    image: "https://teknokeys.com/images/202510120858concentrated-businessman-looking-light-bulb-with-diagrams@0.5x.png.webp"
  },
  {
    id: "7",
    title: { en: "Digital Development", ar: "التطوير الرقمي" },
    description: {
      en: "Launch your digital product in under 30 days with reliable performance and a smooth user experience designed for growth.",
      ar: "أطلق منتجك الرقمي في أقل من 30 يوماً بأداء موثوق وتجربة مستخدم سلسة مصممة للنمو."
    },
    features: [
      { en: "Mobile app development (iOS – Android)", ar: "تطوير تطبيقات الجوال (iOS – Android)" },
      { en: "Custom digital platform creation", ar: "إنشاء منصات رقمية مخصصة" },
      { en: "Professional website development", ar: "تطوير مواقع ويب احترافية" },
      { en: "API integrations and system connections", ar: "تكاملات API وربط الأنظمة" }
    ],
    image: "https://teknokeys.com/images/202510121231jpeg-optimizer_html-css-collage-concept-with-person%20(1).jpg.webp"
  }
];

const pricesData: PricingPlan[] = [
  {
    id: "1",
    name: { en: "Economic", ar: "الاقتصادية" },
    price: 462,
    renewalPrice: 100,
    features: [
      { en: "10GB storage", ar: "10 جيجابايت تخزين" },
      { en: ".Com/.Net domain", ar: "نطاق .Com/.Net" },
      { en: "10 emails", ar: "10 بريد إلكتروني" },
      { en: "Single language", ar: "لغة واحدة" },
      { en: "Mobile responsive", ar: "متجاوب مع الجوال" },
      { en: "SEO optimized", ar: "محسن لمحركات البحث" }
    ],
    isPopular: false
  },
  {
    id: "2",
    name: { en: "Professional", ar: "الاحترافية" },
    price: 870,
    renewalPrice: 160,
    features: [
      { en: "70GB storage", ar: "70 جيجابايت تخزين" },
      { en: ".Com/.Net domain", ar: "نطاق .Com/.Net" },
      { en: "60 emails", ar: "60 بريد إلكتروني" },
      { en: "Two languages", ar: "لغتين" },
      { en: "Business identity", ar: "هوية تجارية" },
      { en: "Visitor analytics", ar: "تحليل الزوار" }
    ],
    isPopular: true
  },
  {
    id: "3",
    name: { en: "Advanced", ar: "المتقدمة" },
    price: 1200,
    renewalPrice: 200,
    features: [
      { en: "200GB storage", ar: "200 جيجابايت تخزين" },
      { en: ".Com/.Net domain", ar: "نطاق .Com/.Net" },
      { en: "Unlimited emails", ar: "بريد غير محدود" },
      { en: "Two languages", ar: "لغتين" },
      { en: "E-commerce ready", ar: "جاهز للتجارة" },
      { en: "Payment integration", ar: "تكامل الدفع" }
    ],
    isPopular: false
  }
];

const blogsData: Blog[] = [
  {
    id: "1",
    title: { 
      en: "The Best Mobile App Development Company in Yemen", 
      ar: "أفضل شركة تطوير تطبيقات الجوال في اليمن" 
    },
    excerpt: {
      en: "In a fast-paced world where individuals and organizations are shifting towards digital solutions, finding the right mobile app development partner is crucial.",
      ar: "في عالم سريع الخطى حيث يتحول الأفراد والمؤسسات نحو الحلول الرقمية، يعد العثور على شريك تطوير تطبيقات الجوال المناسب أمراً بالغ الأهمية."
    },
    image: "https://teknokeys.com/images/2025101508501-11.png.webp",
    url: "https://teknokeys.com/en/blog/7"
  },
  {
    id: "2",
    title: { 
      en: "The Top 5 Programming Languages for Web Application Development", 
      ar: "أفضل 5 لغات برمجة لتطوير تطبيقات الويب" 
    },
    excerpt: {
      en: "Web applications have become one of the most important tools relied upon by many people to ensure easy access to a variety of shared services online.",
      ar: "أصبحت تطبيقات الويب من أهم الأدوات التي يعتمد عليها كثير من الناس لضمان سهولة الوصول إلى مجموعة متنوعة من الخدمات المشتركة عبر الإنترنت."
    },
    image: "https://teknokeys.com/images/202310231303New%20Project%20(10).jpg.webp",
    url: "https://teknokeys.com/en/blog/programming_web_applications"
  },
  {
    id: "3",
    title: { 
      en: "The Most Common Cybersecurity Threats and Ways to Counter Them", 
      ar: "أكثر تهديدات الأمن السيبراني شيوعاً وطرق مواجهتها" 
    },
    excerpt: {
      en: "In our current era, the world is witnessing significant advancements in technology and communications, which enhances reliance on electronic systems.",
      ar: "في عصرنا الحالي، يشهد العالم تقدماً كبيراً في التكنولوجيا والاتصالات، مما يعزز الاعتماد على الأنظمة الإلكترونية."
    },
    image: "https://teknokeys.com/images/202310230748New%20Project.jpg.webp",
    url: "https://teknokeys.com/en/blog/Cybersecurity"
  },
  {
    id: "4",
    title: { 
      en: "Steps and Tips for Designing a Website Using WordPress", 
      ar: "خطوات ونصائح لتصميم موقع باستخدام ووردبريس" 
    },
    excerpt: {
      en: "Website design is a vital and crucial process in the modern web world. The website interface represents the online identity of a brand.",
      ar: "تصميم الموقع عملية حيوية وحاسمة في عالم الويب الحديث. واجهة الموقع تمثل الهوية الإلكترونية للعلامة التجارية."
    },
    image: "https://teknokeys.com/images/202310231019New%20Project%20(3).png.webp",
    url: "https://teknokeys.com/en/blog/Design-wordpress"
  },
  {
    id: "5",
    title: { 
      en: "Best App Design Company", 
      ar: "أفضل شركة تصميم تطبيقات" 
    },
    excerpt: {
      en: "In the era of modern technology and the widespread use of smartphones, mobile applications have become an essential tool in our daily lives.",
      ar: "في عصر التكنولوجيا الحديثة والاستخدام الواسع للهواتف الذكية، أصبحت تطبيقات الجوال أداة أساسية في حياتنا اليومية."
    },
    image: "https://teknokeys.com/images/202310231018New%20Project%20(7).jpg.webp",
    url: "https://teknokeys.com/en/blog/Design-Company"
  },
  {
    id: "6",
    title: { 
      en: "How to design a website", 
      ar: "كيفية تصميم موقع ويب" 
    },
    excerpt: {
      en: "Website design has become crucial in the current era because the internet has become an integral part of our daily lives.",
      ar: "أصبح تصميم المواقع أمراً حاسماً في العصر الحالي لأن الإنترنت أصبح جزءاً لا يتجزأ من حياتنا اليومية."
    },
    image: "https://teknokeys.com/images/202310231216New%20Project%20(9).jpg.webp",
    url: "https://teknokeys.com/en/blog/design-website"
  },
  {
    id: "7",
    title: { 
      en: "Best Software Company", 
      ar: "أفضل شركة برمجيات" 
    },
    excerpt: {
      en: "Programming and technology have become an integral part of our daily lives in various fields of work.",
      ar: "أصبحت البرمجة والتكنولوجيا جزءاً لا يتجزأ من حياتنا اليومية في مختلف مجالات العمل."
    },
    image: "https://teknokeys.com/images/202310231115New%20Project%20(8).jpg.webp",
    url: "https://teknokeys.com/en/blog/Software-company"
  }
];

const partnersData: Partner[] = [
  { id: "p1", name: "Partner 1", logo: "https://teknokeys.com/images/202511011129Asset%2024@3x.png.webp", type: "partner" },
  { id: "p2", name: "Partner 2", logo: "https://teknokeys.com/images/202511011129Asset%2025@3x.png.webp", type: "partner" },
  { id: "p3", name: "Partner 3", logo: "https://teknokeys.com/images/202511011129Asset%2026@3x.png.webp", type: "partner" },
  { id: "p4", name: "Partner 4", logo: "https://teknokeys.com/images/202511011129Asset%2027@3x.png.webp", type: "partner" },
  { id: "p5", name: "Partner 5", logo: "https://teknokeys.com/images/202511101202Asset%2028@3x.png.webp", type: "partner" },
  { id: "p6", name: "Partner 6", logo: "https://teknokeys.com/images/202511011127Asset%2019@3x.png.webp", type: "partner" },
  { id: "p7", name: "Partner 7", logo: "https://teknokeys.com/images/202511011128Asset%2020@3x.png.webp", type: "partner" },
  { id: "p8", name: "Partner 8", logo: "https://teknokeys.com/images/202511011128Asset%2021@3x.png.webp", type: "partner" },
  { id: "p9", name: "Partner 9", logo: "https://teknokeys.com/images/202511011128Asset%2022@3x.png.webp", type: "partner" },
  { id: "p10", name: "Partner 10", logo: "https://teknokeys.com/images/202511011128Asset%2023@3x.png.webp", type: "partner" }
];

const clientsData: Partner[] = [
  { id: "c1", name: "Client 1", logo: "https://teknokeys.com/images/202511011203Asset%2055@3x.png.webp", type: "client" },
  { id: "c2", name: "Client 2", logo: "https://teknokeys.com/images/202511011203Asset%2056@3x.png.webp", type: "client" },
  { id: "c3", name: "Client 3", logo: "https://teknokeys.com/images/202511011226Asset%2037@3x.png.webp", type: "client" },
  { id: "c4", name: "Client 4", logo: "https://teknokeys.com/images/202511011227Asset%2066@3x.png.webp", type: "client" },
  { id: "c5", name: "Client 5", logo: "https://teknokeys.com/images/202511011227Asset%2067@3x.png.webp", type: "client" },
  { id: "c6", name: "Client 6", logo: "https://teknokeys.com/images/202511011138Asset%2035@3x.png.webp", type: "client" },
  { id: "c7", name: "Client 7", logo: "https://teknokeys.com/images/202511011139Asset%2038@3x.png.webp", type: "client" },
  { id: "c8", name: "Client 8", logo: "https://teknokeys.com/images/202511011139Asset%2039@3x.png.webp", type: "client" },
  { id: "c9", name: "Client 9", logo: "https://teknokeys.com/images/202511011139Asset%2040@3x.png.webp", type: "client" },
  { id: "c10", name: "Client 10", logo: "https://teknokeys.com/images/202511011139Asset%2041@3x.png.webp", type: "client" },
  { id: "c11", name: "Client 11", logo: "https://teknokeys.com/images/202511011139Asset%2042@3x.png.webp", type: "client" },
  { id: "c12", name: "Client 12", logo: "https://teknokeys.com/images/202511011151Asset%2044@3x.png.webp", type: "client" }
];

const testimonialsData: Testimonial[] = [
  {
    id: "t1",
    name: { en: "Rifaat Al-Hajj", ar: "رفعت الحاج" },
    company: { en: "Kuraimi Bank", ar: "بنك الكريمي" },
    content: {
      en: "We had the pleasure of dealing with Technokes, great efficiency and getting the work done in a fast schedule. All the best to you",
      ar: "سعدنا بالتعامل مع تكنوكيز، كفاءة عالية وإنجاز العمل في جدول زمني سريع. كل التوفيق لكم"
    }
  },
  {
    id: "t2",
    name: { en: "Hassan Al Masawi", ar: "حسن المساوي" },
    company: { en: "Golden HAWK", ar: "الصقر الذهبي" },
    content: {
      en: "Our business association with Technokes has given us a unique and successful business. Great team and successful management. Best wishes to Technokes",
      ar: "شراكتنا التجارية مع تكنوكيز أعطتنا عملاً فريداً وناجحاً. فريق رائع وإدارة ناجحة. أطيب التمنيات لتكنوكيز"
    }
  },
  {
    id: "t3",
    name: { en: "Lina Al-Eryani", ar: "لينا الإرياني" },
    company: { en: "YKB", ar: "YKB" },
    content: {
      en: "Unusual graphic designs and animations, fast delivery and achievements, perfect management",
      ar: "تصاميم جرافيكية ورسوم متحركة غير عادية، تسليم وإنجازات سريعة، إدارة مثالية"
    }
  },
  {
    id: "t4",
    name: { en: "Bassam Abdel Wahab", ar: "بسام عبد الوهاب" },
    company: { en: "SAM WATER", ar: "سام واتر" },
    content: {
      en: "One of the best companies I have dealt with. They are top of the line ethics, flexibility, punctuality, and best of all their clean work",
      ar: "من أفضل الشركات التي تعاملت معها. أعلى مستوى من الأخلاق والمرونة والالتزام بالمواعيد، والأفضل عملهم النظيف"
    }
  }
];

const statsData: CompanyStats = {
  cybersecurityProjects: 11,
  mobileWebProjects: 13,
  serviceGuarantee: "3%",
  totalDevelopment: "10+"
};

// Storage interface
export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getProjects(): Promise<Project[]>;
  getServices(): Promise<Service[]>;
  getPrices(): Promise<PricingPlan[]>;
  getBlogs(): Promise<Blog[]>;
  getPartners(): Promise<Partner[]>;
  getClients(): Promise<Partner[]>;
  getTestimonials(): Promise<Testimonial[]>;
  getStats(): Promise<CompanyStats>;
  saveContactMessage(message: ContactForm): Promise<void>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private contactMessages: ContactForm[];

  constructor() {
    this.users = new Map();
    this.contactMessages = [];
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getProjects(): Promise<Project[]> {
    return projectsData;
  }

  async getServices(): Promise<Service[]> {
    return servicesData;
  }

  async getPrices(): Promise<PricingPlan[]> {
    return pricesData;
  }

  async getBlogs(): Promise<Blog[]> {
    return blogsData;
  }

  async getPartners(): Promise<Partner[]> {
    return partnersData;
  }

  async getClients(): Promise<Partner[]> {
    return clientsData;
  }

  async getTestimonials(): Promise<Testimonial[]> {
    return testimonialsData;
  }

  async getStats(): Promise<CompanyStats> {
    return statsData;
  }

  async saveContactMessage(message: ContactForm): Promise<void> {
    this.contactMessages.push(message);
    console.log("Contact message saved:", message);
  }
}

export const storage = new MemStorage();

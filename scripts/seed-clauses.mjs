/**
 * Seed Script: 6 Mandatory Contract Clauses for RashX Platform Agreements
 * Run with: node scripts/seed-clauses.mjs
 * 
 * All clauses are written in professional legal Arabic, tailored for SaaS/Salon operational agreements,
 * and explicitly marked: [مسودة قانونية للاسترشاد والمراجعة القانونية - DRAFT TEXT FOR LEGAL REVIEW].
 */

import fs from 'node:fs';
import path from 'node:path';
import { getApps, initializeApp, cert } from 'firebase-admin/app';
import { getFirestore, FieldValue } from 'firebase-admin/firestore';

// Load .env.local if present
const envPath = path.resolve(process.cwd(), '.env.local');
if (fs.existsSync(envPath) && typeof process.loadEnvFile === 'function') {
  process.loadEnvFile(envPath);
}

const projectId = process.env.FIREBASE_PROJECT_ID || process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'aya2-a5057';
const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
function formatPrivateKey(key) {
  if (!key) return undefined;
  let formatted = key.trim();
  while (
    (formatted.startsWith('"') && formatted.endsWith('"')) ||
    (formatted.startsWith("'") && formatted.endsWith("'"))
  ) {
    formatted = formatted.slice(1, -1).trim();
  }
  return formatted.replace(/\r/g, '').replace(/\\n/g, '\n');
}

const privateKey = formatPrivateKey(process.env.FIREBASE_PRIVATE_KEY);

if (!getApps().length) {
  if (clientEmail && privateKey) {
    initializeApp({
      credential: cert({
        projectId,
        clientEmail,
        privateKey,
      }),
      projectId,
    });
  } else {
    initializeApp({
      projectId,
    });
  }
}

const db = getFirestore();

export const MANDATORY_CLAUSES = [
  {
    id: 'clause-scope-of-service',
    order: 1,
    title: 'نطاق الخدمات وتراخيص الاستخدام السحابي',
    mandatory: true,
    active: true,
    body: `[مسودة قانونية للاسترشاد والمراجعة القانونية - DRAFT TEXT FOR LEGAL REVIEW]
تمنح منصة راش إكس (الطرف الأول) المنشأة المشتركة (الطرف الثاني) ترخيصاً سحابياً غير حصري وغير قابل للتحويل لاستخدام منظومة راش إكس لتشغيل الصالونات، والتي تشمل نظام نقطة البيع (POS)، إدارة الحجوزات والمواعيد، ملفات العملاء، حسابات العمولات وسجلات المخزون طوال فترة سريان الاشتراك المعتمدة في هذا العقد. وتظل كافة حقوق الملكية الفكرية والأكواد البرمجية والعلامات التجارية ملكاً حصرياً للطرف الأول.`,
  },
  {
    id: 'clause-payment-terms',
    order: 2,
    title: 'المقابل المالي وشروط الدفع والفوترة',
    mandatory: true,
    active: true,
    body: `[مسودة قانونية للاسترشاد والمراجعة القانونية - DRAFT TEXT FOR LEGAL REVIEW]
يلتزم الطرف الثاني بسداد المقابل المالي المتفق عليه بالريال السعودي (SAR) مقدماً وفق الباقة المحددة وطريقة السداد المبينة في هذا المستند. وتُضاف ضريبة القيمة المضافة بالنسبة المقررة نظاماً في المملكة العربية السعودية إن كانت المنشأة مسجلة ضريبياً، ولا يُعد الاشتراك مفعلاً بشكل نهائي إلا بعد تسوية المستحقات البنكية ووصول إشعار التحويل الرسمي للطرف الأول.`,
  },
  {
    id: 'clause-term-and-termination',
    order: 3,
    title: 'مدة العقد وسريانه وإنهاؤه',
    mandatory: true,
    active: true,
    body: `[مسودة قانونية للاسترشاد والمراجعة القانونية - DRAFT TEXT FOR LEGAL REVIEW]
يبدأ سريان هذا العقد من تاريخ البدء الموضح في الصفحة الأولى ولمدة سنة ميلادية كاملة، ويتجدد تلقائياً لمدد مماثلة ما لم يُخطر أحد الطرفين الآخر كتابياً بعدم الرغبة في التجديد قبل ثلاثين (30) يوماً على الأقل من تاريخ انتهاء الفترة الحالية. يحق لأي من الطرفين إنهاء العقد فوراً في حال الإخلال الجوهري بأي من الالتزامات التعاقدية دون معالجة خلال خمسة عشر (15) يوماً من تاريخ الإشعار الكتابي.`,
  },
  {
    id: 'clause-confidentiality-privacy',
    order: 4,
    title: 'سرية المعلومات وحماية البيانات الشخصية',
    mandatory: true,
    active: true,
    body: `[مسودة قانونية للاسترشاد والمراجعة القانونية - DRAFT TEXT FOR LEGAL REVIEW]
يلتزم الطرفان بالحفاظ التام على سرية البيانات التشغيلية والتجارية، وتتعهد منصة راش إكس بالامتثال الكامل لنظام حماية البيانات الشخصية (PDPL) المعمول به في المملكة العربية السعودية، واتخاذ كافة التدابير الأمنية والتقنية اللازمة لمنع تسريب بيانات العملاء أو الوصول غير المصرح به إليها، وعدم استغلال بيانات الصالون أو عملائه لأي أغراض تجارية خارج نطاق هذا التعاقد.`,
  },
  {
    id: 'clause-limitation-of-liability',
    order: 5,
    title: 'حدود المسؤولية والضمانات الفنية',
    mandatory: true,
    active: true,
    body: `[مسودة قانونية للاسترشاد والمراجعة القانونية - DRAFT TEXT FOR LEGAL REVIEW]
تبذل راش إكس العناية المهنية المعيارية لضمان جاهزية المنظومة السحابية بنسبة توافر لا تقل عن 99.5% على مدار العام. ولا تتحمل المنصة في أي حال من الأحوال أي أضرار غير مباشرة أو تبعية أو فوات أرباح ناتجة عن انقطاع خدمات مزودي الاتصالات أو الأعطال العامة لشبكة الإنترنت، وتقتصر أقصى مسؤولية مالية للمنصة عن مجمل الأضرار على إجمالي قيمة الاشتراك الفعلي المدفوعة عن المدة محل النزاع.`,
  },
  {
    id: 'clause-governing-law-jurisdiction',
    order: 6,
    title: 'القانون الواجب التطبيق والاختصاص القضائي - المملكة العربية السعودية',
    mandatory: true,
    active: true,
    body: `[مسودة قانونية للاسترشاد والمراجعة القانونية - DRAFT TEXT FOR LEGAL REVIEW]
يخضع هذا العقد ويفسر حصرياً وفقاً للأنظمة واللوائح والقرارات السارية في المملكة العربية السعودية. وفي حال نشوء أي خلاف أو نزاع حول تفسير أو تطبيق بنود هذا العقد، يتم السعي لحله ودياً خلال ثلاثين (30) يوماً، فإن تعذر ذلك، ينعقد الاختصاص القضائي النهائي والحصري للمحاكم التجارية المختصة في مدينة الرياض بالمملكة العربية السعودية.`,
  },
];

async function seedClauses() {
  console.log(`Starting to seed ${MANDATORY_CLAUSES.length} mandatory clauses into collection: contract_clauses...`);

  const batch = db.batch();

  for (const clause of MANDATORY_CLAUSES) {
    const ref = db.collection('contract_clauses').doc(clause.id);
    batch.set(
      ref,
      {
        ...clause,
        createdAt: FieldValue.serverTimestamp(),
        updatedAt: FieldValue.serverTimestamp(),
      },
      { merge: true }
    );
  }

  await batch.commit();
  console.log('Successfully seeded all 6 mandatory clauses into Firestore!');
}

seedClauses()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error('Error seeding contract clauses:', err);
    process.exit(1);
  });

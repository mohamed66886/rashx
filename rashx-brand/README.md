# RASHX — Brand Kit / هوية راش اكس

كل الملفات SVG متتبّعة من التصميم الأصلي (الحروف paths مش خط).

## Structure
- `logo/wordmark` — RASHX (Rx بدل R)
- `logo/wordmark-arabic` — راش اكس + Rx
- `logo/symbol-rx` — رمز Rx
- `logo/lockup-bilingual` — عربي + إنجليزي
  (كل لوجو: `-black` / `-white` شفاف، و `-on-black` / `-on-white` / `-on-blue` / `-on-peach` / `-on-mist` بخلفية)
- `icons/` — app icons + favicons
- `social/` — avatars, covers, OG share
- `documents/` — ورق رسمي (EN/AR)، فاتورة، كروت، ظرف، توقيع إيميل، قوالب بريزنتيشن
- `email/` — توقيع إيميل (HTML + SVG)، قالب رسالة EN/AR، هيدر، ونسخ PNG للوجو (`images/`)
- `fonts/` — إعداد الخط Ping AR + LT (`fonts.css` + README) — حط ملفات الخط فيه
- `guidelines.svg` — صفحة إرشادات

## Colours
- Primary · Dusty Blue `#91B8C0`
- Secondary · Warm Peach `#F0C5AE`
- Base · White `#FFFFFF`
- Neutral · Mist Gray `#E5E9E8`
- Ink `#000000` للوجو والنصوص · `#5E6665` للنصوص الثانوية

> الأزرق والخوخي تباينهم ضعيف مع الأبيض (حوالي 2:1)، فاستخدمهم كخلفيات وتفاصيل، واللوجو والنص أسود فوقهم.

## Typography
الخط: **Ping AR + LT** — Regular 400 · Medium 500 · Bold 700 · Extra Bold 800. الخط مرخّص ومش مضمّن، شوف `fonts/README.md`.

## Email
Gmail وOutlook مش بيعرضوا SVG، فاستخدم صور `email/images/` (PNG) وارفعها على موقعك وغيّر روابط `src` في ملفات HTML قبل الاستخدام.

## Notes
- النصوص بين [ ] placeholders للتعديل.
- الرمز Rx هو العلامة المختصرة.

/**
 * Site Data & Content Mirror for IMRango
 * Contains data structures aligned with _data/*.yml and page front matter
 */

export interface FAQItem {
  q: string;
  a: string;
}

export interface RelatedItem {
  title: string;
  desc: string;
  url: string;
}

export interface ToolDef {
  slug: string;
  title: string;
  description: string;
  intent: string;
  badge?: string;
  icon: string;
  lastReviewed: string;
  sources: string[];
  faq: FAQItem[];
  relatedTool?: RelatedItem;
  relatedGuide?: RelatedItem;
}

export interface GuideDef {
  slug: string;
  title: string;
  description: string;
  intent: string;
  lastReviewed: string;
  sources: string[];
  faq: FAQItem[];
  relatedTool?: RelatedItem;
  relatedGuide?: RelatedItem;
}

export const SIZES_DATA = {
  bands: [
    { us_uk: 28, eu_jp: 60, au: 6, fr: 75, it: 0, minIn: 27, maxIn: 29 },
    { us_uk: 30, eu_jp: 65, au: 8, fr: 80, it: 1, minIn: 29, maxIn: 31 },
    { us_uk: 32, eu_jp: 70, au: 10, fr: 85, it: 2, minIn: 31, maxIn: 33 },
    { us_uk: 34, eu_jp: 75, au: 12, fr: 90, it: 3, minIn: 33, maxIn: 35 },
    { us_uk: 36, eu_jp: 80, au: 14, fr: 95, it: 4, minIn: 35, maxIn: 37 },
    { us_uk: 38, eu_jp: 85, au: 16, fr: 100, it: 5, minIn: 37, maxIn: 39 },
    { us_uk: 40, eu_jp: 90, au: 18, fr: 105, it: 6, minIn: 39, maxIn: 41 },
    { us_uk: 42, eu_jp: 95, au: 20, fr: 110, it: 7, minIn: 41, maxIn: 43 },
    { us_uk: 44, eu_jp: 100, au: 22, fr: 115, it: 8, minIn: 43, maxIn: 45 },
    { us_uk: 46, eu_jp: 105, au: 24, fr: 120, it: 9, minIn: 45, maxIn: 47 },
    { us_uk: 48, eu_jp: 110, au: 26, fr: 125, it: 10, minIn: 47, maxIn: 49 },
    { us_uk: 50, eu_jp: 115, au: 28, fr: 130, it: 11, minIn: 49, maxIn: 51 },
  ],
  cups: [
    { diffIn: 0, diffCm: 0, us: 'AA', uk: 'AA', eu: 'AA', au: 'AA' },
    { diffIn: 1, diffCm: 2.5, us: 'A', uk: 'A', eu: 'A', au: 'A' },
    { diffIn: 2, diffCm: 5.0, us: 'B', uk: 'B', eu: 'B', au: 'B' },
    { diffIn: 3, diffCm: 7.5, us: 'C', uk: 'C', eu: 'C', au: 'C' },
    { diffIn: 4, diffCm: 10.0, us: 'D', uk: 'D', eu: 'D', au: 'D' },
    { diffIn: 5, diffCm: 12.5, us: 'DD', uk: 'DD', eu: 'E', au: 'DD' },
    { diffIn: 6, diffCm: 15.0, us: 'DDD/F', uk: 'E', eu: 'F', au: 'E' },
    { diffIn: 7, diffCm: 17.5, us: 'G', uk: 'F', eu: 'G', au: 'F' },
    { diffIn: 8, diffCm: 20.0, us: 'H', uk: 'FF', eu: 'H', au: 'FF' },
    { diffIn: 9, diffCm: 22.5, us: 'I', uk: 'G', eu: 'I', au: 'G' },
    { diffIn: 10, diffCm: 25.0, us: 'J', uk: 'GG', eu: 'J', au: 'GG' },
    { diffIn: 11, diffCm: 27.5, us: 'K', uk: 'H', eu: 'K', au: 'H' },
    { diffIn: 12, diffCm: 30.0, us: 'L', uk: 'HH', eu: 'L', au: 'HH' },
  ],
  cupProgressionUS: ['AA', 'A', 'B', 'C', 'D', 'DD', 'DDD/F', 'G', 'H', 'I', 'J', 'K', 'L'],
  cupProgressionUK: ['AA', 'A', 'B', 'C', 'D', 'DD', 'E', 'F', 'FF', 'G', 'GG', 'H', 'HH', 'J', 'JJ'],
  cupProgressionEU: ['AA', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'],
};

export const BRANDS_DATA = [
  { id: 'panache', name: 'Panache', origin: 'UK', system: 'UK', bandFit: 'Firm & Snug', cupDepth: 'Deep & Projected', notes: 'Engineered with firm band elastic for heavy bust support. UK cup progression.' },
  { id: 'freya', name: 'Freya', origin: 'UK', system: 'UK', bandFit: 'True to Size / Soft Elastic', cupDepth: 'Projected', notes: 'Slightly wider underwires than Panache. Extremely comfortable for everyday wear.' },
  { id: 'wacoal', name: 'Wacoal', origin: 'US', system: 'US', bandFit: 'Very Firm / Runs Small', cupDepth: 'Average to Shallow', notes: 'Bands have little give. Many fitters suggest one sister size up in band.' },
  { id: 'victorias-secret', name: 'Victoria\'s Secret', origin: 'US', system: 'US', bandFit: 'Stretchy / Vanity Fit', cupDepth: 'Shallow to Average', notes: 'Bands stretch rapidly. Ensure you clasp on the loosest hook when new.' },
  { id: 'natori', name: 'Natori', origin: 'US', system: 'US', bandFit: 'True to Size', cupDepth: 'Shallow', notes: 'The famous Feathers bra is very shallow at the wire. Projected busts should size up 1 cup.' },
  { id: 'thirdlove', name: 'ThirdLove', origin: 'US', system: 'US', bandFit: 'True to Size', cupDepth: 'Average', notes: 'Features half-cup increments (A 1/2, B 1/2, C 1/2) for nuanced bridge sizes.' },
  { id: 'aerie', name: 'Aerie', origin: 'US', system: 'US', bandFit: 'Soft / Forgiving', cupDepth: 'Average', notes: 'Comfort-focused, ideal for everyday casual wear up to US DDD cups.' },
  { id: 'skims', name: 'Skims', origin: 'US', system: 'US', bandFit: 'Compressive / Snug', cupDepth: 'Shallow to Average', notes: 'Sculpting compression means bands run 0.5 to 1 size tight.' },
  { id: 'elomi', name: 'Elomi', origin: 'UK', system: 'UK', bandFit: 'True to Size / Supportive', cupDepth: 'Deep', notes: 'Premier full-figure and plus-size brand (bands 32-48, cups D-K). Great gore tack.' },
  { id: 'curvy-kate', name: 'Curvy Kate', origin: 'UK', system: 'UK', bandFit: 'Snug', cupDepth: 'Medium to Deep', notes: 'Fun styles for D+ busts with narrow center gores for close-set breasts.' },
];

export const SYMPTOMS_DATA = [
  {
    id: 'band_rides_up',
    title: 'Band rides up towards shoulder blades',
    cause: 'The band is too loose. A bra band should sit level and parallel to the ground. When it rides up, the straps are carrying breast weight instead of the band.',
    fix: 'Decrease your band size by 1 (e.g. from 36C to 34D). Remember to sister size UP in cup to keep the same cup volume!',
    shift: 'Drop 1 Band, Go Up 1 Cup',
  },
  {
    id: 'band_digs_painfully',
    title: 'Band feels painfully tight or leaves deep welts',
    cause: 'Either the band is genuinely too small, OR the cups are too small. When cups are too shallow, breasts push the whole bra outwards, jamming the band into your ribs.',
    fix: 'Test band upside-down with cups hanging down your back. If the band feels comfortable backward, your band size is correct and your CUPS are too small!',
    shift: 'Keep Band, Go Up 1-2 Cups',
  },
  {
    id: 'straps_slipping',
    title: 'Shoulder straps repeatedly slide down',
    cause: 'Loose band allowing the back to rise and slacken straps, or straps set too far apart for narrow shoulders.',
    fix: 'Tighten band size so the foundation stays anchored. Look for center-pull straps, racerback converters, or full-cup designs.',
    shift: 'Drop 1 Band Size',
  },
  {
    id: 'straps_digging',
    title: 'Straps dig painfully into shoulders / leave red grooves',
    cause: '85% to 90% of breast support must come from the band, only 10% from straps. When straps dig, the band is too loose and not anchoring weight.',
    fix: 'Drop 1 band size and go up 1 cup size (sister sizing). Once the band is snug on the loosest hook, your shoulders will be relieved.',
    shift: 'Drop 1 Band, Go Up 1 Cup',
  },
  {
    id: 'quad_boob_spillage',
    title: 'Breast tissue spills over top or sides of cups (double-boob)',
    cause: 'The cup volume is too small, or the cup neckline is too closed/restrictive for your upper fullness.',
    fix: 'Increase cup size by 1 or 2 letters (e.g. 34D to 34DD or 34DDD). If you have upper fullness, try balcony or half-cup styles.',
    shift: 'Go Up 1 to 2 Cup Letters',
  },
  {
    id: 'cup_gaping_wrinkling',
    title: 'Cups gap, wrinkle, or have empty space at the top',
    cause: 'Could be cups too large, but frequently it is a shape mismatch (molded foam cup on projected breasts) or band too loose tilting the cups outward.',
    fix: 'Ensure band is properly snug. If band is good, try soft unlined seamed cups or plunge cuts that conform naturally to breast tissue.',
    shift: 'Verify Band Snugness, Try Unlined Cut',
  },
  {
    id: 'wires_poking_breast',
    title: 'Underwire pokes breast tissue under armpits or on side',
    cause: 'Underwire is sitting on top of sensitive breast tissue instead of encasing it against the ribcage. The cup is too small or wires too narrow.',
    fix: 'Move up 1 or 2 cup sizes to get wider wires, and swoop & scoop all breast tissue into the cup when putting the bra on.',
    shift: 'Go Up 1 to 2 Cup Letters',
  },
  {
    id: 'gore_floating',
    title: 'Center gore (bridge between cups) does not touch sternum',
    cause: 'The cups are too small or shallow, forcing the bridge away from your chest wall. The band may also be too loose.',
    fix: 'Go up 1 to 2 cup sizes until the underwires fully frame each breast and the center gore tacks flat against your breastbone.',
    shift: 'Go Up 1 to 2 Cup Letters',
  },
  {
    id: 'wires_slide_down',
    title: 'Underwires slide down onto stomach below inframammary fold',
    cause: 'Cups are too shallow right at the wire (immediate projection missing), or band is too tight pushing wires down.',
    fix: 'Switch to bras with vertical seams and immediate lower cup projection (such as Polish or British unlined cut-and-sewn bras).',
    shift: 'Seek Projected / Seamed Cup Styles',
  },
];

export const TOOLS_LIST: ToolDef[] = [
  {
    slug: 'bra-size-calculator',
    title: 'Universal Bra Size Calculator',
    description: 'Calculate your true bra size, cup size, and bust dimensions using precise modern measuring math for US, UK, EU, and AU sizing systems without outdated +4 inch errors.',
    intent: 'Find accurate bra size and international cup conversions',
    badge: 'Hub',
    icon: 'Ruler',
    lastReviewed: '2026-03-15',
    sources: [
      'International Standard ISO 8559-1: Size designation of clothes',
      'British Standards Institution BS 6183: Bra Sizing and Fit Specifications',
      'Journal of Science and Medicine in Sport: Breast biomechanics and support garment mechanics',
    ],
    faq: [
      { q: 'Why is my calculated bra size so different from the size I usually buy?', a: 'Over 80% of individuals wear a band that is 1 to 2 sizes too large and cups that are 2 to 4 sizes too small. Traditional retail stores add 4 inches to your underbust (+4 method) to squeeze you into their limited matrix (32A-38DD). IMRango uses direct snug underbust measurement to give you real support from the band.' },
      { q: 'What is the difference between US and UK cup sizes?', a: 'Both US and UK systems start with A, B, C, D, DD. Above DD, the UK system progresses as E, F, FF, G, GG, H, HH, J, whereas the US system uses DDD/F, G, H, I, J, K. UK sizing is prized worldwide for greater consistency in D+ cups.' },
      { q: 'Should I wear a bra when measuring my bust?', a: 'Measure without a bra or in an unpadded, non-push-up bra. For the most accurate result, taking leaning bust measurements accounts for tissue projection and prevents under-estimating cup volume.' },
    ],
    relatedTool: { title: 'Sister Size Calculator', desc: 'Find identical cup volumes with looser or firmer bands.', url: '/sister-size-calculator' },
    relatedGuide: { title: 'How to Measure Bra Size at Home', desc: 'Step-by-step guide with tape positioning tips.', url: '/how-to-measure-bra-size-at-home' },
  },
  {
    slug: 'bra-fit-checker',
    title: 'Bra Fit Checker & Problem Solver',
    description: 'Diagnose gaping cups, slipping straps, riding bands, or digging wires. Get immediate anatomical troubleshooting and adjusted size recommendations.',
    intent: 'Troubleshoot bra fit issues and find corrective sizing solutions',
    icon: 'ShieldAlert',
    lastReviewed: '2026-03-12',
    sources: ['Textile Institute: Ergonomics of Intimate Apparel & Skin Pressure Points', 'Association of Professional Bra Fitters Fit Matrix Guidelines'],
    faq: [
      { q: 'Why do my straps keep slipping off my shoulders?', a: 'Straps sliding down is almost always caused by a band that is too large. When your band rides up your back, it releases tension on the straps, making them fall down. Tightening the band fixes this issue in 90% of cases.' },
      { q: 'What should I do if the gore doesn\'t lay flat against my chest?', a: 'If the center gore floats or perches away from your sternum, your cup volume is too small or the cup profile is too shallow for your natural projection. Move up 1 to 2 cup sizes.' },
    ],
    relatedTool: { title: 'Universal Bra Size Calculator', desc: 'Measure yourself with our verified modern standard.', url: '/bra-size-calculator' },
    relatedGuide: { title: '9 Signs Your Bra Doesn\'t Fit', desc: 'Comprehensive photographic checklist of improper fit indicators.', url: '/signs-your-bra-doesnt-fit' },
  },
  {
    slug: 'bra-size-to-measurements',
    title: 'Bra Size to Measurements Converter',
    description: 'Reverse engineer any bra size to see exactly what underbust and bust measurements in inches and centimeters fit that size.',
    intent: 'Reverse calculate bust and ribcage measurements from bra size',
    icon: 'ArrowLeftRight',
    lastReviewed: '2026-03-10',
    sources: ['ASTM D5586: Standard Tables of Body Measurements for Apparel Sizing'],
    faq: [
      { q: 'Can two people with the same bra size have different body dimensions?', a: 'Yes. For example, a 34D fits someone with a 33-35 inch underbust and a 37-39 inch bust. Ribcage shape, posture, and breast projection vary across people with identical circumference numbers.' },
    ],
    relatedTool: { title: 'Universal Bra Size Calculator', desc: 'Calculate size directly from your body measurements.', url: '/bra-size-calculator' },
    relatedGuide: { title: 'Universal Bra Measurement Chart', desc: 'Complete lookup table for all global band and cup numbers.', url: '/bra-measurement-chart' },
  },
  {
    slug: 'sister-size-calculator',
    title: 'Sister Size Calculator',
    description: 'Discover equivalent bra cup volumes across different band sizes. If your band is too tight or riding up, find your exact sister size alternative instantly.',
    intent: 'Find sister bra sizes with identical cup volume',
    icon: 'Sparkles',
    lastReviewed: '2026-03-14',
    sources: ['Lingerie Design and Pattern Making: Cup Grading Dynamics'],
    faq: [
      { q: 'What is a sister size?', a: 'Sister sizes are pairs of bra sizes that share the exact same cup volume, but have different band lengths. For example, 32D, 34C, and 36B hold the exact same volume of breast tissue in their cups.' },
      { q: 'When should I sister size down?', a: 'Sister size down (smaller band, larger cup letter) when your bra band is riding up your back, your shoulder straps are bearing all the weight, or you have to clasp the bra on the tightest hooks right after buying it.' },
    ],
    relatedTool: { title: 'Universal Bra Size Calculator', desc: 'Establish your starting benchmark measurements.', url: '/bra-size-calculator' },
    relatedGuide: { title: 'Sister Sizing Explained', desc: 'The geometry of why cup volume scales inversely with band length.', url: '/sister-sizing-explained' },
  },
  {
    slug: 'brand-size-converter',
    title: 'Brand Size Converter',
    description: 'Translate your universal bra size across major lingerie brands like Victoria\'s Secret, Panache, Freya, Wacoal, Natori, Skims, and ThirdLove.',
    intent: 'Compare and convert bra sizes between different commercial lingerie brands',
    icon: 'Tag',
    lastReviewed: '2026-03-08',
    sources: ['Comparative Technical Evaluation of Commercial Bra Patterns'],
    faq: [
      { q: 'Why do I wear different sizes in different brands?', a: 'Every brand drafts on their own fit models with unique wire widths, cup depths, and band elastic resistance. For example, Wacoal bands are very firm with little stretch, while Victoria\'s Secret bands are stretchy and often run loose.' },
    ],
    relatedTool: { title: 'Universal Bra Size Calculator', desc: 'Get your calibrated true bra size.', url: '/bra-size-calculator' },
    relatedGuide: { title: 'Universal Bra Measurement Chart', desc: 'Examine international band and cup conversion tables.', url: '/bra-measurement-chart' },
  },
  {
    slug: 'sports-bra-calculator',
    title: 'Sports Bra Calculator',
    description: 'Calculate your sports bra size and determine whether compression, encapsulation, or hybrid support is best for your cup volume and workout impact level.',
    intent: 'Find sports bra sizes and encapsulation vs compression styles',
    icon: 'Activity',
    lastReviewed: '2026-03-05',
    sources: ['University of Portsmouth Research Group in Breast Health: Biomechanics of breast motion during exercise'],
    faq: [
      { q: 'What is the difference between compression and encapsulation sports bras?', a: 'Compression bras press breasts against the chest wall as a single unit, best for smaller cup sizes (A-C) and low-impact workouts. Encapsulation bras surround and support each breast individually with molded cups or underwire, reducing up to 83% of movement across all directions, essential for D+ busts.' },
    ],
    relatedTool: { title: 'Universal Bra Size Calculator', desc: 'Establish your everyday bra foundation.', url: '/bra-size-calculator' },
    relatedGuide: { title: 'How to Measure for a Sports Bra', desc: 'Detailed guide on breast bounce reduction and strap stability.', url: '/how-to-measure-sports-bra' },
  },
  {
    slug: 'maternity-nursing-bra-calculator',
    title: 'Maternity & Nursing Bra Calculator',
    description: 'Calculate your bra size through every trimester of pregnancy and postpartum nursing, accounting for rib expansion, hormone shifts, and milk supply changes.',
    intent: 'Calculate bra sizes during pregnancy and postpartum breastfeeding',
    icon: 'Heart',
    lastReviewed: '2026-03-02',
    sources: ['Obstetric Anatomy: Changes in thoracic circumference and glandular mammary volume during gestation'],
    faq: [
      { q: 'When is the best time to buy nursing bras?', a: 'Purchase transitional wireless bras around week 12-16 when rib flare begins, and buy your primary nursing bras around week 36-38 of pregnancy. At week 36, your ribcage has expanded fully and your cup volume is close to what you will need once your milk regulates.' },
    ],
    relatedTool: { title: 'Universal Bra Size Calculator', desc: 'Compare against your pre-pregnancy baseline.', url: '/bra-size-calculator' },
    relatedGuide: { title: 'How to Measure Band Size Correctly', desc: 'Understanding rib cage expansion and diaphragm movement.', url: '/how-to-measure-band-size' },
  },
  {
    slug: 'plus-size-bra-calculator',
    title: 'Plus-Size Bra Calculator',
    description: 'Tailored sizing calculations for bands 38 and above and cups DD through O, accounting for torso compressibility, wire width, and breast projection.',
    intent: 'Calculate accurate plus-size bra dimensions with firm band support',
    icon: 'Feather',
    lastReviewed: '2026-03-01',
    sources: ['International Plus-Size Garment Grading Protocols'],
    faq: [
      { q: 'Why should plus size individuals often size down in the band?', a: 'Plus size ribcages have more soft subcutaneous tissue that compresses easily. If you choose a loose band, the bra slides around and forces the shoulder straps to carry all the weight. A firm, snug band anchors the bra and relieves back pain.' },
    ],
    relatedTool: { title: 'Universal Bra Size Calculator', desc: 'Compare against universal measurement standards.', url: '/bra-size-calculator' },
    relatedGuide: { title: 'Bra Cup Size Guide', desc: 'Visual depth chart and volume equivalents across US and UK lettering.', url: '/bra-cup-size-guide' },
  },
  {
    slug: 'mens-bra-calculator',
    title: 'Men\'s Bra Calculator',
    description: 'Precision sizing for men with gynecomastia, broad chest frames, runner\'s nipple protection, or transgender and non-binary individuals.',
    intent: 'Calculate bra sizes for male anatomy and gynecomastia',
    icon: 'User',
    lastReviewed: '2026-02-28',
    sources: ['Plastic and Reconstructive Surgery: Anthropometric chest parameters in male gynecomastia'],
    faq: [
      { q: 'How do men\'s chest measurements differ from female sizing?', a: 'Men\'s chests typically feature a broader ribcage with a wider sternum and shallower breast tissue distribution (wider roots). Standard feminine molded cups may gap at the apex. Shallow balcony cups, wire-free bralettes, and athletic compression tops provide the best anatomic fit.' },
    ],
    relatedTool: { title: 'Universal Bra Size Calculator', desc: 'Compare with unisex sizing standards.', url: '/bra-size-calculator' },
    relatedGuide: { title: 'How to Measure Band Size Correctly', desc: 'Measuring broad or V-tapered rib cages.', url: '/how-to-measure-band-size' },
  },
  {
    slug: 'first-bra-calculator',
    title: 'First Bra Calculator (Teens & Tweens)',
    description: 'A gentle, pressure-free calculator for young people getting their first training bra, camisole, or starter bralette.',
    intent: 'Find gentle beginner bra sizes for teens and tweens',
    icon: 'Smile',
    lastReviewed: '2026-02-24',
    sources: ['Adolescent Health: Physical changes and apparel ergonomics during pubertal breast development'],
    faq: [
      { q: 'When should someone get their first bra?', a: 'There is no set age. Whenever budding breast tissue feels tender, visible under school shirts, or causes self-consciousness, a soft seamless crop top or cotton camisole is ideal.' },
      { q: 'Do beginner bras have underwires?', a: 'No! Developing breast tissue should never be constricted by rigid underwires. Soft modal or seamless stretch bras allow tissue to develop naturally without pressure.' },
    ],
    relatedTool: { title: 'Universal Bra Size Calculator', desc: 'Standard adult sizing reference.', url: '/bra-size-calculator' },
    relatedGuide: { title: 'How to Measure Bra Size at Home', desc: 'Simple instructions for measuring with comfort and privacy.', url: '/how-to-measure-bra-size-at-home' },
  },
  {
    slug: 'panty-size-calculator',
    title: 'Panty Size Calculator',
    description: 'Convert waist and hip dimensions into US, UK, and European panty, underwear, thong, and brief sizes without painful digging or riding up.',
    intent: 'Calculate accurate underwear and panty sizes from hips and waist',
    icon: 'Scissors',
    lastReviewed: '2026-02-20',
    sources: ['ISO 8559-2: Garment construction and specifications — Part 2: Undergarments'],
    faq: [
      { q: 'Which measurement is more important for panty sizing: waist or hips?', a: 'Hips are the primary anchor for mid-rise and low-rise underwear. For high-waisted briefs and sculpting styles, check both waist and hips, and size to the larger of the two if between sizes.' },
    ],
    relatedTool: { title: 'Matching Set Calculator', desc: 'Coordinate complementary bra and bottom sets.', url: '/matching-set-calculator' },
    relatedGuide: { title: 'Universal Bra Measurement Chart', desc: 'Full international body sizing tables.', url: '/bra-measurement-chart' },
  },
  {
    slug: 'matching-set-calculator',
    title: 'Matching Set Calculator',
    description: 'Coordinate your ideal bra and panty sizes for balanced lingerie sets, ensuring the bra supports properly without compromising bottom comfort.',
    intent: 'Coordinate bra and panty sizes for full lingerie sets',
    icon: 'Layers',
    lastReviewed: '2026-02-18',
    sources: ['Apparel Manufacturing Standards: Proportional grading for coordinated intimates sets'],
    faq: [
      { q: 'What should I do if a brand only sells sets in fixed S/M/L combinations?', a: 'Avoid fixed one-size-fits-all sets if you have full bust proportions (e.g. 30F with S bottoms). Look for brands offering separates or bra-sized sets.' },
    ],
    relatedTool: { title: 'Universal Bra Size Calculator', desc: 'Determine your precise bra size.', url: '/bra-size-calculator' },
    relatedGuide: { title: 'Universal Bra Measurement Chart', desc: 'Compare sizing charts across international systems.', url: '/bra-measurement-chart' },
  },
  {
    slug: 'swimwear-size-calculator',
    title: 'Swimwear Size Calculator',
    description: 'Find accurate sizes for bra-sized bikini tops, tankinis, and one-piece swimsuits factoring in water elasticity and torso length.',
    intent: 'Calculate bra-sized swimwear and one-piece dimensions',
    icon: 'Waves',
    lastReviewed: '2026-02-15',
    sources: ['Textile Research Journal: Hydrodynamic performance and wet stretch of elastane-nylon swimwear blends'],
    faq: [
      { q: 'Should swimwear fit tighter than an everyday bra?', a: 'Yes. Swimwear fabrics (spandex/nylon) stretch out by 10% to 15% when submerged in water. A snug fit when dry prevents wardrobe malfunctions when wet.' },
    ],
    relatedTool: { title: 'Universal Bra Size Calculator', desc: 'Establish your dry baseline bra size.', url: '/bra-size-calculator' },
    relatedGuide: { title: 'How to Measure Bra Size at Home', desc: 'Guide to taking accurate torso and bust measurements.', url: '/how-to-measure-bra-size-at-home' },
  },
  {
    slug: 'shapewear-size-calculator',
    title: 'Shapewear Size Calculator',
    description: 'Calculate waist-cincher, sculpting bodysuit, and smoothing short sizes based on waist, hip, and underbust dimensions without roll-down or pinching.',
    intent: 'Find true shapewear sizes and prevent painful roll-down',
    icon: 'Target',
    lastReviewed: '2026-02-10',
    sources: ['International Journal of Clothing Science: Elastic compression gradient pressures in body-sculpting textiles'],
    faq: [
      { q: 'Should I buy a smaller size shapewear for extra slimming?', a: 'Never size down in shapewear! Sizing down pushes flesh out at the edges, creates double bulges, pinches circulation, and causes the garment to roll down immediately. True-to-size shapewear provides maximum sculpting with all-day comfort.' },
    ],
    relatedTool: { title: 'Panty Size Calculator', desc: 'Compare regular underwear dimensions.', url: '/panty-size-calculator' },
    relatedGuide: { title: 'Universal Bra Measurement Chart', desc: 'Complete anatomical dimensions.', url: '/bra-measurement-chart' },
  },
];

export const GUIDES_LIST: GuideDef[] = [
  {
    slug: 'how-to-measure-bra-size-at-home',
    title: 'How to Measure Bra Size at Home: The Complete Step-by-Step Guide',
    description: 'Master the accurate 6-point measurement technique at home with a soft tape measure. Eliminate band riding, strap digging, and cup gapping forever.',
    intent: 'Learn accurate home measuring technique for bra fitting',
    lastReviewed: '2026-03-16',
    sources: ['British Journal of Sports Medicine: Assessment of breast support biomechanics', 'International Ergonomics Association: Anthropometric measurement methods'],
    faq: [
      { q: 'What kind of tape measure should I use?', a: 'Use a flexible, soft fiberglass or sewing tape measure. Do NOT use a rigid metal carpenter\'s tape measure.' },
      { q: 'Should I wear an unpadded bra or go braless when measuring?', a: 'Measure without a bra, or in an unlined, non-padded, non-compressing bralette.' },
      { q: 'Why take leaning and lying bust measurements?', a: 'Standing alone often underestimates projected or softer breast tissue due to gravity. Leaning forward 90 degrees captures full tissue volume and root projection.' },
    ],
    relatedTool: { title: 'Universal Bra Size Calculator', desc: 'Input your 6 measurements to get your verified size.', url: '/bra-size-calculator' },
    relatedGuide: { title: 'How Bra Sizes Are Determined', desc: 'The underlying math of band inches and cup differentials.', url: '/how-bra-sizes-are-determined' },
  },
  {
    slug: 'how-bra-sizes-are-determined',
    title: 'How Bra Sizes Are Determined: The Complete Sizing Formula',
    description: 'Understand the mathematical relationship between ribcage underbust circumference, breast projection, and international cup progression systems.',
    intent: 'Understand the math and physics behind bra sizing',
    lastReviewed: '2026-03-14',
    sources: ['Sizing Standardization in the Global Apparel Market: Technical Bra Grading'],
    faq: [
      { q: 'What does the number in a bra size represent?', a: 'The number (e.g. 32, 34, 36) represents your ribcage underbust circumference rounded to the nearest even number.' },
      { q: 'What does the cup letter represent?', a: 'The letter represents the mathematical difference between your full bust measurement and underbust measurement. Every 1 inch (2.54 cm) equals one cup step.' },
    ],
    relatedTool: { title: 'Universal Bra Size Calculator', desc: 'Put the mathematical sizing formulas to work.', url: '/bra-size-calculator' },
    relatedGuide: { title: 'Bra Cup Size Guide', desc: 'Comparison of cup volumes across systems.', url: '/bra-cup-size-guide' },
  },
  {
    slug: 'bra-cup-size-guide',
    title: 'Bra Cup Size Guide: From AA to K Letters and Volume Physics',
    description: 'Demystifying bra cup letters. Learn why cup size is relative to band size, how US and UK cup progressions differ, and how to find your true cup depth.',
    intent: 'Comprehensive cup size reference chart and volume guide',
    lastReviewed: '2026-03-11',
    sources: ['Journal of Ergonomics: Breast volume variations and international cup sizing scales'],
    faq: [
      { q: 'Is a D cup always huge?', a: 'No! A "D cup" has no standalone volume. A 28D has the exact same cup volume as a 30C, 32B, and 34A. Cup letters only denote the difference between bust and ribcage.' },
      { q: 'Why do UK brands use double letters like FF and GG?', a: 'UK lingerie manufacturers developed standardized 1-inch cup steps where double letters represent specific half-inch nuances without skipping letters.' },
    ],
    relatedTool: { title: 'Universal Bra Size Calculator', desc: 'Calculate your cup letter based on your measurements.', url: '/bra-size-calculator' },
    relatedGuide: { title: 'Sister Sizing Explained', desc: 'Understand how cup volume is preserved across bands.', url: '/sister-sizing-explained' },
  },
  {
    slug: 'how-to-measure-band-size',
    title: 'How to Measure Band Size Correctly: Debunking the +4 Sizing Rule',
    description: 'Why adding four inches to your ribcage ruins bra support, shifts pressure to your shoulders, and causes back pain. Learn how to anchor your band properly.',
    intent: 'Guide on determining correct supportive bra band measurement',
    lastReviewed: '2026-03-09',
    sources: ['Applied Ergonomics: Effect of bra band tightness on cutaneous sensory thresholds and shoulder pain'],
    faq: [
      { q: 'How tight should a bra band actually feel?', a: 'A new bra should feel snug and secure on the LOOSEST hook. You should be able to slide only two fingers under the band comfortably.' },
      { q: 'Why do bra bands have three or four rows of hooks?', a: 'Always buy a bra that fits on the loosest outer hook. Over months of wear, elastic fibers stretch, allowing you to move inward to tighter hooks.' },
    ],
    relatedTool: { title: 'Universal Bra Size Calculator', desc: 'Calculate your true snug band size.', url: '/bra-size-calculator' },
    relatedGuide: { title: 'Signs Your Bra Doesn\'t Fit', desc: 'Recognize symptoms of an oversized band.', url: '/signs-your-bra-doesnt-fit' },
  },
  {
    slug: 'bra-measurement-chart',
    title: 'Universal Bra Measurement Chart: Global Conversion Matrix',
    description: 'Cross-reference underbust and bust measurements in inches and centimeters with US, UK, EU, French, Australian, and Japanese bra sizes.',
    intent: 'Comprehensive international bra size conversion chart',
    lastReviewed: '2026-03-08',
    sources: ['International Organization for Standardization: ISO 8559 Garment Sizing Standards'],
    faq: [
      { q: 'How do French and Spanish band sizes work?', a: 'French (FR) and Spanish (ES) bra sizes add 15 to the European (EU) band number. For instance, a 70 band in EU sizing is labeled as an 85 band in France and Spain.' },
      { q: 'What is an Australian bra size equivalent to?', a: 'Australia uses dress sizing numbers: Band 28 is AU 6, Band 30 is AU 8, Band 32 is AU 10, Band 34 is AU 12, Band 36 is AU 14, and Band 38 is AU 16.' },
    ],
    relatedTool: { title: 'Universal Bra Size Calculator', desc: 'Instant dynamic calculation without manual chart lookup.', url: '/bra-size-calculator' },
    relatedGuide: { title: 'Sister Sizing Explained', desc: 'How to navigate diagonally across sizing charts.', url: '/sister-sizing-explained' },
  },
  {
    slug: 'sister-sizing-explained',
    title: 'Sister Sizing Explained: Why 32D, 34C, and 36B Have the Same Cup Volume',
    description: 'Master the secret tool of professional bra fitters. Learn how sister sizing works, when to sister size down, and when to sister size up for perfect comfort.',
    intent: 'Understand how sister sizing works across different band and cup combinations',
    lastReviewed: '2026-03-07',
    sources: ['Textile Design and Engineering: Wire radius grading and volumetric equilibrium in intimates'],
    faq: [
      { q: 'What is the sister sizing rule?', a: 'If you go DOWN one band size, go UP one cup letter. If you go UP one band size, go DOWN one cup letter. This preserves the exact cup volume.' },
      { q: 'Can I wear a sister size two steps away?', a: 'Staying within one sister size step is recommended so underwire width and strap placement stay anatomically balanced.' },
    ],
    relatedTool: { title: 'Sister Size Calculator', desc: 'Calculate your personalized sister size matrix instantly.', url: '/sister-size-calculator' },
    relatedGuide: { title: 'Bra Cup Size Guide', desc: 'Understand relative cup volumes across letter scales.', url: '/bra-cup-size-guide' },
  },
  {
    slug: 'signs-your-bra-doesnt-fit',
    title: '9 Signs Your Bra Doesn\'t Fit: A Fitter\'s Diagnostic Checklist',
    description: 'From floating gores and digging straps to quad-boobing and band ride-up, discover the 9 telltale signs of a bad bra fit and how to solve each one.',
    intent: 'Identify improper bra fit symptoms and anatomical corrective steps',
    lastReviewed: '2026-03-06',
    sources: ['Clinical Ergonomics: Musculoskeletal discomfort associated with ill-fitting brassieres'],
    faq: [
      { q: 'Is underwire supposed to hurt?', a: 'Underwire should never hurt! In a correctly fitted bra, underwire rests on your ribcage bone just below the inframammary fold and encases all tissue behind your armpits.' },
      { q: 'Why does my bra leave marks when I take it off?', a: 'Faint indentations that disappear within 15-20 minutes are normal. Angry red welts or bruised ribs indicate that your band or cups are improperly sized.' },
    ],
    relatedTool: { title: 'Bra Fit Checker', desc: 'Interactive tool to diagnose symptoms and get an immediate fix.', url: '/bra-fit-checker' },
    relatedGuide: { title: 'How to Measure Bra Size at Home', desc: 'Establish your correct foundational measurements.', url: '/how-to-measure-bra-size-at-home' },
  },
  {
    slug: 'how-to-measure-sports-bra',
    title: 'How to Measure for a Sports Bra: High-Impact Support Essentials',
    description: 'Protect delicate Cooper\'s ligaments from irreversible stretching during workouts. How to size compression vs encapsulation sports bras for maximum bounce control.',
    intent: 'Guide on sizing and choosing sports bras for athletic activities',
    lastReviewed: '2026-03-05',
    sources: ['Medicine & Science in Sports & Exercise: Effectiveness of sports bra designs in reducing breast displacement'],
    faq: [
      { q: 'Can running without a proper sports bra cause permanent breast sagging?', a: 'Yes. Unsupported multi-directional motion during running stretches Cooper\'s ligaments permanently over time.' },
      { q: 'Should I buy a sports bra in a smaller size for running?', a: 'No. Sizing down in the band or cups restricts full diaphragmatic breathing during aerobic exercise and causes painful underarm friction chafing.' },
    ],
    relatedTool: { title: 'Sports Bra Calculator', desc: 'Determine encapsulation vs compression requirements.', url: '/sports-bra-calculator' },
    relatedGuide: { title: 'How to Measure Bra Size at Home', desc: 'Foundational measuring technique.', url: '/how-to-measure-bra-size-at-home' },
  },
  {
    slug: 'bra-size-to-bust-size-chart',
    title: 'Bra Size to Bust Size Chart: Quick Inches & Centimeters Reference',
    description: 'Instant lookup table connecting standing and leaning bust circumference to standard bra band and cup dimensions.',
    intent: 'Quick lookup table matching bust circumference to bra sizes',
    lastReviewed: '2026-03-03',
    sources: ['Anthropometric Survey of Civilian Women: Torso and Breast Dimensions'],
    faq: [
      { q: 'Can two people with a 38-inch bust wear different bra sizes?', a: 'Absolutely! A person with a 30-inch underbust and a 38-inch bust wears a 30G. A person with a 34-inch underbust and a 38-inch bust wears a 34D. A person with a 36-inch underbust and a 38-inch bust wears a 36B.' },
    ],
    relatedTool: { title: 'Bra Size to Measurements', desc: 'Reverse-engineer specific bra sizes.', url: '/bra-size-to-measurements' },
    relatedGuide: { title: 'Universal Bra Measurement Chart', desc: 'Full international conversions.', url: '/bra-measurement-chart' },
  },
];

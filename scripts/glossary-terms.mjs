/**
 * The glossary term data. Separated from the builder so the content is
 * reviewable on its own and the builder stays mechanical.
 *
 * RULES THIS CONTENT FOLLOWS, because a glossary is exactly where a site
 * quietly starts fabricating:
 *
 *  1. NO NUMBERS THAT CHANGE ANNUALLY. No HSA contribution limits, no ACA
 *     affordability percentage, no out-of-pocket maximum caps. Those move
 *     every year and a stale number on a broker site is worse than no number.
 *     Where a figure matters, the text says who sets it and how often.
 *
 *  2. NO CARRIER SPECIFIC THRESHOLDS. BBB's existing pages deliberately never
 *     state a participation percentage or a group size cutoff, because they
 *     vary by carrier. Checked before writing these. The glossary matches that
 *     choice rather than inventing "75%".
 *
 *  3. EVERY `links` SLUG MUST EXIST. The builder asserts this against the
 *     pages actually on disk and refuses to write if one is wrong, so a
 *     renamed page cannot leave a dead link behind.
 *
 *  4. Plain language, contractions, American spelling, no dashes as
 *     punctuation. site-check enforces the last two.
 *
 * `short` is the one line definition. It is used on the hub, in the meta
 * description and in the DefinedTerm schema, so it has to read as a complete
 * sentence on its own.
 */

export const TERMS = [
  {
    slug: 'accident-insurance', term: 'Accident insurance', letter: 'A',
    short: 'A supplemental policy that pays cash directly to an employee after a covered accident, on top of whatever their medical plan pays.',
    body: [
      { p: "Accident insurance is a supplemental policy. It doesn't replace medical coverage and it doesn't coordinate with it. When a covered accident happens, the policy pays a set amount straight to the employee, and they decide what to do with the money." },
      { h: 'Why employers offer it', p: "Medical plans have gotten leaner. A high deductible means an employee with a broken wrist can face a real bill before coverage kicks in. Accident coverage is cheap per employee and it fills that hole with cash that can go to the deductible, or to rent, or to anything else." },
      { h: 'What to watch', p: "Read the exclusions before you offer it to a physical workforce. Some accident products exclude injuries that happen on the job, which matters a great deal if your team works in construction or manufacturing. We check this before we quote it." },
    ],
    facts: [['Type', 'Supplemental, voluntary or employer paid'], ['Pays', 'Cash to the employee'], ['Coordinates with medical?', 'No, it pays on top'], ['Common gotcha', 'Occupational exclusions']],
    related: ['critical-illness-insurance', 'hospital-indemnity', 'voluntary-benefits'],
    links: [['accident-insurance-for-employees', 'Accident insurance for employees'], ['accident-insurance-vs-disability-insurance', 'Accident insurance vs disability insurance']],
  },
  {
    slug: 'age-banded-rates', term: 'Age-banded rates', letter: 'A',
    short: 'A pricing method where each employee has their own premium based on their age, rather than everyone paying the same rate.',
    body: [
      { p: 'With age-banded rates, the carrier prices each enrolled person individually against an age table. A 24 year old and a 58 year old on the identical plan cost the employer different amounts.' },
      { h: 'Why it matters for budgeting', p: "Your total premium moves when your roster moves, not just at renewal. Hire two people in their fifties and the bill changes. It also means a quote built on last year's census can be meaningfully wrong." },
      { h: 'The mistake to avoid', p: "Never accept a single per-employee medical rate without seeing the age band table behind it. If someone quotes you one number for everybody, either the plan is composite rated or the quote is incomplete. Ask which." },
    ],
    facts: [['Priced per', 'Individual employee'], ['Changes when', 'Your roster changes'], ['Alternative', 'Composite rates'], ['Need to quote it', 'A current census']],
    related: ['composite-rates', 'census', 'premium'],
    links: [['when-minnesota-small-group-health-rates-change', 'When Minnesota small group rates change'], ['how-much-does-group-health-insurance-cost-for-10-employees-in-minnesota', 'What group health costs for 10 employees']],
  },
  {
    slug: 'cafeteria-plan', term: 'Cafeteria plan', aka: 'Section 125 plan', letter: 'C',
    short: 'A written plan document that lets employees pay their share of benefit premiums with pre-tax dollars.',
    body: [
      { p: "A cafeteria plan, named for Section 125 of the tax code, is what makes pre-tax payroll deductions legal. Without one on file, employee contributions to their health premiums are supposed to come out after tax." },
      { h: 'The gap we see most often', p: "Plenty of small employers are already running pre-tax deductions without the document that permits it. Payroll is set up correctly, everyone assumes it's handled, and nobody ever wrote the plan. It's an easy fix from here and an awkward thing to be caught without." },
      { h: 'What it buys you', p: "Employees keep more of their pay for the same coverage, and the employer saves its share of payroll taxes on the amount that runs pre-tax. It's one of the few pieces of benefits paperwork that pays for itself." },
    ],
    facts: [['Also called', 'Section 125 plan'], ['What it enables', 'Pre-tax premium deductions'], ['Form', 'A written plan document'], ['Common gap', 'Deductions running without one']],
    related: ['fsa', 'premium', 'employer-contribution'],
    links: [['do-i-need-a-section-125-plan-for-pre-tax-deductions', 'Do I need a Section 125 plan?']],
  },
  {
    slug: 'census', term: 'Census', letter: 'C',
    short: 'The employee roster a carrier needs in order to quote your group, usually date of birth, zip code, and who is enrolling.',
    body: [
      { p: "A census is the list of people to be covered. Carriers price from it, so nothing can be quoted without one. The usual fields are date of birth, gender, home zip code, and which coverage tier each person wants, meaning employee only, employee plus spouse, family and so on." },
      { h: 'What it does not need', p: "A census for quoting doesn't need Social Security numbers, and it doesn't need medical history for most small group products. If you're asked for either up front, ask why before you send it." },
      { h: 'Getting it right the first time', p: "The most common delay in a quote is a census with missing dates of birth or stale headcount. Because most medical plans are age-banded, a wrong birthday changes the price. We'll send you the format carriers want so it goes out clean." },
    ],
    facts: [['Needed for', 'Any medical quote'], ['Typical fields', 'DOB, zip, tier'], ['Usually not needed', 'Social Security numbers'], ['Why accuracy matters', 'Rates are age-banded']],
    related: ['age-banded-rates', 'waiver-of-coverage', 'minimum-participation'],
    links: [['group-health-insurance-small-business-mn', 'Group health insurance for Minnesota small business']],
  },
  {
    slug: 'cobra', term: 'COBRA', letter: 'C',
    short: 'A federal right that lets employees keep their group health coverage for a limited time after they would otherwise lose it.',
    body: [
      { p: "COBRA lets someone who loses group coverage, usually because they left the job or lost hours, stay on the same plan for a limited period by paying the full premium themselves." },
      { h: 'The part employers underestimate', p: "The employee pays the whole cost, including the share the employer used to cover, plus a small administrative percentage. That's often a shock to somebody who only ever saw their payroll deduction." },
      { h: 'Who it applies to', p: "The federal rule applies to employers above a size threshold, and many states have a similar continuation right for smaller groups. Which one applies to you depends on your headcount and where you are, so it's worth confirming rather than assuming." },
    ],
    facts: [['Who pays', 'The former employee, in full'], ['Coverage', 'The same plan they had'], ['Duration', 'Limited, set by the qualifying event'], ['Applies to', 'Employers above a size threshold']],
    related: ['qualifying-life-event', 'special-enrollment', 'waiting-period'],
    links: [['when-can-i-add-or-remove-employees-from-my-group-plan', 'When can I add or remove employees?']],
  },
  {
    slug: 'coinsurance', term: 'Coinsurance', letter: 'C',
    short: 'The share of a medical bill an employee pays as a percentage, after the deductible has been met.',
    body: [
      { p: "Coinsurance is the percentage split between the plan and the member once the deductible is satisfied. If a plan is 80/20, the plan pays 80 percent of the covered cost and the member pays 20 percent, until the out-of-pocket maximum stops it." },
      { h: 'How it differs from a copay', p: "A copay is a flat dollar amount and you know it in advance. Coinsurance is a percentage of whatever the bill turns out to be, so the member can't know the number until the claim is priced. That uncertainty is what people find hard about it." },
      { h: 'Where it stops', p: "Coinsurance runs until the out-of-pocket maximum is reached. After that the plan pays covered in-network care in full for the rest of the plan year. That ceiling is the number worth showing employees, not the percentage." },
    ],
    facts: [['Expressed as', 'A percentage'], ['Starts after', 'The deductible is met'], ['Ends at', 'The out-of-pocket maximum'], ['Differs from copay', 'Copay is a flat amount']],
    related: ['deductible', 'copay', 'out-of-pocket-maximum'],
    links: [['ppo-vs-hmo-for-small-business-health-insurance', 'PPO vs HMO for small business']],
  },
  {
    slug: 'composite-rates', term: 'Composite rates', letter: 'C',
    short: 'A pricing method where every employee in the same coverage tier pays the same premium regardless of age.',
    body: [
      { p: "Under composite rating the carrier blends the whole group into one rate per tier. Every employee-only enrollment costs the same, every family enrollment costs the same, no matter who's in the seat." },
      { h: 'Why employers like it', p: "It's simple to communicate and simple to budget. Everybody sees one number for their tier, and payroll deductions don't change when somebody has a birthday." },
      { h: 'The trade', p: "A composite rate is built from the group as it exists when the rate is set. If your roster shifts a lot mid-year, the carrier may recalculate at renewal in a way that surprises you. Age-banded pricing tracks the roster continuously instead." },
    ],
    facts: [['Priced per', 'Coverage tier, not per person'], ['Feels like', 'One rate for everyone'], ['Alternative', 'Age-banded rates'], ['Watch for', 'Recalculation at renewal']],
    related: ['age-banded-rates', 'premium', 'census'],
    links: [['how-much-does-group-health-insurance-cost-for-10-employees-in-minnesota', 'What group health costs for 10 employees']],
  },
  {
    slug: 'copay', term: 'Copay', letter: 'C',
    short: 'A flat dollar amount an employee pays for a specific service, like an office visit or a prescription.',
    body: [
      { p: "A copay is a fixed amount for a defined service. Thirty dollars to see a primary care doctor, a set amount for a generic prescription. The member knows the number before they go." },
      { h: 'Does it count toward the deductible?', p: "Sometimes yes, sometimes no, and it varies by plan. On many plans copays don't reduce the deductible but do count toward the out-of-pocket maximum. This is one of the most common things employees get wrong, and it's worth covering at the enrollment meeting." },
      { h: 'On HSA plans', p: "Qualified high deductible plans generally can't apply copays before the deductible, other than for preventive care. If a plan has rich copays from day one, it usually isn't HSA-compatible." },
    ],
    facts: [['Expressed as', 'A flat dollar amount'], ['Known in advance', 'Yes'], ['Counts toward deductible', 'Depends on the plan'], ['On HSA plans', 'Generally limited before the deductible']],
    related: ['coinsurance', 'deductible', 'hdhp'],
    links: [['ppo-vs-hmo-for-small-business-health-insurance', 'PPO vs HMO for small business']],
  },
  {
    slug: 'creditable-coverage', term: 'Creditable coverage', letter: 'C',
    short: 'Prescription coverage that is at least as good as the Medicare Part D standard, which employers must disclose to employees each year.',
    body: [
      { p: "If your health plan includes prescription drugs, you have to tell Medicare-eligible employees whether that drug coverage is creditable, meaning at least as generous as the standard Part D benefit." },
      { h: 'Why it matters to the employee', p: "Somebody who goes without creditable drug coverage and enrolls in Part D later can face a permanent late enrollment penalty. The notice exists so they can make that decision with the facts." },
      { h: "The employer's part", p: "It's an annual notice with a deadline ahead of the Medicare enrollment window, and it applies whether or not you have anyone on Medicare today. Carriers usually tell you the creditable status. Getting the notice out is on the employer, and it's a routine thing to miss." },
    ],
    facts: [['Applies to', 'Plans with prescription coverage'], ['Notice frequency', 'Annual'], ['Who receives it', 'Medicare-eligible employees'], ['Risk of missing it', 'A penalty for the employee']],
    related: ['formulary', 'spd', 'sbc'],
    links: [['how-do-i-know-if-my-plan-complies-with-aca', 'How do I know if my plan complies?']],
  },
  {
    slug: 'critical-illness-insurance', term: 'Critical illness insurance', letter: 'C',
    short: 'A supplemental policy that pays a lump sum of cash when an employee is diagnosed with a covered serious illness.',
    body: [
      { p: "Critical illness coverage pays a lump sum on diagnosis of a covered condition, commonly things like a heart attack, stroke, or cancer. The money goes to the employee, not to a provider." },
      { h: 'What the cash is really for', p: "The medical bills are only part of what a serious diagnosis costs. There's travel to treatment, time off that outlasts the paid leave, and a spouse who cuts back hours. A lump sum covers the parts insurance never sees." },
      { h: 'Read the covered condition list', p: "These policies pay on a defined list, and the lists are not identical between carriers. Two products at similar prices can differ a lot on what counts and at what stage it pays. That comparison is the actual work." },
    ],
    facts: [['Pays', 'A lump sum, to the employee'], ['Triggered by', 'Diagnosis of a listed condition'], ['Key variable', 'The covered condition list'], ['Often paired with', 'A high deductible medical plan']],
    related: ['accident-insurance', 'hospital-indemnity', 'voluntary-benefits'],
    links: [['critical-illness-insurance-for-employees', 'Critical illness insurance for employees'], ['critical-illness-vs-cancer-insurance', 'Critical illness vs cancer insurance']],
  },
  {
    slug: 'deductible', term: 'Deductible', letter: 'D',
    short: 'The amount an employee pays for covered care each plan year before the medical plan starts paying its share.',
    body: [
      { p: "The deductible is the first layer of cost. Until the member has paid that much toward covered services in the plan year, the plan generally isn't paying its share, with preventive care as the usual exception." },
      { h: 'Individual and family', p: "Family plans carry both an individual and a family deductible, and how they interact matters. On an embedded deductible, one person can satisfy their individual amount and start getting benefits while the rest of the family is still working toward the family number. On an aggregate deductible, nobody gets benefits until the whole family amount is met. Employees rarely know which one they have." },
      { h: 'Where the money can come from', p: "An HSA, HRA, or an FSA can all be used to fund what an employee owes toward the deductible. Pairing a higher deductible with a funded account is one of the most common ways to hold a premium down without leaving people exposed." },
    ],
    facts: [['Resets', 'Each plan year'], ['Preventive care', 'Usually covered before it'], ['Family types', 'Embedded or aggregate'], ['Can be funded by', 'HSA, HRA or FSA']],
    related: ['coinsurance', 'out-of-pocket-maximum', 'hdhp', 'hsa'],
    links: [['what-is-the-difference-between-an-hra-hsa-and-fsa', 'HRA vs HSA vs FSA']],
  },
  {
    slug: 'employer-contribution', term: 'Employer contribution', letter: 'E',
    short: 'The share of the premium the employer pays, which drives both the employee payroll deduction and whether the carrier will issue the plan.',
    body: [
      { p: "The employer contribution is how much of the premium the business covers. It's usually set as a percentage of the employee-only rate, or as a flat dollar amount per employee per month." },
      { h: "It isn't only a budget decision", p: "Carriers set a minimum employer contribution as a condition of issuing the plan, and they set a minimum participation rate too. Those two rules interact: contribute less and fewer employees enroll, and a group that was eligible can fall out of eligibility." },
      { h: 'Flat dollar vs percentage', p: "A flat dollar contribution gives you a predictable budget line and pushes more of any rate increase onto employees. A percentage keeps the split stable and moves your cost with the premium. Neither is automatically right, and it's worth modeling both before you decide." },
    ],
    facts: [['Set as', 'A percentage or a flat dollar amount'], ['Based on', 'Usually the employee-only rate'], ['Carrier requires', 'A stated minimum'], ['Affects', 'Participation, and therefore eligibility']],
    related: ['minimum-participation', 'premium', 'waiver-of-coverage'],
    links: [['what-is-the-minimum-participation-rate-for-group-health-insurance', 'Minimum participation rate explained'], ['can-i-offer-different-plans-to-different-employees', 'Can I offer different plans to different employees?']],
  },
  {
    slug: 'eob', term: 'Explanation of benefits', aka: 'EOB', letter: 'E',
    short: 'The statement a carrier sends after processing a claim, showing what was billed, what the plan paid, and what the member owes.',
    body: [
      { p: "An EOB is not a bill. It's the carrier's accounting of a claim: what the provider charged, what the negotiated rate was, what the plan paid, and what's left for the member." },
      { h: 'The line that matters', p: "The gap between the billed amount and the allowed amount is the network discount, and it's often the largest number on the page. It's the clearest evidence an employee will ever see of what staying in network is worth." },
      { h: 'Why employees call about it', p: "EOBs arrive before the provider's bill and they say things like \"this is not a bill\" in small print. People assume they owe the amount at the top. Walking a team through one real EOB at an enrollment meeting prevents a year of phone calls." },
    ],
    facts: [['Is it a bill?', 'No'], ['Sent by', 'The carrier'], ['Shows', 'Billed, allowed, paid, member owes'], ['Arrives', 'Usually before the provider bill']],
    related: ['network', 'coinsurance', 'deductible'],
    links: [['claims', 'Get help with a claim']],
  },
  {
    slug: 'formulary', term: 'Formulary', letter: 'F',
    short: "The list of prescription drugs a plan covers, organized into tiers that determine what the member pays.",
    body: [
      { p: "A formulary is the plan's covered drug list, sorted into tiers. Generics usually sit in the cheapest tier and specialty drugs in the most expensive. What an employee pays depends on which tier their drug lands in." },
      { h: 'It changes, and that surprises people', p: "Carriers revise formularies on their own schedule, and a drug can move tiers or come off the list at renewal. An employee on a maintenance medication can see their cost change without their plan changing." },
      { h: 'What to check before you switch carriers', p: "If anyone on your team is on an expensive maintenance or specialty drug, check it against the new formulary before you move. A plan that looks cheaper on premium can cost that household considerably more. This is one of the specific things we look at rather than comparing premiums alone." },
    ],
    facts: [['What it is', 'The covered drug list'], ['Organized by', 'Tiers'], ['Changes', 'On the carrier schedule'], ['Check before switching', 'Maintenance and specialty drugs']],
    related: ['copay', 'creditable-coverage', 'network'],
    links: [['group-health-insurance-small-business-mn', 'Group health insurance for Minnesota small business']],
  },
  {
    slug: 'fsa', term: 'Flexible spending account', aka: 'FSA', letter: 'F',
    short: "An employer-established account that lets employees set aside pre-tax pay for eligible medical or dependent care expenses.",
    body: [
      { p: "An FSA lets an employee redirect part of their pay, before tax, into an account they spend on eligible expenses. The employer owns the plan and the IRS sets the annual contribution limit, which changes from year to year." },
      { h: 'The rule people know about', p: "FSAs are use-it-or-lose-it. Plans can offer either a short grace period or a limited carryover, but not both, and if the employer offers neither then unspent money is forfeited at the end of the plan year." },
      { h: 'The rule people miss', p: "The full annual election is available to the employee on day one of the plan year, even though they fund it over twelve paychecks. If somebody elects the maximum, spends it in January and leaves in February, the employer generally eats the difference. It's rare, but it's worth knowing before you set it up." },
    ],
    facts: [['Funded by', 'Employee, pre-tax'], ['Limit set by', 'The IRS, annually'], ['Year end', 'Use it or lose it, with limited exceptions'], ['Available', 'Full election from day one']],
    related: ['hsa', 'hra', 'cafeteria-plan'],
    links: [['what-is-the-difference-between-an-hra-hsa-and-fsa', 'HRA vs HSA vs FSA']],
  },
  {
    slug: 'fully-insured', term: 'Fully insured', letter: 'F',
    short: 'The traditional funding model where the employer pays a fixed premium and the carrier takes all the claims risk.',
    body: [
      { p: "Under a fully insured plan the employer pays a premium and that's the end of the obligation. If the group has a terrible claims year, the carrier absorbs it. If the group has a great year, the carrier keeps the difference." },
      { h: 'What you trade', p: "Certainty, for upside. The budget is predictable and there's no surprise bill, but a healthy group doesn't get rewarded for it. That's the whole argument for level funding, which returns some of a good year." },
      { h: 'What you also give up', p: "Claims data. Fully insured small groups generally don't get detailed claims reporting, so you can't see what's driving your cost and you can't do much about it at renewal except shop. Self-funded and level-funded arrangements usually come with that visibility." },
    ],
    facts: [['Employer pays', 'A fixed premium'], ['Claims risk', 'The carrier carries it'], ['Good year', 'Carrier keeps the savings'], ['Claims data', 'Usually limited']],
    related: ['level-funded', 'self-funded', 'stop-loss'],
    links: [['fully-insured-vs-level-funded-medical-plans', 'Fully insured vs level funded'], ['self-funded-vs-fully-insured-group-plans', 'Self funded vs fully insured']],
  },
  {
    slug: 'guaranteed-issue', term: 'Guaranteed issue', letter: 'G',
    short: 'Coverage a carrier must offer without medical underwriting, so no one can be turned down or surcharged for their health.',
    body: [
      { p: "Guaranteed issue means the carrier can't refuse you, or price you differently, based on health status. In the small group medical market this is the norm, and it's why a group with a serious claim can still get quoted." },
      { h: 'Where it stops', p: "The phrase also shows up on voluntary products like life and disability, and there it usually means guaranteed up to a stated amount. Above that limit the employee has to answer health questions. The limit is set per group, and it's commonly tied to how many people enroll." },
      { h: 'Why enrollment turnout matters', p: "On voluntary life especially, a higher participation rate often buys a higher guaranteed issue amount for everyone. That makes the enrollment meeting worth doing properly, not just an obligation to get through." },
    ],
    facts: [['Means', 'No medical underwriting'], ['Small group medical', 'Generally guaranteed issue'], ['Voluntary products', 'Guaranteed up to a stated limit'], ['Limit often tied to', 'Participation']],
    related: ['minimum-participation', 'voluntary-benefits', 'waiting-period'],
    links: [['group-life-and-disability-insurance-mn', 'Group life and disability in Minnesota']],
  },
  {
    slug: 'hdhp', term: 'High deductible health plan', aka: 'HDHP', letter: 'H',
    short: 'A plan with a deductible at or above an IRS threshold, which is what makes an employee eligible to contribute to an HSA.',
    body: [
      { p: "A high deductible health plan is a specific tax category, not just a plan with a big deductible. The IRS sets minimum deductible and maximum out-of-pocket figures each year, and a plan has to sit inside them to qualify." },
      { h: 'Why the label matters', p: "Only someone covered by a qualifying HDHP can contribute to a health savings account. Plans get marketed as high deductible when they're nowhere near qualifying, so if the HSA is the point, confirm the plan actually qualifies." },
      { h: 'The design trap', p: "Adding rich copays before the deductible can disqualify a plan. Preventive care is the main thing that's allowed to be covered first. A plan with day-one copays for everything usually isn't HSA-compatible, however it's described." },
    ],
    facts: [['Defined by', 'IRS thresholds, set annually'], ['Enables', 'HSA contributions'], ['Preventive care', 'Can be covered before the deductible'], ['Disqualified by', 'Broad pre-deductible copays']],
    related: ['hsa', 'deductible', 'out-of-pocket-maximum', 'copay'],
    links: [['what-is-the-difference-between-an-hra-hsa-and-fsa', 'HRA vs HSA vs FSA']],
  },
  {
    slug: 'hmo', term: 'HMO', letter: 'H',
    short: 'A plan design built around a defined network, usually with no out-of-network coverage except emergencies.',
    body: [
      { p: "A health maintenance organization plan covers care inside its network. Go outside it and, emergencies aside, the plan generally doesn't pay. Some HMOs also route care through a primary care physician who coordinates referrals." },
      { h: 'Why anybody picks one', p: "Price. An HMO is usually the cheapest option on the quote sheet, because the carrier gets a tighter network in exchange. For a team whose doctors are all in that network anyway, it's free money." },
      { h: 'The question to ask first', p: "Where do your people actually go? An HMO that excludes the clinic half your team uses will cost you far more in disruption than it saves in premium. In Minnesota the networks differ meaningfully between carriers, so this is worth checking by name before you decide." },
    ],
    facts: [['Out-of-network', 'Generally not covered'], ['Typical cost', 'Lowest on the sheet'], ['May require', 'A primary care referral'], ['Check first', 'Whether your team’s clinics are in']],
    related: ['ppo', 'network', 'premium'],
    links: [['ppo-vs-hmo-for-small-business-health-insurance', 'PPO vs HMO for small business']],
  },
  {
    slug: 'hospital-indemnity', term: 'Hospital indemnity insurance', letter: 'H',
    short: 'A supplemental policy that pays a set cash amount for a hospital admission and for each day of a covered stay.',
    body: [
      { p: "Hospital indemnity pays fixed cash benefits tied to a hospital stay, typically an amount on admission and a further amount per day. It pays the employee regardless of what the medical plan does." },
      { h: 'Where it fits', p: "It pairs naturally with a high deductible plan. A single admission can consume the entire deductible in a day, and this is the product that puts cash in the employee's hands at exactly that moment." },
      { h: 'What to compare', p: "Admission benefit, daily benefit, how many days are covered, and whether intensive care pays at a higher rate. Two policies at the same price can differ substantially once you look past the headline admission amount." },
    ],
    facts: [['Pays', 'Cash, to the employee'], ['Triggered by', 'A covered hospital admission'], ['Pairs with', 'High deductible plans'], ['Compare', 'Admission and daily amounts, and day limits']],
    related: ['accident-insurance', 'critical-illness-insurance', 'voluntary-benefits'],
    links: [['what-is-supplemental-insurance-and-do-my-employees-need-it', 'What is supplemental insurance?'], ['supplemental-insurance-for-employees-mn', 'Supplemental insurance in Minnesota']],
  },
  {
    slug: 'hra', term: 'Health reimbursement arrangement', aka: 'HRA', letter: 'H',
    short: 'An employer-funded account that reimburses employees for eligible medical costs, with the employer keeping anything unspent.',
    body: [
      { p: "An HRA is funded entirely by the employer. The employee incurs an eligible expense and gets reimbursed, up to whatever the employer has set aside. The employee never contributes." },
      { h: 'The part employers like', p: "You only pay for what's actually claimed. Unlike a premium, money you put behind an HRA and nobody uses stays with the business. That makes it a way to raise a deductible while promising to cover part of the gap, and only paying when the gap is real." },
      { h: 'It is a plan, not a gesture', p: "An HRA needs plan documents, a defined list of eligible expenses, and rules applied consistently. It can't be informal reimbursement out of the checking account, and doing it that way creates a taxable wage problem rather than a benefit." },
    ],
    facts: [['Funded by', 'The employer only'], ['Unspent money', 'Stays with the employer'], ['Requires', 'A written plan'], ['Common use', 'Offsetting a higher deductible']],
    related: ['hsa', 'fsa', 'ichra', 'deductible'],
    links: [['what-is-the-difference-between-an-hra-hsa-and-fsa', 'HRA vs HSA vs FSA']],
  },
  {
    slug: 'hsa', term: 'Health savings account', aka: 'HSA', letter: 'H',
    short: "An employee-owned savings account for medical expenses, available only to people enrolled in a qualifying high deductible plan.",
    body: [
      { p: "An HSA belongs to the employee. It goes with them when they leave, it rolls over every year, and both the employee and the employer can put money in. The IRS sets the annual contribution limit and revises it each year." },
      { h: 'The tax treatment', p: "Money goes in untaxed, grows untaxed, and comes out untaxed for qualified medical expenses. There isn't another account in the tax code that does all three, which is why some people fund one and deliberately never spend it." },
      { h: 'The eligibility rule that trips people up', p: "You have to be covered by a qualifying high deductible plan to contribute, and other coverage can disqualify you. Being enrolled in Medicare, or being covered by a spouse's general purpose FSA, can both end contribution eligibility while the account itself stays yours to spend." },
    ],
    facts: [['Owned by', 'The employee'], ['Requires', 'A qualifying HDHP'], ['Rolls over', 'Yes, indefinitely'], ['Limit set by', 'The IRS, annually']],
    related: ['hdhp', 'hra', 'fsa', 'deductible'],
    links: [['what-is-the-difference-between-an-hra-hsa-and-fsa', 'HRA vs HSA vs FSA']],
  },
  {
    slug: 'ichra', term: 'ICHRA', aka: 'CHOICE Arrangement', letter: 'I',
    short: 'An arrangement where the employer gives employees a tax-free allowance to buy their own individual health coverage instead of offering a group plan.',
    body: [
      { p: "With an individual coverage HRA the employer sets an allowance, the employee buys their own individual policy, and the employer reimburses up to the allowance tax-free. There's no group plan and no group renewal." },
      { h: 'The name changed in 2026', p: "CMS and the SBA renamed ICHRA to the CHOICE Arrangement in September 2026. The rules didn't change with the name, so anything written before then still applies. You'll see both terms in use for a while." },
      { h: 'Who it suits, and who it does not', p: "It gives the employer a fixed, predictable cost and it gives employees real choice, which works well for a spread out or part-time workforce. It works less well where the local individual market is thin or where employees would rather not shop for their own plan. The allowance also has to meet affordability rules for full-time employees at larger employers." },
    ],
    facts: [['Employer sets', 'A fixed allowance'], ['Employee buys', 'Their own individual policy'], ['Renamed', 'CHOICE Arrangement, September 2026'], ['Best fit', 'Distributed or part-time teams']],
    related: ['hra', 'employer-contribution', 'fully-insured'],
    links: [['ichra-for-minnesota-businesses', 'ICHRA for Minnesota businesses'], ['ichra-vs-traditional-group-health-insurance', 'ICHRA vs traditional group health']],
  },
  {
    slug: 'level-funded', term: 'Level funded', letter: 'L',
    short: 'A funding model where the employer pays a steady monthly amount like a premium, but gets money back if claims come in low.',
    body: [
      { p: "Level funding sits between fully insured and self-funded. You pay a consistent monthly amount that covers expected claims, administration, and stop-loss protection. If actual claims land below expectation, some of the difference comes back." },
      { h: 'Why it appeals to healthy small groups', p: "A young or healthy team subsidizes everyone else under a fully insured pool and never sees a dollar of it back. Level funding is how that group keeps some of its own good year, without taking on the open-ended risk of true self funding." },
      { h: 'What to read carefully', p: "How the surplus is calculated and when it's paid, what happens if claims run high, and what your renewal looks like after a bad year. Also, level funded plans usually require medical underwriting up front, so it's not automatically available." },
    ],
    facts: [['Monthly cost', 'Steady, like a premium'], ['Good year', 'Some money comes back'], ['Protection', 'Stop-loss is built in'], ['Usually requires', 'Medical underwriting']],
    related: ['fully-insured', 'self-funded', 'stop-loss'],
    links: [['fully-insured-vs-level-funded-medical-plans', 'Fully insured vs level funded']],
  },
  {
    slug: 'long-term-disability', term: 'Long term disability', aka: 'LTD', letter: 'L',
    short: 'Coverage that replaces part of an employee’s income when a disability keeps them out of work beyond the short term.',
    body: [
      { p: "Long term disability picks up where short term disability ends and replaces a percentage of income, often around 60 percent, for a defined period that can run to retirement age depending on the contract." },
      { h: 'The definition that decides everything', p: "Policies differ on what counts as disabled. Own occupation means you're covered if you can't do your specific job. Any occupation means benefits stop once you could do any reasonable work. Many contracts start as own occupation and switch after a couple of years. This single definition matters more than the price difference between two quotes." },
      { h: 'How it gets taxed', p: "If the employer pays the premium and takes the deduction, benefits are generally taxable to the employee. If the employee pays with after-tax dollars, benefits are generally tax-free. A 60 percent benefit taxed is a lot less than 60 percent, and employees should be told which one they have." },
    ],
    facts: [['Replaces', 'A percentage of income'], ['Starts after', 'A waiting period, often when STD ends'], ['Key term', 'Own occupation vs any occupation'], ['Taxability', 'Depends on who paid the premium']],
    related: ['short-term-disability', 'waiting-period', 'voluntary-benefits'],
    links: [['group-life-and-disability-insurance-mn', 'Group life and disability in Minnesota'], ['accident-insurance-vs-disability-insurance', 'Accident vs disability insurance']],
  },
  {
    slug: 'minimum-participation', term: 'Minimum participation', letter: 'M',
    short: 'The share of eligible employees a carrier requires to enroll before it will issue or renew a group plan.',
    body: [
      { p: "Carriers require a minimum percentage of eligible employees to actually enroll. The rule exists to stop a group where only the people expecting claims sign up. The threshold varies by carrier and by product, so it's a number to confirm rather than assume." },
      { h: 'Valid waivers usually do not count against you', p: "Employees with other coverage, typically through a spouse or a government program, can generally be excluded from the calculation if the waiver is documented. The documentation is the part that gets skipped, and then a group that would have qualified doesn't." },
      { h: 'Why small groups feel this most', p: "At ten employees, two unexpected waivers move the percentage a long way. This is the requirement small groups fail most often, and it's usually fixable if you find out before the submission rather than after. We run the math before anything is committed." },
    ],
    facts: [['Set by', 'The carrier, per product'], ['Measured against', 'Eligible employees'], ['Valid waivers', 'Usually excluded, if documented'], ['Interacts with', 'The employer contribution']],
    related: ['waiver-of-coverage', 'employer-contribution', 'census'],
    links: [['what-is-the-minimum-participation-rate-for-group-health-insurance', 'Minimum participation rate explained']],
  },
  {
    slug: 'minnesota-paid-leave', term: 'Minnesota Paid Leave', letter: 'M',
    short: 'Minnesota’s state paid family and medical leave program, which employers fund through the state or through an approved private plan.',
    body: [
      { p: "Minnesota Paid Leave is a state program providing paid family and medical leave to Minnesota workers. Employers participate either through the state fund or by using an approved private plan from a carrier." },
      { h: 'The choice employers have', p: "The state fund is the default and requires no action to select. A private plan has to be equivalent to or better than the state benefit and has to be approved. Which one makes sense depends on your workforce and what the two actually cost you, and it's worth running the comparison rather than defaulting." },
      { h: 'It is separate from your other leave', p: "This sits alongside FMLA, alongside short term disability, and alongside whatever PTO you already offer. Working out how they stack, and what an employee actually receives when more than one applies, is the part that needs thought before the first claim rather than during it." },
    ],
    facts: [['Applies to', 'Minnesota employers'], ['Default', 'The state fund'], ['Alternative', 'An approved private plan'], ['Interacts with', 'FMLA, STD and PTO']],
    related: ['short-term-disability', 'long-term-disability', 'qualifying-life-event'],
    links: [['carriers', 'Carriers we work with, including Paid Leave']],
  },
  {
    slug: 'network', term: 'Network', letter: 'N',
    short: 'The group of doctors, clinics and hospitals that have agreed to contracted rates with a carrier.',
    body: [
      { p: "A network is the set of providers under contract with a carrier at negotiated rates. In network, the plan pays its share against that agreed price. Out of network, the member is exposed to whatever the provider charges." },
      { h: 'The number nobody sees', p: "The discount between the billed charge and the contracted rate is frequently the biggest single number on a claim. Employees see premiums and deductibles, and almost never see the amount the network saved them. An explanation of benefits is the easiest way to show them." },
      { h: 'Compare networks, not just carriers', p: "One carrier can offer several networks at different prices, and the cheaper plan is usually the narrower network. In Minnesota the differences between carrier networks are real and they're specific to particular clinic systems. Checking your team's actual providers by name beats comparing network sizes." },
    ],
    facts: [['What it is', 'Contracted providers'], ['In network', 'Plan pays against the agreed rate'], ['Out of network', 'Member exposed to billed charges'], ['Check', 'Your team’s actual clinics, by name']],
    related: ['ppo', 'hmo', 'eob'],
    links: [['ppo-vs-hmo-for-small-business-health-insurance', 'PPO vs HMO for small business'], ['carriers', 'Carriers we work with']],
  },
  {
    slug: 'open-enrollment', term: 'Open enrollment', letter: 'O',
    short: 'The window each plan year when employees can join, drop or change coverage without needing a qualifying event.',
    body: [
      { p: "Open enrollment is the annual window when anyone eligible can make an election. Outside it, changes generally require a qualifying life event. For a group plan the window is tied to the plan year, not to the calendar." },
      { h: 'How long it should take', p: "For a small group, a couple of weeks of active enrollment is usually enough, with the decisions made before that. The work that determines whether it goes smoothly happens earlier: rates confirmed, materials ready, and a meeting scheduled where people can ask questions." },
      { h: 'Treat it as the one moment you have', p: "It's the only point in the year when you have everyone's attention on benefits. A group that runs a real meeting gets higher participation, which can improve guaranteed issue amounts on voluntary products and helps satisfy carrier participation requirements. Emailing a packet and hoping does none of that." },
    ],
    facts: [['Frequency', 'Once per plan year'], ['Tied to', 'The plan year, not the calendar'], ['Outside it', 'A qualifying event is needed'], ['Drives', 'Participation, and what it unlocks']],
    related: ['special-enrollment', 'qualifying-life-event', 'minimum-participation'],
    links: [['open-enrollment-vs-special-enrollment-events', 'Open vs special enrollment'], ['how-long-does-open-enrollment-take-for-a-small-business', 'How long does open enrollment take?']],
  },
  {
    slug: 'out-of-pocket-maximum', term: 'Out-of-pocket maximum', letter: 'O',
    short: 'The most an employee can pay for covered in-network care in a plan year, after which the plan pays the rest in full.',
    body: [
      { p: "The out-of-pocket maximum is the ceiling. Once a member's deductible, coinsurance and qualifying copays add up to that figure, the plan pays covered in-network care in full for the rest of the year." },
      { h: 'The number worth communicating', p: "Employees fixate on the deductible, but the out-of-pocket maximum is the one that answers the question they're really asking, which is what the worst year looks like. Lead with it when you explain a plan." },
      { h: 'What it does not cap', p: "Premiums don't count toward it. Out-of-network care often has a separate and higher limit, or none at all. And charges for services the plan doesn't cover don't count either. The ceiling protects against covered in-network care, which is not the same as protecting against all cost." },
    ],
    facts: [['Caps', 'Covered in-network member cost'], ['Excludes', 'Premiums'], ['Out of network', 'Often a separate, higher limit'], ['Resets', 'Each plan year']],
    related: ['deductible', 'coinsurance', 'copay', 'network'],
    links: [['group-health-insurance-small-business-mn', 'Group health insurance for Minnesota small business']],
  },
  {
    slug: 'ppo', term: 'PPO', letter: 'P',
    short: 'A plan design that covers care both inside and outside its network, paying more when the member stays in network.',
    body: [
      { p: "A preferred provider organization plan gives the member a network with the best pricing, but still pays something if they go outside it. No referral is normally needed to see a specialist." },
      { h: 'What the flexibility costs', p: "A PPO usually carries a higher premium than an HMO covering the same area. You're paying for out-of-network access and for the freedom to self-refer, whether or not your team ever uses either." },
      { h: 'Worth asking honestly', p: "If everyone on your team already uses in-network clinics and nobody travels, the out-of-network benefit may be a feature you're funding and not using. That's a real question for a small group, and the answer is sometimes that the HMO was fine." },
    ],
    facts: [['Out-of-network', 'Covered, at a lower level'], ['Specialist referral', 'Usually not required'], ['Typical cost', 'Higher than an HMO'], ['You pay for', 'Flexibility, used or not']],
    related: ['hmo', 'network', 'premium'],
    links: [['ppo-vs-hmo-for-small-business-health-insurance', 'PPO vs HMO for small business']],
  },
  {
    slug: 'premium', term: 'Premium', letter: 'P',
    short: 'The fixed amount paid each month to keep coverage in force, split between the employer and the employee.',
    body: [
      { p: "The premium is the monthly cost of the plan, paid whether or not anyone uses it. The employer covers a share and the employee covers the rest through payroll deduction." },
      { h: 'It is not the whole cost', p: "Comparing plans on premium alone is the most common and most expensive mistake in benefits. A cheaper premium with a much higher deductible can cost a team more in total. What matters is premium plus what people actually pay when they use the plan." },
      { h: 'What moves it at renewal', p: "For a small group that's mainly the carrier's overall trend, your group's age mix, and where you are. On level funded and self-funded arrangements your own claims experience enters the picture too, which cuts both ways." },
    ],
    facts: [['Paid', 'Monthly, used or not'], ['Split', 'Employer and employee'], ['Not the same as', 'Total cost'], ['Moves with', 'Trend, age mix, and location']],
    related: ['employer-contribution', 'age-banded-rates', 'composite-rates', 'deductible'],
    links: [['when-minnesota-small-group-health-rates-change', 'When Minnesota small group rates change'], ['how-much-does-group-health-insurance-cost-for-10-employees-in-minnesota', 'What group health costs for 10 employees']],
  },
  {
    slug: 'qualifying-life-event', term: 'Qualifying life event', letter: 'Q',
    short: 'A change in circumstances, like marriage or losing other coverage, that lets an employee change their benefits outside open enrollment.',
    body: [
      { p: "A qualifying life event opens a limited window for an employee to enroll, drop coverage, or change tiers when it isn't open enrollment. Common ones are marriage or divorce, a birth or adoption, and losing coverage from another source." },
      { h: 'The window is short and it is strict', p: "There's a limited number of days from the event to make the change, and the employee has to be able to document it. Miss the window and they generally wait until the next open enrollment. Employees routinely don't know this until it's too late." },
      { h: 'The change has to match the event', p: "The election has to be consistent with what happened. A new baby supports adding a dependent. It doesn't support switching to a different plan because the other one now looks better. That consistency rule surprises people." },
    ],
    facts: [['Opens', 'A limited special enrollment window'], ['Requires', 'Documentation of the event'], ['Election must be', 'Consistent with the event'], ['Miss it', 'Wait for open enrollment']],
    related: ['special-enrollment', 'open-enrollment', 'cobra'],
    links: [['open-enrollment-vs-special-enrollment-events', 'Open vs special enrollment'], ['when-can-i-add-or-remove-employees-from-my-group-plan', 'When can I add or remove employees?']],
  },
  {
    slug: 'sbc', term: 'Summary of Benefits and Coverage', aka: 'SBC', letter: 'S',
    short: 'A short standardized document that describes what a plan covers and costs, in a format required to be the same across all carriers.',
    body: [
      { p: "The SBC is a standardized summary every health plan has to provide. Because the format and the categories are fixed by regulation, you can hold two carriers' SBCs side by side and actually compare them." },
      { h: 'The coverage examples', p: "Each SBC includes worked examples showing roughly what a member would pay under that plan for a couple of standard scenarios. It's the fastest way to show an employee what a deductible difference means in practice, and it's usually ignored." },
      { h: 'How it differs from the SPD', p: "An SBC is short, standardized and comparison-focused. An SPD is the full plan description required under ERISA and it's a different document with a different job. Having one doesn't satisfy the requirement for the other." },
    ],
    facts: [['Format', 'Standardized by regulation'], ['Purpose', 'Compare plans like for like'], ['Includes', 'Worked coverage examples'], ['Not a substitute for', 'The SPD']],
    related: ['spd', 'deductible', 'out-of-pocket-maximum'],
    links: [['what-is-an-spd-and-do-i-need-one', 'What is an SPD and do I need one?']],
  },
  {
    slug: 'self-funded', term: 'Self funded', letter: 'S',
    short: 'A funding model where the employer pays employee claims directly out of its own money instead of paying a carrier a premium.',
    body: [
      { p: "A self-funded employer pays claims as they come in, hires an administrator to process them, and buys stop-loss insurance to cap the damage from a catastrophic year. There's no premium in the traditional sense." },
      { h: 'What you gain', p: "You keep whatever you don't spend, you get real claims data, and you have more control over plan design. A group with good experience can do considerably better than the pooled rate a fully insured plan would give it." },
      { h: 'What you take on', p: "Cash flow variability and real risk. Claims don't arrive evenly, and a bad quarter is a bad quarter. Stop-loss limits the ceiling but doesn't remove the volatility underneath it. This is why level funding exists, as a way to get some of the benefit with a steady monthly number." },
    ],
    facts: [['Employer pays', 'Actual claims'], ['Protection', 'Stop-loss insurance'], ['Keeps', 'Unspent claim dollars'], ['Takes on', 'Cash flow variability']],
    related: ['level-funded', 'fully-insured', 'stop-loss'],
    links: [['self-funded-vs-fully-insured-group-plans', 'Self funded vs fully insured']],
  },
  {
    slug: 'short-term-disability', term: 'Short term disability', aka: 'STD', letter: 'S',
    short: 'Coverage that replaces part of an employee’s income for a limited period when illness or injury keeps them out of work.',
    body: [
      { p: "Short term disability replaces a percentage of income for a defined number of weeks after a short waiting period. It covers the gap between the day someone stops working and the day long term disability could begin." },
      { h: 'The most common claim is not what people expect', p: "Pregnancy and childbirth are among the most frequent short term disability claims. For a workforce of a certain age profile, that alone can justify offering it, and it's worth saying plainly when you explain the benefit." },
      { h: 'Check how it stacks', p: "STD, Minnesota Paid Leave and any PTO policy can all apply to the same absence. How they coordinate determines what the employee actually receives and what the employer actually pays. Work that out before the first claim rather than during one." },
    ],
    facts: [['Replaces', 'A percentage of income'], ['Duration', 'A defined number of weeks'], ['Begins after', 'A short waiting period'], ['Coordinate with', 'Paid Leave and PTO']],
    related: ['long-term-disability', 'minnesota-paid-leave', 'waiting-period'],
    links: [['group-life-and-disability-insurance-mn', 'Group life and disability in Minnesota']],
  },
  {
    slug: 'special-enrollment', term: 'Special enrollment', letter: 'S',
    short: 'A limited window outside open enrollment when an employee may change coverage because of a qualifying life event.',
    body: [
      { p: "Special enrollment is the exception to the open enrollment rule. A qualifying life event opens a short window in which an employee can enroll, add a dependent, or drop coverage." },
      { h: 'What triggers one', p: "Marriage, divorce, a birth or adoption, and loss of other coverage are the usual triggers. Losing coverage means losing it involuntarily. Choosing to drop a spouse's plan because it got expensive generally doesn't open a window." },
      { h: "The employer's job", p: "Tell people the window exists, before they need it. Most employees who miss a special enrollment miss it because nobody told them the clock was running. Cover it at the enrollment meeting and put it in writing where they'll find it later." },
    ],
    facts: [['Opened by', 'A qualifying life event'], ['Length', 'Limited, counted in days'], ['Loss of coverage', 'Generally must be involuntary'], ['Most common failure', 'Nobody knew the window existed']],
    related: ['qualifying-life-event', 'open-enrollment', 'cobra'],
    links: [['open-enrollment-vs-special-enrollment-events', 'Open vs special enrollment']],
  },
  {
    slug: 'spd', term: 'Summary Plan Description', aka: 'SPD', letter: 'S',
    short: 'The plain-language document required under federal law that tells employees what the plan covers and what their rights are.',
    body: [
      { p: "An SPD is the employee-facing description of the plan required under ERISA. It sets out who's eligible, what's covered, how to file a claim, and what rights participants have." },
      { h: 'The carrier booklet is usually not enough', p: "An SPD often needs a wrap document that combines the required ERISA language with the carrier's materials. Assuming the booklet covers it is one of the most common compliance gaps among small employers, and it's straightforward to close." },
      { h: 'It has a delivery requirement', p: "Existing isn't sufficient. ERISA sets timeframes for getting the SPD to participants after they enroll and when the plan changes. A document sitting in a folder nobody has seen doesn't satisfy it." },
    ],
    facts: [['Required by', 'ERISA'], ['Audience', 'Employees'], ['Often needs', 'A wrap document'], ['Also requires', 'Timely delivery']],
    related: ['sbc', 'creditable-coverage', 'cafeteria-plan'],
    links: [['what-is-an-spd-and-do-i-need-one', 'What is an SPD and do I need one?']],
  },
  {
    slug: 'stop-loss', term: 'Stop-loss insurance', letter: 'S',
    short: 'Insurance that protects a self-funded or level-funded employer by capping how much it can pay in claims.',
    body: [
      { p: "Stop-loss is what makes self funding survivable for a small employer. It's coverage the employer buys against its own claims, and it comes in two forms that do different jobs." },
      { h: 'Specific and aggregate', p: "Specific stop-loss caps what the employer pays on any one person, so a single catastrophic claim doesn't sink the plan. Aggregate stop-loss caps what the employer pays across everyone combined, protecting against a year where lots of moderate claims add up. A plan usually carries both." },
      { h: 'Read the contract basis', p: "How the policy defines which claims it covers, by when they're incurred and when they're paid, determines whether a claim at a year boundary is covered or lands in a gap. It's technical and it's exactly where an unpleasant surprise comes from." },
    ],
    facts: [['Protects', 'The employer, not the member'], ['Specific', 'Caps cost per person'], ['Aggregate', 'Caps total cost'], ['Watch', 'The contract basis at year end']],
    related: ['self-funded', 'level-funded', 'fully-insured'],
    links: [['self-funded-vs-fully-insured-group-plans', 'Self funded vs fully insured'], ['fully-insured-vs-level-funded-medical-plans', 'Fully insured vs level funded']],
  },
  {
    slug: 'voluntary-benefits', term: 'Voluntary benefits', letter: 'V',
    short: 'Coverage offered through the employer but paid for by the employee, usually through payroll deduction.',
    body: [
      { p: "Voluntary benefits are made available by the employer and funded by the employee. Accident, critical illness, hospital indemnity and voluntary life are the usual examples." },
      { h: 'Why offer something you do not pay for', p: "Group pricing and payroll deduction make coverage cheaper and easier to get than an employee could manage alone, and some products come guaranteed issue up to a limit at work when they'd require underwriting outside it. It's a real benefit at no premium cost to the business." },
      { h: 'Participation still matters', p: "Carriers often set a minimum enrollment for voluntary products, and on voluntary life the guaranteed issue amount can depend on turnout. A product offered by email will underperform one explained in a meeting, and the difference shows up in what everybody is allowed to buy." },
    ],
    facts: [['Paid by', 'The employee'], ['Offered through', 'Payroll deduction'], ['Employer premium cost', 'None'], ['Turnout affects', 'Guaranteed issue limits']],
    related: ['accident-insurance', 'critical-illness-insurance', 'hospital-indemnity', 'guaranteed-issue'],
    links: [['voluntary-vs-employer-paid-benefits', 'Voluntary vs employer paid benefits'], ['what-is-supplemental-insurance-and-do-my-employees-need-it', 'What is supplemental insurance?']],
  },
  {
    slug: 'waiting-period', term: 'Waiting period', letter: 'W',
    short: 'The time a new hire must be employed before their coverage can begin.',
    body: [
      { p: "The waiting period is the delay between a new hire's start date and their benefits effective date. Federal rules cap how long it can be, and within that cap the employer picks the rule." },
      { h: 'The design choice', p: "First of the month following a set number of days is the most common structure, because it lines coverage up with billing and payroll. A shorter waiting period is a genuine recruiting advantage in a tight labor market. A longer one reduces cost on high turnover roles." },
      { h: 'Apply it consistently', p: "Whatever rule you choose has to be applied the same way to everyone in the same class. Making an exception for one hire is the kind of thing that creates a problem later, and it's easier to set a class structure up front than to explain an inconsistency afterward." },
    ],
    facts: [['Applies to', 'New hires'], ['Capped by', 'Federal rules'], ['Common structure', 'First of the month after a set number of days'], ['Must be', 'Applied consistently by class']],
    related: ['guaranteed-issue', 'qualifying-life-event', 'cobra'],
    links: [['when-can-i-add-or-remove-employees-from-my-group-plan', 'When can I add or remove employees?'], ['can-i-offer-different-plans-to-different-employees', 'Can I offer different plans to different employees?']],
  },
  {
    slug: 'waiver-of-coverage', term: 'Waiver of coverage', letter: 'W',
    short: 'A signed record that an eligible employee declined the plan, and why, which protects the group’s participation math.',
    body: [
      { p: "A waiver documents that an eligible employee was offered coverage and turned it down, along with the reason, usually that they have coverage elsewhere." },
      { h: 'Why the paperwork is the point', p: "Employees with other coverage can generally be excluded from the participation calculation, but only if it's documented. An undocumented decline counts against you. That's how a group that genuinely met the requirement gets declined for not meeting it." },
      { h: 'Collect them at enrollment, not later', p: "Chasing waivers after a submission is rejected is far harder than collecting them while you have everyone's attention. Every declining employee signs one during open enrollment, and the file is complete before anything goes to the carrier." },
    ],
    facts: [['Records', 'That an eligible employee declined'], ['Protects', 'Your participation percentage'], ['Only counts if', 'It is documented'], ['Collect', 'During enrollment, not after']],
    related: ['minimum-participation', 'employer-contribution', 'census'],
    links: [['what-is-the-minimum-participation-rate-for-group-health-insurance', 'Minimum participation rate explained']],
  },
];

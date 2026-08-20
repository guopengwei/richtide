# First-commercial-market feasibility for RichTide

- Research date: 2026-08-20
- Primary-source access date: 2026-08-20
- Decision supported: choose the first customer Commercial Market and its launch envelope
- Status: research evidence, not legal, tax, regulatory, payment-provider, or data-licensing approval

## Executive finding

The evidence supports a two-candidate decision: **Hong Kong first, Singapore as the fallback or immediately following market**. Australia is technically and commercially possible but adds materially more consumer, tax, privacy, and financial-advice obligations without matching the initial `zh-CN` audience as closely. The United Kingdom and United States should not be first-wave customer markets; Mainland China should remain closed until a dedicated Mainland legal, hosting, content, data-transfer, payment, and market-data review is complete.

This is a conditional recommendation, not a launch approval. Hong Kong wins on language/audience fit, HKD/CNY payment rails, absence of sales tax/VAT, and an official SFC statement that factual, fair, balanced research reports can avoid triggering the suitability requirement. It also carries the decisive unresolved risk: instrument-specific generated analysis may still constitute Type 4 advising or fall outside the periodical-publication exclusion. Singapore is operationally strong, but MAS expressly classifies “Issuing or Promulgating Analyses/Reports on Investment Products” as a financial-advisory activity in its licensing directory, so an exemption or licence position must also be established before launch.

The appropriate next decision is therefore not “launch everywhere in Chinese.” It is:

1. seek a written Hong Kong regulatory-perimeter opinion on the exact product, copy, rankings, generated reports, alerts, and calls to action;
2. in parallel, obtain Airwallex merchant underwriting and Billing capability confirmation for a Hong Kong legal entity, HKD prices, recurring subscriptions, refunds/disputes, Simplified-Chinese hosted checkout, and the proposed research-services merchant category;
3. contract for source and display rights covering the exact A-share, Hong Kong, and US daily/weekly data fields and derived outputs;
4. choose Hong Kong only if all three close without a licensed-adviser operating model; otherwise move the same evidence packet to Singapore counsel and keep the product closed until its exemption/licensing position is written.

## Scope and decision frame

“Commercial Market” must name the **eligible customer territory**, not merely the frontend language, currency, merchant entity, data-centre region, or instrument exchange. Those dimensions require separate controls. This comparison assumes:

- a public, self-service `zh-CN` PWA for adults;
- Free, Lite, and Pro access, recurring subscriptions, and prepaid Analysis Credit packs;
- instrument-specific A-share, Hong Kong, and US equity research;
- daily/weekly rather than live intraday analysis at launch;
- no brokerage, order routing, personalized portfolio advice, position sizing, or client-specific suitability assessment;
- evidence-backed reports that may contain opinions, scenarios, risk/catalyst analysis, rankings, and valuation ranges;
- Airwallex Hosted Billing Checkout, with RichTide—not Airwallex—as the merchant responsible for customer refunds.

The comparison treats product availability, source access, and redistribution rights as different questions. A public filing or technically reachable quote is not, by itself, permission to normalize, store, derive from, display, export, or sell it.

## Candidate matrix

| Customer Commercial Market | Payment and currency | Indirect tax | Privacy / cross-border | Financial-research perimeter | `zh-CN` and instrument fit | Decision posture |
|---|---|---|---|---|---|---|
| **Hong Kong** | Airwallex documents HKD/CNY FPS and other Hong Kong account rails; its payment-method table includes HK shopper methods and HK business availability. Provider underwriting remains open. | Hong Kong has no sales tax or VAT. Profits-tax and source-of-profit treatment still require tax advice. | PDPO duties apply to cloud processing; PCPD expects notice, purpose control, security, processor contracts, and comparable protection for offshore handling. | SFC says generic factual market information normally does not require a licence, and factual, fair, balanced research reports may not trigger suitability. Specific-security advice, active marketing, inducements, or on-demand/generated personalization may still trigger licensing. | Best direct fit for Simplified-Chinese research and HK/A-share interest; US coverage is feasible if sourced/licensed. | **Preferred conditional candidate.** No paid activation until perimeter opinion, provider approval, and data contracts are written. |
| **Singapore** | Airwallex documents SGD accounts and FAST/GIRO/MEPS receipt rails; Billing supports SGD. Exact PayNow/recurring method combinations and merchant approval require provider confirmation. | Remote B2C services can be subject to 9% GST; an overseas supplier generally enters OVR when global turnover exceeds S$1m and Singapore B2C remote-service revenue exceeds S$100k. | PDPA requires purpose, consent/other lawful basis, security, retention, breach response, and comparable protection for overseas transfers. | MAS treats “Issuing or Promulgating Analyses/Reports on Investment Products” as a licensed/exempt financial-advisory activity. Do not assume an information-only exemption for generated stock research. | Strong regional Chinese-speaking customer base and multi-market investor profile, though weaker locale fit than Hong Kong. | **Fallback / second market.** Excellent operations, but regulatory-perimeter clearance remains a hard gate. |
| **Australia** | Airwallex supports AUD and Australian business/payment capabilities. | Non-resident sellers of imported services/digital products to Australian consumers generally must register for GST at A$75,000 annual turnover; domestic entity treatment must be separately confirmed. | APP 8 can make an Australian entity accountable for overseas recipients; Privacy Act coverage and reforms must be assessed for the actual entity/turnover/data practices. | ASIC defines a recommendation, opinion, or report intended or reasonably regarded as intended to influence a financial-product decision as financial product advice; general advice ordinarily requires AFS licensing unless an exemption applies. | A/H/US research is useful to diaspora investors, but `zh-CN`-only is a narrower local proposition. | **Later expansion, not first.** Higher advice, consumer-guarantee, tax, privacy, and localization burden. |
| **United Kingdom** | Airwallex supports GBP and UK payment capabilities. | UK VAT treatment for customer location and service classification must be qualified. | UK GDPR transfer rules require a dedicated review. | The FCA says a business website that invites or induces investment activity is a financial promotion. | Access to US/HK/A instruments is possible through licensed sources, but a Chinese-only first release is a weaker fit. | **Do not select first.** Dedicated FCA perimeter/approval strategy required. |
| **United States** | Airwallex supports USD; its tax engine lists US states, but merchant approval remains open. | State/local taxability and nexus were not qualified by this research. | Federal/state privacy coverage was not qualified by this research. | The SEC describes issuing securities analyses for compensation as investment-adviser activity, subject to a fact-specific bona fide publication exclusion. | Large Chinese-speaking audience and strong US filing access, but the unqualified commerce/privacy/adviser surface is disproportionate for v1. | **Do not select first.** Revisit after one APAC market is qualified. |
| **Mainland China** | Airwallex documents some China shopper methods/currencies, but that does not prove a foreign or offshore research merchant can lawfully acquire Mainland customers or settle the proposed service. | Tax and invoicing treatment is not established in this research. | Hosting, personal-information, and cross-border processing requirements are not established in this research. | The exact online financial-information, securities-analysis, advertising, generative-AI, and publication perimeter is not established here. | Highest language and A-share fit, but also the largest unresolved legal/operational envelope. | **Explicitly closed.** Commission a separate Mainland feasibility project before any marketing, signup, payment, or personal-data collection. |

## Verified cross-market facts

### Airwallex is feasible infrastructure, not a market approval

- Hosted Billing Checkout supports one-off `PAYMENT`, recurring `SUBSCRIPTION`, and payment-method `SETUP` modes. A fresh server-created checkout is required when the customer is ready to pay, and its URL expires after one hour ([Airwallex Hosted Billing Checkout](https://www.airwallex.com/docs/billing/billing-components/checkout/hosted-billing-checkout)).
- Billing supports HKD, SGD, AUD, USD, CNY and many other presentment currencies ([Airwallex supported Billing currencies](https://www.airwallex.com/docs/billing/supported-currencies)). Currency-list presence does not prove that every payment method, subscription flow, or legal entity supports that currency.
- The payment-method explorer makes shopper location, business location, presentment currency, recurrence, refund, dispute, and integration support explicit. Its current table shows Hong Kong, Singapore, and Australia as business locations across multiple global and local methods, including Hong Kong FPS/AlipayHK paths and Mainland Alipay for eligible business locations ([Airwallex payment methods](https://www.airwallex.com/docs/payments/payment-methods)).
- Airwallex documents Hong Kong CNY/HKD receipt by ACH, RTGS, and FPS, and Singapore SGD receipt by GIRO, MEPS, and FAST. The same page directs customers to their account manager for region-specific capability questions and notes that Singapore Global Accounts do not support registration of a PayNow alias ([Airwallex Global Accounts coverage](https://www.airwallex.com/docs/accounts/supported-regions-and-currencies)).
- Airwallex Automatic Tax Calculation lists Hong Kong, Singapore, Australia, China, and US subnational jurisdictions, but says support varies by country, region, product type, and customer location. This is calculation tooling, not a tax determination or registration service ([Airwallex tax regions](https://www.airwallex.com/docs/billing/airwallex-tax/supported-regions)).
- Airwallex refunds are merchant-initiated, return to the original payment instrument, depend on method time limits and available same-currency refundable funds, and are not complete for RichTide accounting merely because a request was accepted; the provider documents `RECEIVED`, `ACCEPTED`, `SETTLED`, and `FAILED` states. End customers must ask the merchant, not Airwallex, for a refund ([Airwallex refunds](https://www.airwallex.com/docs/payments/payment-operations/manage-payments/refunds)).

**Inference:** Airwallex removes no jurisdictional gate. RichTide still needs an approved merchant entity, business model/MCC, exact method matrix, recurring-payment qualification, hosted-checkout Chinese-language proof, tax configuration, reserves, refund funding, and dispute rules for the selected market.

### Market-data and filing access is source-specific

- HKEX operates separate vendor, end-user, and application-service-provider licences for market data. Its current fee schedule includes delayed-data and non-display categories; its delayed-data requirements require at least a 15-minute delay and conspicuous delay disclosure ([HKEX licensing](https://www.hkex.com.hk/Services/Market-Data-Services/Real-Time-Data-Services/Data-Licensing/HKEX-IS?sc_lang=en), [HKEX market-data vendor fees](https://www.hkex.com.hk/Services/Rules-and-Forms-and-Fees/Fees/Securities-%28Hong-Kong%29/Market-Data/Market-Data-Vendors?sc_lang=en)).
- Shanghai Stock Exchange Information Network describes itself as the exclusive operator of SSE real-time data domestically and abroad and publishes application/licensing workflows for display, non-display, and redistribution uses. Its site also states that SSE materials may not be reprinted without permission ([SSE Information business platform](https://bsp.sseinfo.com/), [SSE information-use statement](https://sns.sseinfo.com/en/contact.do)). Shenzhen Stock Exchange likewise offers Level-1 and Level-2 data through its data-services channel ([SZSE data services](https://www.szse.cn/English/services/dataServices/index.html)).
- For US equities, NYSE requires agreements for receipt/use/redistribution and requires prominent delayed-data notices; CTA external-redistribution forms distinguish real-time, delayed, datafeed, and display uses ([NYSE connectivity documents](https://www.nyse.com/connectivity/documents), [CTA external distribution form](https://www.nyse.com/publicdocs/ctaplan/notifications/trader-update/Exhibit%20A%20-%20CTA%20-%20Internal%20and%20External%20Distribution.pdf)). Nasdaq likewise requires prominent delay messages for eligible delayed products and separately defines external distribution, derived data, non-display use, and historical data ([Nasdaq display requirements](https://www.nasdaqtrader.com/content/AdministrationSupport/Policy/DISPLAYREQUIREMENTSPOLICY.pdf), [Nasdaq data-use policy](https://www.nasdaqtrader.com/content/technicalsupport/dataproducts/indexdatapolicy.pdf)).
- SEC EDGAR supplies unauthenticated JSON APIs for submissions and XBRL company facts, updated through the day, but automated use must follow SEC developer policies ([SEC EDGAR APIs](https://www.sec.gov/search-filings/edgar-application-programming-interfaces)). This proves a strong official US filings source, not a licence for third-party exchange quotes or every filing-derived commercial output.

**Inference:** Daily/weekly analysis reduces cost and real-time-display complexity, but does not eliminate licensing. RichTide needs a field-level source register stating acquisition, storage, normalization, model input, derived-output, display, export, historical retention, and geographic rights. Do not use an aggregator’s API availability as evidence of those rights.

## Jurisdiction findings

### Hong Kong

Verified facts:

- The SFC says generic factual market information normally does not require a licence where no specific-security recommendation or investment advice is made. It also describes a periodical-publication exclusion whose applicability to an internet publication depends on satisfying the statutory conditions ([SFC: Do you need a licence or registration?](https://www.sfc.hk/en/Regulatory-functions/Intermediaries/Licensing/Do-you-need-a-licence-or-registration)).
- For online platforms, the SFC says factual, fair and balanced research reports—including reports that may contain buy/hold/sell views and target prices—do not by themselves trigger the suitability requirement, absent other facts. The content, context, design, targeting, incentives, pressure, and sequence of actions all matter; active marketing into Hong Kong can also trigger licensing where the service amounts to regulated activity ([SFC online-platform FAQ](https://www.sfc.hk/en/faqs/intermediaries/supervision/Guidelines-on-Online-Distribution-and-Advisory-Platforms/Guidelines-on-Online-Distribution-and-Advisory-Platforms), [SFC suitability triggers](https://www.sfc.hk/en/faqs/intermediaries/supervision/Triggering-of-Suitability-Obligations/Triggering-of-Suitability-Obligations)).
- Hong Kong has no sales tax or VAT ([InvestHK tax system](https://www.investhk.gov.hk/en/why-hong-kong/low-and-simple-tax-system/)).
- The PCPD says offshore cloud storage is not prohibited, but the data user remains responsible for purpose, notice, security, processor controls, and retention. Its current cloud guidance recommends contractual protection, subprocessor control, and attention to offshore jurisdictions; model clauses are available for cross-border transfers ([PCPD cloud-storage case note](https://www.pcpd.org.hk/english/enforcement/case_notes/casenotes_2.php?content_nature=&content_type=&id=2024E02&msg_id2=578), [PCPD cloud guidance](https://www.pcpd.org.hk/english/resources_centre/publications/files/IL_cloud_e.pdf), [PCPD model clauses](https://www.pcpd.org.hk/english/news_events/media_statements/press_20220512.html)).

Inferences and design implications:

- Hong Kong is the best audience/commerce fit only if RichTide remains a generally available research publication, not a personalized advisory funnel. A disclaimer alone cannot cure product behavior.
- Suppress portfolio inputs, personalized action recommendations, “for you” ranks, trade buttons, broker referral economics, urgency/pressure copy, and product-specific incentives until counsel approves them.
- The “Decision Map,” score, watchlist alerts, valuation range, and analysis-generation prompt are the highest-risk features for perimeter review because they can create an overall impression of recommendation even when evidence is balanced.
- Use HKD as the first catalog currency. Showing source instruments in CNY/USD/HKD does not require selling subscriptions in those currencies.

External confirmations required:

1. Hong Kong securities counsel: whether each exact report type and the on-demand generation model is Type 4 activity or within a publication/information exclusion; whether Free versus paid access changes the analysis; and whether offshore operation or active Hong Kong marketing changes it.
2. SFC engagement if counsel advises: written perimeter clarification or licensing path.
3. Airwallex: Hong Kong entity onboarding, research-service merchant category, HKD recurring subscriptions, one-time credit packs, refunds/disputes, reserve/funding expectations, and complete `zh-CN` hosted checkout/invoice experience.
4. Tax adviser: Hong Kong profits-tax/source position and customer-location evidence, even though there is no VAT/sales tax.
5. PCPD/privacy counsel: privacy notice, processor terms, incident workflow, retention, model/gateway transfers, and cross-border clauses.

### Singapore

Verified facts:

- MAS’s live Financial Institutions Directory lists “Issuing or Promulgating Analyses/Reports on Investment Products” as an activity/business type for licensed and exempt financial advisers. This does not decide RichTide’s status, but it disproves any assumption that published investment-product analysis is automatically unregulated ([MAS Licensed Financial Adviser directory](https://eservices.mas.gov.sg/fid/institution?category=Licensed+Financial+Adviser), [MAS Exempt Financial Adviser directory](https://eservices.mas.gov.sg/fid/institution?category=Exempt+Financial+Adviser)).
- Singapore’s overseas-vendor regime applies GST to remote B2C services. IRAS states that an overseas supplier generally must register where global turnover exceeds S$1 million and Singapore B2C remote-service supplies exceed S$100,000; the current GST rate is 9% ([IRAS overseas remote services](https://www.iras.gov.sg/taxes/goods-services-tax-%28gst%29/gst-and-digital-economy/overseas-businesses), [IRAS remote-services guide](https://www.iras.gov.sg/media/docs/default-source/e-tax/gst-e-tax-guide_taxing-imported-remote-services-by-way-of-the-overseas-vendor-registration-regime_%281st-ed%29.pdf)). A Singapore entity’s domestic GST position is a separate question.
- Singapore’s PDPA includes accountability, notification, consent, purpose limitation, accuracy, protection, retention, access/correction, breach notification, and transfer limitation. Overseas transfers must retain comparable protection ([PDPC obligations](https://www.pdpc.gov.sg/overview-of-pdpa/the-legislation/personal-data-protection-act/data-protection-obligations), [PDPC key-concepts guidance](https://www.pdpc.gov.sg/guidelines-and-consultation/2020/03/advisory-guidelines-on-key-concepts-in-the-personal-data-protection-act)).
- CCCS enforces the Consumer Protection (Fair Trading) Act against misleading subscription traps and has required clear, unambiguous subscription pricing and terms in enforcement matters ([CCCS subscription traps](https://www.cccs.gov.sg/media-and-events/newsroom/announcements-and-media-releases/e-commerce-retailer-fashion-interactive-ordered-to-cease-unfair-trade-practices-and-stop-using--subscription-traps--481), [CCCS subscription-pricing warning](https://www.cccs.gov.sg/media-and-events/newsroom/announcements-and-media-releases/cccs-warns-foodpanda-over-misleading--free-delivery-on-all-restaurants--claims-278)).

Inferences and design implications:

- Singapore is not clearly lower-regulatory-risk than Hong Kong for this exact product. It may be operationally cleaner, but its explicit analyses/reports activity category creates a hard legal gate.
- SGD is the natural catalog currency. PayNow should not be promised merely because Singapore is supported; Airwallex’s exact recurring-payment and Billing Checkout method matrix must be qualified.
- The existing explicit subscription, cancellation, Analysis Credit, refund, and no-auto-recharge design is aligned with avoiding dark patterns, but counsel must approve its consumer terms and any cooling-off/unused-pack policy.

External confirmations required:

1. Singapore financial-services counsel: licence/exemption status for general and on-demand reports, rankings, target ranges, alerts, and paid analysis.
2. MAS engagement if advised.
3. Airwallex: Singapore entity/merchant approval, recurring and one-time method matrix, checkout language, SGD settlement/refunds, and tax feature fit.
4. Singapore tax adviser: GST registration/entity structure, invoice treatment, place-of-supply evidence, refunds/credit notes, and Analysis Credit classification.
5. PDPC/privacy counsel: transfer mechanism and DPO/notice/breach obligations.

### Australia

Verified facts:

- ASIC describes financial product advice as a recommendation or statement of opinion intended, or reasonably regarded as intended, to influence a decision about a financial product. Advice that is not personal advice is general advice; licensing and conduct rules may apply ([ASIC limited-AFS-licence information sheet](https://download.asic.gov.au/media/1310749/Applying_for_a_limited_AFS_licence_0179.pdf)).
- Non-resident businesses selling imported services/digital products to Australian consumers generally must register for GST when annual Australian turnover reaches A$75,000 ([ATO GST on imported services/digital products](https://softwaredevelopers.ato.gov.au/GSTintangibles)).
- Australian Consumer Law applies to overseas businesses that officially offer directly to Australian consumers. Consumer guarantees cannot be contracted away, and service failures can require correction, cancellation, refunds, or compensation ([ACCC consumer rights and guarantees](https://www.accc.gov.au/consumers/buying-products-and-services/consumer-rights-and-guarantees), [ACCC buying online](https://www.accc.gov.au/consumers/buying-products-and-services/buying-online)).
- APP 8 generally requires reasonable steps before disclosing personal information to an overseas recipient and can leave the Australian entity accountable for the recipient, subject to statutory exceptions ([OAIC APP 8 guidance](https://www.oaic.gov.au/privacy/australian-privacy-principles/australian-privacy-principles-guidelines/chapter-8-app-8-cross-border-disclosure-of-personal-information)).

Inference: Australia is viable only after an AFS-licensing/exemption opinion and an English-language/customer-support strategy. It provides no compelling v1 advantage over Hong Kong or Singapore for a `zh-CN`-only product.

### Screened-out first markets

- **United Kingdom:** the FCA says the section 21 restriction generally prevents a person, in the course of business, from communicating an invitation or inducement to engage in investment activity unless the communicator is authorized, the content is approved by an authorized person, or an exemption applies. It applies the same test to websites ([FCA PERG 8](https://handbook.fca.org.uk/handbook/perg8), [FCA Internet guidance](https://handbook.fca.org.uk/handbook/perg8/perg8s23)). HMRC has separate rules for VAT on digital services supplied to private consumers, and the ICO requires an approved mechanism/exception for restricted international transfers ([HMRC digital-services VAT](https://www.gov.uk/guidance/the-vat-rules-if-you-supply-digital-services-to-private-consumers), [ICO international transfers](https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/international-transfers/)). These facts do not make launch impossible; they make it a poor first choice for a `zh-CN`-only research product.
- **United States:** Investor.gov says an investment adviser includes a person or firm that, for compensation and as a business, provides securities advice or issues securities reports/analyses. SEC staff describes the statutory publisher exclusion as requiring general and impersonal advice, bona fide/disinterested analysis, and general and regular circulation rather than timing to specific market activity ([Investor.gov investment advisers](https://www.investor.gov/introduction-investing/getting-started/working-investment-professional/investment-advisers), [SEC staff publisher-exclusion discussion](https://www.sec.gov/divisions/investment/noaction/2015/jonathon-hendricks-012615-202a.htm)). Because RichTide proposes paid, on-demand instrument analysis, the exclusion cannot be assumed; state tax, privacy, adviser, and consumer scopes also remain unqualified.
- **Mainland China:** this research deliberately did not attempt to qualify the Mainland legal entity, hosting/filing, financial-information, securities-analysis, advertising, generative-AI, personal-information, cross-border-data, tax/invoicing, payment, or consumer perimeter. Airwallex method or CNY support is not evidence that the proposed offshore merchant and product are approved. Mainland acquisition therefore stays fail-closed pending its own primary-source and counsel-led feasibility project.

## Recommendation and trade-offs for the launch-envelope decision

### Recommended candidate set

1. **Hong Kong — preferred, conditional.** Best locale, currency, and instrument-interest fit; no sales tax/VAT. The trade-off is a material Type 4/publication-boundary question and formal HKEX/A-share/US source-rights work.
2. **Singapore — fallback or second.** Excellent payments, cloud, privacy, and regional operations. The trade-off is 9% GST administration and an explicit financial-advisory activity covering analyses/reports, requiring a robust exemption/licensing opinion.
3. **Australia — later expansion.** Airwallex-ready and institutionally clear, but less aligned with a Chinese-only launch and heavier on AFS, GST, consumer guarantees, privacy, and localization.

### Proposed launch envelope if Hong Kong clears

- Eligible customers: adults whose verified billing/customer residence is Hong Kong; exclude Mainland China and all other markets from paid checkout and paid entitlement.
- Locale: `zh-CN`; customer terms, privacy notice, risk disclosures, billing, checkout, support, and exports all in reviewed Simplified Chinese. Provide legally controlling Chinese/English terms only if counsel requires both.
- Catalog: HKD only at first; display instrument currencies independently and explicitly.
- Instruments: only symbols and fields for which production contracts authorize acquisition, transformation, model use, display, export, history, and Hong Kong customer distribution.
- Cadence: daily/weekly; no real-time or 5–15-minute product until separately licensed.
- Product boundary: generally available research; no client holdings, risk-profile questionnaire, personalized rank, position sizing, trade instruction, order link, broker referral, or “act now” promotion.
- Customer evidence: immutable report, source/citation, as-of time, methodology/limitations, balanced risks, assumptions, and correction history.
- Commerce: explicit recurring terms, renewal date/amount, cancellation effect, tax total, credit validity, no automatic recharge, refund policy, and statutory-rights override.
- Enforcement: paid checkout, promotions, payment methods, tax, and entitlement selected from server-side Commercial Market eligibility; do not infer eligibility from browser locale alone.

### Kill criteria

Do not activate paid service in a candidate market if any of the following remains open:

- counsel cannot give a written licence/exemption position for the exact screens, reports, generation flow, alerts, and marketing;
- Airwallex has not approved the merchant/entity/use case and exact subscription/pack/refund/dispute/localization capabilities in Sandbox and production onboarding;
- any required source lacks written commercial rights for its exact field and use;
- tax registration, tax category, invoice/credit-note, refund, or customer-location evidence is unresolved;
- privacy notices, processor/subprocessor terms, cross-border transfers, incident duties, and deletion/retention are not approved;
- customer terms do not preserve mandatory consumer remedies and explain subscriptions/credits/refunds clearly;
- RichTide cannot reliably block checkout and paid delivery outside the approved Commercial Market.

## Questions that primary sources do not resolve

These are not implementation details; they are external approvals or facts the human launch decision must demand:

1. Where is the contracting RichTide legal entity, and does it have the people, substance, licences, bank account, tax registrations, and provider eligibility needed for Hong Kong or Singapore?
2. Does the exact generated “Decision Map,” score, target/valuation range, ranking, alert, and watchlist experience amount to regulated advice, a financial promotion, or a publication in each candidate market?
3. Does charging per generated analysis or gating richer conclusions behind Pro change the regulatory characterization?
4. Which Airwallex legal entity will contract with RichTide, which MCC/use-case classification applies, and which recurring/local methods are actually approved for that entity?
5. Can Hosted Billing Checkout, invoices, authentication/3DS, payment errors, refunds, and disputes remain fully usable in Simplified Chinese?
6. Which vendor contracts cover the exact A-share, HK, and US reference, fundamentals, corporate-action, price, volume, index, and filing fields; do they allow model input and customer-visible derived analytics?
7. Are PDF/HTML exports, cached immutable artifacts, historical comparisons, watchlist alerts, and support/admin views separately licensed uses?
8. What tax category applies to subscriptions and Analysis Credit packs; when is tax recognized; how do partial refunds, expired credits, promotions, and chargebacks adjust it?
9. Which consumer-right remedies override the proposed wholly-unused-pack policy, and is any statutory or voluntary cooling-off period required?
10. Which cross-border transfers occur through Cloudflare, Airwallex, the RichTide gateway, support tools, observability, email, and backups, and what contracts/locations are approved?

## Primary-source register

All sources below were accessed on 2026-08-20.

### Payments and tax tooling

- [Airwallex Hosted Billing Checkout](https://www.airwallex.com/docs/billing/billing-components/checkout/hosted-billing-checkout)
- [Airwallex payment methods](https://www.airwallex.com/docs/payments/payment-methods)
- [Airwallex Billing currencies](https://www.airwallex.com/docs/billing/supported-currencies)
- [Airwallex Global Accounts regions and currencies](https://www.airwallex.com/docs/accounts/supported-regions-and-currencies)
- [Airwallex Automatic Tax regions](https://www.airwallex.com/docs/billing/airwallex-tax/supported-regions)
- [Airwallex refunds](https://www.airwallex.com/docs/payments/payment-operations/manage-payments/refunds)

### Hong Kong

- [SFC licensing perimeter](https://www.sfc.hk/en/Regulatory-functions/Intermediaries/Licensing/Do-you-need-a-licence-or-registration)
- [SFC online-platform FAQ](https://www.sfc.hk/en/faqs/intermediaries/supervision/Guidelines-on-Online-Distribution-and-Advisory-Platforms/Guidelines-on-Online-Distribution-and-Advisory-Platforms)
- [SFC suitability triggers](https://www.sfc.hk/en/faqs/intermediaries/supervision/Triggering-of-Suitability-Obligations/Triggering-of-Suitability-Obligations)
- [InvestHK tax system](https://www.investhk.gov.hk/en/why-hong-kong/low-and-simple-tax-system/)
- [PCPD offshore-cloud case note](https://www.pcpd.org.hk/english/enforcement/case_notes/casenotes_2.php?content_nature=&content_type=&id=2024E02&msg_id2=578)
- [PCPD Cloud Computing guidance](https://www.pcpd.org.hk/english/resources_centre/publications/files/IL_cloud_e.pdf)
- [PCPD cross-border model clauses](https://www.pcpd.org.hk/english/news_events/media_statements/press_20220512.html)
- [HKEX market-data licensing](https://www.hkex.com.hk/Services/Market-Data-Services/Real-Time-Data-Services/Data-Licensing/HKEX-IS?sc_lang=en)
- [HKEX market-data vendor fees](https://www.hkex.com.hk/Services/Rules-and-Forms-and-Fees/Fees/Securities-%28Hong-Kong%29/Market-Data/Market-Data-Vendors?sc_lang=en)

### Singapore

- [MAS Licensed Financial Adviser directory](https://eservices.mas.gov.sg/fid/institution?category=Licensed+Financial+Adviser)
- [MAS Exempt Financial Adviser directory](https://eservices.mas.gov.sg/fid/institution?category=Exempt+Financial+Adviser)
- [IRAS overseas remote services](https://www.iras.gov.sg/taxes/goods-services-tax-%28gst%29/gst-and-digital-economy/overseas-businesses)
- [IRAS remote-services e-Tax guide](https://www.iras.gov.sg/media/docs/default-source/e-tax/gst-e-tax-guide_taxing-imported-remote-services-by-way-of-the-overseas-vendor-registration-regime_%281st-ed%29.pdf)
- [PDPC data-protection obligations](https://www.pdpc.gov.sg/overview-of-pdpa/the-legislation/personal-data-protection-act/data-protection-obligations)
- [PDPC key-concepts guidance](https://www.pdpc.gov.sg/guidelines-and-consultation/2020/03/advisory-guidelines-on-key-concepts-in-the-personal-data-protection-act)
- [CCCS subscription-trap enforcement](https://www.cccs.gov.sg/media-and-events/newsroom/announcements-and-media-releases/e-commerce-retailer-fashion-interactive-ordered-to-cease-unfair-trade-practices-and-stop-using--subscription-traps--481)
- [CCCS subscription-pricing warning](https://www.cccs.gov.sg/media-and-events/newsroom/announcements-and-media-releases/cccs-warns-foodpanda-over-misleading--free-delivery-on-all-restaurants--claims-278)

### Australia

- [ASIC limited-AFS-licence information sheet](https://download.asic.gov.au/media/1310749/Applying_for_a_limited_AFS_licence_0179.pdf)
- [ATO GST on imported services and digital products](https://softwaredevelopers.ato.gov.au/GSTintangibles)
- [ACCC consumer rights and guarantees](https://www.accc.gov.au/consumers/buying-products-and-services/consumer-rights-and-guarantees)
- [ACCC buying online](https://www.accc.gov.au/consumers/buying-products-and-services/buying-online)
- [OAIC APP 8 cross-border guidance](https://www.oaic.gov.au/privacy/australian-privacy-principles/australian-privacy-principles-guidelines/chapter-8-app-8-cross-border-disclosure-of-personal-information)

### United Kingdom and United States screening

- [FCA PERG 8 financial promotions](https://handbook.fca.org.uk/handbook/perg8)
- [FCA PERG 8.22 Internet guidance](https://handbook.fca.org.uk/handbook/perg8/perg8s23)
- [HMRC VAT rules for digital services](https://www.gov.uk/guidance/the-vat-rules-if-you-supply-digital-services-to-private-consumers)
- [ICO international transfers](https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/international-transfers/)
- [Investor.gov investment-adviser definition](https://www.investor.gov/introduction-investing/getting-started/working-investment-professional/investment-advisers)
- [SEC staff publisher-exclusion discussion](https://www.sec.gov/divisions/investment/noaction/2015/jonathon-hendricks-012615-202a.htm)

### A-share and US source rights

- [SSE Information business platform](https://bsp.sseinfo.com/)
- [SSE information-use statement](https://sns.sseinfo.com/en/contact.do)
- [SZSE data services](https://www.szse.cn/English/services/dataServices/index.html)
- [SEC EDGAR APIs](https://www.sec.gov/search-filings/edgar-application-programming-interfaces)
- [NYSE connectivity and data agreements](https://www.nyse.com/connectivity/documents)
- [CTA external-distribution form](https://www.nyse.com/publicdocs/ctaplan/notifications/trader-update/Exhibit%20A%20-%20CTA%20-%20Internal%20and%20External%20Distribution.pdf)
- [Nasdaq display requirements](https://www.nasdaqtrader.com/content/AdministrationSupport/Policy/DISPLAYREQUIREMENTSPOLICY.pdf)
- [Nasdaq data-use and distribution policy](https://www.nasdaqtrader.com/content/technicalsupport/dataproducts/indexdatapolicy.pdf)

## Resolution-ready conclusion

The research ticket can close with **Hong Kong and Singapore as the only first-market candidates**, Hong Kong preferred conditionally and Singapore retained as fallback/second. The subsequent human decision ticket must not choose either market on this memo alone: it should select a market only after attaching written regulatory-perimeter advice, Airwallex approval/qualification, field-level data-rights contracts, tax treatment, privacy-transfer approval, and consumer-terms review. Australia, the UK, the US, and Mainland China remain outside the initial paid launch envelope unless separately re-qualified.

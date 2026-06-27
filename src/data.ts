import { Product } from './types';

export const PRODUCTS: Product[] = [
  {
    id: 'botanical-sleep-elixir',
    name: 'Botanical Sleep Elixir',
    category: 'Sleep & Stress',
    description: 'A clinical-grade, non-habit forming botanical blend designed to regulate your circadian rhythm and promote deep, restorative REM sleep.',
    fullDescription: 'Modern lifestyles disrupt our natural circadian rhythms. The Botanical Sleep Elixir is engineered to address sleep architecture from multiple angles, combining ancient botanical wisdom with modern extraction techniques. Unlike synthetic sleep aids that force unconsciousness, our formula gently signals to your nervous system that it is time to down-regulate, promoting a natural transition into deep, restorative sleep phases without the morning grogginess.',
    price: 48,
    originalPrice: 60,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAV4tX_KrnIwGZw9jjAN4JU3v6wUx7Oy3rP9CUdUo_IqXLOHFtLJo6ELnDgQlF1iwJepXf-mlhmRQnJ4SuOuzAuSOrL5coDECHxQ1u_b6WUm1WOG642OEk1eqAtGqO2IsCphQeCG2yB50qX61Plw4S17dd9lSdPxXjiyatLeh363TirCNr9-mWqFaaGN_dpBNWCgfOtfGgzCO2DmD9BN-c-zzCqIO1ags8uVjg0rAnYAQXGyf8tC9mZELpqypUrFVmxyN3KbytrcQgK',
    secondaryImages: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAu_3cJLvzKFcVOBv1suB7YsxSbOFNz2t7IQ4SzdVM2-IRecGrHCXJ_VanGjgHBWQVbzQDdT1eZKMRn8cdZgZ210WF9JNBOZNBSsLYFXlmwQCdcvO6cL-GqszASJTPVihKfP9a5CTwothsR0Ih0wdEpM7lGGmwOXUIkSdo3HKvNON64DMeHe6r4_MhmkoqrN6TM_o4R0h1e2Bi-4ni-4OJVuRp66IqIZOS_HIL5XxS4OjTaXOJFJFOQpNMyE2nbruQAqYH4Bnaxo_AW',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAkburEbiVcsAjiuSo_P6b5J-8aIhQXnR2pLU6oA8fuaLwv_UP0xha6AbyrIeP88jRg-ZW4asdlAnf-lPIbk98qt5Fw25X2mcjjRt99zXVqv3iR6O4SRKExqGBvaTKAmH5Il4EDa19mNUIUDXz4aWO0hrTZOXtfl_p5r5ioBoOF-beN6y3g6f-GZs1Xm61gWyPKmATtAiVZxmeKa_str2rhJyg-Y3goMkUIvf5w7RTgTLCGkLrUvOjgU4PZmaudzaqECsGr2JuTn6cv',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBLjwCtH4pDbVjK7ZYFWZxIAY4UFL7E3Ghm1ltICydceWgImA5nO6FpB_7RlLue4XJW4F2F0DNFoHA223zkBkRlimpUI2vEJTvPHmvfdGgOmdsRP_DMc08eR39yg3LeXUst_5K9Z_OGOTyulkn2yEPfqeVpdsc1UX53rwGUE__0L7_wHRhDxZWBJylZgM5pPfjdHP_pqVh71C2QY0yTTnwGuu1PbNqJsujWdDJuSlIVzdQMRpjJRRJKMzI7btdrMytz1cOpYX0wsx3l'
    ],
    bestseller: true,
    new: false,
    format: 'Tincture',
    concern: 'Insomnia',
    ingredients: 'Active Compounds: Valerian Root Extract (0.8% Valerenic Acids), Organic Passionflower, Wild-Harvested Skullcap, Activated Magnesium Bisglycinate, Chamomile Flower Distillate, Organic Vegetable Glycerin, Purified Spring Water.',
    usage: 'Shake well before use. Take 1 full dropper (1ml) sublingually 30 minutes before bedtime. Hold under tongue for 30 seconds for optimal absorption before swallowing. May also be diluted in 2oz of warm water or herbal tea.',
    clinicalData: 'In a double-blind, placebo-controlled 4-week clinical study of 85 participants: 88% reported a significant reduction in sleep latency (time taken to fall asleep) by up to 45 mins; 92% noted enhanced quality of deep REM sleep cycles; 95% woke up feeling completely refreshed without morning grogginess.'
  },
  {
    id: 'nocturne-tincture',
    name: 'Nocturne Tincture',
    category: 'Sleep & Stress',
    description: 'A deep restorative herbal tincture leveraging Valerian, Passionflower & Skullcap for natural sleep latency reduction.',
    fullDescription: 'Our signature Nocturne Tincture relies on the ancient synergy of raw botanical extracts that act directly on GABA receptors to naturally down-regulate the nervous system. Carefully prepared in small, clinical batches to protect volatile terpenes and delicate active phytocompounds.',
    price: 48,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAHg_11r9kPuRU7cRNu7KG4v-OThZPynYlRADgrMkSP8EmAV7cxeB1Lb-6v9zdzSlKmHJGW37K852T0gS4J64h-vbHY9nFJc81ce9PSWV8YWkttdHB08KLqMNBuULR2I3ZPF8ZbFjYeK91hmCJfYjNrzDkoi7lrBz_fIBhKfsRDHAqMVMlxLU8zefB3O4COPedL_yJpD9_4alkLrMFJlWojaQvvmQ_qGz-oOSxACyJuoy1GfpKCGoVR6zwNAZvYwXGWh2VK4pjqMxM7',
    bestseller: true,
    format: 'Tincture',
    concern: 'Insomnia',
    ingredients: 'Organic Valerian Root, Organic Passionflower Aerial Parts, Wild-Harvested Skullcap, Organic Hops Flowers, Food-grade Organic Cane Alcohol (30% vol), Purified Spring Water.',
    usage: 'Take 30 drops (approx. 1.5ml) in a small glass of warm water or under the tongue 30 minutes before bed. Repeat once during the night if sleep is interrupted.',
    clinicalData: 'Third-party clinical testing showed a 38% average decrease in nighttime awakenings and a marked increase in deep delta sleep phases after 14 days of consecutive nightly use.'
  },
  {
    id: 'cortisol-balance-caps',
    name: 'Cortisol Balance Caps',
    category: 'Sleep & Stress',
    description: 'Formulated with clinically-researched Ashwagandha & L-Theanine to balance the body’s daily stress response.',
    fullDescription: 'A clinical adaptogenic formula designed to assist individuals navigating chronic stress, high demands, or adrenal exhaustion. Helps stabilize cortisol secretion, reduce anxious pacing, and support balanced daytime energy while preparing the body for easeful evening transitions.',
    price: 52,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCbBRdy4SnG7Apv6KJFyNg8Kor7rjmqlW3M67STRDpymZL1RgSK8vlLmDirg0GwGokw8nS1LSDD1pc3K_iWu8J-AmDb9bui_RUGEDz1POt1pCzgQ_bfoz8wU-FGPUssgd-vnc_POQBCEmVFkKFbU988qa492sX2EK-OXH1u0sLo9msWYX1L6U-fOHLvLrgK7UWNpNiyllbT9gZ6zkOQzSr1BZ6ZmmDznLYjRbOQi0lat-LbXyhQlEP99PhWKnD7JbBFDd5WJ9yAFsHB',
    format: 'Capsule',
    concern: 'Stress',
    ingredients: 'KSM-66 Organic Ashwagandha Extract (5% Withanolides), Suntheanine Pure L-Theanine, Organic Holy Basil (Tulsi) Leaf Extract, Magnesium Chelate, Pullulan (Vegan Capsule).',
    usage: 'Take 2 capsules daily, preferably with breakfast or lunch. To optimize circadian support, a second dose of 1 capsule can be taken with dinner.',
    clinicalData: 'Subjects taking KSM-66 Ashwagandha twice daily exhibited a 27.9% reduction in serum cortisol levels over a 60-day period, accompanied by significant self-reported improvements in calm attention and general vitality.'
  },
  {
    id: 'magnesium-rest-powder',
    name: 'Magnesium Rest Powder',
    category: 'Sleep & Stress',
    description: 'An effervescent nighttime recovery powder combining premium Magnesium Bisglycinate and Montmorency Tart Cherry.',
    fullDescription: 'Our highly bioavailable magnesium drink powder targets physical and neuromuscular tension. Packed with trace minerals and natural phyto-melatonin from premium tart cherries, it supports muscle recovery, neural calming, and natural cellular restoration.',
    price: 65,
    new: true,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuADkZJPeNvXO9JWqOJ3ULEJ0Nrleoi3Exl3itQz_Rs1aldAIBM9vxxci4l4aCev5SiMOkuPDdMov2NTh54CTFIGqzJs4CGL-4hXG1LRchEsgUCL-0ey9qDCJmadi4G62IzQocmluBEay8ID9XgzYmAxufYcWA4jY5N2FZwYZcdgSwr8QpBS66AYtcd_LZzmMvuF0v3BlGNZafneHEf4xmFpQ1HZDqoNGozB11BVznsMEbV_lI-EwmUI82FM_SOCQVbjuXk85trfh5jG',
    format: 'Powder',
    concern: 'Anxiety',
    ingredients: 'Magnesium Bisglycinate Chelate, Organic Montmorency Tart Cherry Powder (Prunus cerasus), Organic Lemon Juice Concentrate, Organic Stevia Rebaudiana Extract, Pink Himalayan Salt.',
    usage: 'Mix 1 rounded teaspoon (5g) in 6-8 oz of warm or cool water. Stir thoroughly and enjoy as a comforting evening beverage before sleep.',
    clinicalData: 'Clinical trials confirm bisglycinate chelation ensures 4x higher intestinal absorption rates than standard magnesium oxide, with zero gastrointestinal discomfort and a 42% decrease in nighttime muscle cramps.'
  },
  {
    id: 'evening-calm-balm',
    name: 'Evening Calm Balm',
    category: 'Sleep & Stress',
    description: 'A luxurious Blue Tansy-infused topical aromatherapy balm designed to ground the senses and soothe tension.',
    fullDescription: 'A velvety, aromatic balm that melts into the skin. Made with rare Blue Tansy oil, rich in chamazulene, combined with calming lavender and cedarwood to establish an unshakeable ritual of evening restfulness and muscle de-escalation.',
    price: 32,
    bestseller: true,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAneIvqlrY_4CEmr5KFfA_yYV4VVzRt_3IZi8SCSYPgFFdvPCHUWH6q_bXcn-M19ENUnhj0zxqhXouUGnobnUfWpKuZZpemseWPL-Jg0WR-iSaVYNMjtbMS4kLL6riwXy7zBho3Et1dZcitHFeiuWr1-XDEVBo8LJHTx913f7DgI9pyssCKIdm0ksHm2XdOCZWsOtdJO1KWA1plxZyBEYZf3B7OdPvZYFylcEpkchcqaQsEaocIck-boU7ip9ZLtzynBaaiEDSs5s-z',
    format: 'Balm',
    concern: 'Anxiety',
    ingredients: 'Organic Shea Butter, Organic Jojoba Seed Oil, Raw Yellow Beeswax, Organic Blue Tansy Flower Essential Oil, French Lavender Oil, Atlas Cedarwood Extract, Rosemary Antioxidant Co2.',
    usage: 'Warm a pea-sized amount between fingertips and massage gently into temples, neck, wrists, or shoulders. Deeply inhale the therapeutic botanicals during application.',
    clinicalData: 'Aromatherapy validation protocols demonstrated a 34% reduction in physiological stress indicators (heart rate variability stabilization) within 15 minutes of olfactory exposure.'
  },
  {
    id: 'magnesium-glycinate',
    name: 'Magnesium Glycinate',
    category: 'Sleep & Stress',
    description: 'Sleek, individual packets of ultra-absorbable Magnesium Glycinate for cellular hydration and neural rest.',
    fullDescription: 'Convenient clinical-dose individual sachets designed for modern lifestyles. Perfect for traveler fatigue, flight jetlag, or maintaining strict cellular restorative mineral reserves during intensive work cycles.',
    price: 28,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCVqMw4aMFqPg1sllT3SI3afIwbmbP0p0t3R32pytiJMdWtF0jyCUXOI2DLHo6-vc_1gpJfwKfH42bDMKhzEooGuPFUXz-zJeBd8FPc1q8qFdBH93uKMsIpUO5F4mpDVpR0edXhIz3Cd0r-38UifBdXQ4dGrPJFgDrqWhfL8ZhY0hrn38HZ15t_A3uhPIl7v-byNPKYJUv0I0PJgzztGiLoyx4soa8_X1i5dKzvUH4L3oGNojYbgjXJMMERsa-qXpt3NWIWtX06mtqh',
    format: 'Powder',
    concern: 'Stress',
    ingredients: 'Magnesium Glycinate (TRAACS Highly Bioavailable Chelate), Organic Natural Grape Skin Color, Citric Acid, Natural Lime Extract.',
    usage: 'Empty sachet into 12-16 oz of water. Shake or stir vigorously. Consume slowly over an hour in the late afternoon or prior to long-haul travel.',
    clinicalData: 'Circadian rhythm stabilization index improved by an average of 31 points in travelers crossing more than three time zones when using this exact formulation.'
  },
  {
    id: 'adaptogen-tincture',
    name: 'Adaptogen Tincture',
    category: 'Sleep & Stress',
    description: 'A daily broad-spectrum adaptogenic extraction to buffer emotional stress and preserve baseline stamina.',
    fullDescription: 'An exceptional extract combining Siberian Ginseng, Reishi mushroom, and Rhodiola Rosea. Crafted using triple-stage cold percolation to capture water-soluble beta-glucans and alcohol-soluble triterpenes alike.',
    price: 45,
    new: true,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCnWiPS2i3A2psiEantWpVPcYY1P5m02CemXumyNETAe6C6f4bPGcqIpAsTmEBMPecxXquGSCFbKbofAZpNcP6olXnVVp0J3-AjtMHvsjTcRix9Er8m09bvN5vTis6ntL2kl6OgqNI6YV4OfQQzO6yVjGepxvBfhjFUj97JgZEakfkAiBzn89d-eA9NsL06BPoehwPXPP63R_a1ArAjOaj0Jdac43wj-5np_AwKvDbtxrqTnsyMN6ErEcvvLH1cNb9D8nQeIiQd3ZPo',
    format: 'Tincture',
    concern: 'Stress',
    ingredients: 'Organic Eleuthero (Siberian Ginseng) Root, Wild-Harvested Reishi Fruiting Body, Organic Rhodiola Rosea Root, Licorice Root Extract, Organic Cane Alcohol, Spring Water.',
    usage: 'Take 2 full droppers (2ml) once daily in the morning. Best taken on an empty stomach or stirred directly into morning matcha or herbal infusion.',
    clinicalData: 'Daily consumption over 30 days correlated with a 19% improvement in cognitive processing accuracy during high-stakes endurance challenges compared to baseline.'
  },
  {
    id: 'deep-rest-tea',
    name: 'Deep Rest Tea',
    category: 'Sleep & Stress',
    description: 'A loose-leaf medicinal infusion combining organic chamomile, lemon balm, and valerian root fibers.',
    fullDescription: 'Crafted as a slow, grounding nighttime ceremony, this loose-leaf tea features premium whole-flower German chamomile, hand-stripped lemon balm, and dried valerian to provide a comforting and warmth-rich sleep companion.',
    price: 24,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuArChHoHrRJfGrxx4aIybnQyuWoViD_YzQlmOviueYt4DIyXij5RR4SYGEWi7WsLCTimPbjlEAW70HwDS6pPYq4PLI66206v4_d20WfwAK-owFXM94CMzOojEZuYOjzKC98PHDAdkB6aT9RH_YqUj706mFNUSRqdqbnz5kfRV90s3cxVcT99ZVnWiQ3IbIyhCs3O04-pTZwTOOVd8HU-rTrdZOJB5MY9o-qjpwxJyO6-qnq_Y3lqiThWvorKcfNCEYqtIn-CR-59n0o',
    format: 'Powder', // Classified here for easy filter, tea is powder/dry format
    concern: 'Insomnia',
    ingredients: 'Organic German Chamomile Flowers, Organic Lemon Balm, Organic Spearmint Leaf, Organic Valerian Root, Organic Licorice Root.',
    usage: 'Steep 1 tablespoon of loose herbs in 8oz of boiling water for 7-10 minutes. Cover the mug while steeping to prevent active aromatic oils from escaping.',
    clinicalData: 'Polysomnographic research confirms drinking a warm chamomile infusion decreases sleep latency and eases transitional muscle twitching through apigenin receptor targeting.'
  },
  // Skin Health Products
  {
    id: 'cellular-renewal-serum',
    name: 'Cellular Renewal Serum',
    category: 'Skin Health',
    description: 'A revolutionary botanical serum designed to accelerate cellular turnover and reveal luminous, balanced skin.',
    fullDescription: 'Our cellular formula combines plant-derived alternative retinoids with advanced skin-identical lipid structures. Perfect for smoothing micro-textures and deeply restoring compromised skin barriers without irritation.',
    price: 125,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAEwvGLWiTm39ruAnmUB48g9JdVYO6EAFn5ltveROkwww6vbpe3d3Nyuq1FKg5ALVQouSf7BmhJsdxKcwBa6GJ3kNY7mzOS2gLmDzEer357g1rCT7Bbx4_r0FV9p1mgNWsEMawMel_mX_8GQ1Jeh7UK0KnpACA3twL0bHnbZ7yot8qIalkiKR9BdcSQGpUwwxAn-p3hQU4MxypICyN754-L7JCMT_9tUUddcyfehg5qRKvK0a-Csh5i5xCbtHdFEtwQmA1rGFKuLS-6',
    bestseller: true,
    format: 'Serum',
    concern: 'Aging',
    ingredients: 'Active Botanical Complex, Plant-derived Bakuchiol (Retinol Alternative), Niacinamide, Squalane, Rosehip Seed Oil, Multi-molecular Hyaluronic Acid.',
    usage: 'Apply 3-4 drops to clean, dry face and neck in the evening. Gently press into skin. Follow with your favorite restorative moisturizer.',
    clinicalData: 'Participants saw a 31% reduction in fine line depth and a 44% improvement in skin moisture-barrier resilience over a 6-week independent clinical trial.'
  },
  {
    id: 'restorative-night-cream',
    name: 'Restorative Night Cream',
    category: 'Skin Health',
    description: 'A decadent peptide-rich lipid cream designed to seal in active treatments and rebuild skin structures overnight.',
    fullDescription: 'A luxurious moisture cream that supports natural recovery. Infused with powerful botanical peptides and skin-barrier identical ceramides to nourish deep tissue structures.',
    price: 190,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAiYkvMyi3Ejauzoj7eInhscO81PbDd4zmOHcVlnAnK9evWKEybKezyODEBOe7fIjQBYGujVRSfT87bAH767pfL64WdEOIvqMa91aRDBMrAf7JMnlDRyoJK422XmkxocUr3I79mMUhGna0Qk0xdZLeeWmzAEfIGWdUa3IUvRzKRhR0x2R62Ahtl-mxkObDsFxi-bcYw2uMNqpXO4OgKupCkYzgBd82vLEpvjMhxxXYTkIbIzOhIQuB0ZE-QiTzvvfCQK87U4o7Tj7DE',
    format: 'Cream',
    concern: 'Barrier',
    ingredients: 'Botanical Oligopeptides, Ceramide NP, Ceramide AP, Phytosphingosine, Organic Evening Primrose Oil, Gotu Kola Extract, Shea Butter, Coenzyme Q10.',
    usage: 'As the final step in your evening skincare ritual, warm a small pearl of cream in the hands and press evenly onto face, neck, and chest.',
    clinicalData: 'In clinical tests, trans-epidermal water loss (TEWL) decreased by an exceptional 52% after only 7 nights of consecutive usage, signaling profound barrier healing.'
  },
  {
    id: 'night-repair-serum',
    name: 'Night Repair Serum',
    category: 'Skin Health',
    description: 'A lightweight Blue Tansy and lipid elixir designed to calm inflammation and promote overnight micro-repair.',
    fullDescription: 'This intense blue oil-serum harnesses the natural therapeutic profile of Blue Tansy to neutralize oxidative stress and quiet redness, working with your body’s natural evening healing processes.',
    price: 85,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDyH9iwY7r6SjVzl_4KnLO2ZUghgUbRRR4tqXA7Lm2xhAn8cMZWsigR2sndaMkVtxPaavjUkCRHoba4jxzQ_g13pN74Dwd1-jCAn_5ux3iVTNwtbjiGQUwVPF3B4xsf2SIBJiQe393tx4RS_BtWdwtQuET5Qw0O8WriwIl9AK79ij9klCk7CQHo7r9uwNyYRlsfmczlGJUl7UrQQoURIQsXJdZHrj6b1GoNA5GC4a2xbOXal_BvhTHpPInsc7JvSlAOC_hfrv0QDB6X',
    format: 'Serum',
    concern: 'Barrier',
    ingredients: 'Pure Blue Tansy Essential Oil, Squalane (Olive derived), Cold-pressed Rosehip Fruit Oil, Jojoba Esters, Calendula Extract, Tocopherol (Vitamin E).',
    usage: 'Warm 2-3 drops between palms and gently pat onto slightly damp skin or blend directly into your nocturnal moisturizer to elevate its healing profile.',
    clinicalData: 'Clinical dermatological evaluations demonstrated a 68% decrease in redness intensity and skin-surface temperature readings in subjects with irritated skin types.'
  },
  // Gut Balance
  {
    id: 'daily-biome-complex',
    name: 'Daily Biome Complex',
    category: 'Gut Balance',
    description: 'A targeted pre and probiotic symbiotic capsule designed to cultivate the intestinal microbiome and bolster gut-skin health.',
    fullDescription: 'Modern diets are devoid of crucial flora. Daily Biome Complex delivers 50 Billion CFU of clinically-backed probiotics alongside organic chicory prebiotic inulin to optimize absorption and ease digestion.',
    price: 65,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDGcGVIRqzcWYCwFVWnDvFpvW9tD46q8cEoEypglUq9kGwo10hgJ6hHnO5dgFjmzAq_W5T7YJwBTCg7nrwMn5lmNel6AbAZ9CO97D9QuKf2m_0phok9O613wB2OEtSq1zJ6cqdmBZ9LjvlVJI5GcqNDMjFTBYLQgWIGqLEtyio-LN_XmQk7FbIl9eW0wc6NB9IWGzm2JRA3MJvrMl5UjKE3Y5vjAKTE5Xb6nb3XXfLApklWyAUOf0MunDV_kcF0KwauaC8dhW4aL3RQ',
    format: 'Capsule',
    concern: 'Digestion',
    ingredients: 'Lactobacillus Acidophilus, Bifidobacterium Lactis, Organic Chicory Root Inulin, Slippery Elm Bark, Marshmallow Root Powder, Vegan Pullulan Shell.',
    usage: 'Take 1 capsule daily in the morning with a full glass of room temperature water, ideally 15 minutes before breakfast.',
    clinicalData: 'Double-blind trials confirmed daily administration resulted in a 64% improvement in digestive comfort, reducing abdominal bloating and optimizing systemic skin clarity.'
  },
  {
    id: 'enzyme-active-digest',
    name: 'Enzyme Active Digest',
    category: 'Gut Balance',
    description: 'A potent broad-spectrum clinical digestive enzyme capsule to facilitate macro-nutrient breakdown.',
    fullDescription: 'Our advanced multi-enzyme system assists in breakdown of complex proteins, dairy, fats, and fiber, ensuring your body absorbs maximum nutritional compounds with zero bloating.',
    price: 42,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDzyJzSt7s-xohHPowP8SU03dbIQ5DCyLK4yGEYJgQdvldEuZUYc259tRX-42LuK9Hku0QQKmhjjAh8Wt59_wYVvuq_DgRSUWoR4BAC0tXFLlH8HYvjYvcJYPzdDNAuT1RyWNOKIzwU_FoAiIN_kB2eY1cYZOPvOOLWJYmBzlSRsxQKMw2ziQDPAWadpZh9WsgW-9_oWeUWBaq_L-hb3mZ5ZJ58og0MfrT-7kO45JCVJLzTgC8_DwBn6-GWYYtZvtVq7msyvUlDI97o',
    format: 'Capsule',
    concern: 'Digestion',
    ingredients: 'Amylase, Protease, Lipase, Lactase, Cellulase, Bromelain, Papain, Organic Ginger Root Powder, Peppermint Leaf Extract.',
    usage: 'Take 1 capsule at the start of your largest meal of the day, or as needed when consuming hard-to-digest rich or processed foods.',
    clinicalData: 'Enzymatic activity assays showed a 3.5x faster reduction in transit discomfort and significantly improved micronutrient bio-availability scores after meals.'
  },
  // Daily Energy
  {
    id: 'focus-vitality-complex',
    name: 'Focus & Vitality Complex',
    category: 'Daily Energy',
    description: 'A clean, cognitive-optimizing herbal supplement formulated for sustained cellular ATP production and focus.',
    fullDescription: 'Our professional energy booster targets the mitochondria. Avoid jittery synthetic stimulants—our clean blend uses natural adaptogens and trace nutrients to support sustained blood flow and steady physical stamina.',
    price: 58,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAIAHEOv3xYpxMSUxRTrw3CqRV_OCa9_UbdzpUjqeSm39foDKZQyXJ6_zymlP47l4P3Y99hlJQqFHA5soGl7q9Pclhn8v5L6NHiJCmiqzUV_3Crxg14voH0UW-7yOCOSlmN4Jbiwl_oklc0lw21PMsgPb6oJbOGXmT3IWc1055_N1HE0ZAC3lbqfcfz_jKOBva72IdWcCl5VF-mfbgebn18y_7WziFzj094o5RHR-cc-ot72H-LBSNf4PsuI0sk9DOHEhSdozrlm8U6',
    format: 'Capsule',
    concern: 'Vitality',
    ingredients: 'Organic Rhodiola Extract (3% Salidrosides), Suntheanine L-Theanine, Coenzyme Q10, Acetyl-L-Carnitine, Pine Bark Extract, Organic Ginseng.',
    usage: 'Take 2 capsules together in the morning with food. Do not exceed 4 capsules per day. Avoid late evening consumption to preserve restful sleep prep.',
    clinicalData: 'Double-blind crossover trials confirmed improved sustained focus metrics by 34% without elevating heart rate, alongside a 25% decrease in cognitive task fatigue.'
  }
];

export const TEAM_MEMBERS = [
  {
    name: 'Dr. Elena Rostova',
    role: 'Chief of Biochemistry',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAfyu-0VcrPaKr6eQ34kpWukOInZ4F2nzJuCtKDIQYMnTYUpSCCDFKzJsztO1TznOc0flFZ3_Z2-uuD8q9l61QS9KpjNmqNh8gDOGeO8qh8w829bSte-xnMYuBzkvjxX7Ri1vJnM-_ILsmaa8CPF-bAO_G6EkFub3s8Ffso4b2RMtQnFWx2zDhxHYUpgD9E4emhmx0i23N1NHo_f-apQhwX0gMhCQqtIPsU3F1sDT3MNfPYae7zBz_v4Vdkvkub5HP6BYHeINEnw0xR',
    description: 'Ph.D. in Cellular Biology, specializing in botanical extraction techniques.'
  },
  {
    name: 'Julian Hayes',
    role: 'Master Herbalist',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDWCwkeXpCIb2oOHhjhf2JgTbARc63w7zKIMvCkQLHCmaAlbrnW84phDijWXUixmp_QALawF9CFJDT846SyTRRxB2GvWcWXdsTVLU4AUGkBMn2m04KQ5Wjt_5Tyr5IerH2rM_O7PDIa27FgH6J7HTXS_BMgpHwrT9tgCD0WKmgY6czhbta-YBLl5nK6817NBeAJ7o3N7LPKZo84yAfkyDZ9Uhe6DVB4jdBJsAbMBAHRObETt7dGVQARlKYKJFD7rxE3smt_mk9MT38s',
    description: 'Over two decades of experience in sustainable agricultural practices and plant taxonomy.'
  },
  {
    name: 'Sarah Lin',
    role: 'Lead Formulator',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCk-0gWWDM4PIG8CnWmL_XAlaCo75n9NhcSW4KTlZdSOK4YxFzgITJa9UAwmUIe3x_Eh2d1alQUcVsFjAzEAxBMcOSUFFSB6Db_tUhsFP62HQpMLz-WDBYslMrhhz62TfXP-KN4u0FMqmazD6Vp903bRydkCyLy5UfqdqamDwoCWmqnp660eu958p3088oN3EQ2C9or3weRluSy3I3xn3SGD4dUpmpeaqpzTocbKi7QhKLxTPJZEOGOO4x_GHZVU8NChO863dGdVhv7',
    description: 'Expert in structural chemistry, ensuring stability and efficacy in emulsion systems.'
  },
  {
    name: 'Dr. Marcus Thorne',
    role: 'Head of Dermatology',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCQxY2B_w4YmpT6WCDhz38WePrHJFKbTUNs-nQwC0TNU2KIzL8iRwjG307S9Y0S3zPgRMXIqs1rbjqemLvxCupiL6vjIw14mzrnpyOV-Fjkd2CpZvMmFWWRoveAqAB4eB5szgNPDrO51kwKLLVNcrYOLxmuJFVahithzbTeXZwZXsYyyE6y0O1ffv6aAsrVOZ5yhEUXc12wFQwPmVUleMq3HKe0P9tY9w2BSHbEJfNQekyQuriwtpuWMOnGgOL9n_lSEW4ag4fGXIWV',
    description: 'Board-certified dermatologist focusing on barrier repair and skin longevity.'
  }
];

export const JOURNAL_ENTRIES = [
  {
    id: 'circadian-rhythms-and-cellular-repair',
    title: 'The Neurological Alignment of Sleep & Skin Repair',
    excerpt: 'How timing your botanical dose to match natural circadian spikes in cellular mitosis maximizes active ingredient efficiency.',
    date: 'June 14, 2026',
    readTime: '6 min read',
    category: 'Science',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAI57FXInFPRZK9jgtcHugj2lq3HkHJO2TiTP4QqrFV6-hOanTvonFXpHBnSzJ6v_1HaAMAw8NH5dCEHdbtOsY1zS3TETSwdaJdfGbKCd3G53ZMfYN6xH3ew6ts7KDyt3g36W6ag0KA-Y8UB2jhzHnsb-FMQ2YWHwiZU0h5rA9ntmiZpYkWHx-Yq5ORTmnvg-M70Y81RRNqL_PhfjOSjgz4r5O9MPKiamEBqvUmtIexNx52-pn-svTaABoVTBrwB8nSGjRRi0WjE0Xt',
    content: 'Sleep is not merely a state of rest, but an active, energy-intensive phase of cellular maintenance. For both the brain and the skin, nighttime marks a sharp uptick in mitotic division and metabolic flushing. By aligning clinical-grade adaptogens with your circadian descent, you double down on metabolic reception paths...'
  },
  {
    id: 'sustainability-and-regenerative-soil-vetting',
    title: 'Regenerative Agriculture: Beyond Organic Certification',
    excerpt: 'Why soil biodiversity is the single most critical factor in active compound density for premium health botanicals.',
    date: 'May 28, 2026',
    readTime: '8 min read',
    category: 'Sustainability',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD4WW6aMQcRMaka4Fi2prDqycf1OMLT96N2Rz7Ij3BN5w78pihl_xWYlzUuScfP_rA0dPbaE1v9AWDaANdMgGmvfjqURCt7UGoUJSYGHMq356t2Sezp5rMk_tzMH6QNBVT-dUFftV802E8ImhtoMhlkYgxudqYKZxLrWQdsx_fKaYEPOBpl5b8UcWkbI_Fr5udo2FrtmjBeiqZeuDIbmCqK_qg9PFwBxjV2WWBbiQ_w1tkQxPw5FQGc7yo_X3uT_h8LqCpurGwAZQwA',
    content: 'Standard chemical farming sanitizes soil, delivering plants devoid of natural defense chemistries. Regenerative soil curation stimulates symbiotic mycorrhizal networks, pushing plants to develop powerful defensive compounds—which act as the clinically potent active ingredients in our serums and complexes...'
  }
];

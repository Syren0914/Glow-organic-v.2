-- Seed menu data from the previously hardcoded constants
-- This uses fixed UUIDs so items can reference categories reliably.

delete from service_items;
delete from service_categories;

insert into service_categories (id, title, description, sort_order) values
  ('11111111-1111-1111-1111-111111111111', 'Signature Facials', 'Holistic treatments for immediate glow and deep cleansing.', 1),
  ('22222222-2222-2222-2222-222222222222', 'Clinical Rejuvenation', 'Advanced modalities for structural lifting and resurfacing.', 2),
  ('33333333-3333-3333-3333-333333333333', 'Body & Enhancements', 'Targeted treatments for body sculpting and finishing touches.', 3);

insert into service_items (id, category_id, title, description, price, duration, sort_order) values
  ('a1111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111', 'Silk Peel Hydro Facial', 'Diamond Glow Hydro Dermabrasion simultaneously exfoliates, extracts debris, and infuses up to three serums. Includes mild extraction, massage, and mask for rejuvenated, hydrated, and voluminous skin.', '$163.00', '1 hr 15 min', 1),
  ('a1111111-1111-1111-1111-111111111112', '11111111-1111-1111-1111-111111111111', 'Deep Cleaning Facial', 'Concentrates on congested pores and oily dehydrated skin. Includes exfoliation, manual extractions, Hydro Derm suction cleansing, oxygen infusion, and mask. Reduces inflammation and detoxifies.', '$115.00', '55 min', 2),
  ('a1111111-1111-1111-1111-111111111113', '11111111-1111-1111-1111-111111111111', 'Express Facial', 'Created for the person on the go. Formulated to refresh, renew and revitalize - working with all skin types to reveal more youthful, healthy skin in minimum time.', '$75.00', '30 min', 3),
  ('a1111111-1111-1111-1111-111111111114', '11111111-1111-1111-1111-111111111111', 'Facial Massage', 'A dedicated massage session designed to stimulate blood flow, relieve tension, and promote lymphatic drainage.', '$85.00', '45 min', 4),
  ('b2222222-2222-2222-2222-222222222221', '22222222-2222-2222-2222-222222222222', 'PRX-PLUS', 'Advanced Topical Biostimulator for mature or photoaged skin. Targets deeper signs of aging to smooth wrinkles and visibly correct hyperpigmentation with enhanced collagen activation.', '$379.00', 'Consult', 1),
  ('b2222222-2222-2222-2222-222222222222', '22222222-2222-2222-2222-222222222222', 'PRX', 'Advanced Topical Biostimulator for mature or photoaged skin. Targets deeper signs of aging to smooth wrinkles and visibly correct hyperpigmentation with enhanced collagen activation.', '$270.00', 'Consult', 2),
  ('b2222222-2222-2222-2222-222222222223', '22222222-2222-2222-2222-222222222222', 'PRX C Radiance', 'Topical Biostimulator with the antioxidant power of Vitamin C. Boosts collagen synthesis and neutralizes free radicals for a radiant complexion.', '$320.00', 'Consult', 3),
  ('b2222222-2222-2222-2222-222222222224', '22222222-2222-2222-2222-222222222222', 'Radio Frequency Toning', 'Uses controlled RF energy to heat deeper skin layers. Stimulates collagen and elastic fiber production to improve elasticity, tone, and reduce wrinkles and sagging.', '$200.00', '1 hr', 4),
  ('b2222222-2222-2222-2222-222222222225', '22222222-2222-2222-2222-222222222222', 'Chemical Peel', 'Uses a chemical solution to exfoliate and remove dead skin cells. Promotes cellular turnover for a smoother, brighter complexion.', '$120.00', '30 min', 5),
  ('c3333333-3333-3333-3333-333333333331', '33333333-3333-3333-3333-333333333333', 'Body Detox & Slimming', 'Targets stubborn curves (waist, hips, arms, legs). Promotes fat reduction, cellulite reduction, enhanced circulation, and metabolism boost using natural potent ingredients.', '$170.00', '1 hr 30 min', 1),
  ('c3333333-3333-3333-3333-333333333332', '33333333-3333-3333-3333-333333333333', 'Dermaplaning', 'Manual exfoliation method that removes dead skin cells and vellus hair for an ultra-smooth finish.', '$60.00', '15 min', 2);

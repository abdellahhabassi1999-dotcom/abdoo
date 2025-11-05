/* ====================================
   Embedded Data - Works with file:// protocol
   ==================================== */

// Categories Data
const CATEGORIES_DATA = [
  {
    "id": "gifts",
    "name": "Coffrets Cadeaux",
    "nameEn": "Gift Sets",
    "nameAr": "صناديق الهدايا",
    "icon": "fa-gift",
    "image": "categories/gifts.jpg",
    "description": "Coffrets élégants pour toutes les occasions"
  },
  {
    "id": "parfums",
    "name": "Parfums",
    "nameEn": "Perfumes",
    "nameAr": "العطور",
    "icon": "fa-spray-can",
    "image": "categories/parfums.jpg",
    "description": "Collection exclusive de parfums authentiques"
  },
  {
    "id": "skincare",
    "name": "Soins de la Peau",
    "nameEn": "Skincare",
    "nameAr": "العناية بالبشرة",
    "icon": "fa-hand-sparkles",
    "image": "categories/skincare.jpg",
    "description": "Produits de soin pour une peau éclatante"
  },
  {
    "id": "haircare",
    "name": "Soins Capillaires",
    "nameEn": "Hair Care",
    "nameAr": "العناية بالشعر",
    "icon": "fa-spray-can-sparkles",
    "image": "categories/haircare.jpg",
    "description": "Solutions professionnelles pour vos cheveux"
  },
  {
    "id": "hygiene",
    "name": "Hygiène",
    "nameEn": "Hygiene",
    "nameAr": "النظافة",
    "icon": "fa-pump-soap",
    "image": "categories/hygiene.jpg",
    "description": "Produits d'hygiène quotidienne"
  },
  {
    "id": "makeup",
    "name": "Maquillage",
    "nameEn": "Makeup",
    "nameAr": "المكياج",
    "icon": "fa-palette",
    "image": "categories/makeup.jpg",
    "description": "Cosmétiques de luxe pour sublimer votre beauté"
  }
];

// Products Data - All 52 products
const PRODUCTS_DATA = [
  { "id": 1, "name": "Dior Sauvage Eau de Parfum", "nameEn": "Dior Sauvage Eau de Parfum", "nameAr": "ديور سوفاج او دو بارفان", "category": "parfums", "brand": "Dior", "price": 1200, "originalPrice": 1500, "image": "products/dior-sauvage.jpg", "rating": 4.8, "reviews": 245, "badge": "bestseller", "inStock": true, "description": "Un parfum masculin puissant et raffiné aux notes boisées et épicées. Inspiration sauvage pour un homme moderne.", "volume": "100ml" },
  { "id": 2, "name": "Chanel N°5 Eau de Parfum", "nameEn": "Chanel N°5 Eau de Parfum", "nameAr": "شانيل رقم 5 او دو بارفان", "category": "parfums", "brand": "Chanel", "price": 1800, "image": "products/chanel-5.jpg", "rating": 4.9, "reviews": 589, "badge": "bestseller", "inStock": true, "description": "Le parfum iconique féminin, symbole d'élégance intemporelle. Notes florales aldéhydées.", "volume": "100ml" },
  { "id": 3, "name": "Yves Saint Laurent Black Opium", "nameEn": "YSL Black Opium", "nameAr": "إيف سان لوران بلاك أوبيوم", "category": "parfums", "brand": "YSL", "price": 1350, "image": "products/black-opium.jpg", "rating": 4.7, "reviews": 412, "badge": "new", "inStock": true, "description": "Parfum addictif pour femme moderne. Notes de café noir et vanille blanche.", "volume": "90ml" },
  { "id": 4, "name": "Versace Eros Pour Homme", "nameEn": "Versace Eros Pour Homme", "nameAr": "فيرساتشي إيروس للرجال", "category": "parfums", "brand": "Versace", "price": 980, "originalPrice": 1200, "image": "products/versace-eros.jpg", "rating": 4.6, "reviews": 327, "badge": "sale", "inStock": true, "description": "Parfum masculin vibrant et sensuel. Notes de menthe, pomme verte et vanille.", "volume": "100ml" },
  { "id": 5, "name": "Lancôme La Vie Est Belle", "nameEn": "Lancôme La Vie Est Belle", "nameAr": "لانكوم لا في إيه بيل", "category": "parfums", "brand": "Lancôme", "price": 1450, "image": "products/la-vie-est-belle.jpg", "rating": 4.8, "reviews": 501, "badge": "bestseller", "inStock": true, "description": "Parfum gourmand féminin. Iris, patchouli et notes sucrées pour célébrer la vie.", "volume": "100ml" },
  { "id": 6, "name": "La Roche-Posay Effaclar Duo+", "nameEn": "La Roche-Posay Effaclar Duo+", "nameAr": "لاروش بوزيه إيفاكلار ديو بلس", "category": "skincare", "brand": "La Roche-Posay", "price": 280, "image": "products/effaclar.jpg", "rating": 4.6, "reviews": 178, "badge": "new", "inStock": true, "description": "Soin anti-imperfections ciblé. Réduit les boutons et marques. Texture légère non grasse.", "volume": "40ml" },
  { "id": 7, "name": "CeraVe Crème Hydratante", "nameEn": "CeraVe Moisturizing Cream", "nameAr": "سيرافي كريم مرطب", "category": "skincare", "brand": "CeraVe", "price": 220, "image": "products/cerave.jpg", "rating": 4.7, "reviews": 892, "badge": "bestseller", "inStock": true, "description": "Crème hydratante visage et corps. 3 céramides essentiels et acide hyaluronique.", "volume": "177ml" },
  { "id": 8, "name": "The Ordinary Niacinamide 10% + Zinc 1%", "nameEn": "The Ordinary Niacinamide Serum", "nameAr": "ذا أورديناري نياسيناميد", "category": "skincare", "brand": "The Ordinary", "price": 180, "originalPrice": 220, "image": "products/niacinamide.jpg", "rating": 4.5, "reviews": 1243, "badge": "sale", "inStock": true, "description": "Sérum réducteur d'imperfections. Régule le sébum et affine les pores.", "volume": "30ml" },
  { "id": 9, "name": "Bioderma Sensibio H2O", "nameEn": "Bioderma Sensibio Micellar Water", "nameAr": "بيوديرما سينسبيو ماء ميسيلار", "category": "skincare", "brand": "Bioderma", "price": 250, "image": "products/bioderma.jpg", "rating": 4.9, "reviews": 756, "badge": "bestseller", "inStock": true, "description": "Eau micellaire démaquillante pour peaux sensibles. Nettoie et apaise en douceur.", "volume": "500ml" },
  { "id": 10, "name": "Neutrogena Hydro Boost Gel-Cream", "nameEn": "Neutrogena Hydro Boost", "nameAr": "نيتروجينا هيدرو بوست", "category": "skincare", "brand": "Neutrogena", "price": 195, "image": "products/hydro-boost.jpg", "rating": 4.6, "reviews": 423, "inStock": true, "description": "Gel-crème hydratant à l'acide hyaluronique. Hydratation intense 24h.", "volume": "50ml" },
  { "id": 11, "name": "Lancôme Hypnôse Mascara", "nameEn": "Lancôme Hypnôse Mascara", "nameAr": "لانكوم هيبنوز ماسكارا", "category": "makeup", "brand": "Lancôme", "price": 320, "originalPrice": 400, "image": "products/hypnose.jpg", "rating": 4.7, "reviews": 312, "badge": "sale", "inStock": true, "description": "Mascara volume spectaculaire. Brosse modulable pour un regard intense.", "volume": "6.5ml" },
  { "id": 12, "name": "MAC Ruby Woo Lipstick", "nameEn": "MAC Ruby Woo Red Lipstick", "nameAr": "ماك روبي وو أحمر شفاه", "category": "makeup", "brand": "MAC", "price": 280, "image": "products/ruby-woo.jpg", "rating": 4.8, "reviews": 678, "badge": "bestseller", "inStock": true, "description": "Rouge à lèvres mat iconique. Rouge bleuté intensément pigmenté, longue tenue.", "volume": "3g" },
  { "id": 13, "name": "NARS Light Reflecting Foundation", "nameEn": "NARS Light Reflecting Foundation", "nameAr": "نارس فاونديشن", "category": "makeup", "brand": "NARS", "price": 650, "image": "products/nars-foundation.jpg", "rating": 4.6, "reviews": 234, "badge": "new", "inStock": true, "description": "Fond de teint perfecteur de lumière. Couvrance modulable, fini naturel.", "volume": "30ml" },
  { "id": 14, "name": "Urban Decay Naked Palette", "nameEn": "Urban Decay Naked Eyeshadow Palette", "nameAr": "أوربان ديكاي نايكد باليت", "category": "makeup", "brand": "Urban Decay", "price": 890, "image": "products/naked-palette.jpg", "rating": 4.9, "reviews": 1456, "badge": "bestseller", "inStock": true, "description": "Palette de fards à paupières iconique. 12 teintes nudes polyvalentes.", "volume": "12 x 1.3g" },
  { "id": 15, "name": "Maybelline Fit Me Matte Foundation", "nameEn": "Maybelline Fit Me Foundation", "nameAr": "مايبيلين فيت مي فاونديشن", "category": "makeup", "brand": "Maybelline", "price": 145, "image": "products/fit-me.jpg", "rating": 4.5, "reviews": 892, "inStock": true, "description": "Fond de teint matifiant. Adapté aux peaux normales à grasses.", "volume": "30ml" },
  { "id": 16, "name": "Kérastase Résistance Bain Force", "nameEn": "Kérastase Résistance Shampoo", "nameAr": "كيراستاس ريزيستانس شامبو", "category": "haircare", "brand": "Kérastase", "price": 450, "image": "products/kerastase.jpg", "rating": 4.7, "reviews": 156, "inStock": true, "description": "Shampooing fortifiant pour cheveux affaiblis. Renforce et protège la fibre.", "volume": "250ml" },
  { "id": 17, "name": "Olaplex No.3 Hair Perfector", "nameEn": "Olaplex No.3 Treatment", "nameAr": "أولابلكس رقم 3", "category": "haircare", "brand": "Olaplex", "price": 380, "image": "products/olaplex.jpg", "rating": 4.8, "reviews": 723, "badge": "bestseller", "inStock": true, "description": "Soin réparateur professionnel. Répare et renforce les liaisons capillaires.", "volume": "100ml" },
  { "id": 18, "name": "Moroccanoil Treatment Oil", "nameEn": "Moroccanoil Argan Oil Treatment", "nameAr": "موروكان أويل زيت أرغان", "category": "haircare", "brand": "Moroccanoil", "price": 520, "image": "products/moroccanoil.jpg", "rating": 4.6, "reviews": 498, "badge": "new", "inStock": true, "description": "Huile d'argan nourrissante. Brillance, douceur et contrôle des frisottis.", "volume": "100ml" },
  { "id": 19, "name": "L'Oréal Elvive Full Resist", "nameEn": "L'Oréal Elvive Anti-Hair Fall", "nameAr": "لوريال إلفيف ضد التساقط", "category": "haircare", "brand": "L'Oréal", "price": 95, "image": "products/elvive.jpg", "rating": 4.4, "reviews": 287, "inStock": true, "description": "Shampooing anti-chute. Renforce et réduit la casse des cheveux fragiles.", "volume": "400ml" },
  { "id": 20, "name": "Dove Nourishing Body Wash", "nameEn": "Dove Deeply Nourishing Body Wash", "nameAr": "دوف غسول الجسم المغذي", "category": "hygiene", "brand": "Dove", "price": 85, "image": "products/dove.jpg", "rating": 4.6, "reviews": 634, "inStock": true, "description": "Gel douche nourrissant enrichi en crème. Nettoie en douceur et hydrate.", "volume": "500ml" },
  { "id": 21, "name": "Nivea Soft Crème Hydratante", "nameEn": "Nivea Soft Moisturizing Cream", "nameAr": "نيفيا كريم مرطب ناعم", "category": "hygiene", "brand": "Nivea", "price": 65, "image": "products/nivea.jpg", "rating": 4.5, "reviews": 892, "badge": "bestseller", "inStock": true, "description": "Crème légère multi-usages. Visage, corps et mains. Texture non grasse.", "volume": "200ml" },
  { "id": 22, "name": "Axe Black Body Spray", "nameEn": "Axe Black Deodorant Spray", "nameAr": "أكس بلاك سبراي", "category": "hygiene", "brand": "Axe", "price": 55, "image": "products/axe.jpg", "rating": 4.3, "reviews": 445, "inStock": true, "description": "Déodorant homme 48h. Fragrance masculine intense et longue durée.", "volume": "150ml" },
  { "id": 23, "name": "Coffret Dior Homme", "nameEn": "Dior Homme Gift Set", "nameAr": "طقم ديور هوم", "category": "gifts", "brand": "Dior", "price": 1850, "image": "products/dior-set.jpg", "rating": 4.8, "reviews": 89, "badge": "new", "inStock": true, "description": "Coffret élégant contenant: Eau de Toilette 100ml + Déodorant + Gel douche", "volume": "3 pièces" },
  { "id": 24, "name": "Coffret Yves Saint Laurent", "nameEn": "YSL Beauty Gift Set", "nameAr": "طقم إيف سان لوران", "category": "gifts", "brand": "YSL", "price": 1600, "image": "products/ysl-set.jpg", "rating": 4.9, "reviews": 67, "inStock": true, "description": "Coffret luxe: Black Opium EDP 50ml + Body Lotion + Mini Mascara", "volume": "3 pièces" },
  { "id": 25, "name": "Coffret Soin Visage Complet", "nameEn": "Complete Skincare Gift Set", "nameAr": "طقم العناية بالبشرة الكامل", "category": "gifts", "brand": "Multi", "price": 580, "originalPrice": 750, "image": "products/skincare-set.jpg", "rating": 4.7, "reviews": 134, "badge": "sale", "inStock": true, "description": "Kit complet: Nettoyant + Sérum + Hydratant + Masque. Routine beauté parfaite.", "volume": "4 pièces" },
  { "id": 26, "name": "Coffret Maquillage Lancôme", "nameEn": "Lancôme Makeup Gift Set", "nameAr": "طقم لانكوم للمكياج", "category": "gifts", "brand": "Lancôme", "price": 980, "image": "products/lancome-makeup-set.jpg", "rating": 4.8, "reviews": 92, "badge": "bestseller", "inStock": true, "description": "Set de maquillage premium: Mascara + Rouge à lèvres + Mini Palette", "volume": "3 pièces" },
  { "id": 27, "name": "Giorgio Armani Acqua di Giò", "nameEn": "Armani Acqua di Giò", "nameAr": "أرماني أكوا دي جيو", "category": "parfums", "brand": "Armani", "price": 1100, "image": "products/acqua-di-gio.jpg", "rating": 4.7, "reviews": 456, "inStock": true, "description": "Parfum aquatique masculin frais et revigorant. Notes marines et boisées.", "volume": "100ml" },
  { "id": 28, "name": "Paco Rabanne 1 Million", "nameEn": "Paco Rabanne 1 Million", "nameAr": "باكو رابان مليون", "category": "parfums", "brand": "Paco Rabanne", "price": 980, "originalPrice": 1150, "image": "products/one-million.jpg", "rating": 4.6, "reviews": 534, "badge": "sale", "inStock": true, "description": "Parfum masculin intense et épicé. Notes de cannelle, cuir et bois.", "volume": "100ml" },
  { "id": 29, "name": "Tom Ford Black Orchid", "nameEn": "Tom Ford Black Orchid", "nameAr": "توم فورد بلاك أوركيد", "category": "parfums", "brand": "Tom Ford", "price": 2200, "image": "products/black-orchid.jpg", "rating": 4.9, "reviews": 278, "badge": "new", "inStock": true, "description": "Parfum unisexe luxueux et mystérieux. Orchidée noire et truffe.", "volume": "100ml" },
  { "id": 30, "name": "Gucci Bloom Eau de Parfum", "nameEn": "Gucci Bloom EDP", "nameAr": "غوتشي بلوم", "category": "parfums", "brand": "Gucci", "price": 1450, "image": "products/gucci-bloom.jpg", "rating": 4.7, "reviews": 389, "inStock": true, "description": "Parfum floral féminin captivant. Jasmin, tubéreuse et Rangoon.", "volume": "100ml" },
  { "id": 31, "name": "Viktor & Rolf Flowerbomb", "nameEn": "Viktor & Rolf Flowerbomb", "nameAr": "فيكتور آند رولف فلاوربوم", "category": "parfums", "brand": "Viktor & Rolf", "price": 1580, "image": "products/flowerbomb.jpg", "rating": 4.8, "reviews": 445, "badge": "bestseller", "inStock": true, "description": "Explosion florale féminine. Jasmin, rose, orchidée et patchouli.", "volume": "100ml" },
  { "id": 32, "name": "Estée Lauder Advanced Night Repair", "nameEn": "Estée Lauder Night Repair Serum", "nameAr": "إستي لودر سيروم الليل", "category": "skincare", "brand": "Estée Lauder", "price": 980, "image": "products/anr.jpg", "rating": 4.9, "reviews": 1234, "badge": "bestseller", "inStock": true, "description": "Sérum réparateur nuit iconique. Réduit les signes visibles de l'âge.", "volume": "50ml" },
  { "id": 33, "name": "Vichy Minéral 89", "nameEn": "Vichy Minéral 89 Booster", "nameAr": "فيشي مينيرال 89", "category": "skincare", "brand": "Vichy", "price": 320, "image": "products/mineral-89.jpg", "rating": 4.7, "reviews": 678, "inStock": true, "description": "Concentré fortifiant et repulpant. 89% eau volcanique et acide hyaluronique.", "volume": "50ml" },
  { "id": 34, "name": "Drunk Elephant C-Firma Vitamin C", "nameEn": "Drunk Elephant Vitamin C Serum", "nameAr": "درانك إليفانت فيتامين سي", "category": "skincare", "brand": "Drunk Elephant", "price": 850, "image": "products/c-firma.jpg", "rating": 4.6, "reviews": 345, "badge": "new", "inStock": true, "description": "Sérum vitamine C 15%. Éclat, fermeté et anti-oxydant puissant.", "volume": "30ml" },
  { "id": 35, "name": "Clinique Dramatically Different Gel", "nameEn": "Clinique DD Moisturizing Gel", "nameAr": "كلينيك جل مرطب", "category": "skincare", "brand": "Clinique", "price": 420, "image": "products/clinique-dd.jpg", "rating": 4.5, "reviews": 567, "inStock": true, "description": "Gel hydratant léger. Renforce la barrière cutanée. Peaux mixtes à grasses.", "volume": "125ml" },
  { "id": 36, "name": "Paula's Choice 2% BHA Liquid", "nameEn": "Paula's Choice BHA Exfoliant", "nameAr": "بولاز تشويس بي اتش ايه", "category": "skincare", "brand": "Paula's Choice", "price": 380, "image": "products/bha-liquid.jpg", "rating": 4.8, "reviews": 892, "badge": "bestseller", "inStock": true, "description": "Exfoliant liquide à l'acide salicylique. Débouche les pores et lisse la peau.", "volume": "118ml" },
  { "id": 37, "name": "Charlotte Tilbury Pillow Talk Lipstick", "nameEn": "Charlotte Tilbury Pillow Talk", "nameAr": "شارلوت تيلبوري بيلو توك", "category": "makeup", "brand": "Charlotte Tilbury", "price": 480, "image": "products/pillow-talk.jpg", "rating": 4.9, "reviews": 1023, "badge": "bestseller", "inStock": true, "description": "Rouge à lèvres nude-rose iconique. Fini satiné, formule hydratante.", "volume": "3.5g" },
  { "id": 38, "name": "Fenty Beauty Pro Filt'r Foundation", "nameEn": "Fenty Beauty Foundation", "nameAr": "فينتي بيوتي فاونديشن", "category": "makeup", "brand": "Fenty Beauty", "price": 620, "image": "products/fenty-foundation.jpg", "rating": 4.7, "reviews": 789, "badge": "new", "inStock": true, "description": "Fond de teint matifiant longue tenue. 50 teintes pour toutes carnations.", "volume": "32ml" },
  { "id": 39, "name": "Anastasia Beverly Hills Brow Wiz", "nameEn": "ABH Brow Wiz Pencil", "nameAr": "أناستازيا قلم حواجب", "category": "makeup", "brand": "Anastasia Beverly Hills", "price": 350, "image": "products/brow-wiz.jpg", "rating": 4.8, "reviews": 1456, "badge": "bestseller", "inStock": true, "description": "Crayon à sourcils ultra-fin. Dessin précis et naturel, longue tenue.", "volume": "0.08g" },
  { "id": 40, "name": "Too Faced Better Than Sex Mascara", "nameEn": "Too Faced BTS Mascara", "nameAr": "توفيسد ماسكارا", "category": "makeup", "brand": "Too Faced", "price": 380, "image": "products/bts-mascara.jpg", "rating": 4.6, "reviews": 892, "inStock": true, "description": "Mascara volumisant intense. Cils XXL dramatiques en un passage.", "volume": "8ml" },
  { "id": 41, "name": "Huda Beauty Desert Dusk Palette", "nameEn": "Huda Beauty Desert Dusk", "nameAr": "هدى بيوتي ديزيرت داسك", "category": "makeup", "brand": "Huda Beauty", "price": 820, "image": "products/desert-dusk.jpg", "rating": 4.7, "reviews": 567, "inStock": true, "description": "Palette fards à paupières 18 teintes. Tons désert chauds et froids.", "volume": "18 x 1.2g" },
  { "id": 42, "name": "Redken Extreme Shampoo", "nameEn": "Redken Extreme Strengthening Shampoo", "nameAr": "ريدكن شامبو مقوي", "category": "haircare", "brand": "Redken", "price": 380, "image": "products/redken.jpg", "rating": 4.6, "reviews": 345, "inStock": true, "description": "Shampooing fortifiant pour cheveux fragilisés. Protéines et céramides.", "volume": "300ml" },
  { "id": 43, "name": "Schwarzkopf Gliss Hair Repair", "nameEn": "Gliss Ultimate Repair", "nameAr": "شوارزكوف جليس إصلاح", "category": "haircare", "brand": "Schwarzkopf", "price": 120, "image": "products/gliss.jpg", "rating": 4.4, "reviews": 678, "inStock": true, "description": "Shampooing réparateur intensif. Kératine liquide pour cheveux abîmés.", "volume": "400ml" },
  { "id": 44, "name": "Pantene Pro-V Miracles", "nameEn": "Pantene Pro-V Miracles", "nameAr": "بانتين برو-في معجزات", "category": "haircare", "brand": "Pantene", "price": 95, "image": "products/pantene.jpg", "rating": 4.3, "reviews": 456, "inStock": true, "description": "Shampooing et après-shampooing bio-actifs. Réparation et brillance.", "volume": "400ml" },
  { "id": 45, "name": "Garnier Fructis Hair Food Banana", "nameEn": "Garnier Hair Food Banana", "nameAr": "غارنييه هير فود موز", "category": "haircare", "brand": "Garnier", "price": 85, "image": "products/hair-food.jpg", "rating": 4.5, "reviews": 789, "badge": "bestseller", "inStock": true, "description": "Masque nourrissant 3 en 1. Formule vegan à la banane pour cheveux secs.", "volume": "390ml" },
  { "id": 46, "name": "Le Petit Marseillais Gel Douche", "nameEn": "Le Petit Marseillais Shower Gel", "nameAr": "لو بوتي مارسيه جل استحمام", "category": "hygiene", "brand": "Le Petit Marseillais", "price": 45, "image": "products/petit-marseillais.jpg", "rating": 4.4, "reviews": 892, "inStock": true, "description": "Gel douche parfum vanille-amande douce. Formule hydratante.", "volume": "250ml" },
  { "id": 47, "name": "Sanex Dermo Invisible Déodorant", "nameEn": "Sanex Dermo Invisible Deodorant", "nameAr": "سانكس ديرمو مزيل عرق", "category": "hygiene", "brand": "Sanex", "price": 55, "image": "products/sanex.jpg", "rating": 4.5, "reviews": 567, "inStock": true, "description": "Déodorant anti-traces blanches et jaunes. Protection 48h.", "volume": "200ml" },
  { "id": 48, "name": "Rexona Maximum Protection", "nameEn": "Rexona Maximum Protection", "nameAr": "ريكسونا الحماية القصوى", "category": "hygiene", "brand": "Rexona", "price": 65, "image": "products/rexona.jpg", "rating": 4.6, "reviews": 445, "inStock": true, "description": "Déodorant crème protection maximale. Efficacité 96h anti-transpirant.", "volume": "45ml" },
  { "id": 49, "name": "Johnson's Baby Oil", "nameEn": "Johnson's Baby Oil", "nameAr": "زيت جونسون للأطفال", "category": "hygiene", "brand": "Johnson's", "price": 75, "image": "products/johnsons.jpg", "rating": 4.7, "reviews": 1123, "badge": "bestseller", "inStock": true, "description": "Huile pour bébé hypoallergénique. Hydrate et adoucit la peau délicate.", "volume": "300ml" },
  { "id": 50, "name": "Coffret Chanel No.5 Luxe", "nameEn": "Chanel No.5 Luxury Set", "nameAr": "طقم شانيل رقم 5 الفاخر", "category": "gifts", "brand": "Chanel", "price": 2400, "image": "products/chanel-set.jpg", "rating": 4.9, "reviews": 123, "badge": "new", "inStock": true, "description": "Coffret prestige: EDP 100ml + Body Lotion + Miniature 5ml", "volume": "3 pièces" },
  { "id": 51, "name": "Coffret Versace Duo", "nameEn": "Versace Duo Gift Set", "nameAr": "طقم فيرساتشي ديو", "category": "gifts", "brand": "Versace", "price": 1350, "originalPrice": 1600, "image": "products/versace-set.jpg", "rating": 4.7, "reviews": 78, "badge": "sale", "inStock": true, "description": "Duo Versace: Eros EDT 100ml + Gel Douche Parfumé 100ml", "volume": "2 pièces" },
  { "id": 52, "name": "Kit Spa à Domicile", "nameEn": "Home Spa Kit", "nameAr": "طقم سبا منزلي", "category": "gifts", "brand": "Multi", "price": 450, "image": "products/spa-kit.jpg", "rating": 4.6, "reviews": 234, "inStock": true, "description": "Kit relaxation: Bougies + Sels de bain + Masques + Huiles essentielles", "volume": "5 pièces" }
];

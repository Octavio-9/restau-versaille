'use strict';

/* ═══════════════════════════════════════════════════
   RESTAURANT VERSAILLES — DEDICATED MENU SCRIPT
   Features: tab filtering, manager authentication,
   Base64 photo upload, localStorage persistence
   ═══════════════════════════════════════════════════ */

// ── MENU DATABASE (AUTHENTIC DEDICATED DATASET) ──
const MENU_DATA = {
  burgers: [
    { id: 'b1', name: 'Burger Old School', desc: 'Pain burger, steak haché, salade de choux, frites, ketchup. (Sandwich / Plat)', price: '45 000 FG / 80 000 FG', defaultImage: 'img-dish.png' },
    { id: 'b2', name: 'Cheese Burger Viande', desc: 'Pain burger, steak haché, cheddar, salade, tomate, sauce cocktail. (Sandwich / Plat)', price: '55 000 FG / 90 000 FG', defaultImage: 'food.png' },
    { id: 'b3', name: 'Cheese Burger Poulet', desc: 'Pain burger, steak au poulet, cheddar, salade, sauce crème, cornichon. (Sandwich / Plat)', price: '50 000 FG / 85 000 FG', defaultImage: 'gallery1.png' },
    { id: 'b4', name: 'Mozza Burger', desc: 'Pain burger, steak MOZZA, tomate, sauce pesto, olive, sauce mayo. (Sandwich / Plat)', price: '70 000 FG / 105 000 FG', defaultImage: 'img-table.png' },
    { id: 'b5', name: 'JP Mozza Beef', desc: 'Pain burger, steak haché, steak mozzarella, oignon grillé, salade, cornichon, sauce bbq. (Sandwich / Plat)', price: '100 000 FG / 135 000 FG', defaultImage: 'interior.png' },
    { id: 'b6', name: 'Inside Outside Mozza Poulet', desc: 'Pain burger, steak au poulet, steak mozzarella, salade, tomate, jalapeños, sauce bbq. (Sandwich / Plat)', price: '80 000 FG / 115 000 FG', defaultImage: 'img-chef.png' },
    { id: 'b7', name: 'Zinger Burger', desc: 'Pain hamburger, crispy poulet, jambon de dinde, salade, cornichon, fromage cheddar, sauce biggy. (Sandwich / Plat)', price: '65 000 FG / 100 000 FG', defaultImage: 'food.png' },
    { id: 'b8', name: 'Double Cheese Burger Viande', desc: 'Pain burger, 2 steaks viande hachée, fromage cheddar, salade, jalapeño, oignon, sauce biggy.', price: '130 000 FG', defaultImage: 'img-dish.png' },
    { id: 'b9', name: 'Double Cheese Burger Poulet', desc: 'Pain burger, 2 steaks de poulet grillé, fromage cheddar, salade, tomate, sauce biggy.', price: '120 000 FG', defaultImage: 'gallery1.png' },
    { id: 'b10', name: 'Burger Versailles', desc: 'Pain burger géant, steak haché, steak poulet, steak mozza, jambon de dinde, cheddar, salade, sauce biggy.', price: '155 000 FG', defaultImage: 'hero.png', featured: true }
  ],
  pizzas: [
    { id: 'p1', name: 'Pizza Margarita', desc: 'Sauce tomate faite maison, mozzarella, origan.', price: '80 000 FG', defaultImage: 'food.png' },
    { id: 'p2', name: 'Pizza Végétarienne', desc: 'Sauce tomate, poivron, tomate, oignon, olive, mozzarella fondante, maïs.', price: '100 000 FG', defaultImage: 'interior.png' },
    { id: 'p3', name: 'Pizza 4 Fromages', desc: 'Sauce tomate, origan, mozzarella, cheddar, parmesan, emmental râpé.', price: '140 000 FG', defaultImage: 'img-dish.png' },
    { id: 'p4', name: 'Toshka Pizza Viande', desc: 'Viande hachée assaisonnée, sauce tomate, mozzarella, maïs, olive, poivron.', price: '135 000 FG', defaultImage: 'gallery1.png' },
    { id: 'p5', name: 'Pizza Chawarma Viande', desc: 'Émincé de chawarma viande, sauce tomate, mozzarella, maïs, poivron, tomate, sauce.', price: '135 000 FG', defaultImage: 'img-table.png' },
    { id: 'p6', name: 'Pizza Peperoni', desc: 'Rondelles de peperoni grillées, sauce tomate, mozzarella, origan.', price: '125 000 FG', defaultImage: 'hero.png' },
    { id: 'p7', name: 'Pizza Beef Sandwich', desc: 'Sauce tomate, morceaux de viande marinée, mozzarella, maïs, olive, poivron vert, origan, sauce.', price: '90 000 FG', defaultImage: 'img-chef.png' },
    { id: 'p8', name: 'Pizza Burger', desc: 'Sauce mixte, mozzarella, steak haché, fromage cheddar, oignon caramélisé, peperoni, tomate.', price: '160 000 FG', defaultImage: 'food.png' },
    { id: 'p9', name: 'Pizza Tuna', desc: 'Thon émietté, sauce mixte, mozzarella, oignon rouge, poivron, olive, maïs.', price: '180 000 FG', defaultImage: 'interior.png' },
    { id: 'p10', name: 'Pizza Classic Crevettes', desc: 'Crevettes royales sautées, sauce tomate, mozzarella, oignon, poivron, olive noire, champignon de Paris.', price: '210 000 FG', defaultImage: 'img-dish.png' },
    { id: 'p11', name: 'Pizza Chawarma Poulet', desc: 'Chawarma poulet grillé, sauce tomate, mozzarella, champignons, maïs, origan, poivron vert, sauce.', price: '125 000 FG', defaultImage: 'gallery1.png' },
    { id: 'p12', name: 'Pizza Chicken Sandwich', desc: 'Sauce tomate, lamelles de poulet mariné, mozzarella filante, poivron, olive, maïs, origan.', price: '85 000 FG', defaultImage: 'img-table.png' },
    { id: 'p13', name: 'Pizza Cannibale', desc: 'Mélange poulet et viande hachée, sauce tomate, mozzarella, oignon, olive, origan, poivron, tomate, champignons.', price: '135 000 FG', defaultImage: 'hero.png' },
    { id: 'p14', name: 'Crispy Pizza', desc: 'Sauce mix blanche, mozzarella, morceaux de poulet croustillant (crispy), maïs, olive, sauce chef.', price: '130 000 FG', defaultImage: 'img-chef.png' },
    { id: 'p15', name: 'Pizza Familiale 4 Saisons', desc: 'Grande pizza combinée : Peperoni, Végétarienne, Margarita, Toshka avec un délicieux contour au fromage.', price: '365 000 FG', defaultImage: 'food.png', featured: true },
    { id: 'p16', name: 'Pizza au Mètre', desc: '1 Mètre de pizza composé de 5 saveurs uniques au choix (Chawarma Poulet/Viande, Toshka, Peperoni, Marguerita). Hors week-end.', price: '375 000 FG', defaultImage: 'interior.png' }
  ],
  plats: [
    { id: 'pl1', name: 'Poulet Sauce Champignon', desc: 'Blanc de poulet tendre, crème aux champignons de Paris. Accompagné de légumes sautés, frites ou riz.', price: '160 000 FG', defaultImage: 'food.png' },
    { id: 'pl2', name: 'Poulet Sauce Poivres', desc: 'Accompagné de légumes de saison, frites de pommes de terre ou riz blanc.', price: '160 000 FG', defaultImage: 'gallery1.png' },
    { id: 'pl3', name: 'Poulet Sauce Pesto', desc: 'Blanc de poulet mijoté au basilic frais. Accompagné de légumes sautés, frites ou riz.', price: '170 000 FG', defaultImage: 'img-dish.png' },
    { id: 'pl4', name: 'Steak Sauce Poivres', desc: 'Steak de bœuf juteux, sauce crémeuse au poivre vert concassé. Accompagné de légumes, frites ou riz.', price: '175 000 FG', defaultImage: 'interior.png' },
    { id: 'pl5', name: 'Steak Sauce Champignon', desc: 'Steak de bœuf grillé, sauce forestière crémeuse. Accompagné de légumes glacés et frites.', price: '175 000 FG', defaultImage: 'img-table.png' },
    { id: 'pl6', name: 'Bœuf aux Oignons', desc: 'Lanières de bœuf sautées aux oignons doux caramélisés. Accompagné de riz blanc.', price: '155 000 FG', defaultImage: 'img-chef.png' },
    { id: 'pl7', name: 'Crevettes Sauce Pesto', desc: 'Crevettes sautées à l\'huile d\'olive et pesto de basilic. Accompagné de riz parfumé.', price: '210 000 FG', defaultImage: 'hero.png' },
    { id: 'pl8', name: 'Filet de Capitaine à la Crème', desc: 'Pavé de capitaine, sauce veloutée citronnée. Accompagné de légumes vapeurs et riz.', price: '190 000 FG', defaultImage: 'food.png' },
    { id: 'pl9', name: 'Riz Kabab / Crispy / Tawouk', desc: 'Riz jaune parfumé dore, surmonté au choix de brochettes de kabab de bœuf, poulet croustillant ou tawouk.', price: '80 000 FG', defaultImage: 'img-dish.png' },
    { id: 'pl10', name: 'Riz Chawarma Poulet / Viande', desc: 'Riz pilaf aromatique servi avec émincé de chawarma au choix (poulet ou viande) et sauce sésame.', price: '80 000 FG', defaultImage: 'gallery1.png' },
    { id: 'pl11', name: 'Pasta Chicken Pesto', desc: 'Pâtes crémeuses sautées au pesto vert maison et aiguillettes de poulet grillées.', price: '120 000 FG', defaultImage: 'img-table.png' },
    { id: 'pl12', name: 'Pasta Crevettes Pesto', desc: 'Pâtes fettuccini au pesto, tomates cerises et crevettes royales.', price: '180 000 FG', defaultImage: 'food.png' },
    { id: 'pl13', name: 'Fettuccini Alfredo', desc: 'Recette italienne traditionnelle, crème fraîche double, beurre, parmesan et ail.', price: '115 000 FG', defaultImage: 'interior.png' },
    { id: 'pl14', name: 'Pasta 4 Fromages', desc: 'Pâtes courtes enveloppées dans une onctueuse sauce au cheddar, parmesan, emmental et mozzarella.', price: '135 000 FG', defaultImage: 'img-dish.png' }
  ],
  grillades: [
    { id: 'g1', name: 'Poulet Libanais Braisé', desc: 'Poulet entier mariné aux épices de Beyrouth, cuit sur braises. Servi avec frites de maison, cornichon et aïoli.', price: '180 000 FG', defaultImage: 'food.png' },
    { id: 'g2', name: 'Poulet Guinéen Braisé', desc: 'Poulet entier parfumé aux aromates du pays, braisé. Servi avec riz rouge typique, frites et aïoli.', price: '180 000 FG', defaultImage: 'gallery1.png' },
    { id: 'g3', name: '1/2 Poulet Braisé / Rôti', desc: 'Demi-poulet braisé ou rôti au four, tendre et croustillant. Servi avec riz rouge, frites et aïoli.', price: '90 000 FG', defaultImage: 'img-table.png' },
    { id: 'g4', name: 'Ailes Braisées', desc: '5 ailes de poulet bien grillées, marinées au citron et ail, servies avec choux, salade et frites.', price: '80 000 FG', defaultImage: 'img-chef.png' },
    { id: 'g5', name: 'Crevettes Braisées', desc: '6 belles crevettes géantes saisies sur le grill, servies avec frites, salade fraîche et sauce tomate maison.', price: '210 000 FG', defaultImage: 'hero.png' },
    { id: 'g6', name: 'Poisson Braisé (Mérou)', desc: 'Mérou entier frais du jour, grillé aux herbes, frites ou riz rouge.', price: '180 000 FG', defaultImage: 'interior.png' },
    { id: 'g7', name: 'Poisson Grillé (Large / Medium)', desc: 'Morceaux de poisson grillé (3 pcs large / 2 pcs medium), servis avec frites, houmous et sauce tahina.', price: '395 000 FG / 250 000 FG', defaultImage: 'img-dish.png' },
    { id: 'g8', name: 'Brochette Viande / Kabab', desc: 'Brochettes de bœuf tendre marinées au gingembre ou viande hachée kabab (3 pcs), frites, légume grillé et houmous.', price: '140 000 FG / 125 000 FG', defaultImage: 'gallery1.png' },
    { id: 'g9', name: 'Tawouk', desc: '2 brochettes de blancs de poulet en cubes marinés à l\'ail et au yaourt, frites, salade de choux et aïoli.', price: '120 000 FG', defaultImage: 'img-table.png' },
    { id: 'g10', name: 'Poisson Attiéké', desc: '1 poisson mérou entier frit, accompagné d\'attiéké frais, oignons, tomates et piment.', price: '150 000 FG', defaultImage: 'food.png' },
    { id: 'g11', name: 'Poulet Attiéké', desc: '1/2 poulet braisé savoureux servi avec attiéké local, salade et sauce tomate.', price: '140 000 FG', defaultImage: 'img-chef.png' },
    { id: 'g12', name: 'Mix Grill (Halal)', desc: '1 brochette viande, 1 brochette tawouk, 2 brochettes kabab viande de bœuf avec frites et houmous.', price: '180 000 FG', defaultImage: 'gallery1.png' },
    { id: 'g13', name: 'Machewe Versailles', desc: 'Grand plateau de fête pour 4 personnes : 4 ailes, 6 crevettes, 3 brochettes de viande, 3 tawouk, 3 kabab viande, frites, aïoli et houmous.', price: '485 000 FG', defaultImage: 'hero.png', featured: true }
  ],
  boissons: [
    { id: 'd1', name: 'Planet', desc: 'Cocktail de jus gazeux aromatisé : Ananas, Orange, Red Mix, Pomme, American Cola ou Tonic.', price: '10 000 FG', defaultImage: 'hero.png' },
    { id: 'd2', name: 'Canette Sodas', desc: 'Sodas importés frais : Fanta, Coca-Cola, Sprite, Schweppes ou Vimto. (33cl)', price: '15 000 FG', defaultImage: 'gallery1.png' },
    { id: 'd3', name: 'XXL Energy Drink / Redbull', desc: 'Boissons énergisantes fraîches au choix pour redonner du tonus.', price: '15 000 FG / 35 000 FG', defaultImage: 'hero.png' },
    { id: 'd4', name: 'Jus de Fruits / Jus Naturel', desc: 'Jus pasteurisés (Pomme, Orange, Ananas) ou pressés 100% frais (Orange, Ananas).', price: '20 000 FG / 40 000 FG', defaultImage: 'food.png' },
    { id: 'd5', name: 'Bissap & Gingembre', desc: 'Boisson locale traditionnelle infusée à l\'hibiscus rouge et gingembre fort pressé.', price: '20 000 FG', defaultImage: 'img-chef.png' },
    { id: 'd6', name: 'Mojitos (Passion / Virgin / Blue)', desc: 'Cocktails rafraîchissants glacés à base de menthe fraîche, citron vert, eau gazeuse et sirops fruités.', price: '40 000 FG / 35 000 FG', defaultImage: 'hero.png' },
    { id: 'd7', name: 'Mojito Versailles (Mangue / Ananas / Fraise / Citron)', desc: 'Mojitos signatures fruités à base de vrais fruits mixés et glacés.', price: '30 000 FG / 25 000 FG', defaultImage: 'img-dish.png' },
    { id: 'd8', name: 'Smoothies (Fraise-Banane / Mangue-Banane / Kiwi-Pomme)', desc: 'Mélange crémeux glacé de fruits frais mixés.', price: '45 000 FG / 40 000 FG / 55 000 FG', defaultImage: 'img-table.png' },
    { id: 'd9', name: 'Smoothie Avocat Miel Crunchy', desc: 'Avocat crémeux, miel local pur, surmonté d\'éclats de cacahuètes grillées.', price: '50 000 FG', defaultImage: 'food.png', featured: true },
    { id: 'd10', name: 'Cocktail Versailles', desc: 'Cocktail royal signature maison aux fruits tropicaux pressés.', price: '75 000 FG', defaultImage: 'hero.png' },
    { id: 'd11', name: 'Banana Split', desc: 'Banane entière coupée en deux, 2 boules de glace au choix, crème chantilly onctueuse et chocolat fondu.', price: '75 000 FG', defaultImage: 'img-dish.png' },
    { id: 'd12', name: 'Café Expresso / Illy / Capuccino', desc: 'Boissons chaudes préparées avec des grains de café italiens sélectionnés.', price: '10 000 FG / 20 000 FG / 25 000 FG', defaultImage: 'interior.png' },
    { id: 'd13', name: 'Séance Photo Mariage (Extra)', desc: 'Forfait de privatisation partielle de la salle pour vos séances photo souvenirs.', price: '500 000 FG', defaultImage: 'img-table.png' },
    { id: 'd14', name: 'Photographe Personnel (Extra)', desc: 'Bénéficiez d\'un photographe attitré pour immortaliser votre déjeuner ou dîner.', price: '100 000 FG', defaultImage: 'img-chef.png' }
  ]
};

// ── LOCAL STORAGE KEYS ──
const CUSTOM_DISHES_KEY = 'versailles_custom_dishes';
const ADDED_DISHES_KEY = 'versailles_added_dishes';
const DELETED_DISHES_KEY = 'versailles_deleted_dishes';

// ── STATE ──
let currentCategory = 'burgers';
let isAdmin = sessionStorage.getItem('versailles_admin') === 'true';
let tempImageSelected = null; // Temp holder for selected base64 image or url

// ── FIND DISH BY ID IN BASE MENU ──
function findDishById(dishId) {
  for (const cat in MENU_DATA) {
    const found = MENU_DATA[cat].find(d => d.id === dishId);
    if (found) return found;
  }
  return null;
}

// ── GET ADDED DISHES ──
function getAddedDishes(category) {
  try {
    const added = JSON.parse(localStorage.getItem(ADDED_DISHES_KEY)) || {};
    return added[category] || [];
  } catch (e) {
    console.error('Error reading added dishes', e);
    return [];
  }
}

// ── ADD NEW DISH ──
function addCustomDish(category, dish) {
  try {
    const added = JSON.parse(localStorage.getItem(ADDED_DISHES_KEY)) || {};
    if (!added[category]) {
      added[category] = [];
    }
    added[category].push(dish);
    localStorage.setItem(ADDED_DISHES_KEY, JSON.stringify(added));
    return true;
  } catch (e) {
    console.error('Error saving added dish', e);
    return false;
  }
}

// ── DELETE DISH ──
function deleteDish(dishId) {
  try {
    // Save to deleted list
    const deleted = JSON.parse(localStorage.getItem(DELETED_DISHES_KEY)) || {};
    deleted[dishId] = true;
    localStorage.setItem(DELETED_DISHES_KEY, JSON.stringify(deleted));

    // Also remove from added dishes if it was custom
    if (dishId.startsWith('custom_')) {
      const added = JSON.parse(localStorage.getItem(ADDED_DISHES_KEY)) || {};
      for (const cat in added) {
        added[cat] = added[cat].filter(d => d.id !== dishId);
      }
      localStorage.setItem(ADDED_DISHES_KEY, JSON.stringify(added));
      
      // Clean up details
      const customDishes = JSON.parse(localStorage.getItem(CUSTOM_DISHES_KEY)) || {};
      delete customDishes[dishId];
      localStorage.setItem(CUSTOM_DISHES_KEY, JSON.stringify(customDishes));
    }
    return true;
  } catch (e) {
    console.error('Error deleting dish', e);
    return false;
  }
}

// ── GET DELETED DISHES ──
function getDeletedDishes() {
  try {
    return JSON.parse(localStorage.getItem(DELETED_DISHES_KEY)) || {};
  } catch (e) {
    return {};
  }
}

// ── GET CUSTOM DISH DETAILS ──
function getDishDetails(dish) {
  try {
    const customDishes = JSON.parse(localStorage.getItem(CUSTOM_DISHES_KEY)) || {};
    const custom = customDishes[dish.id];
    if (custom) {
      return {
        id: dish.id,
        name: custom.name || dish.name,
        desc: custom.desc || dish.desc,
        price: custom.price || dish.price,
        image: (custom.image !== undefined && custom.image !== '') ? custom.image : (dish.defaultImage || 'food.png')
      };
    }
  } catch (e) {
    console.error('Error reading custom dishes', e);
  }
  return {
    id: dish.id,
    name: dish.name,
    desc: dish.desc,
    price: dish.price,
    image: dish.defaultImage || 'food.png'
  };
}

// ── SAVE CUSTOM DISH DETAILS ──
function saveDishDetails(dishId, details) {
  try {
    const customDishes = JSON.parse(localStorage.getItem(CUSTOM_DISHES_KEY)) || {};
    customDishes[dishId] = {
      ...(customDishes[dishId] || {}),
      ...details
    };
    localStorage.setItem(CUSTOM_DISHES_KEY, JSON.stringify(customDishes));
    return true;
  } catch (e) {
    console.error('Failed to save to localStorage', e);
    return false;
  }
}

// ── RENDER MENU ──
function renderMenu() {
  const grid = document.getElementById('dishesGrid');
  if (!grid) return;

  const baseItems = MENU_DATA[currentCategory] || [];
  const addedItems = getAddedDishes(currentCategory);
  const deletedMap = getDeletedDishes();

  // Combine base and added, filter out deleted
  const items = [...baseItems, ...addedItems].filter(dish => !deletedMap[dish.id]);
  grid.innerHTML = '';

  items.forEach(dish => {
    const activeDetails = getDishDetails(dish);
    const card = document.createElement('article');
    card.className = `dish-card js-reveal is-visible`;
    
    card.innerHTML = `
      <div class="dish-media">
        <img src="${activeDetails.image}" alt="${activeDetails.name}" loading="lazy"/>
        <button class="dish-photo-upload-btn" data-dish-id="${dish.id}">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"/>
          </svg>
          Modifier le plat
        </button>
        <button class="dish-delete-btn" data-dish-id="${dish.id}" title="Supprimer ce plat">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
          </svg>
        </button>
      </div>
      <div class="dish-header-row">
        <h3 class="dish-title">${activeDetails.name}</h3>
        <span class="dish-price">${activeDetails.price}</span>
      </div>
      <p class="dish-desc">${activeDetails.desc}</p>
      <div class="dish-actions">
        <button class="btn-dish-order" data-dish-name="${activeDetails.name}" data-dish-price="${activeDetails.price}">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
          Commander
        </button>
      </div>
    `;

    // Order action
    card.querySelector('.btn-dish-order').addEventListener('click', () => {
      const msg = `Bonjour Restaurant Versailles, je souhaite commander le plat *${activeDetails.name}* (${activeDetails.price}).`;
      window.open(`https://wa.me/224628434445?text=${encodeURIComponent(msg)}`, '_blank', 'noopener');
    });

    // Edit action
    card.querySelector('.dish-photo-upload-btn').addEventListener('click', (e) => {
      e.stopPropagation();
      openUploadModal(dish.id);
    });

    // Delete action
    card.querySelector('.dish-delete-btn').addEventListener('click', (e) => {
      e.stopPropagation();
      if (confirm(`Voulez-vous vraiment supprimer le plat "${activeDetails.name}" ?`)) {
        if (deleteDish(dish.id)) {
          renderMenu();
          showFeedback('Plat supprimé avec succès.');
        } else {
          showFeedback('Erreur lors de la suppression.', true);
        }
      }
    });

    grid.appendChild(card);
  });
}

// ── TAB FILTERING ──
function initTabs() {
  const tabs = document.querySelectorAll('.menu-tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const cat = tab.dataset.cat;
      tabs.forEach(t => { t.classList.remove('active'); t.setAttribute('aria-selected', 'false'); });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');
      currentCategory = cat;
      renderMenu();
    });
  });
}

// ── MANAGER PORTAL LOGIC ──
const $adminBar = document.getElementById('adminBar');
const $loginModal = document.getElementById('adminLoginModal');
const $uploadModal = document.getElementById('uploadModal');
const $toast = document.getElementById('toast');
const $addDishBtn = document.getElementById('addDishBtn');

// Show toast feedback helper
function showFeedback(msg, isError = false) {
  if (!$toast) return;
  $toast.textContent = msg;
  $toast.className = 'toast is-show' + (isError ? ' is-error' : '');
  clearTimeout($toast._timer);
  $toast._timer = setTimeout(() => { $toast.className = 'toast'; }, 4000);
}

function updateAdminState() {
  const $adminActions = document.getElementById('adminOnlyActions');
  if (isAdmin) {
    document.body.classList.add('admin-active');
    if ($adminBar) $adminBar.classList.add('is-visible');
    if ($adminActions) $adminActions.style.display = 'flex';
  } else {
    document.body.classList.remove('admin-active');
    if ($adminBar) $adminBar.classList.remove('is-visible');
    if ($adminActions) $adminActions.style.display = 'none';
  }
}

// Open Login Portal
function openLoginPortal() {
  if ($loginModal) $loginModal.classList.add('is-active');
  const passField = document.getElementById('adminPass');
  if (passField) {
    passField.value = '';
    passField.focus();
  }
}

function closeLoginPortal() {
  if ($loginModal) $loginModal.classList.remove('is-active');
}

// Open Upload / Edit / Add Modal
function openUploadModal(dishId) {
  if (!$uploadModal) return;
  
  document.getElementById('uploadDishId').value = dishId;
  
  if (dishId === 'new-dish') {
    document.getElementById('uploadModalTitle').textContent = `Ajouter un plat`;
    document.getElementById('uploadModalSub').textContent = `Ajoutez un nouveau plat dans la catégorie active.`;
    
    // Clear inputs
    document.getElementById('editDishName').value = '';
    document.getElementById('editDishPrice').value = '';
    document.getElementById('editDishDesc').value = '';
    document.getElementById('imageUrlInput').value = '';
    document.getElementById('fileInput').value = '';
    
    // Set placeholder preview
    document.getElementById('editDishPreviewImg').src = 'food.png';
    document.getElementById('editDishPreviewName').textContent = 'Image par défaut';
    document.getElementById('imagePreviewContainer').style.display = 'flex';
    tempImageSelected = null;
  } else {
    // Find existing dish details
    let dish = findDishById(dishId);
    if (!dish) {
      const added = getAddedDishes(currentCategory);
      dish = added.find(d => d.id === dishId);
    }
    
    if (dish) {
      const activeDetails = getDishDetails(dish);
      document.getElementById('uploadModalTitle').textContent = `Modifier le plat`;
      document.getElementById('uploadModalSub').textContent = `Modifiez le nom, le prix, la description et la photo de ce plat.`;
      
      document.getElementById('editDishName').value = activeDetails.name;
      document.getElementById('editDishPrice').value = activeDetails.price;
      document.getElementById('editDishDesc').value = activeDetails.desc;
      
      const isBase64 = activeDetails.image.startsWith('data:');
      document.getElementById('imageUrlInput').value = isBase64 ? '' : activeDetails.image;
      document.getElementById('fileInput').value = '';
      
      document.getElementById('editDishPreviewImg').src = activeDetails.image;
      document.getElementById('editDishPreviewName').textContent = isBase64 ? 'Image importée' : activeDetails.image;
      document.getElementById('imagePreviewContainer').style.display = 'flex';
      tempImageSelected = null;
    }
  }
  
  $uploadModal.classList.add('is-active');
}

function closeUploadModal() {
  if ($uploadModal) $uploadModal.classList.remove('is-active');
}

// Hook up Add Dish Button
if ($addDishBtn) {
  $addDishBtn.addEventListener('click', () => {
    openUploadModal('new-dish');
  });
}

// Handle login submission
const $loginForm = document.getElementById('adminLoginForm');
if ($loginForm) {
  $loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const password = document.getElementById('adminPass').value;
    
    if (password === '1234' || password.toLowerCase() === 'versailles') {
      isAdmin = true;
      sessionStorage.setItem('versailles_admin', 'true');
      updateAdminState();
      closeLoginPortal();
      showFeedback('Authentification réussie. Mode gérant activé.');
    } else {
      showFeedback('Code d\'accès incorrect.', true);
    }
  });
}

// Handle clear preview button
const $clearPreviewBtn = document.getElementById('clearPreviewBtn');
if ($clearPreviewBtn) {
  $clearPreviewBtn.addEventListener('click', () => {
    const dishId = document.getElementById('uploadDishId').value;
    let defaultImg = 'food.png';
    if (dishId !== 'new-dish') {
      let dish = findDishById(dishId);
      if (!dish) {
        const added = getAddedDishes(currentCategory);
        dish = added.find(d => d.id === dishId);
      }
      if (dish) {
        defaultImg = dish.defaultImage || 'food.png';
      }
    }
    
    tempImageSelected = 'default';
    document.getElementById('editDishPreviewImg').src = defaultImg;
    document.getElementById('editDishPreviewName').textContent = 'Image par défaut';
    document.getElementById('imageUrlInput').value = '';
    document.getElementById('fileInput').value = '';
  });
}

// Hook image preview on URL input change
const $imageUrlInput = document.getElementById('imageUrlInput');
if ($imageUrlInput) {
  $imageUrlInput.addEventListener('input', (e) => {
    const url = e.target.value.trim();
    if (url) {
      document.getElementById('editDishPreviewImg').src = url;
      document.getElementById('editDishPreviewName').textContent = 'Lien URL';
      document.getElementById('imagePreviewContainer').style.display = 'flex';
      
      // Clear file inputs since URL takes priority
      const fileInput = document.getElementById('fileInput');
      if (fileInput) fileInput.value = '';
      tempImageSelected = null;
    }
  });
}

// Handle upload submission
const $uploadForm = document.getElementById('uploadPhotoForm');
if ($uploadForm) {
  $uploadForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const dishId = document.getElementById('uploadDishId').value;
    const name = document.getElementById('editDishName').value.trim();
    const price = document.getElementById('editDishPrice').value.trim();
    const desc = document.getElementById('editDishDesc').value.trim();
    const urlInput = document.getElementById('imageUrlInput').value.trim();
    
    let finalImage = null;
    if (tempImageSelected === 'default') {
      finalImage = '';
    } else if (tempImageSelected) {
      finalImage = tempImageSelected;
    } else if (urlInput) {
      finalImage = urlInput;
    }
    
    if (dishId === 'new-dish') {
      // Create custom dish object
      const newId = `custom_${Date.now()}`;
      const newDish = {
        id: newId,
        name: name,
        desc: desc,
        price: price,
        defaultImage: finalImage || 'food.png'
      };
      
      if (addCustomDish(currentCategory, newDish)) {
        renderMenu();
        closeUploadModal();
        showFeedback('Nouveau plat ajouté avec succès.');
      } else {
        showFeedback('Erreur lors de la création du plat.', true);
      }
    } else {
      // Save edit details
      const details = { name, price, desc };
      if (finalImage !== null) {
        details.image = finalImage;
      }
      
      if (saveDishDetails(dishId, details)) {
        renderMenu();
        closeUploadModal();
        showFeedback('Plat modifié avec succès.');
      } else {
        showFeedback('Erreur lors de l\'enregistrement.', true);
      }
    }
  });
}

// File Drag and Drop / Input logic
const $dragZone = document.getElementById('dragZone');
const $fileInput = document.getElementById('fileInput');

if ($dragZone && $fileInput) {
  $dragZone.addEventListener('click', () => $fileInput.click());

  $dragZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    $dragZone.classList.add('drag-over');
  });

  $dragZone.addEventListener('dragleave', () => {
    $dragZone.classList.remove('drag-over');
  });

  $dragZone.addEventListener('drop', (e) => {
    e.preventDefault();
    $dragZone.classList.remove('drag-over');
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  });

  $fileInput.addEventListener('change', () => {
    if ($fileInput.files && $fileInput.files[0]) {
      handleFileSelect($fileInput.files[0]);
    }
  });
}

function handleFileSelect(file) {
  if (!file.type.startsWith('image/')) {
    showFeedback('Le fichier doit être une image.', true);
    return;
  }

  // Check file size (limit base64 storage to 3.5MB to stay within localStorage constraints)
  if (file.size > 3.5 * 1024 * 1024) {
    showFeedback('Image trop volumineuse (max 3.5 Mo).', true);
    return;
  }

  const reader = new FileReader();
  reader.onload = (e) => {
    const base64Data = e.target.result;
    tempImageSelected = base64Data;
    
    // Clear URL input
    document.getElementById('imageUrlInput').value = '';
    
    // Update preview
    document.getElementById('editDishPreviewImg').src = base64Data;
    document.getElementById('editDishPreviewName').textContent = file.name;
    document.getElementById('imagePreviewContainer').style.display = 'flex';
  };
  reader.readAsDataURL(file);
}

// Logout Action
const $logoutBtn = document.getElementById('adminLogoutBtn');
if ($logoutBtn) {
  $logoutBtn.addEventListener('click', () => {
    isAdmin = false;
    sessionStorage.removeItem('versailles_admin');
    updateAdminState();
    showFeedback('Déconnecté du mode gérant.');
  });
}

// Triggers & Close buttons
const $adminTrigger = document.getElementById('footerAdminTrigger');
if ($adminTrigger) {
  $adminTrigger.addEventListener('click', (e) => {
    e.preventDefault();
    openLoginPortal();
  });
}

document.getElementById('closeLoginBtn')?.addEventListener('click', closeLoginPortal);
document.getElementById('closeUploadBtn')?.addEventListener('click', closeUploadModal);

// Close modal when clicking outside content
window.addEventListener('click', (e) => {
  if (e.target === $loginModal) closeLoginPortal();
  if (e.target === $uploadModal) closeUploadModal();
});

// Check query parameter or localStorage flag for instant login access
function checkUrlParams() {
  const params = new URLSearchParams(window.location.search);
  const localFlag = localStorage.getItem('versailles_open_admin');
  
  if (params.get('admin') === 'true' || localFlag === 'true') {
    if (localFlag === 'true') {
      localStorage.removeItem('versailles_open_admin');
    }
    if (params.get('admin') === 'true') {
      window.history.replaceState({}, document.title, window.location.pathname);
    }
    openLoginPortal();
  }
}

// ── INITIALIZATION ──
document.addEventListener('DOMContentLoaded', () => {
  initTabs();
  renderMenu();
  updateAdminState();
  checkUrlParams();
});

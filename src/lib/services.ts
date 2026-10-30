import type { PhotoKey } from './site';

export type Service = {
  slug: string;
  name: string;
  group: 'Design & Build' | 'Grounds Care';
  short: string;
  intro: string;
  includes: string[];
  suits: string[];
  photo?: PhotoKey;
};

export const groups = [
  { name: 'Design & Build', note: 'New landscapes, drawn and constructed.' },
  { name: 'Grounds Care', note: 'Established landscapes, kept as drawn.' },
] as const;

export const services: Service[] = [
  {
    slug: 'hardscape', name: 'Hardscape', group: 'Design & Build',
    short: 'The bricks and mortar of a landscape: paths, courts, edges and seating.',
    intro: 'Hardscaping gives a landscape its structure. We set out the paving, edging, steps and built seating first, so that everything planted afterwards has a frame to grow into and a surface that can take daily use.',
    includes: ['Paths, plazas and courtyards', 'Stone and paver edging', 'Built seating and planters', 'Steps and level changes'],
    suits: ['Campuses', 'Townships', 'Hotels', 'Homes'], photo: 'modern',
  },
  {
    slug: 'softscape', name: 'Softscape', group: 'Design & Build',
    short: 'The living layer: flowers, plants, shrubs, trees and flower beds.',
    intro: 'Softscape is the horticultural layer of a landscape. We select and place flowers, plants, shrubs and trees to suit the site and the way it will be used, then bed them in so they establish well.',
    includes: ['Planting plans', 'Flower beds and borders', 'Shrub and tree planting', 'Seasonal colour'],
    suits: ['Forecourts', 'Institutions', 'Road medians', 'Homes'], photo: 'buddha',
  },
  {
    slug: 'vertical-garden', name: 'Vertical Garden', group: 'Design & Build',
    short: 'Living green walls that need very little maintenance and no ground space.',
    intro: 'Low maintenance requirements have made vertical gardens a favourite for urban sites. Where floor area is scarce, we take the planting up the wall and turn a blank surface into the most noticed thing in the space.',
    includes: ['Wall assessment', 'Planting selection', 'Structure and irrigation', 'Ongoing care'],
    suits: ['Lobbies', 'Offices', 'Hotels', 'Apartments'],
  },
  {
    slug: 'terrace-garden', name: 'Terrace Garden', group: 'Design & Build',
    short: 'Rooftops turned into low-maintenance, budget-friendly gardens.',
    intro: 'Terrace gardens are a new idea in India and a fast-growing one. With space short in urban homes, our team uses every available metre to create a rooftop that looks good, stays easy to look after and fits the budget.',
    includes: ['Layout and zoning', 'Container and bed planting', 'Seating areas', 'Irrigation'],
    suits: ['Homes', 'Offices', 'Hotels'],
  },
  {
    slug: 'balcony-garden', name: 'Balcony Garden', group: 'Design & Build',
    short: 'A stroke of greenery for a home, whatever the size of the balcony.',
    intro: 'A balcony garden can enliven a home with a stroke of greenery. Our team designs for the balcony you actually have, regardless of its size, its light or how much time you can give it.',
    includes: ['Small-space layout', 'Planters and shelving', 'Plants matched to light', 'Care guidance'],
    suits: ['Apartments', 'Homes'],
  },
  {
    slug: 'kitchen-garden', name: 'Kitchen Garden', group: 'Design & Build',
    short: 'Fruit, vegetables and medicinal herbs from your own backyard.',
    intro: 'We help you set up your very own kitchen garden, sowing native flowering plants and medicinal herbs for cooking and wellbeing. It saves on buying fruit and vegetables, and gives a constant supply that is high in nutrition and free from toxic chemicals.',
    includes: ['Bed preparation', 'Native and medicinal planting', 'Seasonal sowing plan', 'Harvest and upkeep guidance'],
    suits: ['Homes', 'Schools', 'Office terraces'], photo: 'modern',
  },
  {
    slug: 'aquatic-ponds', name: 'Aquatic Ponds', group: 'Design & Build',
    short: 'Ponds, cascades and water features, from concept to upkeep.',
    intro: 'Our team provides a varied range of services covering all aspects of aqua space, from the first sketch of a pond to the rockwork, planting and care that keep the water looking right.',
    includes: ['Pond design', 'Rockwork and cascades', 'Aquatic planting', 'Water feature upkeep'],
    suits: ['Hotels', 'Courtyards', 'Townships', 'Homes'], photo: 'waterfall',
  },
  {
    slug: 'landscape-lighting', name: 'Landscape Lighting', group: 'Design & Build',
    short: 'Outdoor illumination for night-time beauty and recreation.',
    intro: 'Landscape lighting extends a garden into the evening. We use outdoor illumination to enhance the site, draw out its best features after dark and make it usable for recreation.',
    includes: ['Lighting layout', 'Path and accent lighting', 'Feature and tree lighting', 'Installation'],
    suits: ['Hotels', 'Homes', 'Campuses'],
  },
  {
    slug: 'terrace-lawn', name: 'Terrace Lawn', group: 'Design & Build',
    short: 'A real sense of lawn on the roof, built for urban sites.',
    intro: 'Space is the great drawback of urban homes. A terrace lawn makes the most of what is available and introduces greenery where the ground has run out, with low upkeep designed in.',
    includes: ['Surface preparation', 'Lawn or turf laying', 'Edging', 'Maintenance plan'],
    suits: ['Homes', 'Offices', 'Hotels'],
  },
  {
    slug: 'annual-maintenance-contract', name: 'Annual Maintenance Contract', group: 'Grounds Care',
    short: 'Custom-tailored care on a contract, based on what your property needs.',
    intro: 'Every client’s property is different, so every maintenance contract is too. We tailor the schedule to the site and take the burden of gardening off your office, company, organisation or institution.',
    includes: ['Scheduled site visits', 'Mowing, pruning and feeding', 'Weed and irrigation care', 'Reporting on site condition'],
    suits: ['Institutions', 'Corporate campuses', 'Housing societies', 'Hotels'], photo: 'median',
  },
  {
    slug: 'mowing', name: 'Mowing', group: 'Grounds Care',
    short: 'Professional lawn mowing, best taken under a maintenance contract.',
    intro: 'We recommend taking mowing as part of a landscaping maintenance contract. It keeps the lawn on a regular cycle and leaves you with a hassle-free experience.',
    includes: ['Regular mowing cycles', 'Edging', 'Clippings cleared', 'Lawn health checks'],
    suits: ['Campuses', 'Societies', 'Sports grounds'], photo: 'golf',
  },
  {
    slug: 'trimming-and-pruning', name: 'Trimming & Pruning', group: 'Grounds Care',
    short: 'Skilled work that strengthens trees, not just shapes them.',
    intro: 'Trimming and pruning are meant to strengthen a tree as much as tidy it, so the work needs to be done with care. Our team shapes hedges, shrubs and trees to keep them healthy and in proportion.',
    includes: ['Tree pruning', 'Hedge trimming', 'Shrub shaping', 'Green waste removal'],
    suits: ['Townships', 'Campuses', 'Road corridors'], photo: 'highway',
  },
  {
    slug: 'weed-care', name: 'Weed Care', group: 'Grounds Care',
    short: 'One weed disrupts a well-kept lawn, and more follow fast.',
    intro: 'A single weed can disrupt the appearance of a well-maintained lawn, and new weeds are quick to follow. Our weed care keeps them out of lawns, beds and paved edges before they take hold.',
    includes: ['Lawn weeding', 'Bed and border clearing', 'Paved edge control', 'Recurring checks'],
    suits: ['Lawns', 'Campuses', 'Societies'],
  },
  {
    slug: 'fertilizing', name: 'Fertilizing', group: 'Grounds Care',
    short: 'Lawns need more than water, and every property needs a different mix.',
    intro: 'A good lawn takes more than watering. Every client’s property is different and needs specific care, so we match feeding to the soil, the planting and the season.',
    includes: ['Soil and lawn review', 'Seasonal feeding', 'Bed and border feeding'],
    suits: ['Lawns', 'Beds', 'Sports grounds'],
  },
  {
    slug: 'lawn-aeration', name: 'Lawn Aeration', group: 'Grounds Care',
    short: 'Reduces soil compaction so feed and water reach the roots.',
    intro: 'Aeration is an important maintenance service. It reduces soil compaction and allows fertiliser to do its work, which is essential for turf that gets heavy use.',
    includes: ['Compaction assessment', 'Lawn aeration', 'Post-aeration feeding', 'Advice on recovery'],
    suits: ['Sports turf', 'Campus lawns', 'Parks'],
  },
  {
    slug: 'tree-and-shrub-care', name: 'Tree & Shrub Care', group: 'Grounds Care',
    short: 'Protection for trees, plant beds and foundation plantings.',
    intro: 'Our tree and shrub care protects trees, plant beds and foundation plantings, starting from an inspection and an overall health evaluation of the plants on site.',
    includes: ['Inspection', 'Health evaluation', 'Pruning and feeding', 'Protective care'],
    suits: ['Campuses', 'Townships', 'Road corridors'], photo: 'median',
  },
  {
    slug: 'irrigation-maintenance', name: 'Irrigation Maintenance', group: 'Grounds Care',
    short: 'Keeping a garden clean and watered is a task in itself. We take it on.',
    intro: 'Keeping a garden clean can be a huge task, and proper irrigation adds to the challenge. We keep the system working so the landscape stays watered without it becoming your worry.',
    includes: ['System checks', 'Leak and blockage repair', 'Coverage adjustment', 'Seasonal schedules'],
    suits: ['Campuses', 'Societies', 'Hotels'],
  },
  {
    slug: 'landscape-irrigation', name: 'Landscape Irrigation', group: 'Grounds Care',
    short: 'Water spread regularly and evenly across the whole landscape.',
    intro: 'The primary function of a landscape irrigation system is to make sure water is spread regularly and evenly throughout the landscape. We plan and lay systems that do exactly that.',
    includes: ['Coverage planning', 'Pipework and emitters', 'Zones and scheduling', 'Commissioning'],
    suits: ['Townships', 'Sports grounds', 'Campuses'],
  },
];

export const featured = ['hardscape', 'softscape', 'aquatic-ponds', 'vertical-garden', 'annual-maintenance-contract'];

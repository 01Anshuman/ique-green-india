export const site = {
  name: 'IQUE Green India',
  legalName: 'IQUE Green India Pvt. Ltd.',
  tagline: 'Devoted for Human Health and Environments',
  url: 'https://iquegreenindia.com',
  cin: 'U01400UP2017PTC099477',
  incorporated: '19 December 2017',
  founded: 2017,
  yearsLabel: '8+',
  chief: 'Ambrish Shukla',
  corporateOffice: 'B-1227, Indira Nagar, Lucknow 226016, Uttar Pradesh',
  registeredOffice: 'B-1268, Indira Nagar, Lucknow, Uttar Pradesh',
  phoneDisplay: '+91 75710 81703',
  phone: '+917571081703',
  landlineDisplay: '0522 423 7416',
  landline: '+915224237416',
  whatsapp: '917571081703',
  email: 'iquegreenindia@gmail.com',
  regions: ['Lucknow', 'Ayodhya', 'Banda'],
};

export const whatsappLink = (message: string) =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;

export const nav = [
  { href: '/services/', label: 'Services' },
  { href: '/clients/', label: 'Clients & Work' },
  { href: '/about/', label: 'About' },
];

export type Client = { name: string; detail: string; location: string; sector: string };

export const sectors = [
  'Government & PSU',
  'Real Estate',
  'Education',
  'Sports',
  'Healthcare',
  'Hospitality',
];

export const clients: Client[] = [
  { name: 'Hindustan Petroleum (HPCL)', detail: 'Public sector undertaking', location: 'Uttar Pradesh', sector: 'Government & PSU' },
  { name: 'Ayodhya Railway Station', detail: 'Rail infrastructure', location: 'Ayodhya', sector: 'Government & PSU' },
  { name: 'Green Corridor Link Road', detail: 'Urban road corridor', location: 'Lucknow', sector: 'Government & PSU' },
  { name: 'Income Tax Training Centre', detail: 'Government institution', location: 'Lucknow', sector: 'Government & PSU' },
  { name: 'Aditya Constructions Pvt. Ltd.', detail: 'Associated with Ansal Golf City', location: 'Lucknow', sector: 'Real Estate' },
  { name: 'HIGHNESS Infra Pvt. Ltd.', detail: 'Summit Tower', location: 'Lucknow', sector: 'Real Estate' },
  { name: 'Phuhar Paradise Constructions Pvt. Ltd.', detail: 'Real estate', location: 'Lucknow', sector: 'Real Estate' },
  { name: 'Shanti Constructions & Real Estate', detail: 'Real estate', location: 'Banda', sector: 'Real Estate' },
  { name: 'New Millennium Public School', detail: 'Gomti Nagar', location: 'Lucknow', sector: 'Education' },
  { name: 'Modern Public School', detail: 'Aliganj', location: 'Lucknow', sector: 'Education' },
  { name: 'Jaipuriya School', detail: 'Shaheed Path', location: 'Lucknow', sector: 'Education' },
  { name: 'Ram Janki Mahavidyalaya', detail: 'Ainaniganj', location: 'Ayodhya', sector: 'Education' },
  { name: 'Jaipuriya Cricket Academy', detail: 'Para, Rajajipuram', location: 'Lucknow', sector: 'Sports' },
  { name: 'Dr. Izhar Multi Specialty Hospital', detail: 'Healthcare', location: 'Lucknow', sector: 'Healthcare' },
  { name: 'Saubhagya UN Hotel', detail: 'Hospitality', location: 'Lucknow', sector: 'Hospitality' },
];

export type Photo = { src: string; width: number; height: number; alt: string; caption: string };

const p = (name: string, width: number, height: number, alt: string, caption: string): Photo => ({
  src: `/photos/${name}.webp`, width, height, alt, caption,
});

export const photos = {
  highway: p('highway-median', 848, 1480, 'Flowering shrub median running down a divided highway', 'Highway median planting'),
  buddha: p('buddha-court', 1496, 920, 'Garden court with a fountain pond, ferns and a stone Buddha against a timber wall', 'Water court and softscape'),
  waterfall: p('waterfall-pond', 1878, 636, 'Rock waterfall feeding a pond beneath tropical planting', 'Aquatic pond and rock cascade'),
  modern: p('modern-garden', 1006, 534, 'Modern garden with built seating, planters and stepping stones', 'Hardscape and seating garden'),
  hpcl: p('hpcl-forecourt', 764, 312, 'Clipped hedge lettering HPCL in a planted forecourt island', 'HPCL forecourt planting'),
  plaza: p('plaza-aerial', 764, 476, 'Aerial view of a landscaped plaza with lawn panels and palms', 'Plaza and lawn panels'),
  median: p('road-median', 764, 476, 'City road median with date palms and flowering beds', 'City road median'),
  turf: p('turf-laying', 928, 928, 'Rolled turf being laid beside a paved edge', 'Turf laying'),
  golf: p('golf-green', 850, 534, 'Golfer on a broad green fairway', 'Sports grounds and fairways'),
  planter: p('raised-planter', 770, 448, 'Tiered stone raised planter with flowering shrubs', 'Raised stone planter'),
};

export type PhotoKey = keyof typeof photos;

export const gallery: PhotoKey[] = ['highway', 'buddha', 'hpcl', 'waterfall', 'plaza', 'modern', 'median', 'turf', 'golf', 'planter'];

export const principles = [
  { title: 'Customised design', body: 'Every plan is drawn for the site in front of us: its people, its use, its climate. Nothing is lifted from a catalogue.' },
  { title: 'Hi-quality materials', body: 'We hold a well-balanced relationship with the environment, and specify materials that add beauty and last.' },
  { title: 'Innovative planning', body: 'A reputation built on attention to detail. The landscaping plan comes first, which saves our clients time on the ground.' },
  { title: 'Professional maintenance', body: 'Our teams stay on after handover, working closely with you to keep the landscape as it was drawn.' },
];

export const process = [
  { key: 'Survey', title: 'We read the ground.', body: 'Our team visits the site, walks it with you and takes down what the place needs before a rupee is spent.' },
  { key: 'Plan', title: 'We draw it first.', body: 'Landscape plans are prepared before any work begins, so every level, path and bed is settled on paper.' },
  { key: 'Build', title: 'We build what we drew.', body: 'Engineers, project managers, supervisors and skilled workers carry out hardscape, softscape and water.' },
  { key: 'Maintain', title: 'We keep it alive.', body: 'Mowing, pruning, feeding and irrigation run on contract, during and well after the agreed period.' },
];

export const team = [
  { title: 'Landscape design engineers', body: 'Draw the plan and resolve the site.' },
  { title: 'Project managers', body: 'Hold scope, sequence and handover.' },
  { title: 'Supervisors', body: 'Run the work on the ground every day.' },
  { title: 'Skilled workers', body: 'Build, plant and maintain.' },
];

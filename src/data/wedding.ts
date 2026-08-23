export type Person = {
  name: string;
  shortName: string;
  role: string;
  parents?: [string, string];
  place?: string;
};

export const couple: { groom: Person; bride: Person; monogram: string; dateLabel: string; venueLabel: string } = {
  groom: {
    name: 'Sanu',
    shortName: 'Sanu',
    role: 'The Groom'
  },
  bride: {
    name: 'Husna',
    shortName: 'Husna',
    role: 'The Bride'
  },
  monogram: 'S & H',
  dateLabel: '04 · 10 · 2026',
  venueLabel: 'Mayinkottu Thazham House · Aanakuzhikkara, Kuttikkattor'
};

export type EventItem = {
  id: string;
  overline: string;
  title: string;
  icon: 'mosque' | 'dinner';
  date: string;
  time: string;
  venue: string[];
  mapQuery: string;
};

export const events: EventItem[] = [
{
  id: 'reception',
  overline: 'Wedding Reception',
  title: 'Reception',
  icon: 'dinner',
  date: 'Sunday, 04 October 2026',
  time: '12:30 PM – 5:00 PM',
  venue: ['Mayinkottu Thazham House', 'Aanakuzhikkara, Kuttikkattor'],
  mapQuery: 'Sanu Charly, Poovattuparamba, Kerala 673008'
}];


export type VenueItem = {
  id: string;
  title: string;
  subtitle: string;
  icon: 'mosque' | 'home';
  address: string;
  mapQuery: string;
};

export const venues: VenueItem[] = [
{
  id: 'reception-venue',
  title: 'Wedding Reception',
  subtitle: 'Sunday, 04 October 2026',
  icon: 'home',
  address: 'Mayinkottu Thazham House, Aanakuzhikkara, Kuttikkattor',
  mapQuery: 'Sanu Charly, Poovattuparamba, Kerala 673008'
}];


export const sections = [
{ id: 'hero', label: 'Invitation' },
{ id: 'bismillah', label: 'Bismillah' },
{ id: 'couple', label: 'Groom & Bride' },
{ id: 'celebrations', label: 'Celebrations' },
{ id: 'venues', label: 'Venues' },
{ id: 'thankyou', label: 'Thank You' }];
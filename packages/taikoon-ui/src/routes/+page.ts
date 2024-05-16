import { redirect } from '@sveltejs/kit';

const blacklistedCountries = [
  'AF', // Afghanistan (AF)
  'BY', // Belarus (BY)
  'MM', // Burma/Myanmar (MM)
  'CF', // Central African Republic (CF)
  'CN', // China (CN)
  'CU', // Cuba (CU)
  'CD', // Democratic Republic of the Congo (CD)
  'ET', // Ethiopia (ET)
  'IR', // Iran (IR)
  'IQ', // Iraq (IQ)
  'LB', // Lebanon (LB)
  'LY', // Libya (LY)
  'ML', // Mali (ML)
  'NI', // Nicaragua (NI)
  'KP', // North Korea (KP)
  'RU', // Russia (RU)
  'SO', // Somalia (SO)
  'SS', // South Sudan (SS)
  'SD', // Sudan (SD)
  'SY', // Syria (SY)
  'VE', // Venezuela (VE)
];

export function load(event: any) {
  try {
    console.warn('PAGE.ts', 'onLoad', event);
    const country = event.request.headers.get('x-vercel-ip-country') ?? 'dev';
    console.warn('PAGE.ts', 'page load event', {
      country,
      event,
    });
    if (blacklistedCountries.includes(country)) {
      // revoke access
      redirect(302, '/blocked');
    }
    return {};
  } catch (error) {
    console.error("Couldn't determine IP country", error);
  }
}

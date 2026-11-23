export function getClientLogo(client) {
  if (client?.logoUrl && client.logoUrl.trim() !== '') {
    return client.logoUrl;
  }
  const name = (client?.name || '').toLowerCase();
  if (name.includes('christiva')) return '/clients/christiva.svg';
  if (name.includes('leaf')) return '/clients/ileaf.svg';
  if (name.includes('kernel')) return '/clients/kernelmasters.svg';
  if (name.includes('golden')) return '/clients/goldeneye.svg';
  if (name.includes('durga')) return '/clients/sridurga.svg';
  if (name.includes('swift')) return '/clients/swiftdigitals.svg';
  if (name.includes('newline')) return '/clients/newline.svg';
  if (name.includes('tradition')) return '/clients/traditions.svg';
  if (name.includes('ekranfix')) return '/clients/ekranfix.svg';
  return null;
}


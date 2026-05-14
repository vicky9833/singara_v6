// TODO: Wire real Mapbox API when location features are implemented
console.warn('[Singara] mapbox.ts is a stub — wire real token before going live')

export async function geocode(_query: string) {
  return { lat: 12.9716, lng: 77.5946 }
}

export async function reverseGeocode(_lat: number, _lng: number) {
  return '1st Cross, Indiranagar, Bengaluru, Karnataka 560038'
}

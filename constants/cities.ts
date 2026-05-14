export const CITIES = [
  { id: 'bengaluru', name: 'Bengaluru', state: 'Karnataka' },
  { id: 'mumbai', name: 'Mumbai', state: 'Maharashtra' },
  { id: 'delhi', name: 'Delhi', state: 'Delhi' },
  { id: 'hyderabad', name: 'Hyderabad', state: 'Telangana' },
  { id: 'chennai', name: 'Chennai', state: 'Tamil Nadu' },
  { id: 'pune', name: 'Pune', state: 'Maharashtra' },
  { id: 'kolkata', name: 'Kolkata', state: 'West Bengal' },
  { id: 'ahmedabad', name: 'Ahmedabad', state: 'Gujarat' },
] as const

export type CityId = typeof CITIES[number]['id']

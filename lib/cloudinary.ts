// TODO: Wire real Cloudinary SDK when media upload is implemented
console.warn('[Singara] cloudinary.ts is a stub — wire real SDK before going live')

export async function uploadImage(_file: File) {
  return { url: 'https://res.cloudinary.com/singara/mock/image.jpg', publicId: 'singara/mock' }
}

export function getImageUrl(publicId: string, _transforms?: string) {
  return `https://res.cloudinary.com/singara/image/upload/${publicId}`
}

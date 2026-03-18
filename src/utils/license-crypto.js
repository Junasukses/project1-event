/**
 * SnapDesk License Crypto Utility
 *
 * Encrypts/decrypts license data using AES-256-GCM via Web Crypto API.
 * The .lic file format:
 *   [16 bytes IV] + [encrypted ciphertext + GCM auth tag]
 *
 * The hardware_id is a SHA-256 hash of: cpuId + "|" + macAddress + "|" + diskSerial
 */

// Shared secret key — change this to your own secret in production!
const LICENSE_SECRET = 'SnapDesk-LicenseKey-Secret-2026!!'

/**
 * Generate hardware_id (SHA-256 hash) from hardware components.
 * @param {string} cpuId
 * @param {string} macAddress
 * @param {string} diskSerial
 * @returns {Promise<string>} hex-encoded SHA-256 hash
 */
export async function generateHardwareId(cpuId, macAddress, diskSerial) {
  const raw = [cpuId, macAddress, diskSerial].join('|')
  const buf = new TextEncoder().encode(raw)
  const hashBuf = await crypto.subtle.digest('SHA-256', buf)
  return Array.from(new Uint8Array(hashBuf))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
}

/**
 * Derive an AES-256-GCM key from the secret string.
 * Uses SHA-256 of the secret as the raw key material.
 * @returns {Promise<CryptoKey>}
 */
async function deriveKey() {
  const raw = new TextEncoder().encode(LICENSE_SECRET)
  const keyMaterial = await crypto.subtle.digest('SHA-256', raw)
  return crypto.subtle.importKey('raw', keyMaterial, { name: 'AES-GCM' }, false, [
    'encrypt',
    'decrypt',
  ])
}

/**
 * Encrypt a JSON object into a binary ArrayBuffer (.lic content).
 * Format: [16-byte IV] + [AES-GCM ciphertext]
 *
 * @param {object} data — the license payload, e.g.
 *   { user_id, email, hardware_id, max_client }
 * @returns {Promise<ArrayBuffer>}
 */
export async function encryptLicense(data) {
  const key = await deriveKey()
  const iv = crypto.getRandomValues(new Uint8Array(16))
  const plaintext = new TextEncoder().encode(JSON.stringify(data))

  const ciphertext = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, plaintext)

  // Combine: IV + ciphertext
  const result = new Uint8Array(iv.length + ciphertext.byteLength)
  result.set(iv, 0)
  result.set(new Uint8Array(ciphertext), iv.length)
  return result.buffer
}

/**
 * Decrypt a .lic binary ArrayBuffer back to the original JSON object.
 *
 * @param {ArrayBuffer} buffer — the .lic file content
 * @returns {Promise<object>} the decrypted license payload
 */
export async function decryptLicense(buffer) {
  const key = await deriveKey()
  const arr = new Uint8Array(buffer)
  const iv = arr.slice(0, 16)
  const ciphertext = arr.slice(16)

  const plainBuf = await crypto.subtle.decrypt({ name: 'AES-GCM', iv }, key, ciphertext)

  return JSON.parse(new TextDecoder().decode(plainBuf))
}

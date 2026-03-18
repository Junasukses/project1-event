/**
 * Re-encrypt existing .lic file with device info added.
 *
 * Usage: node re-encrypt-lic.cjs <file.lic> <cpuId> <macAddress> <diskSerial>
 * Example: node re-encrypt-lic.cjs SnapDesk-SDK-MMVIPVZO.lic CPU123 00:AA:BB:CC:DD:EE DISK-SER-001
 *
 * If no hardware args given, device fields default to empty strings.
 */

const fs = require('fs')
const path = require('path')
const crypto = require('crypto')

const LICENSE_SECRET = 'SnapDesk-LicenseKey-Secret-2026!!'

function deriveKey() {
  return crypto.createHash('sha256').update(LICENSE_SECRET).digest()
}

function decryptLicense(buffer) {
  const key = deriveKey()
  const iv = buffer.slice(0, 16)
  const encrypted = buffer.slice(16)
  const authTag = encrypted.slice(encrypted.length - 16)
  const ciphertext = encrypted.slice(0, encrypted.length - 16)
  const decipher = crypto.createDecipheriv('aes-256-gcm', key, iv)
  decipher.setAuthTag(authTag)
  let plaintext = decipher.update(ciphertext)
  plaintext = Buffer.concat([plaintext, decipher.final()])
  return JSON.parse(plaintext.toString('utf-8'))
}

function encryptLicense(data) {
  const key = deriveKey()
  const iv = crypto.randomBytes(16)
  const plaintext = Buffer.from(JSON.stringify(data), 'utf-8')
  const cipher = crypto.createCipheriv('aes-256-gcm', key, iv)
  const encrypted = Buffer.concat([cipher.update(plaintext), cipher.final()])
  const authTag = cipher.getAuthTag()
  return Buffer.concat([iv, encrypted, authTag])
}

// ─── CLI ─────────────────────────────────────────

const args = process.argv.slice(2)
if (args.length === 0) {
  console.log('Usage: node re-encrypt-lic.cjs <file.lic> [cpuId] [macAddress] [diskSerial]')
  process.exit(0)
}

const filePath = path.resolve(args[0])
if (!fs.existsSync(filePath)) {
  console.error(JSON.stringify({ error: 'File not found', path: filePath }))
  process.exit(1)
}

const buffer = fs.readFileSync(filePath)
const data = decryptLicense(buffer)

// Add device field with raw hardware info
data.device = {
  cpu_id: args[1] || '',
  mac_address: args[2] || '',
  disk_serial: args[3] || '',
}

// Re-encrypt and overwrite file
const newBuffer = encryptLicense(data)
fs.writeFileSync(filePath, newBuffer)

console.log(JSON.stringify(data, null, 2))
console.log(`\n✅ File re-encrypted: ${path.basename(filePath)} (${newBuffer.length} bytes)`)

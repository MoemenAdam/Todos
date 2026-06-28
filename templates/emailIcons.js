import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const iconsDir = path.join(__dirname, '../assets/email-icons');

export const EMAIL_ICON_CIDS = {
  LOGO_CHECK: 'icon-logo-check@assistant',
  CHECK_LARGE: 'icon-check-large@assistant',
  SHIELD: 'icon-shield@assistant',
  MONITOR: 'icon-monitor@assistant',
  BELL: 'icon-bell@assistant',
  EMAIL: 'icon-email@assistant',
  LOCK: 'icon-lock@assistant',
  CLOCK: 'icon-clock@assistant',
  WARNING: 'icon-warning@assistant',
};

const iconFiles = {
  [EMAIL_ICON_CIDS.LOGO_CHECK]: 'logo-check.png',
  [EMAIL_ICON_CIDS.CHECK_LARGE]: 'check-large.png',
  [EMAIL_ICON_CIDS.SHIELD]: 'shield.png',
  [EMAIL_ICON_CIDS.MONITOR]: 'monitor.png',
  [EMAIL_ICON_CIDS.BELL]: 'bell.png',
  [EMAIL_ICON_CIDS.EMAIL]: 'email.png',
  [EMAIL_ICON_CIDS.LOCK]: 'lock.png',
  [EMAIL_ICON_CIDS.CLOCK]: 'clock.png',
  [EMAIL_ICON_CIDS.WARNING]: 'warning.png',
};

export const emailIconAttachments = Object.entries(iconFiles).map(([cid, filename]) => ({
  filename,
  path: path.join(iconsDir, filename),
  cid,
}));

export const iconImg = (cid, width, height, extraStyle = '') =>
  `<img src="cid:${cid}" width="${width}" height="${height}" alt="" style="display:block;${extraStyle}" />`;

export const iconImgInline = (cid, width, height, extraStyle = '') =>
  `<img src="cid:${cid}" width="${width}" height="${height}" alt="" style="display:inline-block;vertical-align:middle;${extraStyle}" />`;

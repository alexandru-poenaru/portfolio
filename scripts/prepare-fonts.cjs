const fs = require('node:fs/promises');
const path = require('node:path');
const { createHash } = require('node:crypto');

// Obtain Satoshi directly from its publisher for this site's permitted self-hosting.
// The proprietary font binaries must not be redistributed in the Git repository.
const directory = path.join(__dirname, '../src/assets/fonts');
const fonts = [
  [400, 'TTX2Z3BF3P6Y5BQT3IV2VNOK6FL22KUT/7QYRJOI3JIMYHGY6CH7SOIFRQLZOLNJ6/KFIAZD4RUMEZIYV6FQ3T3GP5PDBDB6JY', '50dca57f0b77918e0fb7dac998c3f5ef6b0c2a29657da97658a04f98ac532fc5'],
  [500, 'P2LQKHE6KA6ZP4AAGN72KDWMHH6ZH3TA/ZC32TK2P7FPS5GFTL46EU6KQJA24ZYDB/7AHDUZ4A7LFLVFUIFSARGIWCRQJHISQP', 'af02a72246f53ad49c44a591921edbd39ec8258a03d8cc2e0532aa1e497e85b4'],
  [700, 'LAFFD4SDUCDVQEXFPDC7C53EQ4ZELWQI/PXCT3G6LO6ICM5I3NTYENYPWJAECAWDD/GHM6WVH6MILNYOOCXHXB5GTSGNTMGXZR', '353a7fbfb4475f0c31470a7449226006cb64211c71055ca9db860a8acdaa9f68'],
  [900, 'NHPGVFYUXYXE33DZ75OIT4JFGHITX5PE/PSUTMASCDJTVPERDYJZPN23BVUFUCQIF/J64QX5IPOHK56I2KYUNBQ5M2XWZEYKYX', 'bd11b5820231420e78046c611aebdd628dc17ad67788258ffe3fe902253efd3b'],
];
const hash = bytes => createHash('sha256').update(bytes).digest('hex');

async function prepare() {
  await fs.mkdir(directory, { recursive: true });
  await Promise.all(fonts.map(async ([weight, source, checksum]) => {
    const target = path.join(directory, `Satoshi-${weight}.woff2`);
    if (!process.argv.includes('--refresh')) {
      try {
        if (hash(await fs.readFile(target)) === checksum) return;
      } catch (error) {
        if (error.code !== 'ENOENT') throw error;
      }
    }
    const response = await fetch(`https://cdn.fontshare.com/wf/${source}.woff2`, { signal: AbortSignal.timeout(30000) });
    if (!response.ok) throw new Error(`Fontshare returned HTTP ${response.status} for Satoshi ${weight}.`);
    const bytes = Buffer.from(await response.arrayBuffer());
    if (hash(bytes) !== checksum) throw new Error(`Satoshi ${weight} differs from the verified official font. Review the publisher's update before using it.`);
    await fs.writeFile(target, bytes);
    console.log(`Downloaded Satoshi ${weight} directly from Fontshare.`);
  }));
}

prepare().catch(error => {
  console.error('Could not prepare the Satoshi fonts:', error.message);
  console.error('Internet access to cdn.fontshare.com is required on a fresh checkout.');
  process.exitCode = 1;
});

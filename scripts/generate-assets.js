import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const outDir = path.resolve('static/assets/images');
if (!fs.existsSync(outDir)) {
	fs.mkdirSync(outDir, { recursive: true });
}

// Crisp SVG of Panda wearing astronaut helmet
const pandaAstronautSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <!-- Outer helmet shadow / glow ring -->
  <circle cx="256" cy="246" r="210" fill="#000000" stroke="#333333" stroke-width="4"/>
  
  <!-- Outer helmet shell -->
  <circle cx="256" cy="244" r="200" fill="#FAFAFA" stroke="#000000" stroke-width="12"/>

  <!-- Helmet ear domes -->
  <circle cx="110" cy="116" r="54" fill="#000000" stroke="#FAFAFA" stroke-width="8"/>
  <circle cx="402" cy="116" r="54" fill="#000000" stroke="#FAFAFA" stroke-width="8"/>
  <circle cx="110" cy="116" r="30" fill="#333333"/>
  <circle cx="402" cy="116" r="30" fill="#333333"/>

  <!-- Suit Collar / Base -->
  <path d="M120 420 Q256 460 392 420 L420 500 L92 500 Z" fill="#000000"/>
  <rect x="220" y="440" width="72" height="18" fill="#4682B4" rx="0"/>
  <circle cx="180" cy="450" r="8" fill="#39FF14"/>
  <circle cx="332" cy="450" r="8" fill="#B76E79"/>
  <line x1="140" y1="418" x2="372" y2="418" stroke="#FAFAFA" stroke-width="6"/>

  <!-- Visor Ring Outer -->
  <ellipse cx="256" cy="244" rx="160" ry="144" fill="#0F1115" stroke="#000000" stroke-width="10"/>

  <!-- Visor Glass -->
  <ellipse cx="256" cy="244" rx="150" ry="134" fill="#181A20"/>

  <!-- Inside Visor: Panda Head -->
  <!-- Panda White Head Base -->
  <ellipse cx="256" cy="254" rx="124" ry="110" fill="#FFFFFF"/>

  <!-- Panda Black Ears (visible inside/behind) -->
  <ellipse cx="160" cy="170" rx="32" ry="28" fill="#000000" transform="rotate(-15 160 170)"/>
  <ellipse cx="352" cy="170" rx="32" ry="28" fill="#000000" transform="rotate(15 352 170)"/>

  <!-- Panda Black Eye Patches -->
  <ellipse cx="204" cy="246" rx="32" ry="40" fill="#000000" transform="rotate(-18 204 246)"/>
  <ellipse cx="308" cy="246" rx="32" ry="40" fill="#000000" transform="rotate(18 308 246)"/>

  <!-- Panda Eyes (White twinkle dots) -->
  <circle cx="210" cy="242" r="10" fill="#FFFFFF"/>
  <circle cx="213" cy="239" r="4" fill="#000000"/>
  <circle cx="302" cy="242" r="10" fill="#FFFFFF"/>
  <circle cx="299" cy="239" r="4" fill="#000000"/>

  <!-- Panda Cute Nose & Mouth -->
  <path d="M242 276 Q256 268 270 276 Q256 292 242 276 Z" fill="#000000"/>
  <path d="M256 286 L256 298" stroke="#000000" stroke-width="4" stroke-linecap="round"/>
  <path d="M240 298 Q256 312 272 298" stroke="#000000" stroke-width="4" fill="none" stroke-linecap="round"/>

  <!-- Cheeks -->
  <ellipse cx="178" cy="286" rx="14" ry="8" fill="#B76E79" opacity="0.35"/>
  <ellipse cx="334" cy="286" rx="14" ry="8" fill="#B76E79" opacity="0.35"/>

  <!-- Astronaut Visor Reflection Arc (Clean high-tech curved highlights) -->
  <path d="M140 210 Q256 140 372 210 Q256 168 140 210 Z" fill="#FFFFFF" opacity="0.22"/>
  <path d="M160 226 Q256 168 352 226 Q256 190 160 226 Z" fill="#FFFFFF" opacity="0.12"/>
  <ellipse cx="160" cy="190" rx="18" ry="8" fill="#FFFFFF" opacity="0.4" transform="rotate(-30 160 190)"/>
</svg>
`;

async function build() {
	const svgBuffer = Buffer.from(pandaAstronautSvg);

	// 512x512 logo
	await sharp(svgBuffer).resize(512, 512).png().toFile(path.join(outDir, 'panda-astronaut.png'));
	console.log('Created panda-astronaut.png (512x512)');

	// 180x180 apple-touch-icon
	await sharp(svgBuffer)
		.resize(180, 180)
		.png()
		.toFile(path.join(outDir, 'panda-astronaut-180x180.png'));
	console.log('Created panda-astronaut-180x180.png (180x180)');

	// 32x32 favicon
	await sharp(svgBuffer).resize(32, 32).png().toFile(path.resolve('static/favicon.png'));
	console.log('Created static/favicon.png');

	// Copy or resize project thumbnails
	const staticProjectsDir = path.resolve('static/projects');
	const projectMapping = [
		{ src: 'echora-1.png', dest: 'project-1-thumb.png' },
		{ src: 'kaeps-1.png', dest: 'project-2-thumb.png' },
		{ src: 'mika-1.png', dest: 'project-3-thumb.png' },
		{ src: 'streak-1.png', dest: 'project-4-thumb.png' }
	];

	for (const item of projectMapping) {
		const srcPath = path.join(staticProjectsDir, item.src);
		const destPath = path.join(outDir, item.dest);
		if (fs.existsSync(srcPath)) {
			await sharp(srcPath).resize(240, 240, { fit: 'cover' }).png().toFile(destPath);
			console.log(`Created ${item.dest} from ${item.src}`);
		} else {
			console.warn(`Could not find ${srcPath}`);
		}
	}
}

build().catch((err) => {
	console.error(err);
	process.exit(1);
});

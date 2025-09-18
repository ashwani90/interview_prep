// scripts/generate-rss.js
import { generateRSSFeed, generateAllFeeds } from '../lib/rss';

async function main() {
  try {
    console.log('🚀 Generating RSS feed...');
    await generateAllFeeds();
    console.log('✅ All feeds generated successfully!');
  } catch (error) {
    console.error('❌ Error generating RSS feed:', error);
    process.exit(1);
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export default main;
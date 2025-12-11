/**
 * Example Usage of WordPress Core Blocks
 * This file demonstrates how to use CoreParagraph, CoreHeading, and CoreQuote
 * components in a typical blog post or page layout.
 *
 * NOTE: This is an example file for demonstration purposes.
 * In production, these blocks would be rendered dynamically from WordPress content.
 */

import { CoreHeading } from './CoreHeading';
import { CoreParagraph } from './CoreParagraph';
import { CoreQuote } from './CoreQuote';

export function CoreBlocksExample() {
  return (
    <article className="max-w-3xl mx-auto px-4 py-8">
      {/* Main Heading with Anchor Link */}
      <CoreHeading
       
        content="Building Modern WordPress Sites with FlatWP"
        level={1}
        align="left"
      />

      {/* Introduction Paragraph with Drop Cap */}
      <CoreParagraph
       
        content="<p>FlatWP revolutionizes the way developers build WordPress sites by combining WordPress's powerful content management with Next.js's advanced rendering strategies.</p>"
        fontSize="large"
        dropCap={true}
      />

      {/* Section Heading */}
      <CoreHeading
       
        content="Why Headless WordPress?"
        level={2}
        align="left"
      />

      {/* Regular Paragraph */}
      <CoreParagraph
       
        content="<p>Traditional WordPress themes can be slow, difficult to customize, and challenging to maintain. A headless approach separates content management from presentation, giving you the best of both worlds.</p>"
      />

      {/* Quote with Citation - Default Style */}
      <CoreQuote
       
        value="<p>The best way to predict the future is to invent it.</p>"
        citation="Alan Kay"
        style="default"
      />

      {/* Regular Paragraph */}
      <CoreParagraph
       
        content="<p>With FlatWP, you get <strong>lightning-fast performance</strong>, <em>modern developer experience</em>, and the flexibility to build exactly what your project needs.</p>"
        fontSize="medium"
      />

      {/* Subsection Heading */}
      <CoreHeading
       
        content="Key Features"
        level={3}
        align="left"
      />

      {/* Feature List as Paragraphs */}
      <CoreParagraph
       
        content="<p>FlatWP includes ISR with on-demand revalidation, ensuring your content stays fresh without constant rebuilds. The static page generation delivers exceptional performance for pages that don't change frequently.</p>"
        fontSize="medium"
      />

      {/* Large Quote - Centered */}
      <CoreQuote
       
        value="<p>Design is not just what it looks like and feels like. Design is how it works.</p>"
        citation="Steve Jobs"
        style="large"
        align="center"
      />

      {/* Another Section */}
      <CoreHeading
       
        content="Getting Started"
        level={2}
        align="left"
      />

      <CoreParagraph
       
        content="<p>Installing FlatWP is straightforward. You can use our CLI tool to scaffold a new project in minutes, or integrate it into an existing Next.js application.</p>"
      />

      {/* Small Text Paragraph */}
      <CoreParagraph
       
        content="<p><small>Note: FlatWP requires Node.js 18+ and WordPress 6.4+ with WPGraphQL installed.</small></p>"
        fontSize="small"
        align="center"
      />

      {/* Subsection with Custom Anchor */}
      <CoreHeading
       
        content="Performance Considerations"
        level={3}
        align="left"
        anchor="performance"
      />

      {/* Right-Aligned Paragraph */}
      <CoreParagraph
       
        content="<p>Every millisecond counts. FlatWP is optimized for Core Web Vitals with intelligent image optimization, code splitting, and efficient caching strategies.</p>"
        align="right"
      />

      {/* Quote without Citation */}
      <CoreQuote
       
        value="<p>Performance is not just about speed—it's about creating a delightful user experience that keeps visitors engaged and coming back.</p>"
        style="default"
      />

      {/* Final Paragraph with X-Large Font */}
      <CoreParagraph
       
        content="<p>Ready to build something amazing? Get started with FlatWP today.</p>"
        fontSize="x-large"
        align="center"
      />
    </article>
  );
}

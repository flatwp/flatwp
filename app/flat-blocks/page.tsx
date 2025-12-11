/**
 * Flat-Blocks Demo Page
 * Showcases all core blocks with live examples and documentation
 */

import {
  CoreHeading,
  CoreParagraph,
  CoreQuote,
  CoreCode,
  CoreCodeTabs,
  CoreImage,
  CoreButton,
  CoreButtons,
  CoreTable,
} from '@/components/blocks/core';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export const metadata = {
  title: 'Flat-Blocks | FlatWP Core Blocks',
  description: 'Interactive showcase of all FlatWP core blocks with examples and documentation',
};

export default function FlatBlocksPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
      {/* Hero Section */}
      <section className="border-b bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4" variant="secondary">
              12 Core Blocks
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              Flat-Blocks
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Production-ready WordPress blocks with Shadcn/Tailwind styling.
              Beautiful, responsive, and accessible by default.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <CoreButton
                text="View on GitHub"
                url="https://github.com/flatwp/flatwp"
                variant="default"
                size="lg"
              />
              <CoreButton
                text="Documentation"
                url="#blocks"
                variant="outline"
                size="lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="p-6">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-lg font-semibold mb-2">Performance First</h3>
              <p className="text-sm text-muted-foreground">
                92% of blocks are Server Components with zero client JavaScript
              </p>
            </Card>
            <Card className="p-6">
              <div className="text-4xl mb-4">🎨</div>
              <h3 className="text-lg font-semibold mb-2">Beautiful Design</h3>
              <p className="text-sm text-muted-foreground">
                Shadcn UI components with Tailwind CSS for modern aesthetics
              </p>
            </Card>
            <Card className="p-6">
              <div className="text-4xl mb-4">♿</div>
              <h3 className="text-lg font-semibold mb-2">Fully Accessible</h3>
              <p className="text-sm text-muted-foreground">
                WCAG 2.1 AA compliant with semantic HTML and ARIA labels
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Blocks Showcase */}
      <section id="blocks" className="py-16">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Block Library</h2>
            <p className="text-muted-foreground">
              12 core blocks ready to use in your Next.js + WordPress projects
            </p>
          </div>

          <div className="space-y-24">
            {/* Content Blocks */}
            <BlockSection
              category="Content Blocks"
              description="Typography and text formatting blocks for rich content"
              badge="3 Blocks"
            >
              {/* Paragraph Block */}
              <BlockDemo
                title="Paragraph"
                description="Responsive typography block with font sizing and drop cap support"
                props={[
                  { name: 'content', type: 'string', description: 'HTML content' },
                  { name: 'fontSize', type: "'small' | 'normal' | 'medium' | 'large' | 'x-large'", description: 'Font size preset', optional: true },
                  { name: 'dropCap', type: 'boolean', description: 'Enable drop cap on first letter', optional: true },
                  { name: 'align', type: "'left' | 'center' | 'right' | 'justify'", description: 'Text alignment', optional: true },
                ]}
                example={`<CoreParagraph
  content="<p>Beautiful typography with proper line height and responsive sizing. The paragraph block adapts to different screen sizes automatically.</p>"
  fontSize="large"
  dropCap={true}
/>`}
              >
                <CoreParagraph
                  content="<p>Beautiful typography with proper line height and responsive sizing. The paragraph block adapts to different screen sizes automatically, ensuring readability on all devices. This example shows a large font size with a drop cap on the first letter.</p>"
                  fontSize="large"
                  dropCap={true}
                />
              </BlockDemo>

              {/* Heading Block */}
              <BlockDemo
                title="Heading"
                description="H1-H6 headings with auto-generated anchor links for easy navigation"
                props={[
                  { name: 'content', type: 'string', description: 'Heading text' },
                  { name: 'level', type: '1 | 2 | 3 | 4 | 5 | 6', description: 'Heading level (h1-h6)' },
                  { name: 'anchor', type: 'string', description: 'Custom anchor ID', optional: true },
                  { name: 'textAlign', type: "'left' | 'center' | 'right'", description: 'Text alignment', optional: true },
                ]}
                example={`<CoreHeading
  content="Introduction"
  level={2}
  anchor="intro"
/>`}
              >
                <CoreHeading
                  content="This is a Level 2 Heading"
                  level={2}
                />
                <CoreParagraph
                  content="<p>Hover over the heading above to see the anchor link. The anchor is auto-generated from the heading text for easy linking.</p>"
                />
              </BlockDemo>

              {/* Quote Block */}
              <BlockDemo
                title="Quote"
                description="Beautiful blockquote with optional citation and two style variants"
                props={[
                  { name: 'value', type: 'string', description: 'Quote content (HTML)' },
                  { name: 'citation', type: 'string', description: 'Author or source', optional: true },
                  { name: 'style', type: "'default' | 'large'", description: 'Visual style variant', optional: true },
                  { name: 'align', type: "'left' | 'center' | 'right'", description: 'Text alignment', optional: true },
                ]}
                example={`<CoreQuote
  value="<p>The only way to do great work is to love what you do.</p>"
  citation="Steve Jobs"
  style="large"
/>`}
              >
                <CoreQuote
                  value="<p>The only way to do great work is to love what you do. If you haven't found it yet, keep looking. Don't settle.</p>"
                  citation="Steve Jobs"
                  style="large"
                />
              </BlockDemo>
            </BlockSection>

            {/* Code Blocks */}
            <BlockSection
              category="Code Blocks"
              description="Syntax-highlighted code display with advanced features"
              badge="2 Blocks"
            >
              {/* Code Block */}
              <BlockDemo
                title="Code"
                description="Syntax highlighting with Shiki, copy button, and line numbers"
                props={[
                  { name: 'content', type: 'string', description: 'Code content' },
                  { name: 'language', type: 'string', description: 'Programming language (50+ supported)', optional: true },
                  { name: 'fileName', type: 'string', description: 'Optional filename header', optional: true },
                  { name: 'showLineNumbers', type: 'boolean', description: 'Show line numbers', optional: true },
                  { name: 'showCopyButton', type: 'boolean', description: 'Show copy button', optional: true },
                  { name: 'highlightLines', type: 'string', description: 'Lines to highlight (e.g., "1,3-5")', optional: true },
                ]}
                example={`<CoreCode
  code="const greeting = 'Hello World';"
  language="typescript"
  filename="example.ts"
  showLineNumbers={true}
/>`}
              >
                <CoreCode
                  code={`import { CoreParagraph, CoreHeading } from '@/components/blocks/core';

export default function MyPage() {
  return (
    <article>
      <CoreHeading
        content="Welcome"
        level={1}
      />
      <CoreParagraph
        content="<p>Hello World</p>"
      />
    </article>
  );
}`}
                  language="typescript"
                  filename="page.tsx"
                  showLineNumbers={true}
                />
              </BlockDemo>

              {/* Code Tabs Block */}
              <BlockDemo
                title="Code Tabs"
                description="Tabbed code blocks for showing multiple language examples"
                props={[
                  { name: 'tabs', type: 'Array<{label: string; language: string; content: string}>', description: 'Array of code tabs' },
                  { name: 'showLineNumbers', type: 'boolean', description: 'Show line numbers', optional: true },
                  { name: 'showCopyButton', type: 'boolean', description: 'Show copy button', optional: true },
                ]}
                example={`<CoreCodeTabs
  tabs={[
    { label: 'TypeScript', language: 'typescript', code: tsCode },
    { label: 'JavaScript', language: 'javascript', code: jsCode }
  ]}
/>`}
              >
                <CoreCodeTabs
                  tabs={[
                    {
                      label: 'TypeScript',
                      language: 'typescript',
                      code: `interface BlockProps {
  blockName: string;
  content: string;
}

function MyBlock({ blockName, content }: BlockProps) {
  return <div>{content}</div>;
}`,
                    },
                    {
                      label: 'JavaScript',
                      language: 'javascript',
                      code: `function MyBlock({ blockName, content }) {
  return <div>{content}</div>;
}`,
                    },
                    {
                      label: 'Python',
                      language: 'python',
                      code: `def my_block(block_name: str, content: str):
    return f"<div>{content}</div>"`,
                    },
                  ]}
                  showLineNumbers={true}
                />
              </BlockDemo>
            </BlockSection>

            {/* Media Blocks */}
            <BlockSection
              category="Media Blocks"
              description="Optimized image display and call-to-action buttons"
              badge="3 Blocks"
            >
              {/* Image Block */}
              <BlockDemo
                title="Image"
                description="Optimized images with next/image, captions, and responsive sizing"
                props={[
                  { name: 'url', type: 'string', description: 'Image URL' },
                  { name: 'alt', type: 'string', description: 'Alt text for accessibility' },
                  { name: 'caption', type: 'string', description: 'Image caption', optional: true },
                  { name: 'width', type: 'number', description: 'Image width in pixels', optional: true },
                  { name: 'height', type: 'number', description: 'Image height in pixels', optional: true },
                  { name: 'borderRadius', type: "'none' | 'sm' | 'md' | 'lg' | 'full'", description: 'Border radius size', optional: true },
                ]}
                example={`<CoreImage
  url="/images/hero.jpg"
  alt="Hero image"
  caption="Beautiful landscape"
  borderRadius="md"
/>`}
              >
                <CoreImage
                  url="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&h=600&fit=crop"
                  alt="Abstract colorful gradient background"
                  caption="Images are automatically optimized with Next.js Image component"
                  width={1200}
                  height={600}
                  align="wide"
                  borderRadius="md"
                />
              </BlockDemo>

              {/* Button Block */}
              <BlockDemo
                title="Button"
                description="Call-to-action buttons with Shadcn UI variants and sizes"
                props={[
                  { name: 'text', type: 'string', description: 'Button text' },
                  { name: 'url', type: 'string', description: 'Link URL' },
                  { name: 'variant', type: "'default' | 'secondary' | 'outline' | 'ghost' | 'link' | 'destructive'", description: 'Button style', optional: true },
                  { name: 'size', type: "'sm' | 'default' | 'lg'", description: 'Button size', optional: true },
                  { name: 'width', type: "'auto' | 'full'", description: 'Button width', optional: true },
                ]}
                example={`<CoreButton
  text="Get Started"
  url="/docs"
  variant="default"
  size="lg"
/>`}
              >
                <div className="flex flex-wrap gap-4">
                  <CoreButton
                    text="Default"
                    url="#"
                    variant="default"
                  />
                  <CoreButton
                    text="Secondary"
                    url="#"
                    variant="secondary"
                  />
                  <CoreButton
                    text="Outline"
                    url="#"
                    variant="outline"
                  />
                  <CoreButton
                    text="Ghost"
                    url="#"
                    variant="ghost"
                  />
                  <CoreButton
                    text="Link"
                    url="#"
                    variant="link"
                  />
                </div>
              </BlockDemo>

              {/* Buttons Block */}
              <BlockDemo
                title="Buttons (Container)"
                description="Container for multiple buttons with layout and spacing control"
                props={[
                  { name: 'layout', type: "'horizontal' | 'vertical'", description: 'Button layout direction', optional: true },
                  { name: 'align', type: "'left' | 'center' | 'right'", description: 'Horizontal alignment', optional: true },
                ]}
                example={`<CoreButtons
  layout="horizontal"
  align="center"
  buttons={[
    { text: "Primary", url: "#", variant: "default" },
    { text: "Secondary", url: "#", variant: "outline" }
  ]}
/>`}
              >
                <CoreButtons
                  layout="horizontal"
                  align="center"
                  buttons={[
                    { text: "Primary Action", url: "#", variant: "default", size: "lg" },
                    { text: "Secondary", url: "#", variant: "outline", size: "lg" }
                  ]}
                />
              </BlockDemo>
            </BlockSection>

            {/* Layout Blocks */}
            <BlockSection
              category="Layout Blocks"
              description="Structure and spacing blocks for page layouts"
              badge="6 Blocks"
            >
              {/* Columns Block */}
              <BlockDemo
                title="Columns"
                description="Responsive grid system with 1-6 columns and mobile stacking"
                props={[
                  { name: 'columns', type: 'number', description: 'Number of columns (1-6)', optional: true },
                  { name: 'verticalAlignment', type: "'top' | 'center' | 'bottom'", description: 'Vertical alignment', optional: true },
                  { name: 'isStackedOnMobile', type: 'boolean', description: 'Stack columns on mobile', optional: true },
                ]}
                example={`<CoreColumns
  columns={2}
  verticalAlignment="center"
/>`}
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="bg-primary/10 p-8 rounded-lg text-center">
                    <h3 className="font-semibold mb-2">Column 1</h3>
                    <p className="text-sm text-muted-foreground">Content goes here</p>
                  </div>
                  <div className="bg-primary/10 p-8 rounded-lg text-center">
                    <h3 className="font-semibold mb-2">Column 2</h3>
                    <p className="text-sm text-muted-foreground">Content goes here</p>
                  </div>
                  <div className="bg-primary/10 p-8 rounded-lg text-center">
                    <h3 className="font-semibold mb-2">Column 3</h3>
                    <p className="text-sm text-muted-foreground">Content goes here</p>
                  </div>
                </div>
              </BlockDemo>

              {/* Group Block */}
              <BlockDemo
                title="Group"
                description="Container wrapper with semantic HTML and layout control"
                props={[
                  { name: 'layout', type: "'default' | 'constrained' | 'full'", description: 'Layout type', optional: true },
                  { name: 'tagName', type: "'div' | 'section' | 'article' | 'aside'", description: 'HTML tag to use', optional: true },
                ]}
                example={`<CoreGroup
  layout="constrained"
  tagName="section"
/>`}
              >
                <section className="bg-gray-100 p-8 rounded-lg max-w-3xl mx-auto">
                  <p>This content is inside a <strong>constrained</strong> Group block with a background color. The max-width keeps content readable on large screens.</p>
                </section>
              </BlockDemo>

              {/* Separator Block */}
              <BlockDemo
                title="Separator"
                description="Horizontal divider with style variants"
                props={[
                  { name: 'style', type: "'default' | 'wide' | 'dots'", description: 'Separator style', optional: true },
                  { name: 'opacity', type: "'default' | 'css'", description: 'Opacity level', optional: true },
                ]}
                example={`<CoreSeparator
  style="wide"
/>`}
              >
                <div className="space-y-8">
                  <div>
                    <p className="text-sm text-muted-foreground mb-4">Default style:</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-4">Wide style:</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-4">Dots style:</p>
                  </div>
                </div>
              </BlockDemo>

              {/* Spacer Block */}
              <BlockDemo
                title="Spacer"
                description="Vertical spacing control with configurable height"
                props={[
                  { name: 'height', type: 'string | number', description: 'Height in pixels or rem' },
                ]}
                example={`<CoreSpacer
  height={64}
/>`}
              >
                <div className="border-l-2 border-dashed border-primary/30 pl-4">
                  <p className="text-sm text-muted-foreground">Content above spacer</p>
                  <p className="text-sm text-muted-foreground">Content below spacer (64px gap)</p>
                </div>
              </BlockDemo>

              {/* Table Block */}
              <BlockDemo
                title="Table"
                description="Responsive data tables with striped rows and horizontal scroll"
                props={[
                  { name: 'head', type: 'Array<{cells: Array<{content: string; tag: "th"}}}>', description: 'Table header', optional: true },
                  { name: 'body', type: 'Array<{cells: Array<{content: string; tag: "td"}}}>', description: 'Table body' },
                  { name: 'stripes', type: 'boolean', description: 'Enable striped rows', optional: true },
                ]}
                example={`<CoreTable
  hasHeader={true}
  stripes={true}
/>`}
              >
                <CoreTable
                  hasHeader={true}
                  stripes={true}
                  head={[
                    {
                      cells: [
                        { content: 'Block', tag: 'th' as const },
                        { content: 'Category', tag: 'th' as const },
                        { content: 'Server Component', tag: 'th' as const },
                        { content: 'Size', tag: 'th' as const },
                      ],
                    },
                  ]}
                  body={[
                    {
                      cells: [
                        { content: 'CoreParagraph', tag: 'td' as const },
                        { content: 'Content', tag: 'td' as const },
                        { content: '✅ Yes', tag: 'td' as const },
                        { content: '1.8KB', tag: 'td' as const },
                      ],
                    },
                    {
                      cells: [
                        { content: 'CoreHeading', tag: 'td' as const },
                        { content: 'Content', tag: 'td' as const },
                        { content: '✅ Yes', tag: 'td' as const },
                        { content: '3.6KB', tag: 'td' as const },
                      ],
                    },
                    {
                      cells: [
                        { content: 'CoreCode', tag: 'td' as const },
                        { content: 'Code', tag: 'td' as const },
                        { content: '✅ Yes', tag: 'td' as const },
                        { content: '5.8KB', tag: 'td' as const },
                      ],
                    },
                  ]}
                />
              </BlockDemo>

              {/* Cover Block */}
              <BlockDemo
                title="Cover"
                description="Full-width background section with image and overlay"
                props={[
                  { name: 'url', type: 'string', description: 'Background image URL', optional: true },
                  { name: 'alt', type: 'string', description: 'Alt text', optional: true },
                  { name: 'dimRatio', type: 'number', description: 'Overlay opacity (0-100)', optional: true },
                  { name: 'overlayColor', type: 'string', description: 'Overlay color', optional: true },
                  { name: 'minHeight', type: 'number', description: 'Minimum height in pixels', optional: true },
                  { name: 'contentPosition', type: 'string', description: 'Content position (9 options)', optional: true },
                ]}
                example={`<CoreCover
  url="/images/hero.jpg"
  dimRatio={40}
  minHeight={400}
  contentPosition="center center"
/>`}
              >
                <div
                  className="relative h-96 rounded-lg overflow-hidden flex items-center justify-center"
                  style={{
                    backgroundImage: 'url(https://images.unsplash.com/photo-1557683316-973673baf926?w=1600&h=600&fit=crop)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                >
                  <div className="absolute inset-0 bg-black/50" />
                  <div className="relative text-center text-white">
                    <h2 className="text-4xl font-bold mb-4">Cover Block</h2>
                    <p className="text-lg mb-6">Full-width background with overlay and content positioning</p>
                  </div>
                </div>
              </BlockDemo>
            </BlockSection>
          </div>
        </div>
      </section>

      {/* Getting Started Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Getting Started</h2>
            <p className="text-muted-foreground">
              Start using Flat-Blocks in your Next.js + WordPress project
            </p>
          </div>

          <Card className="p-8">
            <h3 className="text-xl font-semibold mb-4">Installation</h3>
            <CoreCode
              code="pnpm install shiki sonner @radix-ui/react-tabs"
              language="bash"
            />


            <h3 className="text-xl font-semibold mb-4">Basic Usage</h3>
            <CoreCode
              code={`import { CoreHeading, CoreParagraph } from '@/components/blocks/core';

export default function Page() {
  return (
    <>
      <CoreHeading
        content="Welcome"
        level={1}
      />
      <CoreParagraph
        content="<p>Hello World</p>"
      />
    </>
  );
}`}
              language="typescript"
              showLineNumbers={true}
            />


            <h3 className="text-xl font-semibold mb-4">WordPress Integration</h3>
            <CoreCode
              code={`import { CoreBlockRenderer } from '@/components/blocks/CoreBlockRenderer';
import { EDITOR_BLOCKS_QUERY } from '@/lib/blocks/fragments';

export default async function Post({ params }) {
  const { data } = await graphqlClient.query({
    query: EDITOR_BLOCKS_QUERY,
    variables: { slug: params.slug },
  });

  return <CoreBlockRenderer blocks={data.page.editorBlocks} />;
}`}
              language="typescript"
              showLineNumbers={true}
            />
          </Card>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-16 border-t">
        <div className="container mx-auto px-4 text-center max-w-2xl">
          <h2 className="text-3xl font-bold mb-4">Ready to Build?</h2>
          <p className="text-muted-foreground mb-8">
            Start using Flat-Blocks in your project today. All blocks are production-ready, fully typed, and accessible.
          </p>
          <CoreButtons
            layout="horizontal"
            align="center"
            buttons={[
              {
                text: "View Documentation",
                url: "/docs",
                variant: "default",
                size: "lg"
              },
              {
                text: "GitHub Repository",
                url: "https://github.com/flatwp/flatwp",
                variant: "outline",
                size: "lg"
              }
            ]}
          />
        </div>
      </section>
    </main>
  );
}

/**
 * Block Section Component
 */
function BlockSection({
  category,
  description,
  badge,
  children,
}: {
  category: string;
  description: string;
  badge: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="mb-8">
        <Badge className="mb-2" variant="outline">
          {badge}
        </Badge>
        <h2 className="text-2xl font-bold mb-2">{category}</h2>
        <p className="text-muted-foreground">{description}</p>
      </div>
      <div className="space-y-12">{children}</div>
    </div>
  );
}

/**
 * Block Demo Component
 */
function BlockDemo({
  title,
  description,
  props,
  example,
  children,
}: {
  title: string;
  description: string;
  props: Array<{ name: string; type: string; description: string; optional?: boolean }>;
  example: string;
  children: React.ReactNode;
}) {
  return (
    <Card className="p-8">
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Documentation */}
        <div>
          <h3 className="text-xl font-semibold mb-2">{title}</h3>
          <p className="text-sm text-muted-foreground mb-6">{description}</p>

          <h4 className="text-sm font-semibold mb-3">Props:</h4>
          <div className="space-y-3 mb-6">
            {props.map((prop) => (
              <div key={prop.name} className="text-sm">
                <code className="text-xs bg-muted px-2 py-1 rounded">
                  {prop.name}
                  {prop.optional && '?'}
                </code>
                <span className="text-muted-foreground mx-2">:</span>
                <code className="text-xs text-primary">{prop.type}</code>
                <p className="text-muted-foreground mt-1 ml-2">{prop.description}</p>
              </div>
            ))}
          </div>

          <h4 className="text-sm font-semibold mb-3">Example:</h4>
          <CoreCode
            code={example}
            language="typescript"
          />
        </div>

        {/* Live Preview */}
        <div>
          <h4 className="text-sm font-semibold mb-3">Live Preview:</h4>
          <div className="border rounded-lg p-6 bg-white dark:bg-gray-950">{children}</div>
        </div>
      </div>
    </Card>
  );
}

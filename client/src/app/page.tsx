import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { TextAnimate } from '@/components/ui/text-animate';
import {
  ArrowRight,
  Check,
  ChevronRight,
  CirclePlay,
  FileText,
  Globe,
  Layers3,
  ShieldCheck,
  Sparkles,
  WandSparkles,
} from 'lucide-react';
import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="bg-background text-foreground">
      <section className="border-b border-border/70">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-8">
          <Link href="/" className="flex items-center gap-2 text-sm font-semibold tracking-tight">
            <span className="flex size-8 items-center justify-center rounded-lg border border-border bg-card shadow-xs">
              <Sparkles className="size-4 text-primary" />
            </span>
            Readme.Site
          </Link>

          <nav
            aria-label="Primary"
            className="hidden items-center gap-8 text-sm text-muted-foreground md:flex"
          >
            <Link href="#features" className="transition-colors hover:text-foreground">
              Features
            </Link>
            <Link href="#preview" className="transition-colors hover:text-foreground">
              Preview
            </Link>
            <Link href="#pricing" className="transition-colors hover:text-foreground">
              Pricing
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <Button asChild variant="ghost" size="sm">
              <Link href="/auth/login">Sign in</Link>
            </Button>
            <Button asChild size="sm">
              <Link href="/dashboard">
                Start building
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 -z-10 h-[34rem] bg-[radial-gradient(circle_at_top,oklch(from_var(--primary)_l_c_h_/_0.14),transparent_58%),linear-gradient(to_bottom,oklch(from_var(--secondary)_l_c_h_/_0.35),transparent_55%)]"
        />
        <div className="mx-auto grid max-w-7xl gap-14 px-6 py-20 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:px-8 lg:py-28">
          <header className="max-w-2xl">
            <Badge
              variant="outline"
              className="rounded-full border-border/80 bg-background/80 px-3 py-1 text-[0.7rem] uppercase tracking-[0.18em] text-muted-foreground backdrop-blur"
            >
              Built for product-minded developers
            </Badge>

            <TextAnimate
              as="h1"
              by="line"
              animation="blurInUp"
              duration={0.8}
              once
              className="mt-8 text-5xl font-semibold tracking-tight text-balance sm:text-6xl lg:text-7xl"
            >
              Launch a premium SaaS site directly from your README.
            </TextAnimate>

            <TextAnimate
              as="p"
              by="word"
              animation="fadeIn"
              delay={0.15}
              duration={0.8}
              once
              className="mt-6 max-w-xl text-lg leading-8 text-muted-foreground sm:text-xl"
            >
              Readme.Site turns raw documentation into a refined landing page with strong hierarchy,
              polished sections, and code your team can actually ship.
            </TextAnimate>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="h-11 rounded-lg px-6 shadow-sm">
                <Link href="/dashboard">
                  Generate your site
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="h-11 rounded-lg border-border/80 bg-background/80 px-6 backdrop-blur"
              >
                <Link href="#preview">
                  <CirclePlay className="size-4" />
                  Watch walkthrough
                </Link>
              </Button>
            </div>

            <dl className="mt-14 grid gap-8 border-t border-border/70 pt-8 sm:grid-cols-3">
              {stats.map(stat => (
                <div key={stat.label}>
                  <dt className="text-sm text-muted-foreground">{stat.label}</dt>
                  <dd className="mt-2 text-2xl font-semibold tracking-tight">{stat.value}</dd>
                </div>
              ))}
            </dl>
          </header>

          <div id="preview" className="lg:pt-4">
            <Card className="overflow-hidden border-border/70 bg-card/90 py-0 shadow-xl shadow-primary/5 backdrop-blur">
              <CardHeader className="gap-4 border-b border-border/70 px-6 py-5">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <CardTitle className="text-base font-medium">Live generation preview</CardTitle>
                    <CardDescription className="mt-1">
                      From repository import to publish-ready landing page.
                    </CardDescription>
                  </div>
                  <Badge variant="secondary" className="rounded-full px-3 py-1">
                    AI composer active
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6 px-6 py-6">
                <div className="rounded-xl border border-border/70 bg-background p-4 shadow-xs">
                  <div className="flex items-center gap-3 text-sm">
                    <span className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <FileText className="size-4" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-medium">README.md</p>
                      <p className="text-muted-foreground">
                        Importing structure, positioning, and code snippets
                      </p>
                    </div>
                    <Badge variant="outline" className="rounded-full">
                      Synced
                    </Badge>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-[0.88fr_1.12fr]">
                  <div className="rounded-xl border border-border/70 bg-muted/40 p-4">
                    <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
                      Source understanding
                    </p>
                    <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
                      {[
                        'Extracts product promise',
                        'Clusters features by intent',
                        'Generates SaaS-ready section flow',
                      ].map(item => (
                        <li key={item} className="flex items-start gap-3">
                          <Check className="mt-0.5 size-4 text-primary" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="rounded-xl border border-border/70 bg-background p-4 shadow-xs">
                    <div className="rounded-lg border border-border/70 bg-card p-5">
                      <Badge
                        variant="outline"
                        className="rounded-full border-border/70 bg-background"
                      >
                        Generated homepage
                      </Badge>
                      <div className="mt-4 space-y-4">
                        <div className="space-y-2">
                          <div className="h-2 w-20 rounded-full bg-primary/35" />
                          <div className="h-4 w-4/5 rounded-full bg-foreground/90" />
                          <div className="h-4 w-3/5 rounded-full bg-foreground/90" />
                        </div>
                        <div className="grid gap-3 sm:grid-cols-3">
                          {[1, 2, 3].map(item => (
                            <div
                              key={item}
                              className="rounded-lg border border-border/70 bg-muted/40 p-3"
                            >
                              <div className="size-8 rounded-md bg-primary/10" />
                              <div className="mt-4 h-3 w-4/5 rounded-full bg-foreground/85" />
                              <div className="mt-2 h-3 w-full rounded-full bg-muted-foreground/35" />
                              <div className="mt-2 h-3 w-2/3 rounded-full bg-muted-foreground/35" />
                            </div>
                          ))}
                        </div>
                        <div className="rounded-lg border border-dashed border-border/80 bg-secondary/25 p-3 text-sm text-secondary-foreground">
                          Smart CTA placement based on package signals and install intent
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="border-y border-border/70 bg-card/35">
        <div className="mx-auto max-w-7xl px-6 py-6 lg:px-8">
          <p className="text-center text-sm text-muted-foreground">
            Trusted by teams shipping developer tools, AI products, and API platforms
          </p>
          <div className="mt-6 grid grid-cols-2 gap-3 text-center text-sm font-medium text-muted-foreground sm:grid-cols-3 lg:grid-cols-6">
            {logos.map(logo => (
              <div
                key={logo}
                className="rounded-lg border border-border/70 bg-background/70 px-4 py-3 backdrop-blur"
              >
                {logo}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="features" className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <div className="max-w-2xl">
          <Badge
            variant="outline"
            className="rounded-full px-3 py-1 text-[0.7rem] uppercase tracking-[0.18em] text-muted-foreground"
          >
            Why teams switch
          </Badge>
          <TextAnimate
            as="h2"
            by="line"
            animation="slideUp"
            duration={0.7}
            once
            className="mt-6 text-3xl font-semibold tracking-tight sm:text-4xl"
          >
            A landing page system that feels designed, not generated.
          </TextAnimate>
          <p className="mt-4 max-w-xl text-lg leading-8 text-muted-foreground">
            Every section is tuned to create clarity: stronger storytelling, cleaner layouts, and
            the kind of restraint that makes premium products feel credible.
          </p>
        </div>

        <div className="mt-14 grid gap-5 lg:grid-cols-2">
          {featureCards.map(({ icon: Icon, title, description }) => (
            <Card key={title} className="border-border/70 bg-card/75 shadow-sm">
              <CardHeader className="gap-4">
                <span className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="size-5" />
                </span>
                <div className="space-y-2">
                  <CardTitle className="text-xl font-medium tracking-tight">{title}</CardTitle>
                  <CardDescription className="max-w-md text-base leading-7">
                    {description}
                  </CardDescription>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-6 pb-24 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:px-8">
        <Card className="border-border/70 bg-card/75 shadow-sm">
          <CardHeader>
            <Badge variant="secondary" className="rounded-full px-3 py-1">
              Product workflow
            </Badge>
            <CardTitle className="text-2xl font-semibold tracking-tight">
              Move from source content to polished narrative in one pass.
            </CardTitle>
            <CardDescription className="max-w-md text-base leading-7">
              The system handles positioning, section order, and visual rhythm so your team can
              focus on accuracy, not layout busywork.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            {[
              [
                'Import the README',
                'We parse product intent, install steps, and proof points into usable content blocks.',
              ],
              [
                'Shape the page',
                'The generator builds a premium flow with hero, features, preview, proof, and CTA.',
              ],
              [
                'Publish confidently',
                'Review the output, adjust copy if needed, and deploy without rebuilding the page.',
              ],
            ].map(([title, description], index) => (
              <div key={title} className="flex gap-4">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-medium text-primary-foreground">
                  {index + 1}
                </span>
                <div>
                  <p className="font-medium">{title}</p>
                  <p className="mt-1 text-sm leading-6 text-muted-foreground">{description}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-border/70 bg-muted/35 py-0 shadow-sm">
          <CardContent className="grid gap-4 px-6 py-6 sm:grid-cols-2">
            <article className="rounded-2xl border border-border/70 bg-background p-5 shadow-xs">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
                Messaging quality
              </p>
              <p className="mt-4 text-2xl font-semibold tracking-tight">Sharper headline systems</p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Transform technical copy into concise value props while preserving the truth of the
                product.
              </p>
            </article>
            <article className="rounded-2xl border border-border/70 bg-background p-5 shadow-xs">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
                Design consistency
              </p>
              <p className="mt-4 text-2xl font-semibold tracking-tight">Theme-aware by default</p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Uses your existing color, radius, and spacing tokens so the result already belongs
                to your product.
              </p>
            </article>
            <article className="rounded-2xl border border-border/70 bg-background p-5 shadow-xs sm:col-span-2">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
                Developer control
              </p>
              <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div className="max-w-xl">
                  <p className="text-2xl font-semibold tracking-tight">
                    Generated code stays readable.
                  </p>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    You get a clean foundation with shadcn primitives, semantic HTML, and
                    predictable section structure instead of one-off visual hacks.
                  </p>
                </div>
                <Button
                  asChild
                  variant="ghost"
                  className="justify-start px-0 text-sm sm:justify-center"
                >
                  <Link href="/pricing">
                    Explore pricing
                    <ChevronRight className="size-4" />
                  </Link>
                </Button>
              </div>
            </article>
          </CardContent>
        </Card>
      </section>

      <section className="border-y border-border/70 bg-card/30">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <Badge
                variant="outline"
                className="rounded-full px-3 py-1 text-[0.7rem] uppercase tracking-[0.18em] text-muted-foreground"
              >
                Customer proof
              </Badge>
              <h2 className="mt-6 text-3xl font-semibold tracking-tight sm:text-4xl">
                Teams use it when the first impression actually matters.
              </h2>
            </div>
            <p className="max-w-md text-sm leading-7 text-muted-foreground">
              Minimal by design, but not cold. The output creates confidence with better rhythm,
              contrast, and content framing from the first screen down to the last CTA.
            </p>
          </div>

          <div className="mt-14 grid gap-5 lg:grid-cols-3">
            {testimonials.map(testimonial => (
              <Card
                key={testimonial.name}
                className="border-border/70 bg-background/85 shadow-sm backdrop-blur"
              >
                <CardContent className="space-y-6 px-6 py-6">
                  <p className="text-base leading-7 text-foreground/90">{testimonial.quote}</p>
                  <div>
                    <p className="font-medium">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <Badge
            variant="outline"
            className="rounded-full px-3 py-1 text-[0.7rem] uppercase tracking-[0.18em] text-muted-foreground"
          >
            Pricing
          </Badge>
          <h2 className="mt-6 text-3xl font-semibold tracking-tight sm:text-4xl">
            Start simple, upgrade when the launch cadence grows.
          </h2>
          <p className="mt-4 text-lg leading-8 text-muted-foreground">
            Transparent pricing for solo builders and teams shipping polished product pages every
            week.
          </p>
        </div>

        <div className="mx-auto mt-14 grid max-w-5xl gap-5 lg:grid-cols-2">
          {pricingTiers.map(tier => (
            <Card
              key={tier.name}
              className={`border-border/70 py-0 shadow-sm ${tier.name === 'Pro' ? 'bg-card ring-1 ring-primary/15' : 'bg-card/70'}`}
            >
              <CardHeader className="gap-3 border-b border-border/70 px-6 py-6">
                <div className="flex items-center justify-between gap-4">
                  <CardTitle className="text-xl font-medium">{tier.name}</CardTitle>
                  {tier.name === 'Pro' ? (
                    <Badge className="rounded-full px-3 py-1">Most popular</Badge>
                  ) : null}
                </div>
                <CardDescription className="text-base leading-7">
                  {tier.description}
                </CardDescription>
                <div className="flex items-end gap-2 pt-2">
                  <span className="text-4xl font-semibold tracking-tight">{tier.price}</span>
                  <span className="pb-1 text-sm text-muted-foreground">
                    {tier.price === '$0' ? '/month' : '/month per workspace'}
                  </span>
                </div>
              </CardHeader>
              <CardContent className="px-6 py-6">
                <ul className="space-y-3 text-sm text-muted-foreground">
                  {tier.features.map(feature => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check className="mt-0.5 size-4 text-primary" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="px-6 pb-6">
                <Button asChild variant={tier.variant} size="lg" className="w-full">
                  <Link href={'#'}>{tier.cta}</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      <section className="px-6 pb-24 lg:px-8">
        <Card className="mx-auto max-w-7xl border-border/70 bg-[linear-gradient(180deg,oklch(from_var(--secondary)_l_c_h_/_0.35),transparent_110%),linear-gradient(135deg,oklch(from_var(--primary)_l_c_h_/_0.08),transparent_55%)] shadow-lg shadow-primary/5">
          <CardContent className="flex flex-col gap-8 px-6 py-14 text-center sm:px-10 lg:py-16">
            <div className="space-y-4">
              <Badge
                variant="outline"
                className="rounded-full border-border/80 bg-background/80 px-3 py-1 text-[0.7rem] uppercase tracking-[0.18em] text-muted-foreground backdrop-blur"
              >
                Final call to action
              </Badge>
              <h2 className="mx-auto max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl">
                Give your product the kind of homepage users trust on first contact.
              </h2>
              <p className="mx-auto max-w-2xl text-lg leading-8 text-muted-foreground">
                Import a README, review the generated page, and ship a cleaner launch experience
                without restarting the design process from zero.
              </p>
            </div>
            <div className="flex flex-col justify-center gap-3 sm:flex-row">
              <Button asChild size="lg" className="h-11 rounded-lg px-6">
                <Link href="/dashboard">
                  Create your first site
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="h-11 rounded-lg border-border/80 bg-background/85 px-6"
              >
                <Link href="/#">Compare plans</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>

      <footer className="border-t border-border/70">
        <div className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-medium">ReadmeToSite</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Premium product pages from the documentation you already maintain.
              </p>
            </div>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <Link href="#features" className="transition-colors hover:text-foreground">
                Features
              </Link>
              <Link href="#pricing" className="transition-colors hover:text-foreground">
                Pricing
              </Link>
              <Link href="/auth/login" className="transition-colors hover:text-foreground">
                Sign in
              </Link>
            </div>
          </div>
          <Separator className="my-6" />
          <p className="text-sm text-muted-foreground">© 2026 ReadmeToSite. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}

const logos = ['GitHub', 'Vercel', 'Supabase', 'Notion', 'Raycast', 'Linear'];

const featureCards = [
  {
    icon: WandSparkles,
    title: 'Design systems from raw markdown',
    description:
      'Turn a README into a polished product site with structure, hierarchy, and copy that feel intentional.',
  },
  {
    icon: Layers3,
    title: 'Layouts that match your product',
    description:
      'Each page is composed from your content model, not a generic template stitched over the top.',
  },
  {
    icon: ShieldCheck,
    title: 'Production-ready output',
    description:
      'Ship fast with clean Next.js code, accessible patterns, and predictable sections your team can extend.',
  },
  {
    icon: Globe,
    title: 'Publish in one flow',
    description:
      'Review, refine, and deploy a shareable site without moving content into another CMS or design tool.',
  },
];

const stats = [
  { value: '4.9/5', label: 'average launch rating' },
  { value: '< 3 min', label: 'from README to live preview' },
  { value: '82%', label: 'faster than manual landing page builds' },
];

const testimonials = [
  {
    quote:
      'It feels like having a product designer and frontend engineer built into our release workflow.',
    name: 'Maya Chen',
    role: 'Founding Engineer, Northstar',
  },
  {
    quote:
      'We stopped rebuilding launch pages from scratch. The output is clean enough to ship and flexible enough to tune.',
    name: 'Noah Bennett',
    role: 'Design Lead, Beacon',
  },
  {
    quote:
      'The structure is what impressed me. It reads like a real SaaS homepage, not an AI page trying to look premium.',
    name: 'Ava Patel',
    role: 'Developer Experience, MergeKit',
  },
];

const pricingTiers = [
  {
    name: 'Starter',
    price: '$0',
    description: 'For personal projects and open-source launches.',
    cta: 'Start free',
    variant: 'outline' as const,
    features: ['1 active site', 'README import', 'Basic theme editing', 'Community support'],
  },
  {
    name: 'Premium',
    price: '$19',
    description: 'coming soon',
    cta: 'Start Pro',
    variant: 'default' as const,
    features: ['Unlimited sites', 'Advanced sections', 'Custom domains', 'Priority generation'],
  },
];

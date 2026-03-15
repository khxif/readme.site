import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from '@/components/ui/card';
import { Check } from 'lucide-react';

export default function PricingPage() {
  return (
    <section className="relative w-full py-20 overflow-hidden bg-background">
      {/* Background gradients for modern aesthetic */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background" />

      <div className="container max-w-6xl mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center text-center space-y-6 mb-16">
          <Badge
            variant="secondary"
            className="rounded-full px-4 py-1.5 text-sm font-medium border-primary/20 bg-primary/10 text-primary"
          >
            Pricing
          </Badge>
          <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl text-foreground">
            Start building your AI website.
          </h2>
          <p className="max-w-[42rem] mx-auto text-lg text-muted-foreground sm:text-xl leading-relaxed">
            Turn your GitHub README into a fully-functional, beautiful, AI-generated website in
            seconds. No credit card required.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto items-stretch">
          {/* Free Plan */}
          <Card className="relative flex flex-col justify-between border-primary/30 shadow-2xl lg:hover:-translate-y-1 transition-all duration-300 rounded-3xl bg-card overflow-hidden group">
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-primary to-primary/50" />
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <CardHeader className="p-8 md:p-10 relative z-10 space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-foreground to-foreground/70">
                  Free
                </h3>
                <Badge
                  variant="outline"
                  className="rounded-full px-3 py-1 font-semibold text-primary border-primary/30 bg-primary/5"
                >
                  Recommended
                </Badge>
              </div>
              <CardDescription className="text-base text-muted-foreground">
                Everything you need to create your first README website.
              </CardDescription>
              <div className="flex items-baseline gap-1 mt-6">
                <span className="text-6xl font-extrabold tracking-tight">$0</span>
                <span className="text-xl font-medium text-muted-foreground">/ forever</span>
              </div>
            </CardHeader>
            <CardContent className="flex-1 p-8 md:p-10 pt-0 relative z-10">
              <ul className="space-y-4 text-foreground/90">
                <li className="flex items-start gap-3">
                  <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
                    <Check className="h-3 w-3" strokeWidth={3} />
                  </div>
                  <span className="leading-tight">
                    Create <strong>1 project</strong>
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
                    <Check className="h-3 w-3" strokeWidth={3} />
                  </div>
                  <span className="leading-tight">
                    Convert <strong>1 README</strong> to website
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
                    <Check className="h-3 w-3" strokeWidth={3} />
                  </div>
                  <span className="leading-tight">Basic generation features</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
                    <Check className="h-3 w-3" strokeWidth={3} />
                  </div>
                  <span className="leading-tight">Community support</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter className="p-8 md:p-10 pt-0 mt-auto relative z-10">
              <Button
                size="lg"
                className="w-full text-base font-semibold h-12 rounded-xl sm:h-14 group-hover:shadow-lg group-hover:shadow-primary/20 transition-all duration-300"
              >
                Get Started
              </Button>
            </CardFooter>
          </Card>

          {/* Pro Plan */}
          <Card className="relative flex flex-col justify-between border-border/50 shadow-md bg-card/60 lg:hover:-translate-y-1 transition-all duration-300 rounded-3xl overflow-hidden backdrop-blur-sm grayscale-[20%] opacity-90">
            <CardHeader className="p-8 md:p-10 space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-2xl font-bold text-foreground/70">Pro</h3>
                <Badge
                  variant="secondary"
                  className="rounded-full px-3 py-1 font-semibold border-transparent bg-secondary text-secondary-foreground shadow-sm"
                >
                  Coming Soon
                </Badge>
              </div>
              <CardDescription className="text-base text-muted-foreground">
                For power users looking to scale their AI sites.
              </CardDescription>
              <div className="flex items-baseline gap-1 mt-6 opacity-70">
                <span className="text-6xl font-extrabold tracking-tight">$?</span>
                <span className="text-xl font-medium text-muted-foreground">/ mo</span>
              </div>
            </CardHeader>
            <CardContent className="flex-1 p-8 md:p-10 pt-0">
              <ul className="space-y-4 text-muted-foreground">
                <li className="flex items-start gap-3 opacity-70">
                  <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground">
                    <Check className="h-3 w-3" strokeWidth={3} />
                  </div>
                  <span className="leading-tight">
                    Create <strong>unlimited projects</strong>
                  </span>
                </li>
                <li className="flex items-start gap-3 opacity-70">
                  <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground">
                    <Check className="h-3 w-3" strokeWidth={3} />
                  </div>
                  <span className="leading-tight">
                    Convert <strong>unlimited READMEs</strong>
                  </span>
                </li>
                <li className="flex items-start gap-3 opacity-70">
                  <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground">
                    <Check className="h-3 w-3" strokeWidth={3} />
                  </div>
                  <span className="leading-tight">Advanced AI models & features</span>
                </li>
                <li className="flex items-start gap-3 opacity-70">
                  <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground">
                    <Check className="h-3 w-3" strokeWidth={3} />
                  </div>
                  <span className="leading-tight">Priority human support</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter className="p-8 md:p-10 pt-0 mt-auto">
              <Button
                size="lg"
                disabled
                variant="outline"
                className="w-full h-12 rounded-xl sm:h-14 text-base font-medium border-border/80 text-muted-foreground bg-muted/40 cursor-not-allowed"
              >
                Coming Soon
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  );
}

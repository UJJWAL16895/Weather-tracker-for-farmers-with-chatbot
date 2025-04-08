import type React from "react"
import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import {
  Cloud,
  CloudRain,
  Droplets,
  LineChart,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  Shield,
  Sun,
  Thermometer,
  Users,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export const metadata: Metadata = {
  title: "About | Weather Tracker AI for Farming",
  description: "Learn about our comprehensive weather tracking application for farmers",
}

export default function AboutPage() {
  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      {/* Hero Section */}
      <section className="mb-12 text-center">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-4xl font-bold tracking-tight mb-4 md:text-5xl">Weather Tracker AI for Farming</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Empowering farmers with intelligent weather insights and AI-driven recommendations
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild size="lg">
              <Link href="/">Explore Dashboard</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/assistant">Try AI Assistant</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Feature Overview */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-8">Comprehensive Weather Intelligence</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <FeatureCard
            icon={<Thermometer className="h-10 w-10 text-primary" />}
            title="Real-Time Weather Data"
            description="Access accurate, up-to-date weather information specific to your farm's location."
          />
          <FeatureCard
            icon={<CloudRain className="h-10 w-10 text-primary" />}
            title="7-Day Forecasts"
            description="Plan your farming activities with confidence using our detailed 7-day weather predictions."
          />
          <FeatureCard
            icon={<LineChart className="h-10 w-10 text-primary" />}
            title="Historical Analytics"
            description="Analyze weather patterns and trends to make informed long-term decisions."
          />
          <FeatureCard
            icon={<Shield className="h-10 w-10 text-primary" />}
            title="Weather Alerts"
            description="Receive timely notifications about severe weather conditions that might affect your crops."
          />
          <FeatureCard
            icon={<MessageSquare className="h-10 w-10 text-primary" />}
            title="AI Farming Assistant"
            description="Get personalized farming advice based on current and forecasted weather conditions."
          />
          <FeatureCard
            icon={<MapPin className="h-10 w-10 text-primary" />}
            title="Interactive Weather Maps"
            description="Visualize temperature, precipitation, clouds, and wind patterns in your region."
          />
        </div>
      </section>

      {/* How It Works */}
      <section className="mb-16 bg-muted rounded-xl p-8">
        <h2 className="text-3xl font-bold text-center mb-8">How It Works</h2>
        <div className="grid gap-8 md:grid-cols-3">
          <div className="flex flex-col items-center text-center">
            <div className="bg-primary/10 rounded-full p-4 mb-4">
              <MapPin className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">Set Your Location</h3>
            <p className="text-muted-foreground">
              Enter your farm's coordinates or use our location finder to set your precise farming location.
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="bg-primary/10 rounded-full p-4 mb-4">
              <Cloud className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">Get Weather Insights</h3>
            <p className="text-muted-foreground">
              Access real-time weather data, forecasts, and historical analytics tailored to your location.
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="bg-primary/10 rounded-full p-4 mb-4">
              <Sun className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">Optimize Your Farming</h3>
            <p className="text-muted-foreground">
              Use our AI recommendations to make informed decisions about planting, irrigation, and harvesting.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="mb-16">
        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <h2 className="text-3xl font-bold mb-6">Benefits for Farmers</h2>
            <ul className="space-y-4">
              <BenefitItem>
                <strong>Increased Crop Yields:</strong> Make optimal planting and harvesting decisions based on accurate
                weather forecasts.
              </BenefitItem>
              <BenefitItem>
                <strong>Reduced Resource Waste:</strong> Plan irrigation more efficiently by anticipating rainfall
                patterns.
              </BenefitItem>
              <BenefitItem>
                <strong>Minimized Weather Risks:</strong> Prepare for adverse weather conditions with timely alerts and
                recommendations.
              </BenefitItem>
              <BenefitItem>
                <strong>Optimized Planning:</strong> Schedule farm activities during ideal weather windows.
              </BenefitItem>
              <BenefitItem>
                <strong>Data-Driven Decisions:</strong> Base your farming strategy on historical weather patterns and
                trends.
              </BenefitItem>
            </ul>
          </div>
          <div className="rounded-xl overflow-hidden h-[350px] relative">
            <Image
              src="/placeholder.svg?height=700&width=500"
              alt="Farmer using Weather Tracker app"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-8">What Farmers Say</h2>
        <div className="grid gap-6 md:grid-cols-3">
          <TestimonialCard
            quote="Weather Tracker has transformed how I plan my farming activities. The AI recommendations have helped me increase my crop yield by 20%."
            author="John Smith"
            role="Corn Farmer, Iowa"
          />
          <TestimonialCard
            quote="The weather alerts have saved my crops multiple times. I received advance warning about a frost that would have destroyed my entire harvest."
            author="Maria Rodriguez"
            role="Vineyard Owner, California"
          />
          <TestimonialCard
            quote="I love the historical analytics feature. Being able to compare current conditions with past years has helped me make better long-term decisions."
            author="Robert Johnson"
            role="Wheat Farmer, Kansas"
          />
        </div>
      </section>

      {/* Technology */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-8">Our Technology</h2>
        <Tabs defaultValue="data" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="data">Weather Data</TabsTrigger>
            <TabsTrigger value="ai">AI Technology</TabsTrigger>
            <TabsTrigger value="platform">Platform</TabsTrigger>
          </TabsList>
          <TabsContent value="data" className="p-4 border rounded-lg mt-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <h3 className="text-xl font-bold mb-2">High-Precision Weather Data</h3>
                <p className="text-muted-foreground mb-4">
                  We source our weather data from multiple reliable meteorological services and satellites to provide
                  the most accurate information possible.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <Thermometer className="h-5 w-5 text-primary" />
                    <span>Temperature measurements accurate to ±0.5°C</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Droplets className="h-5 w-5 text-primary" />
                    <span>Precipitation forecasts with 90% accuracy</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Cloud className="h-5 w-5 text-primary" />
                    <span>Cloud cover and humidity data updated hourly</span>
                  </li>
                </ul>
              </div>
              <div className="rounded-lg overflow-hidden h-[200px] relative">
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  alt="Weather data visualization"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </TabsContent>
          <TabsContent value="ai" className="p-4 border rounded-lg mt-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <h3 className="text-xl font-bold mb-2">Advanced AI Models</h3>
                <p className="text-muted-foreground mb-4">
                  Our AI assistant is powered by state-of-the-art language models and specialized agricultural
                  algorithms to provide tailored farming advice.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5 text-primary" />
                    <span>Natural language processing for intuitive interactions</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <LineChart className="h-5 w-5 text-primary" />
                    <span>Machine learning models trained on agricultural data</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Sun className="h-5 w-5 text-primary" />
                    <span>Crop-specific recommendations based on weather patterns</span>
                  </li>
                </ul>
              </div>
              <div className="rounded-lg overflow-hidden h-[200px] relative">
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  alt="AI technology visualization"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </TabsContent>
          <TabsContent value="platform" className="p-4 border rounded-lg mt-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <h3 className="text-xl font-bold mb-2">Robust & Accessible Platform</h3>
                <p className="text-muted-foreground mb-4">
                  Our platform is designed to be user-friendly, reliable, and accessible across all devices, even with
                  limited internet connectivity.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-primary" />
                    <span>99.9% uptime reliability</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-primary" />
                    <span>Intuitive interface designed with farmer feedback</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-primary" />
                    <span>Works offline with cached data when needed</span>
                  </li>
                </ul>
              </div>
              <div className="rounded-lg overflow-hidden h-[200px] relative">
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  alt="Platform visualization"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </section>

      {/* FAQ */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
        <div className="mx-auto max-w-3xl">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>How accurate are the weather forecasts?</AccordionTrigger>
              <AccordionContent>
                Our weather forecasts are sourced from multiple reliable meteorological services and have an average
                accuracy of 90% for the next 24 hours, 85% for 2-3 days ahead, and 75% for 4-7 days ahead. We
                continuously refine our prediction models to improve accuracy.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Can I use Weather Tracker for multiple farm locations?</AccordionTrigger>
              <AccordionContent>
                Yes, you can set up and monitor multiple farm locations within your account. Each location will have its
                own dedicated dashboard with specific weather data, forecasts, and recommendations.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>How does the AI assistant generate crop recommendations?</AccordionTrigger>
              <AccordionContent>
                Our AI assistant analyzes current weather conditions, forecasted weather patterns, historical data, and
                crop-specific requirements to generate personalized recommendations. It considers factors like
                temperature ranges, precipitation, humidity, and growing season to suggest optimal planting, irrigation,
                and harvesting strategies.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>Is my farm data kept private and secure?</AccordionTrigger>
              <AccordionContent>
                Absolutely. We take data privacy and security very seriously. Your farm location data and preferences
                are encrypted and stored securely. We never share your personal information with third parties without
                your explicit consent. Our platform complies with industry-standard security protocols.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5">
              <AccordionTrigger>Can Weather Tracker work in areas with limited internet connectivity?</AccordionTrigger>
              <AccordionContent>
                Yes, our application is designed to work in areas with limited connectivity. It caches essential data
                when online, allowing you to access recent weather information and recommendations even when offline.
                The app will automatically sync and update when internet connectivity is restored.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* Contact */}
      <section className="mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Get in Touch</CardTitle>
            <CardDescription>Have questions or need assistance? Our team is here to help.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h3 className="font-medium">Email</h3>
                    <p className="text-muted-foreground">support@weathertracker.farm</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h3 className="font-medium">Phone</h3>
                    <p className="text-muted-foreground">+1 (555) 123-4567</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h3 className="font-medium">Office</h3>
                    <p className="text-muted-foreground">
                      123 Weather Lane
                      <br />
                      Farmington, CA 95432
                      <br />
                      United States
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-center">
                <p className="mb-4">
                  Follow us on social media for the latest updates, farming tips, and weather insights.
                </p>
                <div className="flex gap-4">
                  <Button variant="outline" size="icon" asChild>
                    <Link href="#" aria-label="Twitter">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-5 w-5"
                      >
                        <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                      </svg>
                    </Link>
                  </Button>
                  <Button variant="outline" size="icon" asChild>
                    <Link href="#" aria-label="Facebook">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-5 w-5"
                      >
                        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                      </svg>
                    </Link>
                  </Button>
                  <Button variant="outline" size="icon" asChild>
                    <Link href="#" aria-label="Instagram">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-5 w-5"
                      >
                        <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                      </svg>
                    </Link>
                  </Button>
                  <Button variant="outline" size="icon" asChild>
                    <Link href="#" aria-label="YouTube">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-5 w-5"
                      >
                        <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"></path>
                        <path d="m10 15 5-3-5-3z"></path>
                      </svg>
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* CTA */}
      <section className="text-center bg-primary text-primary-foreground rounded-xl p-8">
        <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Farming?</h2>
        <p className="text-xl mb-6 max-w-2xl mx-auto">
          Join thousands of farmers who are using Weather Tracker to optimize their operations and increase yields.
        </p>
        <Button size="lg" variant="secondary" asChild>
          <Link href="/">Get Started Today</Link>
        </Button>
      </section>
    </div>
  )
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode
  title: string
  description: string
}) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex flex-col items-center text-center">
          <div className="mb-4">{icon}</div>
          <h3 className="text-xl font-bold mb-2">{title}</h3>
          <p className="text-muted-foreground">{description}</p>
        </div>
      </CardContent>
    </Card>
  )
}

function BenefitItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-2">
      <div className="rounded-full bg-primary/10 p-1 mt-0.5">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-primary"
        >
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
      </div>
      <p>{children}</p>
    </li>
  )
}

function TestimonialCard({
  quote,
  author,
  role,
}: {
  quote: string
  author: string
  role: string
}) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex flex-col h-full">
          <div className="mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-primary"
            >
              <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"></path>
              <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"></path>
            </svg>
          </div>
          <p className="text-muted-foreground flex-1 mb-4">{quote}</p>
          <div>
            <p className="font-bold">{author}</p>
            <p className="text-sm text-muted-foreground">{role}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

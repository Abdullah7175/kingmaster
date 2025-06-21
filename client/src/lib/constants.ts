export const PLATFORMS = {
  whatsapp: {
    name: "WhatsApp",
    icon: "fab fa-whatsapp",
    color: "from-green-400 to-green-600",
    description: "Automated messaging, broadcast campaigns, and customer support with advanced WhatsApp Business API integration."
  },
  instagram: {
    name: "Instagram",
    icon: "fab fa-instagram",
    color: "from-pink-400 to-purple-600",
    description: "Content scheduling, story automation, and engagement tracking with advanced Instagram API features."
  },
  facebook: {
    name: "Facebook",
    icon: "fab fa-facebook",
    color: "from-blue-400 to-blue-600",
    description: "Page management, ad campaign automation, and community engagement with Facebook Graph API."
  },
  telegram: {
    name: "Telegram",
    icon: "fab fa-telegram",
    color: "from-cyan-400 to-blue-600",
    description: "Channel management, bot automation, and subscriber engagement through Telegram Bot API."
  },
  sms: {
    name: "SMS",
    icon: "fas fa-sms",
    color: "from-amber-400 to-orange-600",
    description: "Bulk SMS campaigns, automated sequences, and delivery tracking with global carrier networks."
  },
  tiktok: {
    name: "TikTok",
    icon: "fab fa-tiktok",
    color: "from-pink-500 to-rose-600",
    description: "Content optimization, trend analysis, and engagement automation for viral marketing campaigns."
  },
  youtube: {
    name: "YouTube",
    icon: "fab fa-youtube",
    color: "from-red-500 to-red-600",
    description: "Video marketing automation, channel management, and subscriber engagement tracking."
  }
} as const;

export const CAMPAIGN_STATUSES = {
  draft: { label: "Draft", color: "bg-gray-500" },
  scheduled: { label: "Scheduled", color: "bg-blue-500" },
  active: { label: "Active", color: "bg-green-500" },
  paused: { label: "Paused", color: "bg-yellow-500" },
  completed: { label: "Completed", color: "bg-purple-500" },
  failed: { label: "Failed", color: "bg-red-500" }
} as const;

export const PRICING_PLANS = [
  {
    id: "starter",
    name: "Starter",
    price: 29,
    description: "Perfect for small businesses",
    features: [
      "5,000 Messages/month",
      "3 Platform Integrations",
      "Basic Analytics",
      "Email Support",
      "Template Library"
    ],
    popular: false
  },
  {
    id: "professional",
    name: "Professional",
    price: 99,
    description: "For growing businesses",
    features: [
      "25,000 Messages/month",
      "All Platform Integrations",
      "Advanced Analytics",
      "Priority Support",
      "A/B Testing",
      "Custom Automations",
      "Team Collaboration"
    ],
    popular: true
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: 299,
    description: "For large organizations",
    features: [
      "Unlimited Messages",
      "All Platforms + API Access",
      "Custom Analytics",
      "24/7 Phone Support",
      "Advanced Automations",
      "White-label Options",
      "Dedicated Manager"
    ],
    popular: false
  }
];

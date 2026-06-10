export interface Role {
  label: string
  color: string
}

export interface HeroContent {
  headline: string
  tagline: string
  bio: string
  roles: Role[]
}

export interface SiteContent {
  hero: HeroContent
}

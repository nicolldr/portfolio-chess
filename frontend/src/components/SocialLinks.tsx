import { ExternalLink } from 'lucide-react'

type SocialLinksProps = { className: string }

export function SocialLinks({ className }: SocialLinksProps) {
  const links: { label: string; href: string }[] = []
  return <nav className={className} aria-label="Enlaces profesionales">{links.map((link) => <a key={link.label} href={link.href} aria-label={link.label} title={link.label}><ExternalLink /></a>)}</nav>
}

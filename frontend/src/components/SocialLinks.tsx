type SocialLinksProps = { className: string }

export function SocialLinks({ className }: SocialLinksProps) {
  return (
    <div className={className} aria-label="Redes sociales">
      <span title="GitHub" aria-label="GitHub">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 .8a11.2 11.2 0 0 0-3.54 21.82c.56.1.77-.24.77-.54v-2.1c-3.13.68-3.79-1.33-3.79-1.33-.5-1.3-1.25-1.65-1.25-1.65-1.02-.7.08-.69.08-.69 1.13.08 1.72 1.16 1.72 1.16 1 .1.98 2.02 3.38 1.38.1-.73.39-1.23.7-1.52-2.5-.29-5.13-1.25-5.13-5.56 0-1.23.44-2.23 1.16-3.02-.12-.28-.5-1.43.11-2.98 0 0 .95-.3 3.08 1.15a10.7 10.7 0 0 1 5.6 0c2.14-1.45 3.08-1.15 3.08-1.15.61 1.55.23 2.7.11 2.98.72.79 1.16 1.79 1.16 3.02 0 4.32-2.63 5.26-5.14 5.55.4.35.75 1.03.75 2.08v3.08c0 .3.2.65.78.54A11.2 11.2 0 0 0 12 .8Z" /></svg>
      </span>
      <span title="LinkedIn" aria-label="LinkedIn">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2ZM8.34 18H5.67V9.4h2.67ZM7 8.23a1.55 1.55 0 1 1 .02-3.1A1.55 1.55 0 0 1 7 8.23ZM18.33 18h-2.66v-4.18c0-1-.02-2.28-1.39-2.28-1.39 0-1.6 1.08-1.6 2.2V18h-2.67V9.4h2.56v1.18h.04c.36-.68 1.23-1.4 2.53-1.4 2.7 0 3.2 1.78 3.2 4.1Z" /></svg>
      </span>
      <span title="Correo" aria-label="Correo">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 5.5h18v13H3z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" /><path d="m4 7 8 6 8-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" /></svg>
      </span>
    </div>
  )
}

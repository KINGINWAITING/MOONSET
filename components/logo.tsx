import { NavLink } from "@/components/nav-link"

interface LogoProps {
  href?: string
}

export function Logo({ href = "/" }: LogoProps) {
  const logoContent = (
    <>
      <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
        M
      </div>
      <span className="font-mono tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-600">
        MOONSET
      </span>
    </>
  )
  
  return href ? (
    <NavLink href={href} className="flex items-center gap-2 font-bold text-xl">
      {logoContent}
    </NavLink>
  ) : (
    <div className="flex items-center gap-2 font-bold text-xl">
      {logoContent}
    </div>
  )
} 
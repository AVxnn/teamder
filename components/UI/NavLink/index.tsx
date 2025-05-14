'use client'
import { forwardRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAnimation } from '@/components/AnimationProvider'

export const NavLink = forwardRef<
  HTMLAnchorElement,
  React.ComponentProps<typeof Link> & { direction?: 'left' | 'right' | 'up' | 'down' | 'fade' }
>(function AnimatedLink({ href, direction = 'right', children, ...props }, ref) {
  const { startTransition } = useAnimation()
  const router = useRouter()

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    startTransition(href.toString(), direction)
    setTimeout(() => {
      router.push(href.toString())
    }, 100)
  }

  return (
    <Link 
      href={href} 
      onClick={handleClick} 
      ref={ref}
      {...props}
    >
      {children}
    </Link>
  )
})
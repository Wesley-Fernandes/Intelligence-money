"use client"
import { usePathname } from 'next/navigation'
import { Container } from './Container'
import { Menu } from './Menu'

const Navbar = () => {
  const pathname = usePathname()
  return (
    <Container>
      {pathname !== "/" && <Menu/>}
    </Container>
  )
}

export default Navbar;
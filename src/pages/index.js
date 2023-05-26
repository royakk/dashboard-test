import Image from 'next/image'
import { Inter } from 'next/font/google'
import ResponsiveDrawer from '@/components/sidbar'
import '../helpers/i18n';
import Dashboard from './Dashboard';


const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
    <Dashboard/>
    </>
  )
}

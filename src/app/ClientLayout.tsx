"use client";

import Footer from "@/components/footer/Footer";
import Navbar from "@/components/header/Navbar";
import MobileMenuBar from "@/components/mobile/BottomNavigation";
import { useIsMobile } from "@/hooks/useIsMobile";
import { usePathname } from "next/navigation";

type ClientLayoutProps = {
  children: React.ReactNode;
};

const ClientLayout = ({ children }: ClientLayoutProps) => {
  const isMobile = useIsMobile();
  const pathname = usePathname()

  const hideFooter = pathname.startsWith('/chatbot')
  const hideNavbar = pathname.startsWith('/chatbot') || pathname.startsWith('/profile');

  return (
    <div>
        {!hideNavbar && <Navbar />}

        {children}

        {isMobile ? <MobileMenuBar /> : !hideFooter && <Footer />}

        {/* Add padding so content doesn't go behind fixed mobile menu */}
        {isMobile && !hideFooter && <div className="h-[100px]" />}
     
    </div>
  );
};

export default ClientLayout;
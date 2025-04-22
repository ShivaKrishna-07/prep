"use client";

import Footer from "@/components/footer/Footer";
import Navbar from "@/components/header/Navbar";
import MobileMenuBar from "@/components/mobile/BottomNavigation";
import { useIsMobile } from "@/hooks/useIsMobile";

type ClientLayoutProps = {
  children: React.ReactNode;
};

const ClientLayout = ({ children }: ClientLayoutProps) => {
  const isMobile = useIsMobile();

  return (
    <div>
        <Navbar />

        {children}

        {isMobile ? <MobileMenuBar /> : <Footer />}

        {/* Add padding so content doesn't go behind fixed mobile menu */}
        {isMobile && <div className="h-[100px]" />}
     
    </div>
  );
};

export default ClientLayout;
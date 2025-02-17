import React from 'react'

export const FooterComponent = () => {
    return (
        <footer className="bg-[#b14242] text-[#fcff55] p-1 border-[2px] border-black">
          <div className="container mx-auto p-4 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm">&copy; {new Date().getFullYear()} My Website. All rights reserved.</p>
            <div className="space-x-4 mt-2 md:mt-0">
              <a href="#" className="hover:text-[#fcff64af]">Privacy Policy</a>
              <a href="#" className="hover:text-[#fcff64af]">Terms of Service</a>
              <a href="#" className="hover:text-[#fcff64af]">Contact</a>
            </div>
          </div>
        </footer>
      );
}

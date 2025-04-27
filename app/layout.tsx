import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import Container from "@/components/global/Container";
import Providers from "./providers";
import { ClerkProvider } from "@clerk/nextjs";
// import img1 from "./../public/img1.jpeg";.
import ins from "@/public/ins.jpg";
import tw from "@/public/tw.jpg";
import img6 from "@/public/img6.jpg";
import img13 from "@/public/img13.jpg";
import img12 from "@/public/img12.jpg";
import img8 from "@/public/img8.jpg";
// import img6 from "@/public/img6.jpeg";
import { BiLogoFacebook } from "react-icons/bi";
import { FaInstagram } from "react-icons/fa6";
import { IoLogoTwitter } from "react-icons/io5";

import { VscCode } from "react-icons/vsc";
import { BsTelephoneForward } from "react-icons/bs";
import { SlLocationPin } from "react-icons/sl";
import { MdOutlineMailOutline } from "react-icons/md";
import Logo from "@/components/navbar/Logo";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "shop-next",
  description: "learning Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // https://images.unsplash.com/photo-1637734433731-621aca1c8cb6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=404&q=80
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={inter.className}>
          {/* TETS BLOCK */}
          {/* <div className="flex items-center justify-center p-8 w-screen h-screen bg-slate-500"> */}
          {/* <div className="max-w-md mx-auto bg-white rounded-lg shadow-xl overflow-hidden sm:max-w-2xl ring-1 ring-slate-900/5">
            <div className="flex flex-col sm:flex-row">
        
              <div className="sm:shrink-0">
                <img
                  className="w-full sm:w-[193px] h-[200px] object-cover object-bottom sm:object-center"
                  src="https://images.unsplash.com/photo-1637734433731-621aca1c8cb6?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=404&amp;q=80"
                  width="202"
                  height="192"
                  alt="Beautiful abstract building in the sun"
                />
              </div>
          
              <div className="p-6 2xl:p-8 space-y-2">
                <div className="font-medium text-sm leading-6 text-indigo-600">Company retreats</div>
                <a
                  href="#"
                  className="block font-semibold text-base text-slate-900 leading-6 hover:underline"
                >
                  Incredible accommodation for your team
                </a>
                <p className="text-sm text-slate-600 leading-6">
                  Looking to take your team away on a retreat to enjoy awesome food and take in some sunshine?
                  We have a list of places to do just that.
                </p>
              </div>
            </div>
          </div> */}
          {/* </div> */}
          {/* TETS BLOCK */}
          <Providers>
            <Navbar />
            <Container className="py-20">{children}</Container>
            {/* FOOTER bg-orange-400*/}
            <footer className="shadow-[1px_2px_6px_rgba(0,0,0,0.2)]">
              {/* box-shadow: 1px 2px 6px rgba(0,0,0,0.2); */}

              <div className="bg-card py-8 text-muted-foreground">
                <Container className="my-16 grid justify-between lg:grid-cols-7 gap-12 xl:max-w-7xl md:grid-cols-2">
                  <div className=" lg:col-span-2">
                    <div className="footer__logo mb-8 text-2xl font-medium">
                      {/* <a href="#">TravelToor</a> */}
                      <a
                        className="rounded-md flex gap-2 items-center bg-primary w-min px-2 py-1 text-secondary"
                        href="/"
                      >
                        Shop
                        <VscCode className="w-8 h-8" />
                      </a>
                    </div>
                    <p className="text-md mb-6">
                      Explore the world with us! Connect through our social media channels, find quick links
                      to essential resources, and access 24/7 support to make your travel planning effortless.
                    </p>
                    <ul className="footer__socials flex gap-2 text-background">
                      <li className="p-2 rounded-full bg-slate-400 ">
                        <a href="#">
                          <BiLogoFacebook fontSize={18} />
                        </a>
                      </li>
                      <li className="p-2 rounded-full  bg-slate-400">
                        <a href="#">
                          <IoLogoTwitter fontSize={18} />
                        </a>
                      </li>
                      <li className="p-2 rounded-full  bg-slate-400">
                        <a href="#">
                          <FaInstagram fontSize={18} />
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className="">
                    <h4 className="mb-8 font-medium text-2xl">Services</h4>
                    <ul className="footer__links flex md:flex-col gap-4">
                      <li>
                        <a href="#">About Us</a>
                      </li>
                      <li>
                        <a href="#">Destinations</a>
                      </li>
                      <li>
                        <a href="#">Services</a>
                      </li>
                      <li>
                        <a href="#">Contact</a>
                      </li>
                      <li>
                        <a href="#">Privacy</a>
                      </li>
                    </ul>
                  </div>
                  <div className=" lg:col-span-2">
                    <h4 className="mb-8 font-medium text-2xl">Instagram</h4>
                    <div className="md:grid flex flex-wrap md:grid-cols-3 gap-3">
                      <img className="w-[100px] rounded-md shadow-2xl" src={ins.src} alt="instagram" />
                      <img className="w-[100px] rounded-md shadow-2xl" src={tw.src} alt="instagram" />
                      <img className="w-[100px] rounded-md shadow-2xl" src={img6.src} alt="instagram" />

                      <img className="w-[100px] rounded-md shadow-2xl" src={img13.src} alt="instagram" />
                      <img className="w-[100px] rounded-md shadow-2xl" src={img12.src} alt="instagram" />
                      <img className="w-[100px] rounded-md shadow-2xl" src={img8.src} alt="instagram" />
                    </div>
                  </div>
                  <div className=" lg:col-span-2">
                    <h4 className="mb-8 font-medium text-2xl">Contact</h4>
                    <ul className="footer__links flex flex-col gap-4">
                      <li>
                        <a className="inline-flex gap-4 items-center" href="#">
                          <span>
                            <BsTelephoneForward />
                          </span>
                          +91 0987654321
                        </a>
                      </li>
                      <li>
                        <a className="inline-flex gap-4 items-center" href="#">
                          <span>
                            <SlLocationPin />
                          </span>
                          Nextjs, v14
                        </a>
                      </li>
                      <li>
                        <a className="inline-flex gap-4 items-center" href="#">
                          <span>
                            <MdOutlineMailOutline />
                          </span>
                          delivered@resend.dev
                        </a>
                      </li>
                    </ul>
                  </div>
                </Container>
                <div className="text-center">Copyright © 2024 Web Design Mastery. All rights reserved.</div>
              </div>
            </footer>
          </Providers>

          {/* <div className="bg-slate-200 p-8">
            <header className="text-center p-8 mb-8 ">
            <h1 className="text-4xl tracking-widest mb-4">
            <b>MY BLOG</b>
            </h1>
            <p>
                Welcome to the blog of <span className="px-3 py-1 bg-black text-white">unknown</span>
              </p>
            </header>

            <div className="grid lg:grid-cols-8 gap-6 max-w-7xl mx-auto px-5">
              <div className="lg:col-span-5">
                <div className="mb-4 bg-white">
                  <img className="w-full" src="https://www.w3schools.com/w3images/woods.jpg" alt="Nature" />
                  <div className="p-4 ">
                    <h3 className="mb-2">
                      <b>TITLE HEADING</b>
                    </h3>
                    <h5 className="mb-2">
                      Title description, <span className="">April 7, 2014</span>
                    </h5>
                  </div>

                  <div className="p-4 ">
                    <p className="mb-6">
                      Mauris neque quam, fermentum ut nisl vitae, convallis maximus nisl. Sed mattis nunc id
                      lorem euismod placerat. Vivamus porttitor magna enim, ac accumsan tortor cursus at.
                      Phasellus sed ultricies mi non congue ullam corper. Praesent tincidunt sed tellus ut
                      rutrum. Sed vitae justo condimentum, porta lectus vitae, ultricies congue gravida diam
                      non fringilla.
                    </p>
                    <div className="flex justify-between">
                      <div className=" ">
                        <p className="border border-slate-200 px-4 py-2">
                          <button className="  ">
                            <b>READ MORE »</b>
                          </button>
                        </p>
                      </div>
                      <div className="text-white">
                        <p>
                          <span className="flex items-center">
                            <b>Comments  </b>
                            <span className="p-2 text-white rounded-full bg-slate-900">0</span>
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <hr />

                <div className="bg-white ">
                  <img className="w-full" src="https://www.w3schools.com/w3images/bridge.jpg" alt="Norway" />
                  <div className="p-4">
                    <h3 className="mb-2">
                      <b>BLOG ENTRY</b>
                    </h3>
                    <h5 className="mb-2">
                      Title description, <span className="">April 2, 2014</span>
                    </h5>
                  </div>

                  <div className="p-4">
                    <p className="mb-6">
                      Mauris neque quam, fermentum ut nisl vitae, convallis maximus nisl. Sed mattis nunc id
                      lorem euismod placerat. Vivamus porttitor magna enim, ac accumsan tortor cursus at.
                      Phasellus sed ultricies mi non congue ullam corper. Praesent tincidunt sed tellus ut
                      rutrum. Sed vitae justo condimentum, porta lectus vitae, ultricies congue gravida diam
                      non fringilla.
                    </p>
                    <div className="flex justify-between">
                      <div className=" ">
                        <p className="border border-slate-200 px-4 py-2">
                          <button className="  ">
                            <b>READ MORE »</b>
                          </button>
                        </p>
                      </div>
                      <div className="  ">
                        <p>
                          <span className="">
                            <b>Comments  </b> <span className="rounded-xl bg-slate-900">2</span>
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-3">
                <div className="mb-4 bg-white">
                  <img className="w-full" src="https://www.w3schools.com/w3images/avatar_g.jpg" />
                  <div className="  p-4">
                    <h4>
                      <b>My Name</b>
                    </h4>
                    <p>
                      Just me, myself and I, exploring the universe of uknownment. I have a heart of love and
                      a interest of lorem ipsum and mauris neque quam blog. I want to share my world with you.
                    </p>
                  </div>
                </div>
                <hr />

                <div className="mb-4 bg-white">
                  <div className=" w3-padding">
                    <h4 className="bg-secondary p-4">Popular Posts</h4>
                  </div>
                  <ul className="w3-ul w3-hoverable w3-white">
                    <li className="flex gap-4 p-4 border-y border-slate-200  border-slate-200">
                      <img
                        src="https://www.w3schools.com/w3images/workshop.jpg"
                        alt="Image"
                        className="w-16 h-16"
                      />
                      <span className="">Lorem</span>
                      <br />
                      <span>Sed mattis nunc</span>
                    </li>
                    <li className="flex gap-4 p-4 border-y border-slate-200">
                      <img
                        src="https://www.w3schools.com/w3images/gondol.jpg"
                        alt="Image"
                        className="w-16 h-16 "
                      />
                      <span className="w3-large">Ipsum</span>
                      <br />
                      <span>Praes tinci sed</span>
                    </li>
                    <li className="flex gap-4 p-4 border-y border-slate-200">
                      <img
                        src="https://www.w3schools.com/w3images/skies.jpg"
                        alt="Image"
                        className="w-16 h-16 "
                      />
                      <span className="w3-large">Dorum</span>
                      <br />
                      <span>Ultricies congue</span>
                    </li>
                    <li className="flex gap-4 w3-hide-medium p-4">
                      <img
                        src="https://www.w3schools.com/w3images/rock.jpg"
                        alt="Image"
                        className="w-16 h-16 "
                      />
                      <span className="w3-large">Mingsum</span>
                      <br />
                      <span>Lorem ipsum dipsum</span>
                    </li>
                  </ul>
                </div>
                <hr />

                <div>
                  <div className="bg-secondary">
                    <h4 className=" p-4">Tags</h4>
                  </div>
                  <div className=" w3-white p-4 bg-slate-300">
                    <p className="flex flex-wrap gap-1">
                      <span className="px-2 bg-secondary mb-2 text-white bg-slate-900">Travel</span>
                      <span className="px-2 bg-secondary mb-2">New York</span>
                      <span className="px-2 bg-secondary mb-2">London</span>
                      <span className="px-2 bg-secondary mb-2">IKEA</span>
                      <span className="px-2 bg-secondary mb-2 ">NORWAY</span>
                      <span className="px-2 bg-secondary mb-2 ">DIY</span>
                      <span className="px-2 bg-secondary mb-2 ">Ideas</span>
                      <span className="px-2 bg-secondary mb-2 ">Baby</span>
                      <span className="px-2 bg-secondary mb-2 ">Family</span>
                      <span className="px-2 bg-secondary mb-2 ">News</span>
                      <span className="px-2 bg-secondary mb-2 ">Clothing</span>
                      <span className="px-2 bg-secondary mb-2 ">Shopping</span>
                      <span className="px-2 bg-secondary mb-2 ">Sports</span>
                      <span className="px-2 bg-secondary mb-2 ">Games</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <br />
          </div>

          <footer className=" bg-slate-700 p-6   text-white">
            <button className="bg-muted-foreground px-4 py-2 mr-2">Previous</button>
            <button className="bg-slate-900 px-4 py-2">Next »</button>
            <p className="mt-4">
              Powered by
              <a href="https://www.w3schools.com/w3css/default.asp" target="_blank">
                w3.css
              </a>
            </p>
          </footer> */}
        </body>
      </html>
    </ClerkProvider>
  );
}

import { useRef, useLayoutEffect, useState, useEffect } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import logo from "../Assests/logo.png";
import stamp from "../Assests/stamp.png";
import bottle from "../Assests/bottle.png";
import batch_img from "../Assests/batch.png";
import "./distressed.css";
import { Flip } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

export default function Animation() {
  const headerRef = useRef(null);
  const imgRef = useRef(null);
  const menuRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  // animation for logo and desktop nav
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(imgRef.current, {
        x: -150,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });

      gsap.from(menuRef.current?.children, {
        x: 150,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        stagger: 0.2,
        delay: 0.3,
      });
    }, headerRef);

    return () => ctx.revert();
  }, []);

  // Animation for mobile menu toggle
  useLayoutEffect(() => {
    if (mobileMenuRef.current) {
      if (isOpen) {
        gsap.to(mobileMenuRef.current, {
          height: "auto",
          opacity: 1,
          duration: 0.5,
          ease: "power2.out",
          display: "block",
        });
      } else {
        gsap.to(mobileMenuRef.current, {
          height: 0,
          opacity: 0,
          duration: 0.4,
          ease: "power2.in",
          onComplete: () => {
            if (mobileMenuRef.current) {
              mobileMenuRef.current.style.display = "none";
            }
          },
        });
      }
    }
  }, [isOpen]);

  //Text Animation
  const line1 = useRef(null);
  const line2 = useRef(null);
  useEffect(() => {
    gsap.fromTo(
      [line1.current, line2.current],
      {
        x: 100,
        opacity: 0,
      },
      {
        x: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        stagger: 0.3,
      }
    );
  }, []);

  // Stamp animation
  useEffect(() => {
    gsap.fromTo(
      ".stamp",
      {
        scale: 5,
        opacity: 0,
      },
      {
        scale: 1,
        opacity: 1,
        rotation: 0,
        delay: 1,
        duration: 0.5,
        ease: "elastic.out(1, 0.5)",
      }
    );
  }, []);

  //Bottle animation
  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    ScrollTrigger.matchMedia({
      // 👨‍💻 For Laptop and large screens (lg+)
      "(min-width: 1024px)": function () {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: ".section-1",
            start: "top top",
            end: "bottom top",
            scrub: 0.2,
          },
        });

        tl.to(".bottle", {
          y: 0,
          x: 0, 
          rotate: 0,
          ease: "power1.out",
        });

        // Second section animation (starts after first ends)
        gsap.to(".bottle", {
          y: 0, 
          x: 0,
          rotate: 0,
          scrollTrigger: {
            trigger: ".second",
            start: "top center",
            end: "center center",
            scrub:  0.2,
          },
        });

        // Stage 3: Drop into center of .third
        gsap.to(".bottle", {
          x: 300, 
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".third-triger",
            start: "top bottom", // starts animation when .third enters
            end: "top top", // ends when top of .third reaches center
            scrub:  0.2,
          },
        });

        // Stage 4: Drop into center of .third
        gsap.to(".bottle", {
          x: -450,
          rotate: 20,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".fourth-triger",
            start: "top bottom",
            end: "bottom top",
            scrub:  0.2,
          },
        });
      },

      // 📱 For Mobile (less than lg)
      "(max-width: 1023px)": function () {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: ".section-1",
            start: "top top",
            end: "bottom top",
            scrub: 0.3,
          },
        });

        tl.to(".bottle", {
          y: 0,
          x: 0,
          rotate: 0,

          ease: "power1.out",
        });

        gsap.to(".bottle", {
          x: 0,
          y: 0,
          rotate: 0,
          scrollTrigger: {
            trigger: ".second",
            start: "top bottom",
            end: "center center",
            scrub: 0.3,
          },
        });

        gsap.to(".bottle", {
          x: 0,
          rotate: 3600,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".third-triger",
            start: "top bottom",
            end: "top top",
            scrub: 0.3,
          },
        });

        gsap.to(".bottle", {
          x: 0,
          y: 0,
          rotate: 355,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".fourth-triger",
            start: "top bottom",
            end: "bottom top",
            scrub: 0.3,
          },
        });
      },
    });
  });

 

  return (
    <div className="bg-[#B9D9EB] ">
      {/* Header */}

      <header
        className="sticky top-0 z-50 bg-[#B9D9EB] px-6 md:px-[7rem] shadow-[0_10px_15px_-5px_#003153]"
        ref={headerRef}
      >
        <div className="flex items-center justify-between">
          {/* Logo */}
          <img
            ref={imgRef}
            src={logo}
            alt="Logo"
            className="h-[80px] md:h-[110px] w-auto object-contain"
          />

          {/* Hamburger icon */}
          <button
            className="md:hidden text-3xl font-bold text-[#003153]"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
          >
            ☰
          </button>

          {/* Desktop menu */}
          <ul
            ref={menuRef}
            className="hidden md:flex gap-7 text-lg font-semibold text-[#003153] cursor-pointer"
          >
            <li className="hover:text-black">Home</li>
            <li className="hover:text-black">About</li>
            <li className="hover:text-black">Features</li>
            <li className="hover:text-black">Contact</li>
          </ul>
        </div>

        {/* Mobile menu */}
        <div
          ref={mobileMenuRef}
          className="md:hidden overflow-hidden opacity-0 h-0 transition-all duration-300"
        >
          <ul className="flex flex-col gap-4 mt-4 text-md font-semibold text-[#003153]">
            <li className="hover:text-black">Home</li>
            <li className="hover:text-black">About</li>
            <li className="hover:text-black">Features</li>
            <li className="hover:text-black">Contact</li>
          </ul>
        </div>
      </header>

      {/* Hero Section*/}
      <div className="section-1 bg-[#B9D9EB] h-svh lg:py-20 relative overflow-hidden flex items-center justify-center">
        <div className="flex items-center justify-center flex-col h-full w-fit ">
          <h1
            ref={line1}
            className="distressed-text md:text-9xl text-7xl   font-bold font-winky "
          >
            Simply
          </h1>
          <h1
            ref={line2}
            className="distressed-text md:text-9xl text-7xl  font-bold font-winky"
          >
            Sparkling
          </h1>
        </div>
        {/* Stamp */}
        <img
          src={stamp}
          alt="Stamp"
          className="
            stamp absolute h-[130px] w-[130px]
            top-1/3 left-1/3
           -translate-x-1/2 -translate-y-1/2
            max-sm:top-[39%] max-sm:left-[25%]
            sm:top-[42%] sm:left-[30%]
            md:top-[38%] md:left-[30%]
            lg:top-[33%] lg:left-[34.3333%]
            xl:top-[45%] xl:left-[38%]
            2xl:top-[45%] 2xl:left-[41%]
           "
        />

        {/* Bottle */}
        <img
          src={bottle}
          alt="Bottle"
          className="bottle fixed top-2/3  transform  -translate-y-1/2 rotate-[20deg]  lg:h-[35rem] h-[28rem] z-30 "
        />
      </div>

      {/* Our Selection Section */}
      <section className="second bg-[#B9D9EB] overflow-x-hidden ">
        <hr className="mx-auto w-[80%] border-t-2 border-[#003153]" />
        <div className="flex items-center justify-between lg:px-[6rem] lg:flex-row flex-col">
          <div className="flex items-start lg:w-[30%] px-5 md:px-0 py-9 md:py-0">
            <div className="flex items-start flex-col">
              <p className="text-start font-semibold text-[#003153] text-lg">
                Our Selection
              </p>
              <h2 className="distressed-text text-start md:text-6xl text-5xl font-bold py-5">
                {" "}
                Crystal Range
              </h2>
              <p className="text-start md:text-lg text-[#003153]">
                Infused with natural minerals, our sparkling water offers a
                refreshing taste and invigorating bubbles.
              </p>
              <button
                href="#"
                className="bg-[#003153] text-[#B9D9EB] text-lg font-semibold py-2 px-4 mt-6 border-2 border-[#003153] hover:text-[#003153] hover:bg-[#B9D9EB]  trabsition duration-200"
              >
                Explore All
              </button>
            </div>
          </div>

          <div className=" bottle md:hidden flex h-[300px]"></div>

          <div className="intro-right  lg:w-[30%] py-9 md:py-0">
            <div className="ingredients-log py-2 px-5 md:px-0">
              <h3 className="text-2xl font-bold text-[#003153] text-start font-winky">
                Combined With
              </h3>

              <div className="grid grid-cols-[30%_70%] gap-2 py-[1rem] text-[#003153]">
                <div className="text-2xl distressed-text font-bold">500ml</div>
                <div className="flex flex-col items-start">
                  <strong>SPARKLING WATER</strong>
                  <p className="text-start">
                    Pure glacier-sourced for crispness and purity.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-[30%_70%] gap-2 py-[1rem] text-[#003153]">
                <div className="text-2xl distressed-text font-bold">250g</div>
                <div className="flex flex-col items-start">
                  <strong>MINERAL INFUSION</strong>
                  <p className="text-start">
                    Enriched with natural electrolytes for a revitalizing kick.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-[30%_70%] gap-2 py-[1rem] text-[#003153]">
                <div className="text-2xl distressed-text font-bold">100g</div>
                <div className="flex flex-col items-start">
                  <strong>CARBONATION BLEND</strong>
                  <p className="text-start">
                    Perfectly balanced fizz, sourced from natural springs.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-[30%_70%] gap-2 py-[1rem] text-[#003153]">
                <div className="text-2xl distressed-text font-bold">50g</div>
                <div className="flex flex-col items-start">
                  <strong>BOTANICAL ESSENCE</strong>
                  <p className="text-start">
                    Subtle hints of wild mint for a refreshing aroma.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-[30%_70%] gap-2 py-[1rem] text-[#003153]">
                <div className="text-2xl distressed-text font-bold">1%</div>
                <div className="flex flex-col items-start">
                  <strong>NATURAL TRACE</strong>
                  <p className="text-start">
                    Pure spring water with a touch of natural minerals.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TIMELINE Section */}
      <section className="bg-[#B9D9EB] lg:px-[6rem] px-5 overflow-x-hidden ">
        <hr className="mx-auto w-[80%] border-t-2 border-[#003153]" />
        <div className="third-triger py-[4rem] font-poppins">
          <h1 className="distressed-text lg:text-9xl text-6xl font-bold text-start">
            OUR
          </h1>
          <h1 className="distressed-text lg:text-9xl text-6xl font-bold text-start">
            TIMELINE
          </h1>
        </div>

        <div className="bg-[#B9D9EB] grid lg:grid-cols-2 grid-cols-1 p-10">
          <div className="flex lg:flex-row flex-col gap-5">
            <div className="relative border-2 border-[#003153] lg:w-[40%]">
              <div className="distressed-text absolute top-[-2rem]    text-5xl font-extrabold text-[#003153] drop-shadow-md z-10">
                1984
              </div>

              <div className="relative border-4 border-[#B9D9EB] shadow-[8px_8px_0_0_#003153]">
                <img
                  src={batch_img}
                  alt="Spark Hydration"
                  className="w-fit h-auto object-cover"
                />
              </div>
            </div>
            <div className="flex flex-col items-start justify-center lg:w-[60%] py-4 lg:px-0">
              <h3 className="text-[#003153] lg:text-3xl text-3xl font-bold font-poppins">
                The First Batch
              </h3>
              <p className="text-[#003153] font-medium text-justify">
                Our journey began in a wooden barn, nestled beside spring-fed
                lakes and oak trees. The first batch was bottled by hand — pure,
                crisp, and crafted with patience.
              </p>
            </div>
          </div>

          <div className="third  bottle h-80 lg:h-fit w-full text-transparent">
            g
          </div>
        </div>
      </section>

      {/* Purity Reborn Section */}
      <section className="bg-[#B9D9EB] lg:px-[6rem] px-5 lg:py-[15rem] h-screen ">
        <div className="fourth-triger bg-[#B9D9EB] grid lg:grid-cols-2 grid-cols-1 p-10">
          <div className="bottle end-triger h-80 lg:h-fit w-full text-transparent lg:flex hidden">
           
          </div>

          <div className="flex lg:flex-row flex-col gap-5">
            <div className="flex flex-col items-start justify-center lg:w-[60%] py-4 lg:px-0">
              <h3 className="text-[#003153] lg:text-3xl text-2xl font-bold font-poppins">
                The Purity Reborn
              </h3>
              <p className="text-[#003153] font-medium text-justify">
                A lightning storm ignited a blaze that nearly silenced our
                springs forever. But from the ashes, we rebuilt — with scorched
                oak, salvaged tools, and a renewed vow to bottle nature’s purity
                without compromise.
              </p>
            </div>

            <div className="relative border-2 border-[#003153] lg:w-[40%]">
              <div className="distressed-text absolute top-[-2rem] left-1/2 -translate-x-1/2 text-5xl font-extrabold text-[#003153] drop-shadow-md z-10">
                1989
              </div>

              <div className="relative border-4 border-[#B9D9EB] shadow-[8px_8px_0_0_#003153]">
                <img
                  src={batch_img}
                  alt="Spark Hydration"
                  className="w-fit h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

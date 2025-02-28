import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/16/solid";
import ButtonLink from "../common/ButtonLink";
import Image from "next/image";
import { APP_PATH } from "@/constants/appPath";
import { RiDownloadCloud2Fill } from "react-icons/ri";
import { useEffect, useState } from "react";
function Nav() {
  const textLinkClasses = "text-black hover:text-white active:text-gray-400";

  const navLinks = [
    { href: "#features", children: "Features" },
    { href: "#partners", children: "Partners" },
    { href: "#reviews", children: "Reviews" },
  ];

  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    const beforeInstallHandler = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener("beforeinstallprompt", beforeInstallHandler);

    return () => {
      window.removeEventListener("beforeinstallprompt", beforeInstallHandler);
    };
  }, []);

  const handleInstall = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult: any) => {
        console.log(`User choice: ${choiceResult.outcome}`);
        setDeferredPrompt(null);
      });
    }
  };
  return (
    <Disclosure className="w-screen " as="nav">
      {({ open }) => (
        <>
          <div className="flex  w-screen h-[15vh] max-w-7xl items-center justify-between px-8 lg:px-12 xl:m-auto">
            <div className="flex">
              <ButtonLink href="#">
                <Image
                  src="/logo.png"
                  alt="Payyng logo"
                  width={120}
                  height={40}
                />
              </ButtonLink>
              <div className="ml-4 hidden items-center space-x-4 sm:ml-6 sm:flex lg:ml-8 lg:space-x-8">
                {navLinks.map((link, index) => (
                  <ButtonLink
                    key={index}
                    href={link.href}
                    className={textLinkClasses}
                  >
                    {link.children}
                  </ButtonLink>
                ))}
              </div>
            </div>
            <div className="flex space-x-4">
              {/* <button
                onClick={handleInstall}
                className="active:bg  px-10 rounded-xl bg-black py-3 text-white sm:flex justify-center items-center space-x-3"
              >
                <RiDownloadCloud2Fill size={20} />
                <p>DOWNLOAD</p>
              </button> */}

              <ButtonLink
                href={APP_PATH.LOGIN}
                className="active:bg px-10 rounded-xl bg-black py-3 text-white sm:flex"
              >
                Login
              </ButtonLink>
            </div>

            <Disclosure.Button className="rounded-md p-2 text-gray-500 hover:bg-gray-700 hover:text-white sm:hidden">
              {open ? (
                <XMarkIcon className="block h-6 w-6" />
              ) : (
                <Bars3Icon className="block h-6 w-6" />
              )}
            </Disclosure.Button>
          </div>
          <Disclosure.Panel className="space-y-1 px-4 sm:hidden">
            {navLinks.map((link, index) => (
              <Disclosure.Button
                className="block"
                as="a"
                href={link.href}
                key={index}
              >
                {link.children}
              </Disclosure.Button>
            ))}

            <div className="flex space-x-4">
              <ButtonLink
                href={APP_PATH.REGISTER}
                className="active:bg hidden  px-10  rounded-xl bg-green-700 py-3 text-white hover:bg-gray-900 active:bg-gray-900 sm:flex"
              >
                Sign Up
              </ButtonLink>

              <ButtonLink
                href={APP_PATH.LOGIN}
                className="active:bg hidden px-10 rounded-xl bg-white py-3 text-black sm:flex"
              >
                Login
              </ButtonLink>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}

export default Nav;

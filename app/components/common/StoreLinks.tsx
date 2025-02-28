import { useState, useEffect } from "react";
import StoreLink from "../common/StoreLink";
import { useRouter } from "next/navigation";
import { APP_PATH } from "@/constants/appPath";

interface StoreLinksProps {
  type: BtnTypes;
}

export enum BtnTypes {
  Standard,
  Variant,
  Mobile,
}

function StoreLinks({ type }: StoreLinksProps) {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const { push } = useRouter();

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

  if (type === BtnTypes.Standard) {
    return (
      <div className="mt-10 hidden justify-center space-x-2 sm:flex md:justify-normal">
        <StoreLink
          onClick={handleInstall}
          href="#"
          upperText="Download"
          lowerText="App"
          logo="/download.svg"
          className="flex gap-3 rounded-lg bg-zinc-900 px-4 py-3 text-white hover:bg-zinc-950 active:bg-zinc-800"
        />

        <StoreLink
          onClick={() => {
            push(APP_PATH.LOGIN);
          }}
          href="/login"
          upperText="Login On"
          lowerText="Payyng"
          logo="/login2.svg"
          target="_blank"
          className="flex gap-3 rounded-lg bg-zinc-900 px-4 py-3 text-white hover:bg-zinc-950 active:bg-zinc-800"
        />
      </div>
    );
  }

  if (type === BtnTypes.Mobile) {
    return (
      <div className="my-4 justify-between space-x-2 w-full flex md:hidden">
        <StoreLink
          onClick={handleInstall}
          href="#"
          upperText="Download"
          lowerText="App"
          logo="/download.svg"
          className="flex gap-3 rounded-lg bg-zinc-900 px-4 py-3 text-white hover:bg-zinc-950 active:bg-zinc-800"
        />

        <StoreLink
          onClick={() => {
            push(APP_PATH.LOGIN);
          }}
          href="/login"
          upperText="Login On"
          lowerText="Payyng"
          logo="/login2.svg"
          target="_blank"
          className="flex gap-3 rounded-lg bg-zinc-900 px-4 py-3 text-white hover:bg-zinc-950 active:bg-zinc-800"
        />
      </div>
    );
  }

  if (type === BtnTypes.Variant) {
    return (
      <>
        <StoreLink
          href="https://www.apple.com/app-store"
          upperText="Download on the"
          lowerText="App Store"
          logo="/assets/logos/app_store.svg"
          target="_blank"
          className="my-4 flex gap-3 rounded-lg border bg-transparent px-2 py-1 text-white hover:bg-zinc-950 active:bg-zinc-800"
        />
        <StoreLink
          href="https://play.google.com"
          upperText="Get it on"
          lowerText="Google Play"
          logo="/assets/logos/google_play.svg"
          target="_blank"
          className="my-4 flex gap-3 rounded-lg border bg-transparent px-2 py-1 text-white hover:bg-zinc-950 active:bg-zinc-800"
        />
      </>
    );
  }
}

export default StoreLinks;

import Header from "@/components/Header";
import { getProviders, signIn } from "next-auth/react";
import "@/app/globals.css";
import { AuthProvider } from "@/components/AuthProvider";
import { ReduxProvider } from "@/components/ReduxProvider";

export default function signin({ providers }) {
  return (
    <>
      <AuthProvider>
        <ReduxProvider>
          <Header />
        </ReduxProvider>
      </AuthProvider>
      <div className="flex justify-center space-x-7 mt-20">
        <img
          className="hidden object-cover rotate-6 md:inline-flex md:w-96"
          src="/instagramOnPhone.png"
          alt="instagram-image"
        />
        <div className="">
          {Object.values(providers).map((provider) => (
            <div key={provider.name} className="flex flex-col items-center">
              <img
                className="w-32 object-cover"
                src="https://socodigital.com/wp-content/uploads/2021/03/Instagram.png"
                alt=""
              />
              <p className="text-sm italic my-10 text-center">
                This app is created for learning purposes
              </p>
              <button
                onClick={() => signIn(provider.id, { callbackUrl: "/" })}
                className="bg-red-400 rounded-lg p-3 text-white hover:bg-red-500"
              >
                Sign in with {provider.name}
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}

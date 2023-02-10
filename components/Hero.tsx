import { Button, Text } from "@nextui-org/react";
import React from "react";
import { useUser } from "@auth0/nextjs-auth0";

function Hero() {
  const { user, error, isLoading } = useUser();
  //const { accessToken } = await getAccessToken(req, res);

  //console.log(user);
  //console.log("token", accessToken);
  return (
    <div className="flex flex-col items-center justify-center  translate-y-40 h-full mb-96">
      <div className=" flex flex-col items-center">
        <Text
          h1
          className="text-8xl lg:text-[12rem]"
          css={{
            textGradient:
              "45deg, rgba(2,0,36,1) 0%, rgba(131,255,80,1) 0%, rgba(16,110,7,1) 97%",
          }}
          weight="bold"
        >
          Assess,
        </Text>

        <Text
          h1
          className="text-7xl lg:text-9xl"
          css={{
            textGradient:
              "45deg, rgba(2,0,36,1) 0%, rgba(131,255,80,1) 0%, rgba(16,110,7,1) 97%",
          }}
          weight="bold"
        >
          the best.
        </Text>
      </div>
      <div className="mt-8">
        <Button
          size={{ "@xs": "lg", "@lg": "xl" }}
          className="bg-gradient-to-r from-green-500 to-green-900 font-extrabold"
        >
          Join Metrica
        </Button>
      </div>
    </div>
  );
}

export default Hero;

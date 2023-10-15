import { useEffect, useState } from "react";
import { useAuth } from "../Context/AuthContext";

function FunFactsPhysiology() {
  const { auth } = useAuth();
  const initialMessage = ` Hello ${auth?.username}, Did you know that...`;
  const [Message, SetMessage] = useState(initialMessage);

  const funPhysiologyFacts = [
    "The human heart can create enough pressure to squirt blood up to 30 feet.",
    "The human brain is about 75% water.",
    "If you stretched out all the blood vessels in your body, they would wrap around the Earth more than twice!",
    "The human body has enough iron in it to make a 3-inch nail.",
    "Your taste buds have a lifespan of about 10 to 14 days, and new ones are constantly being formed to replace the old ones.",
    "The surface area of the lungs, when spread out, is roughly the size of a tennis court.",
    "The acid in your stomach is strong enough to dissolve razor blades, though it doesn't do that to your food.",
    "The human body is capable of producing a wide range of sounds, from a whisper to a shout, due to the vocal cords' flexibility.",
    "If you laid out all the DNA in your body end to end, it would stretch from the Earth to the Sun and back many times.",
    "Your skin is the body's largest organ, and it can weigh as much as 20 pounds, depending on the individual's size and weight.",
  ];

  const randomNumber =
    Math.floor(Math.random() * funPhysiologyFacts.length) + 1;
  const randomfacts = funPhysiologyFacts[randomNumber];
  console.log(randomfacts);
  useEffect(() => {
    SetMessage(randomfacts);
  }, []);
  return (
    <div>
      <h1 className=" text-3xl text-center mt-36">
        {` Hello ${auth?.foundUser?.username}, Did you know that...`}
      </h1>
      <h1 className=" text-3xl text-center mt-36">{Message}</h1>
    </div>
  );
}

export default FunFactsPhysiology;
